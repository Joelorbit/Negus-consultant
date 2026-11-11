import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const modalBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  minHeight: 44,
  padding: "0 14px",
  borderRadius: 10,
  fontFamily: "var(--font-display)",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryBtn = {
  ...modalBtn,
  background: "var(--white)",
  color: "var(--ink)",
  border: "1px solid var(--line-strong)",
};

const primaryBtn = {
  ...modalBtn,
  background: "var(--ink)",
  color: "var(--paper)",
  border: "1px solid var(--ink)",
};

const disabledStyle = { opacity: 0.5, cursor: "default" };

export const PreviewModal = ({ resource, isOpen, onClose, onDownload }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Always call hooks first before returning anything
  const content = resource?.content || "";
  const maxPreviewPages = resource?.isFree || resource?.isPurchased ? 10 : 3;

  const pages = useMemo(() => {
    if (!content) return [];
    const chunkSize = 2500;
    const chunks = [];
    for (let i = 0; i < content.length; i += chunkSize) {
      chunks.push(content.slice(i, i + chunkSize));
    }
    return chunks;
  }, [content]);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(pages.length, p + 1));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource?.title,
        text: content,
        url: window.location.href,
      });
    }
  };

  // If resource is missing entirely, just don’t render the modal
  if (!resource) return null;

  const currentText = pages[currentPage - 1] || "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl h-[90vh] flex flex-col shadow-modal"
        style={{
          borderRadius: 18,
          padding: 24,
          background: "var(--white)",
          border: "1px solid var(--line)",
        }}
      >
        {/* Header */}
        <DialogHeader
          className="flex-row items-start justify-between text-left"
          style={{ borderBottom: "1px solid var(--line)", paddingBottom: 16 }}
        >
          <div className="flex-1" style={{ paddingRight: 16 }}>
            <DialogTitle
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: 8,
              }}
            >
              {resource.title}
            </DialogTitle>
            <p style={{ fontSize: 14, color: "var(--ink-muted)", margin: 0 }}>
              {resource.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            style={{
              width: 44,
              height: 44,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              border: "1px solid var(--line-strong)",
              background: "var(--white)",
              color: "var(--ink)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div
          className="flex-1 overflow-auto text-start select-text"
          style={{
            background: "var(--green-subtle)",
            borderRadius: 14,
            padding: 24,
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          <article
            className="prose max-w-none leading-relaxed"
            style={{
              fontSize: 15,
              color: "var(--ink)",
            }}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {currentText}
            </ReactMarkdown>
          </article>
        </div>

        {/* Controls */}
        <div
          className="flex items-center justify-between flex-wrap"
          style={{
            gap: 12,
            borderTop: "1px solid var(--line)",
            paddingTop: 16,
          }}
        >
          <div className="flex items-center" style={{ gap: 8 }}>
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                ...secondaryBtn,
                ...(currentPage === 1 ? disabledStyle : {}),
              }}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span
              style={{
                fontSize: 14,
                color: "var(--ink-muted)",
                padding: "0 12px",
              }}
            >
              Page {currentPage} of {Math.min(pages.length, maxPreviewPages)}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={
                currentPage === pages.length || currentPage === maxPreviewPages
              }
              style={{
                ...secondaryBtn,
                ...(currentPage === pages.length ||
                currentPage === maxPreviewPages
                  ? disabledStyle
                  : {}),
              }}
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center" style={{ gap: 8 }}>
            <button type="button" onClick={handleShare} style={secondaryBtn}>
              <Share2 className="h-4 w-4" /> Share
            </button>
            {(resource.isFree || resource.isPurchased) && (
              <button
                type="button"
                onClick={() => onDownload(resource)}
                style={primaryBtn}
              >
                <Download className="h-4 w-4" /> Download PDF
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
