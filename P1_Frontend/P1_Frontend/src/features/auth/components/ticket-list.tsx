import{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTicketList } from "../hooks/use-ticket-list";

export function TicketList() {
    const { data } = useTicketList();
//add date/time of submission and project name,  maybe date of approval
    return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[100px]">Amount</TableHead>
                        <TableHead className="w-[100px]">Project</TableHead>
                        <TableHead className="w-[100px]">Description</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Date Posted</TableHead>
                    </TableRow>
                </TableHeader>
                {data?.length === 0 ? ("No tickets found") : (
                <TableBody>
                    {Array.isArray(data) && data.map((ticket) => (
                        <TableRow key={ticket.reimbursementId}>
                            <TableCell className="font-medium">{ticket.reimbursementId}</TableCell>
                            <TableCell className="font-medium">{ticket.amount}</TableCell>
                            <TableCell className="font-medium">{ticket.project}</TableCell>
                            <TableCell className="font-medium">{ticket.description}</TableCell>
                            <TableCell className="font-medium">{ticket.status}</TableCell>
                            <TableCell className="font-medium">{ticket.date}</TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
                )}
            </Table>  
    );
}

export default TicketList;