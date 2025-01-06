import{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useTicketList } from "../hooks/use-ticket-list";

export function TicketList() {
    const { data } = useTicketList();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Amount</TableHead>
                    <TableHead className="w-[100px]">Description</TableHead>
                    <TableHead className="w-[100px]">Author</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                </TableRow>
            </TableHeader>
            {data?.length === 0 ? ("No tickets found") : (
            <TableBody>
                {data?.map((ticket) => (
                    <TableRow key={ticket.reimbId}>
                        <TableCell className="font-medium">{ticket.reimbId}</TableCell>
                        <TableCell className="font-medium">{ticket.amount}</TableCell>
                        <TableCell className="font-medium">{ticket.description}</TableCell>
                        <TableCell className="font-medium">{ticket.user.username}</TableCell>
                        <TableCell className="font-medium">{ticket.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            )} 
        </Table>
    );
}

export default TicketList;