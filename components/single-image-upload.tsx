// components/SingleImageUpload.tsx

import { useState, useCallback } from "react";
import { Upload, X, FileImage } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SingleImageUploadProps {
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
  disabled?: boolean;
}

export function SingleImageUpload({
  onChange,
  onRemove,
  value,
  disabled,
}: SingleImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);

      // Create a form data object
      const formData = new FormData();
      // Append the file to formData
      formData.append("files", file);

      try {
        // Upload file using our API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        // Set the new image URL
        onChange(data.urls[0]);
        // Clear the input value
        e.target.value = "";
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
    [onChange],
  );

  return (
    <div>
      {value ? (
        <div className="mb-4">
          <div className="relative w-[300px] h-[300px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                className="h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted-foreground/20 rounded-lg mb-4">
          <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            No image uploaded
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled || loading}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      )}

      <div className="flex items-center">
        <Button
          type="button"
          disabled={disabled || loading}
          variant="secondary"
          onClick={() => document.getElementById("image-upload")?.click()}
          className={cn(
            "flex items-center",
            (disabled || loading) && "opacity-50 cursor-not-allowed",
          )}
        >
          <Upload className="h-4 w-4 mr-2" />
          {value ? "Change Image" : "Upload Image"}
        </Button>
        <p className="text-sm text-muted-foreground ml-4">Upload image here</p>
      </div>

      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        disabled={disabled || loading}
        onChange={onUpload}
        className="hidden"
      />
    </div>
  );
}
