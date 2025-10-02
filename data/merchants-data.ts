import { Merchant } from '@/components/admin/add-merchants/merchant-columns';

// Mock merchants data - simulating API response
export const merchantsData: Merchant[] = [
  {
    id: 1,
    name: 'Chicken Republic',
    logo: '🍗',
    dateJoined: '03 Nov 2024',
    email: 'chicken.republic@example.com',
    phone: '+234 703 1234 567',
    category: 'Restaurants',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 2,
    name: 'Tantalizer PLC',
    logo: '🍕',
    dateJoined: '15 Oct 2024',
    email: 'tantalizer@example.com',
    phone: '+234 802 9876 543',
    category: 'Restaurants',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 3,
    name: 'Item7 go',
    logo: '7️⃣',
    dateJoined: '28 Sep 2024',
    email: 'item7@example.com',
    phone: '+234 701 5555 123',
    category: 'Electronics',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 4,
    name: 'Spurs',
    logo: '🤠',
    dateJoined: '12 Aug 2024',
    email: 'spurs@example.com',
    phone: '+234 805 4444 789',
    category: 'Fashion',
    status: 'Pending',
    statusColor: 'orange'
  },
  {
    id: 5,
    name: 'Domino\'s Pizza',
    logo: '🍕',
    dateJoined: '05 Jul 2024',
    email: 'dominos@example.com',
    phone: '+234 803 3333 456',
    category: 'Restaurants',
    status: 'Pending',
    statusColor: 'orange'
  },
  {
    id: 6,
    name: 'Velvet & Voile',
    logo: '👗',
    dateJoined: '18 Jun 2024',
    email: 'velvet@example.com',
    phone: '+234 706 2222 987',
    category: 'Fashion',
    status: 'Pending',
    statusColor: 'orange'
  },
  {
    id: 7,
    name: 'ChopnQuench',
    logo: '☕',
    dateJoined: '30 May 2024',
    email: 'chopnquench@example.com',
    phone: '+234 809 1111 234',
    category: 'Cafe & Spa',
    status: 'Pending',
    statusColor: 'orange'
  },
  {
    id: 8,
    name: 'Anike Closet',
    logo: '👕',
    dateJoined: '14 Apr 2024',
    email: 'anike@example.com',
    phone: '+234 807 9999 567',
    category: 'Fashion',
    status: 'Suspended',
    statusColor: 'red'
  },
  {
    id: 9,
    name: 'NyxLuxe Lingeries',
    logo: '🛍️',
    dateJoined: '27 Mar 2024',
    email: 'nyxluxe@example.com',
    phone: '+234 804 8888 123',
    category: 'Fashion',
    status: 'Suspended',
    statusColor: 'red'
  },
  {
    id: 10,
    name: 'KFC',
    logo: '🍔',
    dateJoined: '10 Feb 2024',
    email: 'kfc@example.com',
    phone: '+234 801 7777 456',
    category: 'Restaurants',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 11,
    name: 'McDonald\'s',
    logo: '🍟',
    dateJoined: '23 Jan 2024',
    email: 'mcdonalds@example.com',
    phone: '+234 808 6666 789',
    category: 'Restaurants',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 12,
    name: 'Pizza Hut',
    logo: '🥤',
    dateJoined: '06 Dec 2023',
    email: 'pizzahut@example.com',
    phone: '+234 702 5555 012',
    category: 'Restaurants',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 13,
    name: 'Subway',
    logo: '👟',
    dateJoined: '19 Nov 2023',
    email: 'subway@example.com',
    phone: '+234 810 4444 345',
    category: 'Restaurants',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 14,
    name: 'Starbucks',
    logo: '👔',
    dateJoined: '02 Oct 2023',
    email: 'starbucks@example.com',
    phone: '+234 811 3333 678',
    category: 'Cafe & Spa',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 15,
    name: 'Costa Coffee',
    logo: '🎒',
    dateJoined: '15 Sep 2023',
    email: 'costa@example.com',
    phone: '+234 812 2222 901',
    category: 'Cafe & Spa',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 16,
    name: 'Nike Store',
    logo: '💄',
    dateJoined: '28 Aug 2023',
    email: 'nike@example.com',
    phone: '+234 813 1111 234',
    category: 'Sports',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 17,
    name: 'Adidas',
    logo: '💍',
    dateJoined: '11 Jul 2023',
    email: 'adidas@example.com',
    phone: '+234 814 0000 567',
    category: 'Sports',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 18,
    name: 'Zara',
    logo: '⌚',
    dateJoined: '24 Jun 2023',
    email: 'zara@example.com',
    phone: '+234 815 9999 890',
    category: 'Fashion',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 19,
    name: 'H&M',
    logo: '📱',
    dateJoined: '07 May 2023',
    email: 'hm@example.com',
    phone: '+234 816 8888 123',
    category: 'Fashion',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 20,
    name: 'Uniqlo',
    logo: '💻',
    dateJoined: '20 Apr 2023',
    email: 'uniqlo@example.com',
    phone: '+234 817 7777 456',
    category: 'Fashion',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 21,
    name: 'Tech Hub',
    logo: '💻',
    dateJoined: '03 Mar 2023',
    email: 'techhub@example.com',
    phone: '+234 818 6666 789',
    category: 'Technology',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 22,
    name: 'Beauty Palace',
    logo: '💄',
    dateJoined: '16 Feb 2023',
    email: 'beautypalace@example.com',
    phone: '+234 819 5555 012',
    category: 'Beauty',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 23,
    name: 'Jewelry Box',
    logo: '💍',
    dateJoined: '29 Jan 2023',
    email: 'jewelrybox@example.com',
    phone: '+234 820 4444 345',
    category: 'Jewelry',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 24,
    name: 'Book World',
    logo: '📚',
    dateJoined: '12 Dec 2022',
    email: 'bookworld@example.com',
    phone: '+234 821 3333 678',
    category: 'Books',
    status: 'Verified',
    statusColor: 'green'
  },
  {
    id: 25,
    name: 'Spa Retreat',
    logo: '🧘',
    dateJoined: '25 Nov 2022',
    email: 'sparetreat@example.com',
    phone: '+234 822 2222 901',
    category: 'Spa',
    status: 'Verified',
    statusColor: 'green'
  }
];

// Simulate API response structure
export const merchantsApiResponse = {
  data: merchantsData,
  total: merchantsData.length,
  page: 1,
  limit: 20,
  totalPages: Math.ceil(merchantsData.length / 20)
};

// Helper function to get paginated data
export const getPaginatedMerchants = (page: number = 1, limit: number = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    data: merchantsData.slice(startIndex, endIndex),
    total: merchantsData.length,
    page,
    limit,
    totalPages: Math.ceil(merchantsData.length / limit)
  };
};
