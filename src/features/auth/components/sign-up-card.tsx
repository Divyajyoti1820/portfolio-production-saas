"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa6";
import { AlertTriangleIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserCreate } from "../api/use-user-create";

export const SignUpCard = () => {
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const error = params.get("error");

  /* Credentials Sign-Up  */
  const mutation = useUserCreate();
  const CredentialsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", {
            name,
            email,
            password,
            redirectTo: "/",
          });
        },
      }
    );
  };
  /* Credentials Sign-Up  */

  /* OAuth Sign-up */
  const OAuthHandler = () => {
    signIn("github", { redirectTo: "/" });
  };
  /* OAuth Sign-up */

  return (
    <Card>
      <CardHeader className="gap-y-2">
        <CardTitle>Join Us</CardTitle>
        <CardDescription>
          To start your productive journey use credentials or other service.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {!!error && (
          <div className="h-5 flex items-center justify-center gap-x-2 py-5 bg-destructive rounded-lg text-sm">
            <AlertTriangleIcon className="size-5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={CredentialsHandler} className="space-y-3">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            autoFocus
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={false}
            required
            autoFocus
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={false}
            required
            autoFocus
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={false}
            required
            autoFocus
          />

          <Button type="submit" disabled={false} className="w-full" size="sm">
            Join Us
          </Button>
        </form>
        <Separator />
        <div className="flex items-center justify-center">
          <Button
            onClick={OAuthHandler}
            size="lg"
            variant="outline"
            disabled={false}
            className="relative w-full"
          >
            <FaGithub className="size-5 absolute top-2.5 left-3" />
            <p>Continue with GitHub</p>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-xs">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
