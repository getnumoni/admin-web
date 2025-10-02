import ActivityLogs from "@/components/admin/activity-logs"
import { Metadata } from "next"



export const metadata: Metadata = {
  title: "Activity Logs",
  description: "Activity Logs",
}


export default function Page() {
  return <ActivityLogs />
}