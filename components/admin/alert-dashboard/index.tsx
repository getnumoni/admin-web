'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  duplicateWalletColumns,
  largeTransactionColumns,
  rapidTransferColumns
} from "@/data/data-columns/alert-dashboard-columns";
import useGetAlertDashboard from "@/hooks/query/useGetAlertDashboard";
import { extractErrorMessage } from "@/lib/helper";

/**
 * AlertsDashboard Component
 * 
 * This component displays three different types of security and operational alerts:
 * 1. Rapid Transfers: Customers making many transactions in a short period.
 * 2. Large Transactions: Individual transactions exceeding threshold amounts.
 * 3. Duplicate Wallets: Users sharing unique identifiers (Email/Phone).
 */
export default function AlertsDashboard() {
  const { isPending, data, isError, error, refetch } = useGetAlertDashboard();

  if (isPending) {
    return <LoadingSpinner className="flex items-center justify-center h-screen"
      message="fetching alerts..." />;
  }

  if (isError) {
    return <ErrorState title="Error Fetching Alerts" message={extractErrorMessage(error)} onRetry={refetch} />
  }

  // Extract alert data from response
  const alerts = data?.data;
  const rapidTransfers = alerts?.rapidTransfers ?? [];
  const largeTransactions = alerts?.largeTransactions ?? [];
  const duplicateWallets = alerts?.duplicateWallets ?? [];

  return (
    <div className="flex-1 space-y-6 bg-transparent p-4 md:p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Alerts Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and manage system-detected anomalies and potential risks.
          </p>
        </div>
      </div>

      {/* Tabs system to organize 3 different alert tables */}
      <Tabs defaultValue="rapid-transfers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px] mb-4">
          <TabsTrigger value="rapid-transfers">Rapid Transfers</TabsTrigger>
          <TabsTrigger value="large-transactions">Large Transactions</TabsTrigger>
          <TabsTrigger value="duplicate-wallets">Duplicate Wallets</TabsTrigger>
        </TabsList>

        <TabsContent value="rapid-transfers">
          <Card className="border-none shadow-none">
            <CardHeader className="px-6 py-4 border-b">
              <CardTitle>Rapid Transfers</CardTitle>
              <CardDescription>
                Alerts for multiple transfers within a short timeframe.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable columns={rapidTransferColumns} data={rapidTransfers} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="large-transactions">
          <Card className="border-none shadow-none">
            <CardHeader className="px-6 py-4 border-b">
              <CardTitle>Large Transactions</CardTitle>
              <CardDescription>
                Monitoring for transactions exceeding standard thresholds.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable columns={largeTransactionColumns} data={largeTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duplicate-wallets">
          <Card className="border-none shadow-none">
            <CardHeader className="px-6 py-4 border-b">
              <CardTitle>Duplicate Wallets</CardTitle>
              <CardDescription>
                Users sharing the same email address or phone number across accounts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 shadow-none">
              <DataTable columns={duplicateWalletColumns} data={duplicateWallets} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}