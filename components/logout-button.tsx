"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: { onSuccess: () => router.replace("/login") },
        })
      }
      className="flex items-center"
    >
      <LogOut className="h-4 w-4 mr-1" />
      Logout
    </Button>
  );
}
