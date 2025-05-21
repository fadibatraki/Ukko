"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, BookOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Required for styling

export function CatalogButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleViewCatalog = () => {
    if (isMobile) {
      // Show PDF Viewer on mobile
      setShowCatalog(true);
    } else {
      // Toggle showCatalog on desktop
      setShowCatalog((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex gap-3">
        <Button onClick={handleViewCatalog}>
          <BookOpenIcon className="mr-2 h-4 w-4" />
          {showCatalog ? "Hide Catalog" : "View Catalog"}
        </Button>

        <a
          href="/assets/pdf/CV-Fadi-Batraki.pdf"
          download
          className="inline-flex items-center bg-muted px-4 py-2 rounded-md hover:bg-muted/80 text-sm"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download PDF
        </a>
      </div>

      {/* Show PDF Viewer on Desktop */}
      {showCatalog && !isMobile && (
        <div className="w-full overflow-auto rounded-lg border sm:h-[600px] max-h-[80vh]">
          <iframe
            src="/assets/pdf/CV-Fadi-Batraki.pdf"
            className="w-full h-full min-h-[500px]"
            title="Product Catalog"
          />
        </div>
      )}

      {/* Mobile PDF Viewer with @react-pdf-viewer */}
      {showCatalog && isMobile && (
        <div className="w-full max-h-[80vh] overflow-auto">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
            <Viewer fileUrl="/assets/pdf/CV-Fadi-Batraki.pdf" />
          </Worker>
        </div>
      )}
    </div>
  );
}
