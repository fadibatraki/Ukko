// components/Breadcrumb.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/admin"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems: BreadcrumbItem[] = [];
  let path = "";

  segments.forEach((segment, index) => {
    path += `/${segment}`;

    // Skip the "admin" segment as it's already included as "Dashboard"
    if (segment === "admin") return;

    // Format the label (capitalize and remove dashes)
    let label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    // Special handling for IDs and edit/new segments
    if (segment === "edit") {
      label = "Edit";
    } else if (segment === "new") {
      label = "New";
    } else if (segments[index - 1] === "products" && segment !== "products") {
      // If this is a product ID (when it follows "products" and isn't "edit" or "new")
      if (segment !== "edit" && segment !== "new") {
        label = "Product Details";
      }
    } else if (
      segments[index - 1] === "categories" &&
      segment !== "categories"
    ) {
      // If this is a category ID (when it follows "categories" and isn't "edit" or "new")
      if (segment !== "edit" && segment !== "new") {
        label = "Category Details";
      }
    }

    // Only make it a link if it's not the last segment
    const href = index < segments.length - 1 ? path : undefined;

    breadcrumbItems.push({ label, href });
  });

  return breadcrumbItems;
}
