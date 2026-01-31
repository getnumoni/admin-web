"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateCharity } from "@/hooks/mutation/useCreateCharity";
import useGetAllRegions from "@/hooks/query/useGetAllRegions";
import useGetLga from "@/hooks/query/useGetLga";
import useGetStates from "@/hooks/query/useGetStates";
import { charitySchema, type CharityFormData } from "@/lib/schemas/charity-schema";
import { CreateCharityPayload } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CharityBasicInformation from "./charity-basic-information";
import CharityContactInformation from "./charity-contact-information";
import CharityPayoutInformation from "./charity-payout-information";

export default function AddCharity() {

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedContactRegion, setSelectedContactRegion] = useState("");
  const [selectedContactState, setSelectedContactState] = useState("");
  const [associatedBrands, setAssociatedBrands] = useState<string[]>([]);
  // const [mediaImages, setMediaImages] = useState<string[]>([]);

  const { data: regionsData, isPending: isRegionsPending } = useGetAllRegions();
  const { data: statesData, isPending: isStatesPending } = useGetStates({ region: selectedRegion });
  const { data: lgaData, isPending: isLgaPending } = useGetLga({ state: selectedState });
  const { data: contactStatesData, isPending: isContactStatesPending } = useGetStates({ region: selectedContactRegion });
  const { data: contactLgaData, isPending: isContactLgaPending } = useGetLga({ state: selectedContactState });
  const { handleCreateCharity, isPending: isCreateCharityPending } = useCreateCharity();

  const form = useForm<CharityFormData>({
    resolver: zodResolver(charitySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      charityName: "",
      charityRegNumber: "",
      charityAddress: "",
      region: "",
      state: "",
      lga: "",
      city: "",
      contactPersonName: "",
      contactEmail: "",
      contactPhoneNumber: "",
      contactAddress: "",
      contactLga: "",
      contactCity: "",
      bankCode: "",
      bankName: "",
      bankAccountNumber: "",
      accountName: "",
      verifiedAccountName: "",
      password: "",
      confirmPassword: "",
      description: "",
      associatedBrands: [],
      mediaUrls: [],
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  const regions = regionsData?.data?.data || [];
  const states = statesData?.data?.data || [];
  const lgas = lgaData?.data?.data || [];
  const contactStates = contactStatesData?.data?.data || [];
  const contactLgas = contactLgaData?.data?.data || [];

  // const handleImageChange = (imageUrl: string | null) => {
  //   setValue('logoUrl', imageUrl || '');
  // };

  const handleAddBrand = (brand: string) => {
    if (brand && !associatedBrands.includes(brand)) {
      setAssociatedBrands([...associatedBrands, brand]);
    }
  };

  const handleRemoveBrand = (brand: string) => {
    setAssociatedBrands(associatedBrands.filter(b => b !== brand));
  };

  // const handleAddImage = (imageBase64: string) => {
  //   const next = [...mediaImages, imageBase64].slice(0, 6);
  //   setMediaImages(next);
  //   setValue('mediaUrls', next);
  // };

  // const handleRemoveImage = (index: number) => {
  //   setMediaImages(mediaImages.filter((_, i) => i !== index));
  // };

  // Watch form values for dependent dropdowns
  const watchedRegion = watch("region");
  const watchedState = watch("state");
  const watchedContactCountry = watch("contactCountry");
  const watchedContactState = watch("contactState");

  // Update selected regions/states when form values change
  useEffect(() => {
    if (watchedRegion !== selectedRegion) {
      setSelectedRegion(watchedRegion);
      setValue("state", "");
      setValue("lga", "");
    }
  }, [watchedRegion, selectedRegion, setValue]);

  useEffect(() => {
    if (watchedState !== selectedState) {
      setSelectedState(watchedState);
      setValue("lga", "");
    }
  }, [watchedState, selectedState, setValue]);

  useEffect(() => {
    if (watchedContactCountry !== selectedContactRegion) {
      setSelectedContactRegion(watchedContactCountry);
      setValue("contactState", "");
      setValue("contactLga", "");
    }
  }, [watchedContactCountry, selectedContactRegion, setValue]);

  useEffect(() => {
    if (watchedContactState !== selectedContactState) {
      setSelectedContactState(watchedContactState);
      setValue("contactLga", "");
    }
  }, [watchedContactState, selectedContactState, setValue]);

  const onSubmit = async (data: CharityFormData) => {
    // console.log("Charity data:", data);
    const payload: CreateCharityPayload = {
      charityName: data.charityName,
      charityRegNumber: data.charityRegNumber,
      charityAddress: data.charityAddress,
      country: data.region,
      state: data.state,
      city: data.lga,
      associatedBrandsIds: associatedBrands,
      description: data.description || "",
      contactPersonName: data.contactPersonName || "",
      contactEmail: data.contactEmail || "",
      contactPhoneNumber: data.contactPhoneNumber || "",
      password: data.password || "",
      contactAddress: data.contactAddress || "",
      contactCountry: data.contactCountry || "",
      contactState: data.contactState || "",
      contactCity: data.lga || "",
      bankName: data.bankName || "",
      bankAccountNumber: data.bankAccountNumber || "",
      accountName: data.accountName || "",
      verifiedAccountName: data.verifiedAccountName || "",
    };

    handleCreateCharity(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button> */}
          <h1 className="text-2xl font-bold text-gray-900">Create Charity</h1>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100">
            {/* Profile Picture Section */}
            {/* <CharityProfileUploadSection
              onImageChange={handleImageChange}
              imageUrl={watch('logoUrl') || ''}
            /> */}

            {/* Basic Information Section */}
            <CharityBasicInformation
              control={control}
              setValue={setValue}
              regions={regions}
              states={states}
              lgas={lgas}
              associatedBrands={associatedBrands}
              onAddBrand={handleAddBrand}
              onRemoveBrand={handleRemoveBrand}
              isRegionsPending={isRegionsPending}
              isStatesPending={isStatesPending}
              isLgaPending={isLgaPending}
            />

            {/* Media Section */}
            {/* <CharityMediaSection
              mediaImages={mediaImages}
              onRemoveImage={handleRemoveImage}
              onAddImage={handleAddImage}
            /> */}

            {/* Contact Information Section */}
            <CharityContactInformation
              control={control}
              regions={regions}
              contactStates={contactStates}
              contactLgas={contactLgas}
              isRegionsPending={isRegionsPending}
              isContactStatesPending={isContactStatesPending}
              isContactLgaPending={isContactLgaPending}
            />

            {/* Payout Information Section */}
            <CharityPayoutInformation
              control={control}
              setValue={setValue}
            />

            {/* Submit Button */}
            <div className="p-6 flex justify-end">
              <Button
                type="submit"
                className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors"
                disabled={isCreateCharityPending}
                loadingText="Creating Charity"
                isLoading={isCreateCharityPending}
              >
                Create Charity
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}