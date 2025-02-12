import { TicketForm } from "./features/auth/components/ticket-form";
import { Toaster } from "./components/ui/toaster";
import { RegisterForm } from "./features/auth/components/register-form";
import { LoginForm } from "./features/auth/components/login-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <LoginForm />
            <RegisterForm />
        </QueryClientProvider>
    );
}

