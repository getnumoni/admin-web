import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormMultiSelect } from "@/components/ui/form-multi-select";
import { FormTextareaTopLabel } from "@/components/ui/form-textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateSupportTicketProps {
  onBack: () => void;
}

const supportTicketSchema = z.object({
  userType: z.string().min(1, "User type is required"),
  name: z.string().min(1, "Name is required"),
  ticketType: z.string().min(1, "Ticket type is required"),
  department: z.string().min(1, "Department is required"),
  priority: z.string().min(1, "Priority is required"),
  assignTo: z.string().min(1, "Assign to is required"),
  ticketTitle: z.string().min(1, "Ticket title is required"),
  issueDescription: z.string().min(1, "Issue description is required"),
});

type SupportTicketFormData = z.infer<typeof supportTicketSchema>;

const ticketTypeOptions = [
  { value: "discount", label: "Discount" },
  { value: "technical", label: "Technical" },
  { value: "billing", label: "Billing" },
  { value: "general", label: "General" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const departmentOptions = [
  { value: "support", label: "Support" },
  { value: "technical", label: "Technical" },
  { value: "billing", label: "Billing" },
  { value: "sales", label: "Sales" },
];

export default function CreateSupportTicket({ onBack }: CreateSupportTicketProps) {
  const form = useForm<SupportTicketFormData>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      userType: "",
      name: "",
      ticketType: "",
      department: "",
      priority: "",
      assignTo: "",
      ticketTitle: "",
      issueDescription: "",
    },
  });

  const onSubmit = (data: SupportTicketFormData) => {
    console.log("Support ticket data:", data);
    // TODO: Implement save functionality
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Ticket</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Main Form Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInputTopLabel
                  control={form.control}
                  name="userType"
                  label="User Type"
                  placeholder="E.g 10% off all purchase"
                  required
                />

                <FormMultiSelect
                  control={form.control}
                  name="name"
                  label="Name"
                  options={[]}
                  placeholder="Choose brands/merchants"
                  searchPlaceholder="Search merchants..."
                  emptyMessage="No merchants found."
                />

                <FormMultiSelect
                  control={form.control}
                  name="ticketType"
                  label="Ticket Type"
                  options={ticketTypeOptions}
                  placeholder="Choose ticket type"
                  searchPlaceholder="Search types..."
                  emptyMessage="No types found."
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInputTopLabel
                  control={form.control}
                  name="department"
                  label="Department"
                  placeholder="#400000"
                  required
                />

                <FormMultiSelect
                  control={form.control}
                  name="priority"
                  label="Priority"
                  options={priorityOptions}
                  placeholder="Choose priority"
                  searchPlaceholder="Search priority..."
                  emptyMessage="No priority found."
                />

                <FormInputTopLabel
                  control={form.control}
                  name="assignTo"
                  label="Assign To"
                  placeholder="#400000"
                  required
                />
              </div>

              {/* Row 3 */}
              <div>
                <FormInputTopLabel
                  control={form.control}
                  name="ticketTitle"
                  label="Ticket Title"
                  placeholder="Ticket Title"
                  required
                />
              </div>

              {/* Row 4 */}
              <div>
                <FormTextareaTopLabel
                  control={form.control}
                  name="issueDescription"
                  label="Issue Description"
                  placeholder="Detailed Description of the issue"
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Add Images Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Images</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                <span className="text-theme-dark-green font-medium">Upload</span> or{" "}
                <span className="text-theme-dark-green font-medium">Drag and drop</span> or{" "}
                <span className="text-theme-dark-green font-medium">click</span> to browse your device
              </p>
              <p className="text-sm text-gray-500">JPG or PNG Supported format. Max file size is 3mb</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-theme-dark-green text-white px-6"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}