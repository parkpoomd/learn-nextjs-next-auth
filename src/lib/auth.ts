import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "name@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const {
            data: { access_token },
          } = await axios.post(
            "/auth/login/software3rdparty",
            {
              app_id: "webmasterTime",
              secret: "webmasterTime",
              app_bundle_id: "",
              login_type_id: 1,
              timezone: "+07:00",
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { data: user } = await axios.post(
            "/auth/login/companyadmin",
            {
              email: credentials?.email,
              password: credentials?.password,
              login_type_id: 1,
              timezone: "+07:00",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          return user;
        } catch (error: any) {
          throw new Error(
            error?.response?.data?.message || "Something went wrong."
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user }) {
      // return { ...token, ...user };
      const tokenTransform = {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        company: token.company,
        company_admin: token.company_admin,
      };
      return { ...tokenTransform, ...user };
    },
  },
};
