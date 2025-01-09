import{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTicketList } from "../hooks/use-ticket-list";
import { useState } from "react";
import { EditForm } from "./edit-form";
import { Button } from "@/components/ui/button";

export function TicketList() {
    const { data } = useTicketList();
    const [open, setOpen] = useState(false)

    return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[100px]">Amount</TableHead>
                        <TableHead className="w-[100px]">Description</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {data?.length === 0 ? ("No tickets found") : (
                <TableBody>
                    {Array.isArray(data) && data.map((ticket) => (
                        <TableRow key={ticket.reimbursementId}>
                            <TableCell className="font-medium">{ticket.reimbursementId}</TableCell>
                            <TableCell className="font-medium">{ticket.amount}</TableCell>
                            <TableCell className="font-medium">{ticket.description}</TableCell>
                            <TableCell className="font-medium">{ticket.status}</TableCell>
                            <TableCell className="font-medium">
                            <Button className="font-medium" onClick={() => setOpen(true)}>
                                Edit
                            </Button>
                            <EditForm open={open} setOpen={setOpen} data={ticket}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                )}
            </Table>  
    );
}

export default TicketList;