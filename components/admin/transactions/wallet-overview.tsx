import useGetWalletBalance from "@/hooks/query/useGetWalletBalance";

export default function WalletOverview() {
  const { data, isPending, error, isError, refetch } = useGetWalletBalance();

  console.log(data)

  // const purchaseMetrics = [
  //   {
  //     title: 'Merchant Patronised',
  //     value: purchaseOverview?.merchantPatronised ?? 0,
  //     icon: <StoreIcon className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#E3EAFD]',
  //     iconBgColor: 'bg-black'
  //   },
  //   {
  //     title: 'Total Point Earned',
  //     value: formatValue(purchaseOverview?.totalPointEarned, true) ?? 0,
  //     icon: <TrendingUp className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#DFFDDB]',
  //     iconBgColor: 'bg-black'
  //   },
  //   {
  //     title: 'Number of Purchase',
  //     value: purchaseOverview?.numberofPurchase ?? 0,
  //     icon: <ShoppingCart className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#E3EAFD]',
  //     iconBgColor: 'bg-black'
  //   },
  //   {
  //     title: 'Total Purchase',
  //     value: formatValue(purchaseOverview?.totalPurchase, true) ?? 0,
  //     icon: <Banknote className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#DFFDDB]',
  //     iconBgColor: 'bg-black'
  //   },
  //   {
  //     title: 'Pending Payout',
  //     value: formatValue(purchaseOverview?.PendingPayout, true) ?? 0,
  //     icon: <Clock className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#E3EAFD]',
  //     iconBgColor: 'bg-black'
  //   },
  //   {
  //     title: 'Total Point Redeemed',
  //     value: formatValue(purchaseOverview?.totalPointRedeemed, true) ?? 0,
  //     icon: <Gift className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#DFFDDB]',
  //     iconBgColor: 'bg-black'
  //   },
  //   {
  //     title: 'Number of Settled',
  //     value: purchaseOverview?.Settled ?? 0,
  //     icon: <CheckCircle className="h-6 w-6 text-gray-200" />,
  //     bgColor: 'bg-[#E3EAFD]',
  //   }
  // ]

  return (
    <main>

    </main>
  )
}