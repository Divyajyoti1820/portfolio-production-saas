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

export const SignInCard = () => {
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = params.get("errors");

  /* Credentials Sign-In */
  const CredentialsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  };
  /* Credentials Sign-In */

  /* OAuth Sign-in */
  const OAuthHandler = () => {
    signIn("github", { redirectTo: "/" });
  };
  /* OAuth Sign-in */

  return (
    <Card>
      <CardHeader className="gap-y-2">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          To continue your productive journey use credential or other service.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {!!error && (
          <div className="h-5 flex items-center justify-center gap-x-2 py-5 bg-destructive rounded-lg text-sm">
            <AlertTriangleIcon className="size-5" />
            <p>Something went wrong</p>
          </div>
        )}
        <div className="flex flex-col bg-black border py-3 gap-y-2 items-center justify-center text-sm rounded-md">
          <p>Test email : test.user@testmail.com</p>
          <p>Test password : Test@1234TE </p>
        </div>
        <form onSubmit={CredentialsHandler} className="space-y-3">
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

          <Button type="submit" disabled={false} className="w-full" size="sm">
            Continue
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
            href="/sign-up"
            className="font-semibold text-primary hover:underline"
          >
            Join Us
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
