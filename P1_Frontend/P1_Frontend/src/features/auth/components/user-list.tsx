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

export function UserList() {
    const { data: users } = useUserList();
    const { mutateAsync: deleteFn } = useDelete();
    const { mutateAsync: roleFn } = useRole();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[100px]">Username</TableHead>
                    <TableHead className="w-[100px]">Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user) => (
                    <TableRow key={user.userId}>
                        <TableCell className="font-medium">{user.userId}</TableCell>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="font-medium">{user.roleName}
                            <RoleSelect initialValue={user.roleName} onChange={(value) => roleFn({ userId: user.userId })} />
                        </TableCell>
                        <TableCell className="flex gap-3">
                            <button onClick={() => deleteFn(user.userId)}>Delete</button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
        