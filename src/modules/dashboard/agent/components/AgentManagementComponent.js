import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import Image from "next/image"

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "@alexthompson",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "4",
    name: "Maria Garcia",
    username: "@mariagarcia",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Active",
    balance: "$0.00",
  },
  {
    id: "5",
    name: "David Kim",
    username: "@davidkim",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
    email: "d.kim@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "-$1,000.00",
  },
]

export default function AgentManagementComponent() {
  return (
    <div className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-md rounded-xl mt-4 p-2">
      <Table>
        <TableHeader className={'rounded-t-xl'}>
          <TableRow className="hover:bg-transparent">
            <TableHead className={'h-10'}>Name</TableHead>
            <TableHead className={'h-10'}>Email</TableHead>
            <TableHead className={'h-10'}>Location</TableHead>
            <TableHead className={'h-10'}>Status</TableHead>
            <TableHead className={'h-10 text-right'}>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image className="rounded-full size-10" src={'/images/blog.png'} width={40} height={40} alt={item.name}/>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <span className="text-muted-foreground mt-0.5 text-xs">{item.username}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">{item.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
