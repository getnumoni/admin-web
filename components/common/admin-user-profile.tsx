'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useUserAuthStore } from '@/stores/user-auth-store';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminUserProfile() {
  const { user, isAuthenticated, clearUser } = useUserAuthStore();
  const router = useRouter();

  const handleSignOut = () => {
    clearUser();
    router.push('/auth/sign-in');
  };

  // If not authenticated, don't render the profile
  if (!isAuthenticated || !user) {
    return null;
  }

  // Extract username from email (everything before @)
  const displayName = user.username.includes('@')
    ? user.username.split('@')[0]
    : user.username;

  // Get first letter of username for avatar
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <Menubar className="bg-transparent border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
          {/* User Avatar */}
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold text-sm">
            {avatarLetter}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-gray-900">{displayName}</div>
            <div className="text-xs text-gray-500 capitalize">{user.usertype}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </MenubarTrigger>
        <MenubarContent className="w-48">
          <MenubarItem>
            <div className="flex items-center w-full px-2 py-1">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </div>
          </MenubarItem>
          <MenubarItem>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-2 py-1 text-left hover:bg-gray-100 rounded"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
