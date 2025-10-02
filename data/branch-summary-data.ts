import { sampleUserIcon } from "@/constant/images";
import { BranchSummaryData } from "@/lib/types";

// Dummy data for Branch Summary Cards

export const branchSummaryData: BranchSummaryData[] = [
  {
    id: "1",
    merchantName: "Chicken Republic Ikeja",
    merchantId: "#nu225577",
    merchantLogo: sampleUserIcon,
    status: "active",
    todayTransactions: {
      allocatedBudget: 40000.50,
      amountSpent: 38900.50,
      fees: 1100.00
    }
  },
  {
    id: "2",
    merchantName: "Chicken Republic Ojodu",
    merchantId: "#nu225578",
    merchantLogo: sampleUserIcon,
    status: "active",
    todayTransactions: {
      allocatedBudget: 35000.00,
      amountSpent: 32000.75,
      fees: 950.25
    }
  },
  {
    id: "3",
    merchantName: "Chicken Republic Victoria Island",
    merchantId: "#nu225579",
    merchantLogo: sampleUserIcon,
    status: "active",
    todayTransactions: {
      allocatedBudget: 50000.00,
      amountSpent: 45200.00,
      fees: 1200.00
    }
  },
  {
    id: "4",
    merchantName: "Chicken Republic Surulere",
    merchantId: "#nu225580",
    merchantLogo: sampleUserIcon,
    status: "closed",
    todayTransactions: {
      allocatedBudget: 25000.00,
      amountSpent: 0.00,
      fees: 0.00
    }
  },
  {
    id: "5",
    merchantName: "Chicken Republic Lekki",
    merchantId: "#nu225581",
    merchantLogo: sampleUserIcon,
    status: "active",
    todayTransactions: {
      allocatedBudget: 45000.00,
      amountSpent: 41000.25,
      fees: 1050.75
    }
  },
  {
    id: "6",
    merchantName: "Chicken Republic Ajah",
    merchantId: "#nu225582",
    merchantLogo: sampleUserIcon,
    status: "closed",
    todayTransactions: {
      allocatedBudget: 30000.00,
      amountSpent: 15000.50,
      fees: 450.50
    }
  },
  {
    id: "7",
    merchantName: "Chicken Republic Ketu",
    merchantId: "#nu225583",
    merchantLogo: sampleUserIcon,
    status: "active",
    todayTransactions: {
      allocatedBudget: 28000.00,
      amountSpent: 26500.00,
      fees: 750.00
    }
  },
  {
    id: "8",
    merchantName: "Chicken Republic Bode Thomas",
    merchantId: "#nu225584",
    merchantLogo: sampleUserIcon,
    status: "closed",
    todayTransactions: {
      allocatedBudget: 32000.00,
      amountSpent: 29800.00,
      fees: 850.00
    }
  }
];
