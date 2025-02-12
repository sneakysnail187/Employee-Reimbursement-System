import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface RoleSelectProps {
    initialValue: string,
    onChange?: (value: string) => void
}

/**
 * Component for selecting a role from a dropdown menu.
 *
 * This component provides a select input with options for "Employee" and "Manager" roles.
 * It uses the `Select` component from the UI library and triggers the `onChange` callback when a new role is selected.
 *
 * @param {string} initialValue - The initial value of the select input.
 * @param {(value: string) => void} [onChange] - Optional callback function that is called when the selected value changes.
 * 
 * @returns {JSX.Element} The react component for selecting a role.
 */

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