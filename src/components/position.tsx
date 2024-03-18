"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "axios";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useRouter } from "next/navigation";

interface Position {
  position_uuid: string;
  position_code: string;
}

export default function Position() {
  const { data: session } = useSession();
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  async function fetchPositions() {
    setLoading(true);
    setError("");

    try {
      const { data } = await axiosAuth.get(
        `/company/${session?.user.company.company_uuid}/position`
      );

      setPositions(data.data);
    } catch (error: any) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message || "Something went wrong.");
      if (error.response?.data.status === 401) {
        router.push("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6">Position</h1>
      <button
        onClick={fetchPositions}
        type="button"
        className="border border-black px-4 py-2"
      >
        Fetch Position
      </button>
      {error ? <p className="text-red-600">{error}</p> : null}
      {loading ? (
        <div className="mt-6">Loading...</div>
      ) : (
        <ul className="mt-6">
          {positions.length ? (
            positions.map((position) => (
              <li key={position.position_uuid}>{position.position_code}</li>
            ))
          ) : (
            <li>No Data</li>
          )}
        </ul>
      )}
    </div>
  );
}
