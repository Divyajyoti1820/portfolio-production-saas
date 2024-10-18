"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// import { LoaderIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const SignUpCard = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  /* Credentials Form Handler */
  const credentialsFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  /* Credentials Form Handler */

  /* OAuth Provider Handler  */
  const OAuthProviderHandler = () => {};
  /* OAuth Provider Handler  */

  return (
    <Card className="max-w-[480px]  h-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Join Us</CardTitle>
        <CardDescription>
          To continue to your board use credentials or other service.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3.5">
        <form onSubmit={credentialsFormHandler} className="space-y-2.5">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            placeholder="Name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={false}
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={false}
            placeholder="Password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={false}
            placeholder="Confirm Password"
          />
          <Button disabled={false} className="w-full" type="submit">
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col items-center justify-center w-full">
          <Button
            variant="outline"
            className="relative w-full border-transparent hover:border-primary"
            size="lg"
            onClick={OAuthProviderHandler}
          >
            <FaGithub className="absolute left-3 top-3 size-8" />
            <p>Continue with GitHub</p>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-violet-500 font-semibold cursor-pointer hover:underline transition"
          >
            Login
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};
