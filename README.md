
# Employee Reimbursement System  

A reimbursement system in which employee users can request reimbursements for expenses and manager users can approve or deny the reimbursement tickets as well as remove and edit the roles of other users.

# Base User Stories

1. Users can register a new employee account 
2. Users can login to their account with their credentials
3. Users can logout after logging in

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

![image](https://github.com/user-attachments/assets/048a1a76-25ed-42bf-94c3-3a2106c8cac3)

# Tech Stack

## Back-end
The back-end is written in Java using Spring Boot alongside Lombok to handle boilerplate code, jBCrypt for password hashing, JWT tokens for authentication, and Jackson/Jakarta for databinding.

## Front-end
The front-end is primarily written in Typescript using the React library and Vite to build it for the node.js runtime environment. Tanstack Router and Tanstack Query are used for routing and data fetching respectively; alongside the Axios HTTP client. Jotai handles the global state management, Zod is used for schema declaration, and styling was done using components from Lucide and shadcn/ui customized using TailwindCSS.

## Database
The database is defined using PostgreSQL, schemas and versioning are handled by Flyway, and Spring Data JPA is used to connect it to the backend data access layer.

# Potential Improvements
Currently all elements of this project are hosted locally so the first thing to do would be hosting it somewhere. I've looked into AWS solutions for the database namely S3 and RDS as well as Jenkins to host the backend alongside Docker and possibly EC2 for frontend deployment.

















