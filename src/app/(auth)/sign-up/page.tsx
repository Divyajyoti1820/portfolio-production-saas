"use client";
"use client";

import { useState } from "react";
import Link from "next/link";

import { signIn } from "next-auth/react";

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

import { AlertTriangleIcon, ArrowRightIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  /* Credentials Sign-in Handler  */
  const credentialSignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError("Password do not match");
    }
  };
  /* Credentials Sign-in Handler  */

  /* Provider Sign-in Handler */
  const providerSignUpHandler = () => {
    signIn("github");
  };
  /* Provider Sign-in Handler */

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Us</CardTitle>
        <CardDescription>
          To start the journey to be productive join us.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="space-y-3"
          onSubmit={(e) => credentialSignUpHandler(e)}
        >
          <Input
            type="name"
            disabled={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            autoFocus
            className="outline-none ring-offset-0 focus:ring-offset-0"
          />
          <Input
            type="email"
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoFocus
            className="outline-none ring-offset-0 focus:ring-offset-0"
          />
          <Input
            type="password"
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
          />
          <Input
            type="password"
            disabled={false}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            autoFocus
          />
          {!!error && (
            <div className="w-full flex gap-x-3 items-center justify-center bg-destructive/70 h-9 rounded-sm">
              <AlertTriangleIcon className="size-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <Button
            type="submit"
            disabled={false}
            className="w-full flex items-center gap-x-2"
          >
            Join Us <ArrowRightIcon className="size-4" />
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col items-center justify-center">
          <Button
            disabled={false}
            onClick={providerSignUpHandler}
            size="lg"
            variant="outline"
            className="relative w-full flex items-center justify-center"
          >
            <FaGithub className="size-5 absolute left-2.5 top-3" />
            <span>Continue with GitHub</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground flex gap-x-1 items-center justify-center">
        <p>Don&apos;t have an account?</p>
        <Link
          href="/sign-up"
          className="font-semibold text-primary hover:underline"
        >
          Join Us
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
