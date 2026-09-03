'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { MobileBottomNav as UIMobileBottomNav } from '@kajlagbe/ui';

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on authentication and admin pages where bottom navigation is not appropriate
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(pathname);
  const isAdminPage = pathname.startsWith('/admin');

  if (isAuthPage || isAdminPage) {
    return null;
  }

  return <UIMobileBottomNav activeHref={pathname} />;
}

