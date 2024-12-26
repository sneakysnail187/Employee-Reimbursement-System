import { useAuth } from "@/features/auth/hooks/use-auth";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: auth } = useAuth();
  const router = useRouter();

  console.log(auth);

  useEffect(() => {
    if (auth) {
      router.navigate({ to: "/dashboard" });
    }
  }, [auth]);

  return null;
}
