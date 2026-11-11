// src/pages/admin/Dashboard/CollegePayments/CollegePayments.jsx
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  usePendingPayments,
  useVerifyPayment,
  useRejectPayment,
} from "../../../../hooks/useNegusPayments";
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ZoomIn,
  ExternalLink,
  Receipt,
  FileCheck,
  Clock,
  RotateCw,
  Phone,
} from "lucide-react";
import "../admin-shell.css";

const ORDER_TYPE_LABELS = {
  essay_writing: "Essay Writing",
  essay_editing: "Essay Editing",
  essay_reviewing: "Essay Reviewing",
  recommendation_letter: "Recommendation Letter",
  financial_aid_form: "Financial Aid Form",
  common_app_support: "Common App Support",
  mentorship_package: "Mentorship Package",
  application_package: "Application Package",
};

const QUICK_REJECTION_REASONS = [
  "Screenshot is illegible or blurry",
  "Transferred amount does not match invoice total",
  "Duplicate payment screenshot or already verified",
  "Payment made to incorrect bank account number",
];

export default function CollegePayments() {
  const { data: rawPayments = [], isLoading, refetch } = usePendingPayments();
  const verifyPayment = useVerifyPayment();
  const rejectPayment = useRejectPayment();

  const [searchTerm, setSearchTerm] = useState("");
  const [previewSlipUrl, setPreviewSlipUrl] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredPayments = useMemo(() => {
    let result = Array.isArray(rawPayments) ? [...rawPayments] : [];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.user_name?.toLowerCase().includes(q) ||
          p.user_email?.toLowerCase().includes(q) ||
          p.contact_phone?.includes(q) ||
          p.invoice_description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [rawPayments, searchTerm]);

  const totalPendingEtb = filteredPayments.reduce(
    (sum, p) => sum + Number(p.amount_claimed_etb || 0),
    0
  );

  const handleVerify = async (paymentId) => {
    try {
      await verifyPayment.mutateAsync(paymentId);
      toast.success("Payment verified and invoice marked as settled!");
      if (previewSlipUrl) setPreviewSlipUrl(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't verify this payment");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      return toast.error("Please provide a reason for rejecting this payment");
    }
    try {
      await rejectPayment.mutateAsync({
        paymentId: rejectTarget.id,
        reason: rejectReason.trim(),
      });
      toast.success("Payment rejected with student notification sent");
      setRejectTarget(null);
      setRejectReason("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't reject this payment");
    }
  };

  return (
    <div className="admin-shell space-y-8">
      {/* Header */}
      <div className="admin-shell-header">
        <div>
          <h1>College Package Payments</h1>
          <p>
            Review and verify bank transfer receipts submitted against Ethiopian milestone invoices.
          </p>
        </div>
        <div className="admin-shell-actions">
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="rounded-xl border-border text-xs font-bold"
          >
            <RotateCw className="w-3.5 h-3.5 mr-2" />
            Refresh Queue
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="admin-kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div className="admin-kpi-card is-warn">
          <div className="admin-kpi-label">
            <span>Pending Verification</span>
            <Clock />
          </div>
          <p className="admin-kpi-value">{filteredPayments.length}</p>
          <p className="admin-kpi-hint">Screenshots awaiting admin approval</p>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Total Pending Value</span>
            <Receipt />
          </div>
          <p className="admin-kpi-value">
            {Number(totalPendingEtb).toLocaleString()} ETB
          </p>
          <p className="admin-kpi-hint">Claims pending deposit confirmation</p>
        </div>

        <div className="admin-kpi-card is-ok">
          <div className="admin-kpi-label">
            <span>Audit SLA</span>
            <FileCheck />
          </div>
          <p className="admin-kpi-value">&lt; 2 Hours</p>
          <p className="admin-kpi-hint">Target verification response time</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search pending payments by student name, email, phone, or invoice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 rounded-xl border-border bg-background text-xs"
          />
        </div>
      </div>

      {/* Payments Table */}
      {isLoading ? (
        <div className="h-64 rounded-3xl border border-border/80 bg-muted/30 animate-pulse" />
      ) : filteredPayments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card p-12 text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-foreground">Verification Queue Clear</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            All submitted payment receipts have been verified. New student transfer slips will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-border/60">
                <TableHead className="font-bold text-xs uppercase tracking-wider">Student Client</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Service & Invoice</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Amount Claimed</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Payment Receipt</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Submitted</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((p) => {
                const isAmountMismatch =
                  Number(p.amount_claimed_etb) !== Number(p.invoice_amount_etb);

                return (
                  <TableRow key={p.id} className="border-border/60 hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="font-bold text-xs text-foreground">{p.user_name}</div>
                      <div className="text-[11px] text-muted-foreground">{p.user_email}</div>
                      {p.contact_phone && (
                        <div className="text-[11px] font-mono text-primary flex items-center gap-1 mt-0.5">
                          <Phone className="h-3 w-3" /> {p.contact_phone}
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-xs font-semibold bg-muted/40 mb-1">
                        {ORDER_TYPE_LABELS[p.order_type] ?? p.order_type}
                      </Badge>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {p.invoice_description}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-extrabold text-foreground">
                          {Number(p.amount_claimed_etb).toLocaleString()} ETB
                        </span>
                        {isAmountMismatch ? (
                          <Badge variant="destructive" className="text-[10px] w-fit mt-0.5 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Invoice: {Number(p.invoice_amount_etb).toLocaleString()}
                          </Badge>
                        ) : (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Exact match
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <button
                        type="button"
                        onClick={() => setPreviewSlipUrl(p.screenshot_url)}
                        className="group relative block h-14 w-14 rounded-xl overflow-hidden border border-border shadow-sm hover:ring-2 hover:ring-primary focus:outline-none"
                      >
                        <img
                          src={p.screenshot_url}
                          alt="Slip receipt"
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ZoomIn className="h-4 w-4" />
                        </div>
                      </button>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(p.submitted_at).toLocaleString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerify(p.id)}
                          disabled={verifyPayment.isPending}
                          className="rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setRejectTarget(p);
                            setRejectReason("");
                          }}
                          className="rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 border-border"
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Slip High-Res Zoom Inspection Modal */}
      <Dialog open={!!previewSlipUrl} onOpenChange={(open) => !open && setPreviewSlipUrl(null)}>
        <DialogContent className="max-w-2xl rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-display">
              Payment Screenshot Inspection
            </DialogTitle>
          </DialogHeader>
          <div className="rounded-2xl border border-border overflow-hidden bg-black/5 flex items-center justify-center max-h-[70vh]">
            <img
              src={previewSlipUrl}
              alt="Payment receipt preview"
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>
          <DialogFooter className="flex items-center justify-between sm:justify-between pt-2">
            <a
              href={previewSlipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Open Original <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button
              onClick={() => setPreviewSlipUrl(null)}
              className="rounded-xl px-5 text-xs font-bold"
            >
              Done Inspecting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Modal with Quick Reason Chips */}
      <Dialog open={!!rejectTarget} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <DialogContent className="max-w-md rounded-3xl p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive font-display">
              Reject Payment Submission
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">
            Provide feedback for {rejectTarget?.user_name} so they can submit a valid bank receipt.
          </p>

          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">Common Reasons:</span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_REJECTION_REASONS.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRejectReason(r)}
                  className="rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-muted transition-colors border border-border/60 text-left"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-foreground">Specific Reason Note:</span>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. CBE Transaction reference not found in statement"
              className="rounded-xl text-xs"
              rows={3}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              onClick={() => setRejectTarget(null)}
              className="rounded-xl text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectPayment.isPending || !rejectReason.trim()}
              className="rounded-xl text-xs font-bold"
            >
              {rejectPayment.isPending ? "Rejecting…" : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
