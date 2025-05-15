import { useEffect, useId, useMemo, useRef, useState } from "react"
import { useCreateContact } from "@/modules/authentication/hooks/useCreateContact";
import { useFetchContacts } from "@/modules/authentication/hooks/useFetchContacts";
import { useDeleteContact } from "@/modules/authentication/hooks/useDeleteContact";
import { CreateContactDialog } from "./CreateContactDialog";
import { flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, CircleAlertIcon, CircleXIcon, EllipsisIcon, FilterIcon, ListFilterIcon, PlusIcon, TrashIcon} from "lucide-react"
import { cn } from "@/lib/utils"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem,} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { useRouter } from "next/router";
import { toast } from "sonner";


// Custom filter function for multi-column searching
const multiColumnFilterFn = (row, columnId, filterValue) => {
  const firstName = row.original.firstName?.toLowerCase() || "";
  const lastName = row.original.lastName?.toLowerCase() || "";
  const phoneNumber = row.original.phoneNumber?.toLowerCase() || "";

  const search = filterValue.toLowerCase();
  return (
    firstName.includes(search) ||
    lastName.includes(search) ||
    phoneNumber.includes(search)
  );
};


const statusFilterFn = (
  row,
  columnId,
  filterValue
) => {
  if (!filterValue?.length) return true
  const status = row.getValue(columnId)
  return filterValue.includes(status);
}

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className={'border border-gray-400'}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all" />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className={'border border-gray-400'}
        aria-label="Select row" />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium">{`${row.getValue("firstName")} ${row.getValue("lastName")}`}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Phone Number",
    accessorKey: "phoneNumber",
    size: 220,
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("country")}</div>
    ),
    size: 180,
  },
  {
    header: "Opted In",
    accessorKey: "optedIn",
    cell: ({ row }) => (
      <Badge
        className={cn(!row.getValue("optedIn") ?
          "bg-red-600/20 text-red-600"
        : "bg-green-600/20 text-green-600")}>
        {`${row.getValue("opteIn")?'YES':"NO"}`}
      </Badge>
    ),
    size: 100,
    filterFn: statusFilterFn,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
]

