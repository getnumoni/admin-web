import Admin from "@/components/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard - Overview of platform metrics and performance',
}

export default function Page() {
  return <Admin />;
}