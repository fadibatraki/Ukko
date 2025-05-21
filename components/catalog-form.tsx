// components/CatalogForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCatalog, updateCatalog } from "@/lib/catalogs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Catalog } from "@prisma/client";
import { SingleImageUpload } from "./single-image-upload";
import { PdfUpload } from "./pdf-upload";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().min(1, "URL is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
});

type CatalogFormValues = z.infer<typeof formSchema>;

interface CatalogFormProps {
  catalog?: Catalog;
}

export function CatalogForm({ catalog }: CatalogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up the form with default values
  const form = useForm<CatalogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: catalog
      ? {
          name: catalog.name,
          url: catalog.url,
          imageUrl: catalog.imageUrl,
        }
      : {
          name: "",
          url: "",
          imageUrl: "",
        },
  });

  // Handle form submission
  const onSubmit = async (data: CatalogFormValues) => {
    setIsSubmitting(true);

    try {
      if (catalog) {
        // Update existing catalog
        await updateCatalog(catalog.id, data);
        toast.success("Success", {
          description: "Catalog updated successfully.",
        });
      } else {
        // Create new catalog
        await createCatalog(data);
        toast.success("Success", {
          description: "Catalog created successfully.",
        });
      }
      router.push("/admin/catalogs");
    } catch (error) {
      console.error("Failed to save catalog:", error);
      toast.error("Error", {
        description: "Failed to save catalog. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{catalog ? "Edit Catalog" : "New Catalog"}</CardTitle>
            <CardDescription>
              {catalog
                ? "Update your catalog information."
                : "Add a new catalog to your store."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catalog Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catalog PDF File</FormLabel>
                  <FormControl>
                    <PdfUpload
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(urls) => field.onChange(urls)}
                      onRemove={() => field.onChange(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catalog Image</FormLabel>
                  <FormControl>
                    <SingleImageUpload
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(urls) => field.onChange(urls)}
                      onRemove={() => field.onChange(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/catalogs")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? catalog
                  ? "Updating..."
                  : "Creating..."
                : catalog
                  ? "Update Catalog"
                  : "Create Catalog"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
