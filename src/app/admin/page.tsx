"use client";

import Position from "@/components/position";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="max-w-5xl mx-auto py-12">
      <Link href="/" className="mb-6 hover:underline">
        Back
      </Link>
      <h1 className="mb-6">Admin Page</h1>
      <div className="mt-10">
        <Position />
      </div>
    </main>
  );
}
