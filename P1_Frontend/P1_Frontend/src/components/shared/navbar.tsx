import { UserDropdown } from "@/features/auth/components/user-dropdown";

/**
 * Navbar component for the Employee Reimbursement System.
 *
 * This component renders the top navigation bar with a title
 * and a user dropdown. It is styled with a bottom border,
 * shadow, and is horizontally centered with a maximum width.
 * The navbar consists of a title on the left and a user dropdown
 * on the right.
 */

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
