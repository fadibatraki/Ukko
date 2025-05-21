// components/CategoryForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/types";
import { createCategory, updateCategory } from "@/lib/categories";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: category?.name || "",
    name_zh: category?.name_zh || "",
    slug: category?.slug || "",
  });

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name if name field is changed and slug is empty or matches previous auto-generated slug
    if (
      name === "name" &&
      (!formData.slug || formData.slug === createSlug(formData.name))
    ) {
      setFormData((prev) => ({
        ...prev,
        slug: createSlug(value),
      }));
    }
  };

  // Function to create a slug from a string
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (category) {
        // Update existing category
        await updateCategory(category.id, formData);
        toast.success("Success", {
          description: "Category updated successfully.",
        });
      } else {
        // Create new category
        await createCategory(formData);
        toast.success("Success", {
          description: "Category created successfully.",
        });
      }
      router.push("/admin/categories");
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Error", {
        description: "Failed to save category. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{category ? "Edit Category" : "New Category"}</CardTitle>
          <CardDescription>
            {category
              ? "Update your category information."
              : "Add a new category for your products."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name_zh">Category Name in Chinese</Label>
            <Input
              id="name_zh"
              name="name_zh"
              value={formData.name_zh}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-muted-foreground">
              Used in URLs. Auto-generated from category name.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? category
                ? "Updating..."
                : "Creating..."
              : category
                ? "Update Category"
                : "Create Category"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
