import SignInPage from "@/components/auth/sign-in-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In",
};

export default function Page() {
  return <SignInPage />;
}