import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type AccessToken = string;
type RefreshToken = string;
type Company = {
  company_uuid: string;
};
type CompanyAdmin = {
  company_admin_uuid: string;
  email: string;
};

declare module "next-auth/jwt" {
  interface JWT {
    access_token: AccessToken;
    refresh_token: RefreshToken;
    company: Company;
    company_admin: CompanyAdmin;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      access_token: AccessToken;
      refresh_token: RefreshToken;
      company: Company;
      company_admin: CompanyAdmin;
    };
  }
}
