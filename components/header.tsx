"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/stores/cart-store";
import { Input } from "./ui/input";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./language-switcher";

export default function Header({
  products,
  categories,
}: {
  products: { id: string; name: string; name_zh: string | null }[];
  categories: { id: string; name: string; name_zh: string | null }[];
}) {
  const locale = useLocale();
  const t = useTranslations("Header");
  const pathname = usePathname();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [search, setSearch] = useState("");
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products" },
    ...categories.map((category) => ({
      name: locale === "zh" ? category.name_zh : category.name,
      href: `/category/${category.id}`,
    })),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <Image
                src="/assets/img/logo/logoukko.png" // Make sure this path matches your actual logo path
                alt="Logo"
                width={120} // Adjust size as needed
                height={40}
                priority
              />
            </Link>

            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href + item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary capitalize",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="relative w-64">
            <Search className="absolute -left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchProducts")}
              className="pl-3 pr-3 border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && filtered.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-background border rounded-md shadow-md z-50">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {filtered.map((item) => (
                        <Link key={item.id} href={`/products/${item.id}`}>
                          <CommandItem onSelect={() => setSearch("")}>
                            {locale === "zh" && item.name_zh
                              ? item.name_zh
                              : item.name}
                          </CommandItem>
                        </Link>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href + item.name}
                href={item.href}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-primary capitalize",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
