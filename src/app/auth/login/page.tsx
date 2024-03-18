"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleLogin(e: any) {
    e.preventDefault();

    console.log(callbackUrl);

    signIn("credentials", {
      email,
      password,
      callbackUrl,
    });
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <Link href="/" className="mb-6 hover:underline">
        Back
      </Link>
      <h1 className="py-6">Login your account?</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <input
          className="border border-black px-4 py-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="border border-black px-4 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={handleLogin}
          type="submit"
          className="border border-black px-4 py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
