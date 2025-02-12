
# Employee Reimbursement System  

A reimbursement system in which employee users can request reimbursements for expenses and manager users can approve or deny the reimbursement tickets as well as remove and edit the roles of other users.

# Base User Stories

1. Users can register a new employee account 
2. Users can login to their account with their credentials

# Employee User Stories

1. Employees can create a ticket requesting reimbursement. The ticket input data includes:
- Project
- Description
- Amount
When viewed by the employee, the ticket includes:
- Ticket ID
- Amount
- Project
- Description
- Status
- Datetime Submitted
When viewed by a manager the ticket additionally includes the username of the original poster

2. Employees can edit the description and amount requested of tickets they've created
3. Employees can view all the tickets they've submitted

# Manager User Stories

1. Managers can view all tickets that have been submitted and change their status from "Pending" to either "Denied" or "Approved"
2. Managers can view a list of all users that displays:
- User ID
- Username
- Role
- Full Name
3. Managers can change a user's role from Employee to Manager and vice versa
4. Managers can delete a user which will also delete all of their submitted tickets

# ERD