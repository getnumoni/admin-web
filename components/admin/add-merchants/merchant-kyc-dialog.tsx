"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormPdfUpload } from "@/components/ui/form-pdf-upload";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import { useCreateMerchantKyc } from "@/hooks/mutation/useCreateMerchantKyc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const identificationTypes = [
  { value: "CAC", label: "CAC" },
  { value: "TIN", label: "TIN" },
  { value: "NIN", label: "NIN" }
];

const createKycSchema = (existingKycData?: { menuPath?: string | null; reqCertificatePath?: string | null }) => z.object({
  identificationType: z.string().min(1, "Please select an identification type"),
  identificationTypeNumber: z.string().optional(),
  businessRegNo: z.string().min(1, "Business registration number is required"),
  cacDocumentPath: z.string().optional(),
  reqCertificatePath: existingKycData?.reqCertificatePath ? z.string().optional() : z.string().min(1, "Required certificate is required"),
  tinNo: z.string().optional(),
  tinPath: z.string().optional(),
  menuPath: existingKycData?.menuPath ? z.string().optional() : z.string().min(1, "Menu document is required"),
  verifiedNin: z.boolean(),
  verifiedTinNo: z.boolean(),
  verifiedCac: z.boolean(),
}).refine((data) => {
  // CAC validation
  if (data.identificationType === "CAC") {
    return data.identificationTypeNumber && data.cacDocumentPath;
  }
  // TIN validation
  if (data.identificationType === "TIN") {
    return data.tinNo && data.tinPath;
  }
  // NIN validation
  if (data.identificationType === "NIN") {
    return data.identificationTypeNumber;
  }
  return true;
}, {
  message: "Please fill in all required fields for the selected identification type",
  path: ["identificationType"]
});

type KycFormValues = z.infer<ReturnType<typeof createKycSchema>>;

interface MerchantKycDialogProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  businessName: string;
  existingKycData?: {
    menuPath?: string | null;
    reqCertificatePath?: string | null;
  };
}

