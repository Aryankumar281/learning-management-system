"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [googlePending, startGoogleTransition] = useTransition();
  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signing with Google");
          },
          onError: (e) => {
            toast.error("Internal Server Error!");
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Login with your Github or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={googlePending}
          onClick={signInWithGoogle}
          className="w-full"
          variant={"outline"}
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FcGoogle />
              Sign in with Google
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or Continue with
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="rishuraj@example.com"/>
          </div>

          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
