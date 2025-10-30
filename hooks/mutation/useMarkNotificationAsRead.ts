import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();


  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (notificationId: string) => api.put(`/admin/mark-as-read/${notificationId}`),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Notification marked as read successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to mark notification as read");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const handleMarkNotificationAsRead = (notificationId: string) => {
    mutate(notificationId);
  };

  return { handleMarkNotificationAsRead, isPending, isSuccess };
};