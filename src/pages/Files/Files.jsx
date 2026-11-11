import { useState } from "react";
import { Hero } from "./Components/Hero";
import { ResourceCard } from "./Components/ResourceCard";
import { PreviewModal } from "./Components/PreviewModal";
import { PurchaseModal } from "./Components/PurchaseModal";
import { sampleResources } from "../../assets/data";
import { toast } from "sonner";

const Files = () => {
  const [previewResource, setPreviewResource] = useState(null);
  const [purchaseResource, setPurchaseResource] = useState(null);

  const totalResources = sampleResources.length;
  const freeResources = sampleResources.filter((r) => r.isFree).length;

  const handlePreview = (resource) => {
    setPreviewResource(resource);
  };

  const handleDownload = (resource) => {
    toast.success("Download Started");

    if (!resource.fileUrl) {
      console.error("No file URL provided for", resource.title);
      return;
    }

    const link = document.createElement("a");
    link.href = resource.path;
    link.download = resource.title || "download"; // name of the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePurchase = (resource) => {
    setPurchaseResource(resource);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero totalResources={totalResources} freeResources={freeResources} />

      {/* Resources Grid */}
      <section
        className="mx-auto"
        style={{
          width: "min(100% - 48px, 1160px)",
          paddingTop: 56,
          paddingBottom: 56,
        }}
      >
        <div
          className="flex items-center justify-between flex-wrap mb-6"
          style={{ gap: 8 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            {totalResources} {totalResources === 1 ? "Resource" : "Resources"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", margin: 0 }}>
            {freeResources} free and {totalResources - freeResources} premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] md:gap-6">
          {sampleResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onPreview={handlePreview}
              onDownload={handleDownload}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </section>

      {/* Modals */}
      <PreviewModal
        resource={previewResource}
        isOpen={!!previewResource}
        onClose={() => setPreviewResource(null)}
        onDownload={handleDownload}
      />

      <PurchaseModal
        resource={purchaseResource}
        isOpen={!!purchaseResource}
        onClose={() => setPurchaseResource(null)}
      />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          marginTop: 64,
          padding: "32px 0",
        }}
      >
        <div
          className="mx-auto text-center"
          style={{ width: "min(100% - 48px, 1160px)" }}
        >
          <p style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.7 }}>
            All resources are designed to support your scholarship journey.
            <br />
            Questions? Contact us for assistance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Files;
