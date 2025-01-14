import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface RoleSelectProps {
    initialValue: string,
    onChange?: (value: string) => void
}

export function RoleSelect({initialValue, onChange}: RoleSelectProps) {
    return (
        <Select value={initialValue} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={initialValue} /> 
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default RoleSelect;