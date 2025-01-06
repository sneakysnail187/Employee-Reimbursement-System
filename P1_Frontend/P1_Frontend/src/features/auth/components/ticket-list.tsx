import{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useTicketList } from "../hooks/use-ticket-list";
import { UseQueryResult } from "@tanstack/react-query";

interface Ticket {
    reimbursementId: number;
    description: string;
    amount: number;
    status: string;
}

interface TicketListResponse {
    data: Ticket[];  // The `data` property contains an array of `Ticket` objects
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

export function TicketList() {
    const data = useTicketList() as UseQueryResult<any>;
    const tickets = Array.isArray(data?.data) ? data.data : [];

    console.log("Tickets received:", tickets);
    console.log("Is tickets an array?", Array.isArray(tickets));

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
            {tickets?.length === 0 ? ("No tickets found") : (
            <TableBody>
                {tickets.map((ticket) => (
                    <TableRow key={ticket.reimbId}>
                        <TableCell className="font-medium">{ticket.reimbursmentId}</TableCell>
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