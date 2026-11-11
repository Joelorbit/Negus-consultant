import { X, CreditCard, Shield, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const PurchaseModal = ({ resource, isOpen, onClose }) => {
  if (!resource) return null;

  const handleViewPackages = () => {
    // In real implementation, navigate to /packages
    window.location.href = "/packages";
  };

  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 48,
    width: "100%",
    borderRadius: 10,
    border: "1px solid var(--ink)",
    background: "var(--ink)",
    color: "var(--paper)",
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md shadow-modal"
        style={{
          borderRadius: 18,
          padding: 24,
          background: "var(--white)",
          border: "1px solid var(--line)",
        }}
      >
        <DialogHeader
          className="flex-row items-start justify-between text-left"
          style={{ gap: 12 }}
        >
          <div className="flex-1">
            <DialogTitle
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: 6,
              }}
            >
              Get Premium Access
            </DialogTitle>
            <DialogDescription
              style={{ fontSize: 14, color: "var(--ink-muted)" }}
            >
              Unlock this resource and all premium content
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close purchase dialog"
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

        <div className="flex flex-col" style={{ gap: 18, paddingTop: 8 }}>
          {/* Resource Info */}
          <div
            style={{
              padding: 22,
              background: "var(--green-subtle)",
              border: "1px solid var(--line)",
              borderRadius: 14,
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: 6,
              }}
            >
              {resource.title}
            </h4>
            <p
              style={{
                fontSize: 14,
                color: "var(--ink-muted)",
                lineHeight: 1.55,
                marginBottom: 14,
              }}
            >
              {resource.description}
            </p>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>
                Single Resource
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--gold-ink)",
                }}
              >
                ₮{resource.price}
              </span>
            </div>
          </div>

          {/* Membership Option */}
          <div
            style={{
              padding: 22,
              border: "1px solid var(--line-strong)",
              borderRadius: 14,
              background: "var(--green-soft)",
            }}
          >
            <div
              className="flex items-start justify-between flex-wrap"
              style={{ gap: 8, marginBottom: 14 }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: 4,
                  }}
                >
                  Premium Membership
                </h4>
                <p style={{ fontSize: 14, color: "var(--ink-muted)" }}>
                  Access all premium resources
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                ₮500/mo
              </span>
            </div>
            <button
              type="button"
              onClick={handleViewPackages}
              style={sectionStyle}
            >
              <CreditCard className="h-4 w-4" />
              View Membership Plans
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col" style={{ gap: 14 }}>
            <div className="flex items-start" style={{ gap: 12 }}>
              <Shield
                className="shrink-0"
                style={{ width: 20, height: 20, color: "var(--primary)" }}
              />
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  Secure Payment
                </p>
                <p style={{ fontSize: 12.5, color: "var(--ink-muted)" }}>
                  All transactions are encrypted and secure
                </p>
              </div>
            </div>
            <div className="flex items-start" style={{ gap: 12 }}>
              <RefreshCw
                className="shrink-0"
                style={{ width: 20, height: 20, color: "var(--primary)" }}
              />
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  Money-Back Guarantee
                </p>
                <p style={{ fontSize: 12.5, color: "var(--ink-muted)" }}>
                  30-day refund policy on all purchases
                </p>
              </div>
            </div>
          </div>

          {/* Payment Note */}
          <div
            style={{
              padding: 16,
              background: "var(--yellow-soft)",
              borderRadius: 12,
            }}
          >
            <p
              className="text-center"
              style={{ fontSize: 12.5, color: "var(--gold-ink)" }}
            >
              For Ethiopian students: Payment via Payoneer or local transfer
              available
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
