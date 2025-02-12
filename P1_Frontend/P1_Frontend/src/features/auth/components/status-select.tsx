import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface StatusSelectProps {
    initialValue: string,
    onChange?: (value: string) => void
}

/**
 * Component for selecting a status from a dropdown menu.
 *
 * This component provides a select input with options for "Pending", "Approved", and "Denied" statuses. 
 * It uses the `Select` component from the UI library and triggers the `onChange` callback when a new status is selected.
 *
 * @param {string} initialValue - The initial value of the select input.
 * @param {(value: string) => void} [onChange] - Optional callback function that is called when the selected value changes.
 * 
 * @returns {JSX.Element} The react component for selecting a status.
 */

export function StatusSelect({initialValue, onChange}: StatusSelectProps) {
    return (
        <Select value={initialValue} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]" aria-label = "Select a Status">
                <SelectValue placeholder="Select a Status" /> 
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Denied">Denied</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default StatusSelect;