import Notification from "@/components/admin/notification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification",
  description: "Notification",
};

export default function Page() {
  return <Notification />;
}