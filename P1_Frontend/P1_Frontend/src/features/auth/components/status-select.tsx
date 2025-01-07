import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface StatusSelectProps {
    initialValue: string,
    onChange?: (value: string) => void
}

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