'use client';

import useGetAllCharityTransactions from "@/hooks/query/useGetAllCharityTransactions";


export default function CharityTransactions() {
  const { data, isPending, error, isError, refetch } = useGetAllCharityTransactions();
  const apiData = data?.data?.data;
  console.log(apiData);
  return <div>CharityTransactions</div>;
}