export default function ViewContactManagement({companyID}) {
  const { createResponse, isCreateLoading, createError, handleCreate, cancelCreate } = useCreateContact();
  const { allContacts, totalCount, loadingContacts, contactError, fetchContacts, cancelContactsOperation } = useFetchContacts();
  const { deleteResponse, isDeleteLoading, deleteError, handleDelete, cancelDelete } = useDeleteContact();
  const visitedPagesRef = useRef(new Set());
  const totalCountRef = useRef(0);
  const id = useId()
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const inputRef = useRef(null)

  const [sorting, setSorting] = useState([
    {
      id: "name",
      desc: false,
    },
  ])

  const [data, setData] = useState([])

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [optedIn, setOptedIn] = useState(false);
  const [customProperties, setCustomProperties] = useState([{ key: "", value: "" }]);

  const addCustomProperty = () => {
    setCustomProperties([...customProperties, { key: "", value: "" }]);
  };

  const removeCustomProperty = (index) => {
    const updatedProperties = customProperties.filter((_, i) => i !== index);
    setCustomProperties(updatedProperties);
  };

  const updateCustomProperty = (index, field, value) => {
    const updatedProperties = [...customProperties];
    updatedProperties[index][field] = value;
    setCustomProperties(updatedProperties);
  };

  const handleCreateContact = async () => {
    await handleCreate({
      companyID,
      firstName,
      lastName,
      phoneNumber,
      countryCode: country.code,
      country: country.country,
      properties: customProperties
    });
  }
  
  useEffect(() => {
    const fetch = async () => {
      const currentIndex = pagination.pageIndex;

      if (companyID && !visitedPagesRef.current.has(currentIndex) && (!totalCountRef.current || data.length < totalCountRef.current)) {
        await fetchContacts({
          companyID,
          index: currentIndex,
          limit: pagination.pageSize,
        });
        visitedPagesRef.current.add(currentIndex);
      }
    };
    fetch();
  }, [pagination.pageIndex, pagination.pageSize, companyID]);

  useEffect(() => {
    if(contactError){
      toast.error(contactError);
    }
  }, [contactError]);

  useEffect(() => {
    if (allContacts) {
      setData((prev) => [...prev, ...allContacts])
      console.log(allContacts)
      if(!totalCountRef.current)totalCountRef.current = totalCount;
    }
  }, [allContacts]);

  useEffect(() => {
    if (createResponse?.message === "Contact added successfully") {
      toast.success(`Contact added successfully`);
      setData((prev) => [...prev, createResponse.contact]);
      totalCountRef.current = totalCountRef.current + 1;
    } else if(createError){
      toast.error(deleteError);
    }
  },[createResponse,createError]);

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const updatedData = data.filter((item) => !selectedRows.some((row) => row.original.id === item.id))
    setData(updatedData)
    table.resetRowSelection()
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("optedIn")

    if (!statusColumn) return []

    const values = Array.from(statusColumn.getFacetedUniqueValues().keys())

    return values.sort();
  }, [table.getColumn("optedIn")?.getFacetedUniqueValues()])

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("optedIn")
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table.getColumn("optedIn")?.getFacetedUniqueValues()])

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("optedIn")?.getFilterValue()
    return filterValue ?? []
  }, [table.getColumn("optedIn")?.getFilterValue()])

  const openImportContactDialog = () => {
    alert('open dialog');
  }

  const handleStatusChange = (checked, value) => {
    const filterValue = table.getColumn("optedIn")?.getFilterValue()
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table.getColumn("optedIn")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Manage Contacts</h2>
        <div className="flex items-center gap-3">
          {/* Filter by name or phone number */}
          <div className="relative">
            <input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 border border-gray-300 rounded-lg py-2 text-sm focus:border-emerald-600 ",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "")
              }
              onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
              placeholder="Filter by name or phone number..."
              type="text"
              aria-label="Filter by name or email" />
            <div
              className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("")
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}>
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                Status
                {selectedStatuses.length > 0 && (
                  <span
                    className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        className={"border border-gray-300"}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={
                            (checked) => handleStatusChange(checked, value)
                        } />
                      <Label htmlFor={`${id}-${i}`} className="flex grow justify-between gap-2 font-normal">{value}{" "}<span className="text-muted-foreground ms-2 text-xs">{statusCounts.get(value)}</span></Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                  Delete
                  <span
                    className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true">
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        {/* Add user button */}
        <div className="divide-primary-foreground/30 inline-flex divide-x rounded-md shadow-xs rtl:space-x-reverse">
          <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="ml-auto cursor-pointer py-2 px-4 rounded-lg border border-emerald-600 font-medium text-sm flex items-center gap-x-2 text-white bg-emerald-600"><PlusIcon size={16} aria-hidden="true" /><span className="-mt-px">Create Contact</span></button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-2xl w-full">
                <div className="p-3">
                  <AlertDialogTitle className="text-2xl font-semibold mb-8">Create Contact</AlertDialogTitle>
                  
                  <CreateContactDialog 
                    firstName={firstName}
                    lastName={lastName}
                    phoneNumber={phoneNumber}
                    optedIn={optedIn}
                    country={country}
                    customProperties={customProperties}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setPhoneNumber={setPhoneNumber}
                    setOptedIn={setOptedIn}
                    setCountry={setCountry}
                    addCustomProperty={addCustomProperty}
                    removeCustomProperty={removeCustomProperty}
                    updateCustomProperty={updateCustomProperty}
                  />
                </div>

                <AlertDialogFooter className="border-t p-4 bg-gray-50 flex justify-end gap-4 rounded-b-lg">
                  <AlertDialogCancel className="px-6 py-3 border rounded-lg text-base bg-white hover:bg-gray-50">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleCreateContact} className="px-6 py-3 rounded-lg text-base text-white bg-green-600 hover:bg-green-700">
                    Create Contact
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white shadow-sm border-gray-300 overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent bg-gray-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11">
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(header.column.getCanSort() && "flex h-full cursor-pointer items-center justify-between gap-2 select-none")}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: (
                              <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />
                            ),
                            desc: (
                              <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />
                            ),
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row,index) => (index < ((pagination.pageIndex + 1) * pagination.pageSize) && index >= (pagination.pageIndex * pagination.pageSize)) && (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}>
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent
              className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div
          className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(Math.max(table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                table.getState().pagination.pageSize, 0), table.getRowCount())}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page">
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page">
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page">
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page">
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

function RowActions({
  row
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item">
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Edit</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicate</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Archive</span>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Move to project</DropdownMenuItem>
                <DropdownMenuItem>Move to folder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Advanced options</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuItem>Add to favorites</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Delete</span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
