import * as React from 'react';
import { notFound } from 'next/navigation';
import { CATEGORIES, PROVIDERS } from '../../../../data';
import { CategoryDetailsView } from './category-details-view';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export default function CategoryDetailsPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  // Matching providers
  const matchingProviders = PROVIDERS.filter(
    (p) => p.categorySlug === category.slug || p.category === category.title,
  );

  return (
    <CategoryDetailsView
      category={category}
      matchingProviders={matchingProviders.length > 0 ? matchingProviders : PROVIDERS.slice(0, 3)}
    />
  );
}
