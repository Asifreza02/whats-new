'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Sign In</Button>
        </form>

        <div className="text-center text-sm text-gray-500">OR</div>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
