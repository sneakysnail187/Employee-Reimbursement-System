import{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useStatus } from "../hooks/use-status";
import { useAllTicketList } from "../hooks/use-all-ticket-list";
import StatusSelect from "./status-select";

export function AllTicketList() {
    const { data } = useAllTicketList();
    const statusFn = useStatus();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead className="w-[100px]">Amount</TableHead>
                    <TableHead className="w-[100px]">Description</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                </TableRow>
            </TableHeader>
            {data?.length === 0 ? ("No tickets found") : (
            <TableBody>
                {Array.isArray(data) && data.map((ticket) => (
                    <TableRow key={ticket.reimbursementId}>
                        <TableCell className="font-medium">{ticket.reimbursementId}</TableCell>
                        <TableCell className="font-medium">{ticket.username}</TableCell>
                        <TableCell className="font-medium">{ticket.amount}</TableCell>
                        <TableCell className="font-medium">{ticket.description}</TableCell>
                        <TableCell className="font-medium">
                            <StatusSelect initialValue={ticket.status} onChange={(value) => {
                                statusFn.mutate({ reimbId: ticket.reimbursementId, status: value });
                                ticket.status = value;
                            }} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            )}
        </Table>
    );
}

export default AllTicketList;