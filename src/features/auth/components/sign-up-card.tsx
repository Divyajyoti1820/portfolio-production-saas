import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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
import { toast } from "sonner";

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

  /* OAuth SignUp Handler */
  const OAuthSignUpHandler = () => {
    signIn("github", { redirectTo: "/" }).catch(() => {
      toast.error("Something went wrong");
    });
  };
  /* OAuth SignUp Handler */

  /* Credentials SignUp Handler */
  const CredentialsSignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords not same");
      return;
    }
    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", {
            email: email,
            password: password,
            redirectTo: "/",
          });
          toast.success("User Registered successfully");
        },
        onError: () => {
          toast.error(error || "Something went wrong");
        },
      }
    );
  };
  /* Credentials SignUp Handler */

  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Join Us</CardTitle>
        <CardDescription>
          To start your productive journey join us with credentials or provider.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-2 text-xs flex items-center justify-evenly rounded-sm bg-black">
          <p className="text-blue-500">
            To try the project go to login page and use test credentials.
          </p>
        </div>
        <form onSubmit={CredentialsSignUpHandler} className="space-y-2.5">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
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
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <Button type="submit" size="sm" className="w-full">
            Join Us
          </Button>
        </form>
        <Separator />
        <Button
          size="lg"
          onClick={OAuthSignUpHandler}
          variant="outline"
          className="w-full hover:bg-black"
        >
          <FaGithub className="size-5" />
          Join us with GitHub
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-blue-500 font-semibold hover:underline cursor-pointer transition"
            onClick={() => router.push("/sign-in")}
          >
            Login
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};
