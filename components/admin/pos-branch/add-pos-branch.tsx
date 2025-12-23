'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useCreatePos } from '@/hooks/mutation/useCreatePos';
import useDownloadSamplePosCsv from '@/hooks/mutation/useDownloadSamplePosCsv';
import { useUploadPosCsv } from '@/hooks/mutation/useUploadPosCsv';
import useGetAllMerchants from '@/hooks/query/useGetAllMerchants';
import useGetBanks from '@/hooks/query/useGetBanks';
import { PosBranchFormData, posBranchSchema } from '@/lib/schemas/pos-branch-schema';
import { Bank, Merchant } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download } from 'lucide-react';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import MerchantSelection from './merchant-selection';
import PosBranchBankInfo from './pos-branch-bank-info';
import PosBranchFileUpload from './pos-branch-file-upload';

export default function AddPosBranch() {
  const form = useForm<PosBranchFormData>({
    resolver: zodResolver(posBranchSchema),
    mode: 'onChange',
    defaultValues: {
      merchantId: '',
      singleUpload: false,
      posBranchFile: undefined,
      bankCode: '',
      bankAccountNumber: '',
      accountName: '',
    },
  });

  const { control, handleSubmit, setValue } = form;
  const { mutateAsync: uploadPosCsv, isPending: isUploadingCsv } = useUploadPosCsv();
  const { handleCreatePos, isPending: isCreatingPos } = useCreatePos();
  const {
    mutateAsync: downloadSampleCsv,
    isPending: isDownloadingCsv,
  } = useDownloadSamplePosCsv();


  // Fetch merchants and banks to get names
  const { data: merchantsData } = useGetAllMerchants({ size: 1000 });
  const { data: banks } = useGetBanks();

  // Watch form values
  const merchantId = useWatch({ control, name: 'merchantId' });
  const bankCode = useWatch({ control, name: 'bankCode' });

  // Get merchant name from merchantId
  const merchantName = useMemo(() => {
    if (!merchantId || !merchantsData?.data?.data?.pageData) return '';
    const merchants = merchantsData.data.data.pageData as Merchant[];
    const merchant = merchants.find((m: Merchant) => m.userId === merchantId);
    return merchant?.businessName || '';
  }, [merchantId, merchantsData]);

  // Get bank name from bankCode
  const bankName = useMemo(() => {
    if (!bankCode || !banks) return '';
    const allBanks = Array.isArray(banks?.data)
      ? banks.data
      : banks?.data?.data;
    if (!allBanks || !Array.isArray(allBanks)) return '';
    const bank = allBanks.find((b: Bank) => b.code === bankCode);
    return bank?.name || '';
  }, [bankCode, banks]);

  const onSubmit = async (data: PosBranchFormData) => {
    // Validate required fields
    if (!data.posBranchFile || !(data.posBranchFile instanceof File)) {
      toast.error('Please upload a CSV or Excel file');
      return;
    }

    if (!merchantName) {
      toast.error('Please select a merchant');
      return;
    }

    if (!bankName) {
      toast.error('Please select a bank');
      return;
    }

    if (!data.accountName) {
      toast.error('Please verify your bank account');
      return;
    }

    try {
      // Step 1: Upload CSV file
      await uploadPosCsv({
        formData: data,
        file: data.posBranchFile,
        bankName: bankName,
      });

      // Step 2: Create POS record after CSV upload succeeds
      handleCreatePos({
        posName: merchantName,
        merchantId: data.merchantId,
        bankName: bankName,
        accountNo: data.bankAccountNumber,
        accountHolderName: data.accountName,
        bankCode: data.bankCode,
        bankTransferCode: data.bankCode, // Using bankCode as transfer code
      });
    } catch (error) {
      // Error handling is done in the hook's onError callback
      toast.error('Failed to upload POS CSV: ' + error);
    }
  };


  const handleDownloadSampleCsv = async () => {
    try {
      const blob = await downloadSampleCsv();

      const url = window.URL.createObjectURL(
        new Blob([blob], { type: 'text/csv' })
      );

      const link = document.createElement('a');
      link.href = url;
      link.download = 'sample-pos.csv';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download sample CSV');
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Merchant POS Setup</h1>
          <Button variant="outline" size="sm" className='shadow-none'
            type='button'
            onClick={handleDownloadSampleCsv}
            disabled={isDownloadingCsv}
            isLoading={isDownloadingCsv}
            loadingText='Downloading Sample CSV...'>
            <Download className="w-4 h-4 mr-2" />
            Download Sample CSV
          </Button>
        </div>

        {/* Select Merchant */}
        <MerchantSelection control={control} />

        {/* Upload Option */}
        <div className="mb-6">
          <FormField
            control={control}
            name="singleUpload"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                    Single Upload
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Upload POS Branch */}
        <PosBranchFileUpload control={control} setValue={setValue} />

        {/* Bank Information */}
        <PosBranchBankInfo control={control} setValue={setValue} />

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            disabled={isUploadingCsv || isCreatingPos}
            className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-12 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploadingCsv ? 'Uploading CSV...' : isCreatingPos ? 'Creating POS...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
