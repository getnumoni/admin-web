"use client";


interface CustomerHeaderProps {
  customerName: string;
  customerId: string;
  level: string;
}

export default function CustomerHeader({ customerName, customerId }: CustomerHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg">
      <div className="flex items-center gap-3 bg-white">
        <div className=" items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{customerName}</h1>
          <span className="text-sm text-gray-600">User ID: {customerId}</span>
        </div>

      </div>

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Select Action
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit Merchant</DropdownMenuItem>
          <DropdownMenuItem>Send Notification</DropdownMenuItem>
          <DropdownMenuItem>Export Data</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
