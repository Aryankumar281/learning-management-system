"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UseSignOut() {
    const router = useRouter();
  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed Out successfully");
        },
        onError: () => {
          toast.error("failed to signed Out");
        },
      },
    });
  };
  return handleSignOut;
}
