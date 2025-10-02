// Charity organization type definition
export type Charity = {
  id: number;
  name: string;
  charityId: string;
  logo: string;
  dateJoined: string;
  email: string;
  phone: string;
  address: string;
};

// Mock charity data - simulating API response
export const charityData: Charity[] = [
  {
    id: 1,
    name: 'AO Foundation',
    charityId: '026669',
    logo: '❄️',
    dateJoined: '03 Nov 2025 - 12:30',
    email: 'shadoutmapes@gmail.com',
    phone: '+234 703 1234 567',
    address: '12 Allen Avenue, Ikeja, Lagos'
  },
  {
    id: 2,
    name: 'FATE Foundation',
    charityId: '044021',
    logo: '🎯',
    dateJoined: '31 Oct 2025 - 12:30',
    email: 'pratiksharma@gmail.com',
    phone: '+234 703 1234 567',
    address: '45 Admiralty Way, Lekki Phase 1, Lagos'
  },
  {
    id: 3,
    name: 'Ovie Brume Foundation',
    charityId: '027626',
    logo: '🌟',
    dateJoined: '28 Oct 2025 - 12:30',
    email: 'gauravgupta@gmail.com',
    phone: '+234 703 1234 567',
    address: '88 Broad Street, Lagos Island, Lagos'
  },
  {
    id: 4,
    name: 'AO Foundation',
    charityId: '042852',
    logo: '❄️',
    dateJoined: '26 Oct 2025 - 12:30',
    email: 'shadoutmapes@gmail.com',
    phone: '+234 703 1234 567',
    address: '17 Opebi Road, Ikeja, Lagos'
  },
  {
    id: 5,
    name: 'FATE Foundation',
    charityId: '048504',
    logo: '🎯',
    dateJoined: '24 Oct 2025 - 12:30',
    email: 'shadoutmapes@gmail.com',
    phone: '+234 703 1234 567',
    address: '102 Bode Thomas Street, Surulere, Lagos'
  },
  {
    id: 6,
    name: 'Ovie Brume Foundation',
    charityId: '048259',
    logo: '🌟',
    dateJoined: '20 Oct 2025 - 12:30',
    email: 'gauravgupta@gmail.com',
    phone: '+234 703 1234 567',
    address: '6 Toyin Street, Ikeja, Lagos'
  },
  {
    id: 7,
    name: 'AO Foundation',
    charityId: '035448',
    logo: '❄️',
    dateJoined: '19 Oct 2025 - 12:30',
    email: 'gauravgupta@gmail.com',
    phone: '+234 703 1234 567',
    address: '34 Adeniran Ogunsanya Street, Surulere, Lagos'
  },
  {
    id: 8,
    name: 'FATE Foundation',
    charityId: '046894',
    logo: '🎯',
    dateJoined: '24 Oct 2025 - 12:30',
    email: 'shadoutmapes@gmail.com',
    phone: '+234 703 1234 567',
    address: '21 Idowu Martins Street, Victoria Island, Lagos'
  },
  {
    id: 9,
    name: 'Ovie Brume Foundation',
    charityId: '048504',
    logo: '🌟',
    dateJoined: '24 Oct 2025 - 12:30',
    email: 'shadoutmapes@gmail.com',
    phone: '+234 703 1234 567',
    address: '77 Awolowo Road, Ikoyi, Lagos'
  },
  {
    id: 10,
    name: 'AO Foundation',
    charityId: '052147',
    logo: '❄️',
    dateJoined: '18 Oct 2025 - 14:15',
    email: 'fatima.ahmed@gmail.com',
    phone: '+234 802 9876 543',
    address: '15 Ahmadu Bello Way, Kaduna'
  },
  {
    id: 11,
    name: 'FATE Foundation',
    charityId: '039582',
    logo: '🎯',
    dateJoined: '15 Oct 2025 - 09:45',
    email: 'emmanuel.okafor@gmail.com',
    phone: '+234 701 5555 123',
    address: '23 Independence Avenue, Enugu'
  },
  {
    id: 12,
    name: 'Ovie Brume Foundation',
    charityId: '047963',
    logo: '🌟',
    dateJoined: '12 Oct 2025 - 16:20',
    email: 'aisha.ibrahim@gmail.com',
    phone: '+234 805 4444 789',
    address: '8 Murtala Mohammed Way, Kano'
  },
  {
    id: 13,
    name: 'AO Foundation',
    charityId: '041258',
    logo: '❄️',
    dateJoined: '08 Oct 2025 - 11:30',
    email: 'chinedu.nwosu@gmail.com',
    phone: '+234 803 3333 456',
    address: '45 Wuse 2, Abuja'
  },
  {
    id: 14,
    name: 'FATE Foundation',
    charityId: '056789',
    logo: '🎯',
    dateJoined: '05 Oct 2025 - 13:45',
    email: 'hauwa.mohammed@gmail.com',
    phone: '+234 706 2222 987',
    address: '12 Dantata Road, Kano'
  },
  {
    id: 15,
    name: 'Ovie Brume Foundation',
    charityId: '033147',
    logo: '🌟',
    dateJoined: '02 Oct 2025 - 10:15',
    email: 'oluwaseun.adebayo@gmail.com',
    phone: '+234 809 1111 234',
    address: '67 Ikorodu Road, Lagos'
  },
  {
    id: 16,
    name: 'AO Foundation',
    charityId: '049632',
    logo: '❄️',
    dateJoined: '28 Sep 2025 - 15:30',
    email: 'zainab.usman@gmail.com',
    phone: '+234 807 9999 567',
    address: '34 Ahmadu Bello Way, Jos'
  },
  {
    id: 17,
    name: 'FATE Foundation',
    charityId: '044785',
    logo: '🎯',
    dateJoined: '25 Sep 2025 - 12:00',
    email: 'ikechukwu.okonkwo@gmail.com',
    phone: '+234 804 8888 123',
    address: '19 Nnamdi Azikiwe Road, Onitsha'
  },
  {
    id: 18,
    name: 'Ovie Brume Foundation',
    charityId: '051369',
    logo: '🌟',
    dateJoined: '22 Sep 2025 - 14:45',
    email: 'aminat.lawal@gmail.com',
    phone: '+234 801 7777 456',
    address: '56 Airport Road, Ilorin'
  },
  {
    id: 19,
    name: 'AO Foundation',
    charityId: '038524',
    logo: '❄️',
    dateJoined: '19 Sep 2025 - 09:20',
    email: 'tunde.adeyemi@gmail.com',
    phone: '+234 808 6666 789',
    address: '78 Ring Road, Ibadan'
  },
  {
    id: 20,
    name: 'FATE Foundation',
    charityId: '047159',
    logo: '🎯',
    dateJoined: '16 Sep 2025 - 16:10',
    email: 'rashida.abdullahi@gmail.com',
    phone: '+234 702 5555 012',
    address: '23 Murtala Mohammed Way, Maiduguri'
  },
  {
    id: 21,
    name: 'Ovie Brume Foundation',
    charityId: '042687',
    logo: '🌟',
    dateJoined: '13 Sep 2025 - 11:35',
    email: 'femi.ojo@gmail.com',
    phone: '+234 810 4444 345',
    address: '45 Oba Akran Avenue, Lagos'
  },
  {
    id: 22,
    name: 'AO Foundation',
    charityId: '055478',
    logo: '❄️',
    dateJoined: '10 Sep 2025 - 13:25',
    email: 'hadiza.sani@gmail.com',
    phone: '+234 811 3333 678',
    address: '12 Ahmadu Bello Way, Zaria'
  },
  {
    id: 23,
    name: 'FATE Foundation',
    charityId: '036925',
    logo: '🎯',
    dateJoined: '07 Sep 2025 - 10:50',
    email: 'segun.adebisi@gmail.com',
    phone: '+234 812 2222 901',
    address: '67 Marina Road, Lagos'
  },
  {
    id: 24,
    name: 'Ovie Brume Foundation',
    charityId: '048963',
    logo: '🌟',
    dateJoined: '04 Sep 2025 - 15:15',
    email: 'aisha.garba@gmail.com',
    phone: '+234 813 1111 234',
    address: '34 Independence Way, Kaduna'
  },
  {
    id: 25,
    name: 'AO Foundation',
    charityId: '041752',
    logo: '❄️',
    dateJoined: '01 Sep 2025 - 12:40',
    email: 'chidi.nwankwo@gmail.com',
    phone: '+234 814 0000 567',
    address: '89 Enugu Road, Aba'
  }
];

// Simulate API response structure
export const charityApiResponse = {
  data: charityData,
  total: charityData.length,
  page: 1,
  limit: 20,
  totalPages: Math.ceil(charityData.length / 20)
};

// Helper function to get paginated data
export const getPaginatedCharity = (page: number = 1, limit: number = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    data: charityData.slice(startIndex, endIndex),
    total: charityData.length,
    page,
    limit,
    totalPages: Math.ceil(charityData.length / limit)
  };
};
