// app/admin/layout.tsx
import Link from "next/link";
import { FileImage, LayoutGrid, Package, Tag } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logout-button";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
              <Link href="/admin" className="flex items-center">
                <LayoutGrid className="h-6 w-6 mr-2" />
                <span className="font-bold">Admin Dashboard</span>
              </Link>
              <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                  href="/admin/products"
                  className="text-sm font-medium flex items-center hover:text-primary"
                >
                  <Package className="h-4 w-4 mr-1" />
                  Products
                </Link>
                <Link
                  href="/admin/categories"
                  className="text-sm font-medium flex items-center hover:text-primary"
                >
                  <Tag className="h-4 w-4 mr-1" />
                  Categories
                </Link>
                <Link
                  href="/admin/catalogs"
                  className="text-sm font-medium flex items-center hover:text-primary"
                >
                  <FileImage className="h-4 w-4 mr-1" />
                  Catalogs
                </Link>
                <LogoutButton />
                {/* <Link */}
                {/*   href="/admin/users" */}
                {/*   className="text-sm font-medium flex items-center hover:text-primary" */}
                {/* > */}
                {/*   <User className="h-4 w-4 mr-1" /> */}
                {/*   Users */}
                {/* </Link> */}
              </nav>
            </div>
          </header>
          <main className="flex-1 px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
