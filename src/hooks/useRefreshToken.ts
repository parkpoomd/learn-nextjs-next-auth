import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/request-access-token", {
      refresh_token: session?.user.refresh_token,
    });

    console.log("refresh token");

    if (session) session.user.access_token = res.data.access_token;
  };

  return refreshToken;
};
