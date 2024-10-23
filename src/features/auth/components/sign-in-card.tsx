"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { AlertTriangleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { signIn } from "next-auth/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const error = params.get("error");

  /* OAuth SignIn Handler */
  const OAuthSignInHandler = () => {
    signIn("github", { redirectTo: "/" });
  };
  /* OAuth SignIn Handler */

  /* Credentials SignIn Handler */
  const CredentialsSignInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/",
    });
  };
  /* Credentials SignIn Handler */

  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          To continue your productive journey use credentials or provider.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-2 text-xs flex items-center justify-evenly rounded-sm bg-black">
          <span className="flex flex-col items-center justify-center">
            <span className="text-blue-500">Test Username</span>
            test.user@testmail.com
          </span>
          <span className="flex flex-col items-center justify-center">
            <span className="text-blue-500">Test Password</span>
            Test@1234TE
          </span>
        </div>
        {!!error && (
          <div className="w-full flex items-center justify-center gap-x-2 p-2 bg-destructive text-sm text-white rounded-sm ">
            <AlertTriangleIcon className="size-4" />
            <p>Something went wrong</p>
          </div>
        )}
        <form onSubmit={CredentialsSignInHandler} className="space-y-2.5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" size="sm" className="w-full">
            Continue
          </Button>
        </form>
        <Separator />
        <Button
          size="lg"
          onClick={OAuthSignInHandler}
          variant="outline"
          className="w-full hover:bg-black"
        >
          <FaGithub className="size-5" />
          Continue with GitHub
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/sign-up")}
            className="text-blue-500 font-bold cursor-pointer hover:underline transition"
          >
            Join Us
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};
