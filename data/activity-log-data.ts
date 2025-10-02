import { ActivityLog } from '@/lib/types/activity-log';

// Mock activity log data - simulating API response
export const activityLogData: ActivityLog[] = [
  {
    id: 1,
    timestamp: 'Today, 09:42 AM',
    user: 'QuickShop',
    role: 'Merchants',
    action: 'Payout Request',
    details: 'Requested payout of ₦1,250,000 to GTBank',
    ipAddress: '192.168.1.45'
  },
  {
    id: 2,
    timestamp: 'Today, 09:42 AM',
    user: 'Shai Hulud',
    role: 'Admin',
    action: 'Merchant Verification',
    details: 'Approved merchant SuperMart NG KYC documents',
    ipAddress: '192.168.1.45'
  },
  {
    id: 3,
    timestamp: 'Today, 09:42 AM',
    user: 'Super Admin',
    role: 'Super Admin',
    action: 'Role Assignment',
    details: 'Promoted Admin Sarah to Manager role',
    ipAddress: '192.168.1.45'
  },
  {
    id: 4,
    timestamp: 'Today, 09:42 AM',
    user: 'Shadout Mapes',
    role: 'Customer',
    action: 'Points Redemption',
    details: 'Redeemed 1,500 points for airtime top-up',
    ipAddress: '192.168.1.45'
  },
  {
    id: 5,
    timestamp: 'Today, 09:42 AM',
    user: 'Charity Hope Foundation',
    role: 'Charity',
    action: 'Donation Receipt',
    details: 'Issued receipt for ₦750,000 donation from SuperMart NG',
    ipAddress: '192.168.1.45'
  },
  {
    id: 6,
    timestamp: 'Today, 09:42 AM',
    user: 'System',
    role: 'System',
    action: 'Security Alert',
    details: 'Auto-flagged suspicious login attempt (Customer: Michael Okon)',
    ipAddress: '192.168.1.45'
  },
  {
    id: 7,
    timestamp: 'Today, 09:15 AM',
    user: 'TechMart',
    role: 'Merchants',
    action: 'Product Upload',
    details: 'Uploaded 25 new products to inventory',
    ipAddress: '192.168.1.45'
  },
  {
    id: 8,
    timestamp: 'Today, 09:10 AM',
    user: 'Admin User',
    role: 'Admin',
    action: 'User Management',
    details: 'Suspended user account for policy violation',
    ipAddress: '192.168.1.45'
  },
  {
    id: 9,
    timestamp: 'Today, 09:05 AM',
    user: 'John Doe',
    role: 'Customer',
    action: 'Purchase',
    details: 'Made purchase of ₦45,000 at Fashion Store',
    ipAddress: '192.168.1.45'
  },
  {
    id: 10,
    timestamp: 'Today, 09:00 AM',
    user: 'Green Earth Foundation',
    role: 'Charity',
    action: 'Campaign Launch',
    details: 'Launched new environmental campaign',
    ipAddress: '192.168.1.45'
  },
  {
    id: 11,
    timestamp: 'Today, 08:45 AM',
    user: 'Fashion Store',
    role: 'Merchants',
    action: 'Inventory Update',
    details: 'Updated stock levels for 15 products',
    ipAddress: '192.168.1.45'
  },
  {
    id: 12,
    timestamp: 'Today, 08:30 AM',
    user: 'Manager Sarah',
    role: 'Manager',
    action: 'Report Generation',
    details: 'Generated monthly sales report',
    ipAddress: '192.168.1.45'
  },
  {
    id: 13,
    timestamp: 'Today, 08:15 AM',
    user: 'Jane Smith',
    role: 'Customer',
    action: 'Account Update',
    details: 'Updated profile information',
    ipAddress: '192.168.1.45'
  },
  {
    id: 14,
    timestamp: 'Today, 08:00 AM',
    user: 'System',
    role: 'System',
    action: 'Backup',
    details: 'Completed daily database backup',
    ipAddress: '192.168.1.45'
  },
  {
    id: 15,
    timestamp: 'Today, 07:45 AM',
    user: 'Electronics Hub',
    role: 'Merchants',
    action: 'Order Processing',
    details: 'Processed 12 pending orders',
    ipAddress: '192.168.1.45'
  },
  {
    id: 16,
    timestamp: 'Today, 07:30 AM',
    user: 'Support Team',
    role: 'Support',
    action: 'Ticket Resolution',
    details: 'Resolved 8 customer support tickets',
    ipAddress: '192.168.1.45'
  },
  {
    id: 17,
    timestamp: 'Today, 07:15 AM',
    user: 'Mike Johnson',
    role: 'Customer',
    action: 'Points Earned',
    details: 'Earned 250 points from purchase',
    ipAddress: '192.168.1.45'
  },
  {
    id: 18,
    timestamp: 'Today, 07:00 AM',
    user: 'Health Foundation',
    role: 'Charity',
    action: 'Donation Received',
    details: 'Received ₦500,000 donation from Corporate Sponsor',
    ipAddress: '192.168.1.45'
  },
  {
    id: 19,
    timestamp: 'Today, 06:45 AM',
    user: 'System',
    role: 'System',
    action: 'Maintenance',
    details: 'Completed scheduled system maintenance',
    ipAddress: '192.168.1.45'
  },
  {
    id: 20,
    timestamp: 'Today, 06:30 AM',
    user: 'Admin Panel',
    role: 'Admin',
    action: 'Configuration Update',
    details: 'Updated system configuration settings',
    ipAddress: '192.168.1.45'
  },
  {
    id: 21,
    timestamp: 'Yesterday, 11:59 PM',
    user: 'Night Shift Admin',
    role: 'Admin',
    action: 'Security Scan',
    details: 'Completed overnight security scan',
    ipAddress: '192.168.1.45'
  },
  {
    id: 22,
    timestamp: 'Yesterday, 11:30 PM',
    user: 'System',
    role: 'System',
    action: 'Log Cleanup',
    details: 'Cleaned up old log files',
    ipAddress: '192.168.1.45'
  },
  {
    id: 23,
    timestamp: 'Yesterday, 10:45 PM',
    user: 'Late Night Customer',
    role: 'Customer',
    action: 'Purchase',
    details: 'Made late night purchase of ₦25,000',
    ipAddress: '192.168.1.45'
  },
  {
    id: 24,
    timestamp: 'Yesterday, 10:15 PM',
    user: 'Emergency Foundation',
    role: 'Charity',
    action: 'Emergency Response',
    details: 'Activated emergency response protocol',
    ipAddress: '192.168.1.45'
  },
  {
    id: 25,
    timestamp: 'Yesterday, 09:30 PM',
    user: '24/7 Store',
    role: 'Merchants',
    action: 'Order Fulfillment',
    details: 'Fulfilled 5 overnight orders',
    ipAddress: '192.168.1.45'
  }
];

// Simulate API response structure
export const activityLogApiResponse = {
  data: activityLogData,
  total: activityLogData.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(activityLogData.length / 10)
};

// Helper function to get paginated data
export const getPaginatedActivityLogs = (page: number = 1, limit: number = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    data: activityLogData.slice(startIndex, endIndex),
    total: activityLogData.length,
    page,
    limit,
    totalPages: Math.ceil(activityLogData.length / limit)
  };
};
