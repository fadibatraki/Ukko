"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Category } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";

type ProductFilterProps = {
  categories: Category[];
  allProductNames: string[];
  initialCategoryIds: string[];
  initialPriceRange: [number, number];
};

export function ProductFilter({
  categories,
  allProductNames,
  initialCategoryIds,
  initialPriceRange,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("ProductFilter");

  const [filterCategories, setFilterCategories] =
    useState<string[]>(initialCategoryIds);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(initialPriceRange);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProductNames.filter((p) =>
    p.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCategorySelect = (categoryId: string) => {
    setFilterCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Set search query
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    if (filterCategories.length > 0) {
      params.set("category", filterCategories.join(","));
    } else {
      params.delete("category");
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    } else {
      params.delete("minPrice");
    }

    if (priceRange[1] < 10000) {
      params.set("maxPrice", priceRange[1].toString());
    } else {
      params.delete("maxPrice");
    }

    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilterCategories([]);
    setPriceRange([0, 10000]);
    setSearchQuery("");
    router.push("/products");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("filters")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchProducts")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && applyFilters()}
            />
            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-md">
                <Command>
                  <CommandList>
                    <CommandEmpty>{t("noProductsFound")}</CommandEmpty>
                    <CommandGroup>
                      {filteredProducts.map((product) => (
                        <CommandItem
                          key={product}
                          value={product}
                          onSelect={(value) => {
                            setSearchQuery(value);
                            applyFilters();
                          }}
                        >
                          {product}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>
          <h3 className="font-medium mb-3">{t("categories")}</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start h-auto min-h-10"
              >
                {filterCategories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filterCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId,
                      );
                      return (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="px-2 py-1 rounded-md"
                        >
                          {category?.name.replaceAll("-", " ")}
                          <X
                            className="ml-1 h-3 w-3 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategorySelect(categoryId);
                            }}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                ) : (
                  t("selectCategories")
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput
                  placeholder={t("searchCategories")}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>{t("noCategoriesFound")}</CommandEmpty>
                  <CommandGroup>
                    {filteredCategories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.id}
                        onSelect={() => handleCategorySelect(category.id)}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            filterCategories.includes(category.id)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {category.name.replaceAll("-", " ")}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Price Range Section (unchanged) */}
        <div>
          <h3 className="font-medium mb-3">{t("priceRange")}</h3>
          <Slider
            value={priceRange}
            min={0}
            max={10000}
            step={10}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button onClick={applyFilters} className="w-full">
            {t("applyFilters")}
          </Button>
          <Button variant="outline" onClick={resetFilters} className="w-full">
            {t("resetFilters")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
