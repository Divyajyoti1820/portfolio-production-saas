import { useState } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

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
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export const SignUpCard = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const error = params.get("error");

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
        {!!error && (
          <div className="w-full p-2 bg-destructive text-sm text-white ">
            <AlertTriangleIcon className="size-4" />
            <p>Something went wrong</p>
          </div>
        )}
        <form onSubmit={() => {}} className="space-y-2.5">
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
        <Button size="lg" variant="outline" className="w-full hover:bg-black">
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
