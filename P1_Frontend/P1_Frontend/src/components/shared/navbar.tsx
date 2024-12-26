import { UserDropdown } from "@/features/auth/components/user-dropdown";

export function Navbar() {
  return (
    <nav className="border-b h-[65px] flex items-center shadow-xl">
      <div className="max-w-2xl mx-auto w-11/12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employee Reimbursement System</h1>
        </div>

        <div>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
