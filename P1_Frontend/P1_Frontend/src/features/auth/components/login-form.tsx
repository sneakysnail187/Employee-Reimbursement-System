import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, LoginSchema } from "../schema/login-schema";
import { useLogin } from "../hooks/use-login";

/**
 * Component for logging in.
 * 
 * This component renders a form with fields for the user's username and password.
 * It utilizes the Tanstack React Query `useLogin` hook to make a POST request to the "/auth/login" endpoint.
 * If the submission is successful, the user is logged in and the form is reset.
 * If the submission fails, the error message is displayed below the submit button.
 * 
 * @returns The react component for logging in.
 */
export function LoginForm() {
  const { mutate: login, isPending } = useLogin();


  // 1. Define your form.
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    login(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="username" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
