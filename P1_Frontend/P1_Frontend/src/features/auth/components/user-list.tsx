import { useUserList } from "../hooks/use-user-list";
import { useDelete } from "../hooks/use-delete";
import { useRole } from "../hooks/use-role";
import RoleSelect from "./role-select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function UserList() {
    const { data: users } = useUserList();
    const deleteFn  = useDelete();
    const { mutateAsync: roleFn } = useRole();

    const deleteUser = async (id: number) => {
        deleteFn.mutate(id);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead className="w-[100px]">Role</TableHead>
                    <TableHead className="w-[100px]">Full Name</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.userId}>
                        <TableCell className="font-medium">{user.userId}</TableCell>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="font-medium">
                            <RoleSelect initialValue={user.role} onChange={(value) => roleFn({ userId: user.userId })} />
                        </TableCell>
                        <TableCell className="font-medium">{user.fullName}</TableCell>
                        <TableCell className="flex gap-3">
                            <Button onClick={() => deleteUser(user.userId)}
                             disabled ={deleteFn.status === "pending"}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
        