import { redirect } from 'next/navigation';

export default function AccountSecurityRedirectPage() {
  redirect('/settings/security');
}

