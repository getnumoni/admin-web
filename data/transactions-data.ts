export interface Transaction {
  id: string;
  merchant: {
    id: string;
    name: string;
    logo: string;
  };
  date: string;
  txnId: string;
  customer: string;
  type: 'Purchase' | 'Redemption' | 'Donation';
  amount: number;
  pointsIssued: number | 'Donation';
  status: 'Completed' | 'Processing' | 'Pending' | 'Failed';
}

export const transactionsData: Transaction[] = [
  {
    id: '1',
    merchant: {
      id: '026669',
      name: 'Chicken Republic',
      logo: '/assets/chicken-republic-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-001',
    customer: 'Adeniyi Jones',
    type: 'Purchase',
    amount: 90000,
    pointsIssued: 400,
    status: 'Completed'
  },
  {
    id: '2',
    merchant: {
      id: '044021',
      name: 'Tantalizer PLC',
      logo: '/assets/tantalizer-logo.png'
    },
    date: '03 Nov 2025 - 14:30',
    txnId: 'TXN-002',
    customer: 'KWAM 1',
    type: 'Redemption',
    amount: 90000,
    pointsIssued: 0,
    status: 'Processing'
  },
  {
    id: '3',
    merchant: {
      id: '027626',
      name: 'Item7 go',
      logo: '/assets/item7-logo.png'
    },
    date: '03 Nov 2025 - 15:30',
    txnId: 'TXN-003',
    customer: 'Lisan Al-Ghaib',
    type: 'Purchase',
    amount: 90000,
    pointsIssued: 400,
    status: 'Completed'
  },
  {
    id: '4',
    merchant: {
      id: '042852',
      name: 'Spurs',
      logo: '/assets/spurs-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-004',
    customer: 'Shadout Mapes',
    type: 'Donation',
    amount: 90000,
    pointsIssued: 'Donation',
    status: 'Pending'
  },
  {
    id: '5',
    merchant: {
      id: '048504',
      name: 'Domino\'s Pizza',
      logo: '/assets/dominos-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-005',
    customer: 'Biodun Lawal',
    type: 'Purchase',
    amount: 90000,
    pointsIssued: 400,
    status: 'Completed'
  },
  {
    id: '6',
    merchant: {
      id: '048259',
      name: 'Anike Closet',
      logo: '/assets/anike-closet-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-006',
    customer: 'Femi Branch',
    type: 'Purchase',
    amount: 90000,
    pointsIssued: 329,
    status: 'Failed'
  },
  {
    id: '7',
    merchant: {
      id: '035448',
      name: 'NyxLuxe Lingeries',
      logo: '/assets/nyxluxe-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-007',
    customer: 'Emily Sande',
    type: 'Purchase',
    amount: 90000,
    pointsIssued: 400,
    status: 'Completed'
  },
  {
    id: '8',
    merchant: {
      id: '048504',
      name: 'ChopnQuench',
      logo: '/assets/chopnquench-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-008',
    customer: 'Trevor Noah',
    type: 'Donation',
    amount: 90000,
    pointsIssued: 0,
    status: 'Pending'
  },
  {
    id: '9',
    merchant: {
      id: '046894',
      name: 'Velvet & Voile',
      logo: '/assets/velvet-voile-logo.png'
    },
    date: '03 Nov 2025 - 12:30',
    txnId: 'TXN-009',
    customer: 'Emily Sande',
    type: 'Purchase',
    amount: 90000,
    pointsIssued: 400,
    status: 'Completed'
  },
  {
    id: '10',
    merchant: {
      id: '026669',
      name: 'Chicken Republic',
      logo: '/assets/chicken-republic-logo.png'
    },
    date: '02 Nov 2025 - 10:15',
    txnId: 'TXN-010',
    customer: 'John Doe',
    type: 'Purchase',
    amount: 45000,
    pointsIssued: 200,
    status: 'Completed'
  },
  {
    id: '11',
    merchant: {
      id: '044021',
      name: 'Tantalizer PLC',
      logo: '/assets/tantalizer-logo.png'
    },
    date: '02 Nov 2025 - 16:45',
    txnId: 'TXN-011',
    customer: 'Jane Smith',
    type: 'Redemption',
    amount: 25000,
    pointsIssued: 0,
    status: 'Processing'
  },
  {
    id: '12',
    merchant: {
      id: '027626',
      name: 'Item7 go',
      logo: '/assets/item7-logo.png'
    },
    date: '01 Nov 2025 - 09:30',
    txnId: 'TXN-012',
    customer: 'Mike Johnson',
    type: 'Purchase',
    amount: 75000,
    pointsIssued: 333,
    status: 'Completed'
  }
];
