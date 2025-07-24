
'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Home', href: '/', current: false },
    ...items
  ];

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index === 0 && (
              <Home className="w-4 h-4 mr-1" />
            )}
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" />
            )}
            {item.current ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": allItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": `https://cryptoconverter.com${item.href}`
            }))
          })
        }}
      />
    </nav>
  );
}
