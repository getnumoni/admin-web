import { AdminNavigationItem } from '@/lib/types';

/**
 * More precise path matching for sidebar navigation.
 * 
 * This function checks if the currentPath matches the routePath (exact match) OR
 * if the currentPath is a dynamic child of routePath (exactly one level deeper).
 * 
 * @param currentPath - The current URL pathname (e.g., '/dashboard/merchants/transactions/123')
 * @param routePath - The route path to match against (e.g., '/dashboard/merchants/transactions')
 * @returns `true` if currentPath matches routePath exactly or is a direct child (one level deeper), `false` otherwise
 * 
 * @example
 * ```typescript
 * // Exact match
 * isSidebarPathMatch('/dashboard/merchants/transactions', '/dashboard/merchants/transactions'); // true
 * 
 * // Dynamic child route (one level deeper)
 * isSidebarPathMatch('/dashboard/merchants/transactions/123', '/dashboard/merchants/transactions'); // true
 * 
 * // Parent route should NOT match
 * isSidebarPathMatch('/dashboard/merchants/transactions', '/dashboard/merchants'); // false
 * 
 * // Sibling route should NOT match
 * isSidebarPathMatch('/dashboard/merchants/transactions', '/dashboard/merchants/add-merchant'); // false
 * 
 * // Multiple levels deeper should NOT match
 * isSidebarPathMatch('/dashboard/merchants/transactions/123/details', '/dashboard/merchants/transactions'); // false
 * ```
 */
export const isSidebarPathMatch = (currentPath: string, routePath: string): boolean => {
  // Exact match - always true
  if (currentPath === routePath) return true;

  // Check if current path is a direct child of route path (one level deep only)
  // e.g., '/dashboard/merchants/transactions/123' matches '/dashboard/merchants/transactions'
  // but '/dashboard/merchants/transactions' does NOT match '/dashboard/merchants'
  if (currentPath.startsWith(routePath + '/')) {
    // Calculate depth difference - only match if exactly one level deeper
    const currentDepth = currentPath.split('/').filter(Boolean).length;
    const routeDepth = routePath.split('/').filter(Boolean).length;

    // Only match if current path is exactly one level deeper (direct child)
    // This handles dynamic routes like [id] while preventing parent route matches
    // IMPORTANT: This ensures '/dashboard/merchants/transactions' does NOT match '/dashboard/merchants'
    return currentDepth === routeDepth + 1;
  }

  return false;
};

/**
 * Determines which navigation items should be expanded based on the current pathname.
 * 
 * A parent navigation item is expanded if any of its children match the current pathname.
 * This allows users to see the active child item within its parent section.
 * 
 * @param currentPathname - The current URL pathname
 * @param navigationItems - Array of all navigation items to check
 * @returns Array of parent item names that should be expanded
 * 
 * @example
 * ```typescript
 * const items = [
 *   {
 *     name: 'Merchants',
 *     children: [
 *       { name: 'All Merchants', path: '/dashboard/merchants' },
 *       { name: 'Merchant Transactions', path: '/dashboard/merchants/transactions' }
 *     ]
 *   }
 * ];
 * 
 * // When on transactions page, Merchants should be expanded
 * getExpandedItemsForPath('/dashboard/merchants/transactions', items); // ['Merchants']
 * 
 * // When on a different page, nothing should be expanded
 * getExpandedItemsForPath('/dashboard/customers', items); // []
 * ```
 */
export const getExpandedItemsForPath = (
  currentPathname: string,
  navigationItems: AdminNavigationItem[]
): string[] => {
  const expanded: string[] = [];

  navigationItems.forEach(item => {
    if (item.children) {
      const hasActiveChild = item.children.some(child => {
        if (!child.path) return false;
        return isSidebarPathMatch(currentPathname, child.path);
      });

      if (hasActiveChild) {
        expanded.push(item.name);
      }
    }
  });

  // Return expanded items, or empty array if nothing is active
  return expanded;
};

/**
 * Determines if a navigation item should be marked as active.
 * 
 * For items with direct paths (no children), only exact matches are considered active.
 * For parent items with children, they are never marked as active - only their specific
 * child routes should be highlighted. This prevents parent items from being highlighted
 * when children are active.
 * 
 * @param item - The navigation item to check
 * @param pathname - The current URL pathname
 * @returns `true` if the item should be marked as active, `false` otherwise
 * 
 * @example
 * ```typescript
 * // Item with direct path - exact match only
 * const itemWithPath = { name: 'Overview', path: '/dashboard', icon: DashboardIcon };
 * isItemActive(itemWithPath, '/dashboard'); // true
 * isItemActive(itemWithPath, '/dashboard/merchants'); // false
 * 
 * // Parent item with children - never active
 * const parentItem = {
 *   name: 'Merchants',
 *   children: [{ name: 'All Merchants', path: '/dashboard/merchants' }]
 * };
 * isItemActive(parentItem, '/dashboard/merchants'); // false (parent never active)
 * ```
 */
