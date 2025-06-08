"use client";

import type React from "react";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartItem } from "@/lib/types";

export const dynamic = "force-dynamic";

async function submitOrder(formData: FormData, items: CartItem[]) {
  console.log(formData, items);
  return { success: false, error: false };
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);


  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await submitOrder(formData, items);

      if (result.success) {
        clearCart();
        toast.success("Order Submitted", {
          description:
            "Your order has been successfully submitted. Check your email for confirmation.",
        });
        router.push("/checkout/success");
      } else {
        toast.error("Error", {
          description:
            result.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

                <div className="mb-4">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" name="state" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Additional Information
                </h2>

                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea id="notes" name="notes" />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            

              <div className="border-t pt-4 space-y-2">
              
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
             
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
