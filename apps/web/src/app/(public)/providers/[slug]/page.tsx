import * as React from 'react';
import { notFound } from 'next/navigation';
import { PROVIDERS } from '../../../../data';
import { ProviderProfileView } from './provider-profile-view';

interface ProviderProfileProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROVIDERS.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProviderProfilePage({ params }: ProviderProfileProps) {
  const provider = PROVIDERS.find((p) => p.slug === params.slug);

  if (!provider) {
    notFound();
  }

  const similarProviders = PROVIDERS.filter(
    (p) => p.id !== provider.id && p.categorySlug === provider.categorySlug,
  );

  return <ProviderProfileView provider={provider} similarProviders={similarProviders} />;
}