export const isItemActive = (item: AdminNavigationItem, pathname: string): boolean => {
  // For items with direct paths (no children) - only exact matches
  if (item.path) {
    return pathname === item.path;
  }

  // For parent items with children, they should NOT be active
  // Only their specific child routes should be active
  // This prevents parent items from being highlighted when children are active
  return false;
};

/**
 * Determines if a child navigation item should be marked as active.
 * 
 * A child item is active if:
 * 1. The current pathname exactly matches the child's path, OR
 * 2. The current pathname is a dynamic child route (exactly one level deeper with an ID segment)
 * 
 * This ensures that:
 * - Exact routes only match themselves (e.g., '/dashboard/merchants/transactions' only matches itself)
 * - Dynamic routes match their parent (e.g., '/dashboard/merchants/transactions/123' matches '/dashboard/merchants/transactions')
 * - Sibling routes do not match each other (e.g., '/dashboard/merchants/transactions' does NOT match '/dashboard/merchants')
 * - Sibling routes with same depth do not match (e.g., '/dashboard/merchants/transactions' does NOT match '/dashboard/merchants/add-merchant')
 * 
 * @param childPath - The path of the child navigation item
 * @param pathname - The current URL pathname
 * @returns `true` if the child item should be marked as active, `false` otherwise
 * 
 * @example
 * ```typescript
 * // Exact match
 * isChildItemActive('/dashboard/merchants/transactions', '/dashboard/merchants/transactions'); // true
 * 
 * // Dynamic child route (one level deeper with ID)
 * isChildItemActive('/dashboard/merchants/transactions', '/dashboard/merchants/transactions/123'); // true
 * isChildItemActive('/dashboard/merchants', '/dashboard/merchants/123'); // true
 * 
 * // Sibling route should NOT match (same depth, different segment)
 * isChildItemActive('/dashboard/merchants', '/dashboard/merchants/transactions'); // false
 * isChildItemActive('/dashboard/merchants', '/dashboard/merchants/add-merchant'); // false
 * 
 * // Multiple levels deeper should NOT match
 * isChildItemActive('/dashboard/merchants/transactions', '/dashboard/merchants/transactions/123/details'); // false
 * ```
 */
export const isChildItemActive = (childPath: string, pathname: string): boolean => {
  // Exact match - always active
  if (pathname === childPath) return true;

  // Check if current path is a dynamic child (one level deeper)
  // Only match if current path is DEEPER than child route (not equal or shallower)
  const currentDepth = pathname.split('/').filter(Boolean).length;
  const childDepth = childPath.split('/').filter(Boolean).length;
  const isDeeper = currentDepth > childDepth;

  if (!isDeeper || currentDepth !== childDepth + 1) {
    return false;
  }

  // Check if pathname starts with childPath + '/'
  if (!pathname.startsWith(childPath + '/')) {
    return false;
  }

  // Get the remaining segment after the child path
  const remainingSegment = pathname.slice(childPath.length + 1);

  // Only match if the remaining segment looks like an ID (UUID, numeric ID, etc.)
  // This prevents matching sibling routes like '/dashboard/merchants/transactions' matching '/dashboard/merchants'
  // We consider it a dynamic child if:
  // 1. It's a valid UUID format (8-4-4-4-12 hex digits with hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
  // 2. It's purely numeric (numeric ID like '123', '456')
  // 3. It doesn't contain slashes (single segment only)

  // UUID pattern: 8 hex digits, hyphen, 4 hex digits, hyphen, 4 hex digits, hyphen, 4 hex digits, hyphen, 12 hex digits
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  // Numeric ID pattern: purely numeric
  const numericIdPattern = /^\d+$/;

  // Check if it's a valid UUID or numeric ID
  const isLikelyId = (uuidPattern.test(remainingSegment) || numericIdPattern.test(remainingSegment)) &&
    !remainingSegment.includes('/');

  return isLikelyId;
};

/**
 * Calculates the new expanded items state when toggling a navigation item.
 * 
 * When a user clicks on a navigation item:
 * - If the item is already expanded, it will be closed (removed from expanded items)
 * - If the item is not expanded, it will be opened and all other items will be closed
 * 
 * This implements an "accordion" behavior where only one parent item can be expanded at a time.
 * 
 * @param currentExpandedItems - Array of currently expanded item names
 * @param itemName - The name of the item being toggled
 * @returns New array of expanded item names after the toggle operation
 * 
 * @example
 * ```typescript
 * // Toggle an item that is not expanded - opens it and closes others
 * toggleExpandedItems(['Customers'], 'Merchants'); // ['Merchants']
 * 
 * // Toggle an item that is already expanded - closes it
 * toggleExpandedItems(['Merchants'], 'Merchants'); // []
 * 
 * // Toggle when multiple items are expanded - closes all and opens the new one
 * toggleExpandedItems(['Merchants', 'Customers'], 'Charities'); // ['Charities']
 * ```
 */
export const toggleExpandedItems = (
  currentExpandedItems: string[],
  itemName: string
): string[] => {
  // If clicking on an already expanded item, close it
  if (currentExpandedItems.includes(itemName)) {
    return currentExpandedItems.filter(name => name !== itemName);
  }

  // If clicking on a new item, close all others and open this one
  return [itemName];
};

