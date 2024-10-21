"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

import { AlertTriangleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const SignInCard = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const error = params.get("error");

  const OAuthHandler = () => {
    signIn("github", { redirectTo: "/" });
  };

  const credentialHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/",
    });
  };

  return (
    <Card className="max-w-[450px] w-[460px] h-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription className="text-sm">
          To continue to your productive boards use credential or provider.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!!error && (
          <div className="bg-destructive/80 w-full p-2 rounded-md flex gap-x-2 text-sm items-center justify-center">
            <AlertTriangleIcon className="size-5" />
            <p>{error || "Something went wrong!!"}</p>
          </div>
        )}
        <div className="w-full flex flex-col bg-black items-center justify-center p-2 rounded-xl text-[12px]">
          <p>
            <span className="text-primary font-semibold">Test Username</span> :
            test.user@testmail.com
          </p>
          <p>
            <span className="text-primary font-semibold">Test Password</span> :
            Test@1234TE
          </p>
        </div>
        <form className="space-y-2" onSubmit={credentialHandler}>
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
          <Button className="w-full" size="sm" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <Button
          disabled={false}
          onClick={OAuthHandler}
          className="relative w-full bg-black"
        >
          <FaGithub className="absolute size-8 top-3 left-2" />
          <p className="font-medium">Continue with GitHub</p>
        </Button>
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/sign-up")}
            className="text-blue-500 font-semibold hover:underline cursor-pointer transition"
          >
            Join Us
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};
