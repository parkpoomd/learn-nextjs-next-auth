"use client";

import Position from "@/components/position";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="mb-6">This Is The Home Page! Everyone can see it.</h1>
      <Link href="/auth/login" className="border border-black px-4 py-2">
        Login
      </Link>
      <button
        type="button"
        onClick={() => signOut()}
        className="border border-black px-4 py-1.5 ml-6"
      >
        Logout
      </button>
      <Link href="/admin" className="border border-black px-4 py-2 ml-10">
        Admin
      </Link>
      <div className="mt-10">{JSON.stringify(session?.user, null, 2)}</div>
      <div className="mt-10">
        <Position />
      </div>
    </main>
  );
}
