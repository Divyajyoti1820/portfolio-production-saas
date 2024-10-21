"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { signIn } from "next-auth/react";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { AlertTriangleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { useCreateUser } from "@/features/auth/api/use-create-user";

export const SignUpCard = () => {
  const params = useSearchParams();
  const router = useRouter();
  const mutation = useCreateUser();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const error = params.get("error");

  const OAuthHandler = () => {
    signIn("github", { redirectTo: "/" });
  };

  const CredentialHandler = () => {
    if (password !== confirmPassword) {
      return;
    }

    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", {
            name: name,
            email: email,
            password: password,
            redirectTo: "/",
          });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  return (
    <Card className="max-w-[450px] w-[460px] h-auto">
      <CardHeader>
        <CardTitle>Join Us</CardTitle>
        <CardDescription className="text-sm">
          To start your productive journey use credential or provider to join
          us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!!error && (
          <div className="bg-destructive/80 w-full p-2 rounded-md flex gap-x-2 text-sm items-center justify-center">
            <AlertTriangleIcon className="size-5" />
            <p>{error || "Something went wrong!!"}</p>
          </div>
        )}

        <form className="space-y-2" onSubmit={CredentialHandler}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={false}
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={false}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={false}
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            disabled={false}
          />
          <Button className="w-full" size="sm" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <Button
          disabled={false}
          onClick={OAuthHandler}
          className="relative w-full bg-black hover:bg-black/50"
        >
          <FaGithub className="absolute size-8 top-3 left-2" />
          <p className="font-medium">Continue with GitHub</p>
        </Button>
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-blue-500 font-semibold hover:underline cursor-pointer transition"
          >
            Login
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};