export default function MerchantKycDialog({ isOpen, onClose, merchantId, businessName, existingKycData }: MerchantKycDialogProps) {
  // console.log('merchantId', merchantId);
  const { handleCreateMerchantKyc, isPending, isSuccess } = useCreateMerchantKyc(merchantId);

  const form = useForm<KycFormValues>({
    resolver: zodResolver(createKycSchema(existingKycData)),
    defaultValues: {
      identificationType: "",
      identificationTypeNumber: "",
      businessRegNo: "",
      cacDocumentPath: "",
      reqCertificatePath: "",
      tinNo: "",
      tinPath: "",
      menuPath: "",
      verifiedNin: false,
      verifiedTinNo: false,
      verifiedCac: false,
    },
  });

  const selectedIdentificationType = form.watch("identificationType");

  const onSubmit = (data: KycFormValues) => {
    console.log('Form submitted with data:', data);
    // console.log('Form validation state:', form.formState);
    // console.log('Form errors:', form.formState.errors);
    // handleCreateMerchantKyc(data);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[860px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add KYC Information for {businessName}</DialogTitle>
          <DialogDescription>
            Please fill in the required KYC information for the merchant.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={(e) => {
            // console.log('Form submit event triggered');
            // console.log('Current form values:', form.getValues());
            // console.log('Form is valid:', form.formState.isValid);
            // console.log('Form errors before submit:', form.formState.errors);
            form.handleSubmit(onSubmit)(e);
          }} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelectTopLabel
                  control={form.control}
                  name="identificationType"
                  label="Identification Type"
                  options={identificationTypes}
                  placeholder="Select identification type"
                  required
                />

                {/* Dynamic field based on identification type */}
                <div className="transition-all duration-300 ease-in-out">
                  {/* Show identification number for CAC and NIN */}
                  {(selectedIdentificationType === "CAC" || selectedIdentificationType === "NIN") && (
                    <FormField
                      control={form.control}
                      name="identificationTypeNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FormInputTopLabel
                              control={form.control}
                              name="identificationTypeNumber"
                              label="CAC Identification Number"
                              placeholder="Enter identification number"
                              required
                              transform={(value) => value?.toUpperCase()}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Show TIN number for TIN */}
                  {selectedIdentificationType === "TIN" && (
                    <FormField
                      control={form.control}
                      name="tinNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FormInputTopLabel
                              control={form.control}
                              name="tinNo"
                              label="TIN Number"
                              placeholder="Enter TIN number"
                              required
                              transform={(value) => value?.toUpperCase()}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Business Registration Number - full width with animation */}
              <div className="w-full transition-all duration-300 ease-in-out">
                <FormField
                  control={form.control}
                  name="businessRegNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInputTopLabel
                          control={form.control}
                          name="businessRegNo"
                          label="Business Registration Number"
                          placeholder="Enter business registration number"
                          required
                          transform={(value) => value?.toUpperCase()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Document Uploads</h4>
              <p className="text-xs text-gray-500">Upload PDF documents (Max 500KB each)</p>

              {/* Show CAC document only for CAC */}
              <div className={`transition-all duration-300 ease-in-out ${selectedIdentificationType === "CAC"
                ? 'opacity-100 max-h-96 translate-y-0'
                : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
                }`}>
                {selectedIdentificationType === "CAC" && (
                  <FormField
                    control={form.control}
                    name="cacDocumentPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FormPdfUpload
                            label="CAC Document"
                            onPdfChange={field.onChange}
                            currentValue={field.value}
                            required
                            maxSize="500kb"
                            error={form.formState.errors.cacDocumentPath?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Show TIN document only for TIN */}
              <div className={`transition-all duration-300 ease-in-out ${selectedIdentificationType === "TIN"
                ? 'opacity-100 max-h-96 translate-y-0'
                : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
                }`}>
                {selectedIdentificationType === "TIN" && (
                  <FormField
                    control={form.control}
                    name="tinPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FormPdfUpload
                            label="TIN Document"
                            onPdfChange={field.onChange}
                            currentValue={field.value}
                            required
                            maxSize="500kb"
                            error={form.formState.errors.tinPath?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Required Certificate - only show if not already uploaded */}
              {!existingKycData?.reqCertificatePath && (
                <div className="transition-all duration-300 ease-in-out">
                  <FormField
                    control={form.control}
                    name="reqCertificatePath"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FormPdfUpload
                            label="Required Certificate"
                            onPdfChange={field.onChange}
                            currentValue={field.value}
                            required
                            maxSize="500kb"
                            error={form.formState.errors.reqCertificatePath?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Menu Document - only show if not already uploaded */}
              {!existingKycData?.menuPath && (
                <div className="transition-all duration-300 ease-in-out">
                  <FormField
                    control={form.control}
                    name="menuPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FormPdfUpload
                            label="Menu Document"
                            onPdfChange={field.onChange}
                            currentValue={field.value}
                            required
                            maxSize="500kb"
                            error={form.formState.errors.menuPath?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Verification Status</h4>

              <div className="space-y-3">
                {/* Show NIN verification only for NIN */}
                <div className={`transition-all duration-300 ease-in-out ${selectedIdentificationType === "NIN"
                  ? 'opacity-100 max-h-96 translate-y-0'
                  : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
                  }`}>
                  {selectedIdentificationType === "NIN" && (
                    <FormField
                      control={form.control}
                      name="verifiedNin"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>NIN Verified</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Show TIN verification only for TIN */}
                <div className={`transition-all duration-300 ease-in-out ${selectedIdentificationType === "TIN"
                  ? 'opacity-100 max-h-96 translate-y-0'
                  : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
                  }`}>
                  {selectedIdentificationType === "TIN" && (
                    <FormField
                      control={form.control}
                      name="verifiedTinNo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>TIN Number Verified</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Show CAC verification only for CAC */}
                <div className={`transition-all duration-300 ease-in-out ${selectedIdentificationType === "CAC"
                  ? 'opacity-100 max-h-96 translate-y-0'
                  : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'
                  }`}>
                  {selectedIdentificationType === "CAC" && (
                    <FormField
                      control={form.control}
                      name="verifiedCac"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>CAC Verified</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} className="px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed "
                isLoading={isPending}
                loadingText="Creating..."
              >
                Create KYC
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}