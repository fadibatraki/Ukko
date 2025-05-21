"use client";

import { useLocale } from "next-intl";
import { Button } from "./ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: newLocale });
    document.documentElement.lang = newLocale;
  };

  const languages = {
    en: {
      name: "English",
      flag: "/flags/cn.svg", // UK flag for English
    },
    zh: {
      name: "中文",
      flag: "/flags/uk.svg", // China flag for Chinese
    },
  };

  const currentLanguage = languages[locale as keyof typeof languages];

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-10 h-10 cursor-pointer"
      aria-label="Toggle language"
      onClick={toggleLanguage}
    >
      <Image
        src={currentLanguage.flag}
        alt={currentLanguage.name}
        width={24}
        height={24}
        className="object-contain"
      />
    </Button>
  );
}
