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

/**
 * Component for displaying the list of all tickets in the system.
 * 
 * This component fetches all ticket data using the `useAllTicketList` hook
 * and renders it in a table format. Each ticket displays its ID, username,
 * amount, project, description, status, and the date it was posted.
 * 
 * If no tickets are found, it displays a message indicating no tickets are available.
 * 
 * The status of each ticket can be updated by selecting a new status from the dropdown menu.
 * 
 * @returns {JSX.Element} The react component for displaying the all ticket list.
 */
export function AllTicketList() {
    const { data: dataFromHook } = useAllTicketList();
    const statusFn = useStatus();
    const data = dataFromHook?.map((ticket) => ({
        ...ticket,
        submitted: ticket.submitted ? new Date(ticket.submitted).toLocaleString() : undefined,
    }));

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Username</TableHead>
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
                        <TableCell className="font-medium">{ticket.username}</TableCell>
                        <TableCell className="font-medium">{ticket.amount}</TableCell>
                        <TableCell className="font-medium">{ticket.project}</TableCell>
                        <TableCell className="font-medium">{ticket.description}</TableCell>
                        <TableCell className="font-medium">
                            <StatusSelect initialValue={ticket.status} onChange={(value) => {
                                statusFn.mutate({ reimbId: ticket.reimbursementId, status: value });
                                ticket.status = value;
                            }} />
                        </TableCell>
                        <TableCell className="font-medium">{ticket.submitted}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            )}
        </Table>
    );
}

export default AllTicketList;