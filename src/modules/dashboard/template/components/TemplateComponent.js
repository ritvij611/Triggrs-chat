import { use, useEffect, useId, useMemo, useRef, useState } from "react"
import { useFetchTemplates } from "@/modules/dashboard/template/hooks/useFetchTemplates";
import { useDeleteTemplate } from "@/modules/dashboard/template/hooks/useDeleteTemplate";
import PreviewPartComponent from "./PreviewPartComponent";
import { TemplateLanguages } from "@/components/general/templatelanguage";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  RefreshCcw
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useSyncTemplate } from "@/modules/dashboard/template/hooks/useSyncTemplate";

// Custom filter function for multi-column searching
const multiColumnFilterFn = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.templateName}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm);
}

const statusFilterFn = (
  row,
  columnId,
  filterValue
) => {
  if (!filterValue?.length) return true
  const status = row?.getValue(columnId)
  return filterValue.includes(status);
}

const getFormattedDate = (isoDate) =>{ 
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
}

export default function TemplateComponent({companyID}) {
  const [data, setData] = useState([]);
  const visitedPagesRef = useRef(new Set());
  const totalTemplatesRef = useRef(0);
  const [deletedTemplate, setDeletedTemplate] = useState('');
  const [syncTemplate, setSyncTemplate] = useState('');
  const { allTemplates, totalTemplates, loadingTemplates, templateError, fetchTemplates, cancelTemplatesOperation } = useFetchTemplates();
  const { deleteResponse, isDeleteLoading, deleteError, handleDelete, cancelDelete } = useDeleteTemplate();
  const { syncResponse, isSyncLoading, syncError, handleSync, cancelSync } = useSyncTemplate();
  const id = useId();
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
      id: "templateName",
      desc: false,
    },
  ]);
  const getLanguageLabel = (value) => {
    const match = TemplateLanguages.find(lang => lang.value === value);
    return match ? match.label : 'Unknown';
  }

  useEffect(() => {
    const fetch = async () => {
      const currentIndex = pagination.pageIndex;

      if (companyID && !visitedPagesRef.current.has(currentIndex) && (!totalTemplatesRef.current || data.length < totalTemplatesRef.current)) {
        await fetchTemplates({
          companyID,
          index: currentIndex,
          limit: pagination.pageSize,
          fields: "templateName,components,category,language,createdAt",
        });
        visitedPagesRef.current.add(currentIndex);
      }
    };
    fetch();
  }, [pagination.pageIndex, pagination.pageSize, companyID]);


  useEffect(() => {
    if(templateError){
      toast.error(templateError);
    }
  }, [templateError]);

  useEffect(() => {
    if (deleteResponse?.message === "template deleted successfully") {
      toast.success(`Template ${deletedTemplate} Deleted Successfully`);
      const updatedData = data.filter((item) => item.templateName !== deletedTemplate);
      setData(updatedData);
      totalTemplatesRef.current = totalTemplatesRef.current - 1;
      setDeletedTemplate('');
    } else if(deleteError){
      toast.error(deleteError);
      setDeletedTemplate('');
    }
  },[deleteResponse,deleteError]);

  useEffect(() => {
    if (allTemplates) {
      setData((prev) => [...prev, ...allTemplates]);
      if(!totalTemplatesRef.current)totalTemplatesRef.current = totalTemplates;
    }
  }, [allTemplates]);

  useEffect(() => {
    if (syncResponse?.message === "Templates updated successfully") {
      toast.success(`Template ${syncTemplate} Updated Successfully`);

      const updatedData = data?.map((item) => {
        if (item.templateName === syncTemplate) {
          return syncResponse.templates[0]; 
        }
        return item; 
      });

      setData(updatedData); 
      setSyncTemplate('');
    } else if (syncError) {
      toast.error(syncError);
      setSyncTemplate('');
    }
  }, [syncResponse, syncError]);


  const decodeComponents = (components) => {
    const headerObj = components?.find((item)=> item.type==="HEADER");
    const bodyObj = components?.find((item)=> item.type==="BODY");
    const footerObj = components?.find((item)=> item.type==="FOOTER");
    const buttonsObj = components?.find((item)=> item.type==="BUTTONS") || [];
    const headerType = headerObj?.format === "TEXT" ? "Text" : "Media";
    const mediaType = headerObj?.format === "IMAGE" ? "Image" : headerObj?.format === "VIDEO" ? "Video" : headerObj?.format === "DOCUMENT" ? "Document" : headerObj?.format === "LOCATION" ? "Location" : "";
    const headerPart = headerObj?.text || "";
    const bodyPart = bodyObj?.text || "";
    const footerPart = footerObj?.text || "";
    const buttons = buttonsObj?.buttons || [];
    const bodyVariableValues = bodyObj?.example?.body_text || [];
    const headerVariableValues = headerObj?.example?.header_text || [];
    const headerHandle = headerObj?.example?.header_handle || [];
    let ctaItems = [];
    let replyItems = [];
    buttons.forEach(item => {
      if(item.type === "PHONE_NUMBER"){
        ctaItems.push({
          ctaType: 'PHONE',
          label: item.text
        });
      } else if(item.type === "URL"){
        ctaItems.push({
          ctaType: 'URL',
          label: item.text
        });
      } else {
        replyItems.push(item.text);
      }
    });

    return {headerType, mediaType, headerPart, bodyPart, footerPart, ctaItems, replyItems, bodyVariableValues, headerVariableValues, headerHandle}

  } 


  const handleDeleteRows = async(templateName) => {
    try{
      setDeletedTemplate(templateName);
      await handleDelete({
        companyID,
        templateName
      });
    } catch (error) {
      console.error('Create Template Hook Error:', error);
    } 
  }

  const handleSyncRows = async(templateName) => {
    try{
      setSyncTemplate(templateName);
      await handleSync({
        companyID,
        templateName
      });
    } catch (error) {
      console.error('Create Template Hook Error:', error);
    } 
  }


  const columns = [
  {
    header: "Template Name",
    accessorKey: "templateName",
    id:"templateName",
    cell: ({ row }) => (
      <div className="font-medium">{row?.getValue("templateName")}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Category",
    accessorKey: "category"
  },
  {
    header: "Language",
    accessorKey: "language",
    cell: ({ row }) => (
      <div className="font-medium">{getLanguageLabel(row?.getValue("language"))}</div>
    )
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        className={cn(row?.getValue("status") === "PENDING" ?
          "bg-muted-foreground/60 text-primary-foreground" :
          row?.getValue("status") === "APPROVED" ? 
          "bg-green-100 text-green-800" :
          "bg-red-100 text-red-800")}>
        {row?.getValue("status")}
      </Badge>
    ),
    size: 100,
    filterFn: statusFilterFn,
  },
  {
    header: "Created On",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="font-medium">{getFormattedDate(row?.getValue("createdAt"))}</div>
    ),
    
  },
  {
    header: "",
    id: "delete",
    cell: ({ row }) => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button disabled={row?.getValue("templateName") === deletedTemplate} className="ml-auto flex items-center gap-1">
            {row?.getValue("templateName") === deletedTemplate ?
            <span className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
            :(<><TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            Delete</>)}
          </button>
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
                This action cannot be undone. This template will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteRows(row?.getValue("templateName"))}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    
  },
  {
    header: "",
    id: "sync",
    accessorKey: "templateName",
    cell: ({ row }) => (
      <button 
        disabled={row?.getValue("templateName") === syncTemplate} 
        onClick={()=>handleSyncRows(row?.getValue("templateName"))}
        className="ml-auto flex items-center gap-1">
            {row?.getValue("templateName") === syncTemplate ?
            <span className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
            :(<><RefreshCcw className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            Sync</>)}
          </button>
    ),
    
  },
  {
    header:"",
    id:"components",
    accessorKey:"components",
    cell: ({ row }) => (
      <AlertDialog>
        <AlertDialogTrigger>
          <button className="ml-auto flex items-center gap-1">
            <EyeIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            View
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-md w-full">
          <div className="flex flex-col gap-1 max-sm:items-center sm:flex-row sm:gap-1">
              <div className="p-3">
              <AlertDialogTitle className='pb-2'>Template Preview</AlertDialogTitle>
                <PreviewPartComponent 
                  {...decodeComponents(row?.getValue("components"))}
                  />
                  </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    
  },
]

  const dynamicPageCount =
  data.length < totalTemplatesRef.current
    ? Math.ceil(totalTemplatesRef.current / pagination.pageSize)
    : undefined;


  const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onSortingChange: setSorting,
  onPaginationChange: setPagination,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  pageCount: dynamicPageCount,
  manualPagination: data.length <= totalTemplatesRef.current,
  state: {
    sorting,
    pagination,
    columnFilters,
    columnVisibility,
  },
});


  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table?.getColumn("status")
    if (!statusColumn) return new Map();
    return statusColumn?.getFacetedUniqueValues();
  }, [table?.getColumn("status")?.getFacetedUniqueValues()])

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    if(table?.getColumn("status")){
      const statusColumn = table?.getColumn("status")
      if (!statusColumn) return [];
      const values = Array.from(statusColumn?.getFacetedUniqueValues?.().keys())
      return values.sort();
    }
  }, [table?.getColumn("status")?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table?.getColumn("status")?.getFilterValue()
    return filterValue ?? []
  }, [table?.getColumn("status")?.getFilterValue()])

  const handleStatusChange = (checked, value) => {
    const filterValue = table?.getColumn("status")?.getFilterValue()
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table?.getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
    setPagination({pageIndex: 0, pageSize: 10});
  }

  return (
    <>
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Manage Templates</h2>
        <div className="flex items-center gap-3">
          {/* Filter by name */}
          <div className="relative">
            <input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 border border-gray-300 rounded-lg py-2 text-sm focus:border-emerald-600 ",
                Boolean(table?.getColumn("templateName")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table?.getColumn("templateName")?.getFilterValue() ?? "")
              }
              onChange={(e) => {table?.getColumn("templateName")?.setFilterValue(e.target.value); setPagination({pageIndex: 0, pageSize: 10});}}
              placeholder="Filter by name..."
              type="text"
              aria-label="Filter by name" />
            <div
              className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
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
                        onCheckedChange={(checked) =>
                          handleStatusChange(checked, value)
                        } />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal">
                        {value}{" "}
                        <span className="text-muted-foreground ms-2 text-xs">
                          {statusCounts?.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Add template button */}
          <button onClick={() => router.push('/dashboard/templates/create')} className="ml-auto cursor-pointer py-2 px-4 rounded-lg border border-emerald-600 font-medium text-sm flex items-center gap-x-2 text-white bg-emerald-600"><PlusIcon size={16} aria-hidden="true" /><span className="-mt-px">Create Template</span></button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white shadow-sm border-gray-300 overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header?.getSize()}px` }}
                      className="h-11">
                      {header.isPlaceholder ? null : header.column?.getCanSort() ? (
                        <div
                          className={cn(header.column?.getCanSort() && "flex h-full cursor-pointer items-center justify-between gap-2 select-none")}
                          onClick={header.column?.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column?.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column?.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column?.getCanSort() ? 0 : undefined}>
                          {flexRender(header.column.columnDef.header, header?.getContext())}
                          {{
                            asc: (
                              <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />
                            ),
                            desc: (
                              <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />
                            ),
                          }[header.column?.getIsSorted()] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header?.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loadingTemplates && table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row,index) => (index < ((pagination.pageIndex + 1) * pagination.pageSize) && index >= (pagination.pageIndex * pagination.pageSize)) && 
                (<TableRow
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {row?.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-3 px-3 text-sm text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell?.getContext())}
                    </TableCell>
                  ))}
                </TableRow>)
              )
            ) : !loadingTemplates ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  <span className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-transparent inline-block"></span>
                  Loading...
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
            value={table?.getState().pagination.pageSize.toString()}
            >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent
              className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[10].map((pageSize) => (
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
              {table?.getState().pagination.pageIndex *
                table?.getState().pagination.pageSize +
                1}
              -
              {Math.min(Math.max(table?.getState().pagination.pageIndex *
                table?.getState().pagination.pageSize +
                table?.getState().pagination.pageSize, 0), table?.getRowCount())}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table?.getRowCount()?.toString()}
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
                  disabled={!table?.getCanPreviousPage()}
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
                  disabled={!table?.getCanPreviousPage()}
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
                  disabled={!table?.getCanNextPage()}
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
                  disabled={!table?.getCanNextPage() || visitedPagesRef.current.size < table.getPageCount()}
                  aria-label="Go to last page">
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
    </>
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
