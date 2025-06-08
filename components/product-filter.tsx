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

};

export function ProductFilter({
  categories,
  allProductNames,
  initialCategoryIds,

}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("ProductFilter");

  const [filterCategories, setFilterCategories] =
    useState<string[]>(initialCategoryIds);




  const handleCategorySelect = (categoryId: string) => {
    setFilterCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

 

    if (filterCategories.length > 0) {
      params.set("category", filterCategories.join(","));
    } else {
      params.delete("category");
    }

  

    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

 

  
  
}
