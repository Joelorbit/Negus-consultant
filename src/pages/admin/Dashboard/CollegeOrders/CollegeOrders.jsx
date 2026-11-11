// src/pages/admin/Dashboard/CollegeOrders/CollegeOrders.jsx
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
import { toast } from "sonner";
import {
  useAdminOrders,
  useOrder,
  useGenerateNextRoundInvoice,
} from "../../../../hooks/useNegusOrders";
import {
  Search,
  Download,
  Receipt,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Phone,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import "../admin-shell.css";

const STATUS_FILTERS = [
  { value: "", label: "All Orders" },
  { value: "pending_payment", label: "Pending Payment" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_VARIANT = {
  draft: "secondary",
  pending_payment: "outline",
  in_progress: "default",
  completed: "secondary",
  cancelled: "destructive",
};

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

export default function CollegeOrders() {
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const { data: rawOrders = [], isLoading, refetch } = useAdminOrders(status || undefined);

  // Client-side search and filtering
  const filteredOrders = useMemo(() => {
    let result = Array.isArray(rawOrders) ? [...rawOrders] : [];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.id?.toLowerCase().includes(q) ||
          o.user_name?.toLowerCase().includes(q) ||
          o.user_email?.toLowerCase().includes(q) ||
          o.contact_phone?.includes(q) ||
          o.order_type?.toLowerCase().includes(q)
      );
    }

    if (orderTypeFilter !== "all") {
      result = result.filter((o) => o.order_type === orderTypeFilter);
    }

    return result;
  }, [rawOrders, searchTerm, orderTypeFilter]);

  // Metric summaries
  const totalVolumeEtb = (rawOrders || []).reduce((sum, o) => {
    const orderSum = (o.invoices || []).reduce((acc, inv) => acc + Number(inv.amount_etb || 0), 0);
    return sum + orderSum;
  }, 0);

  const inProgressCount = (rawOrders || []).filter((o) => o.status === "in_progress").length;
  const pendingPaymentCount = (rawOrders || []).filter((o) => o.status === "pending_payment").length;

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const exportOrdersCSV = () => {
    const headers = ["Order ID", "Client Name", "Email", "Phone", "Order Type", "Status", "Date", "Total ETB"];
    const rows = filteredOrders.map((o) => {
      const totalEtb = (o.invoices || []).reduce((acc, inv) => acc + Number(inv.amount_etb || 0), 0);
      return [
        o.id,
        o.user_name || "Applicant",
        o.user_email || "",
        o.contact_phone || "",
        ORDER_TYPE_LABELS[o.order_type] || o.order_type,
        o.status,
        new Date(o.created_at).toLocaleDateString(),
        totalEtb,
      ];
    });

    const csvContent = [headers, ...rows].map((e) => e.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Negus_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-shell space-y-8">
      {/* Header */}
      <div className="admin-shell-header">
        <div>
          <h1>College Package Orders</h1>
          <p>
            Track student admissions requests, milestone invoices, essay orders, and mentorship packages.
          </p>
        </div>
        <div className="admin-shell-actions">
          <Button
            variant="outline"
            onClick={exportOrdersCSV}
            className="rounded-xl border-border text-xs font-bold"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => refetch()}
            variant="ghost"
            className="rounded-xl text-xs font-bold"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Total Orders</span>
            <Receipt />
          </div>
          <p className="admin-kpi-value">{rawOrders.length}</p>
          <p className="admin-kpi-hint">All time client orders</p>
        </div>

        <div className="admin-kpi-card is-ok">
          <div className="admin-kpi-label">
            <span>In Progress</span>
            <Clock />
          </div>
          <p className="admin-kpi-value">{inProgressCount}</p>
          <p className="admin-kpi-hint">Active application cycles</p>
        </div>

        <div className="admin-kpi-card is-warn">
          <div className="admin-kpi-label">
            <span>Pending Payment</span>
            <AlertCircle />
          </div>
          <p className="admin-kpi-value">{pendingPaymentCount}</p>
          <p className="admin-kpi-hint">Awaiting proof of transfer</p>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Total Order Value</span>
            <TrendingUp />
          </div>
          <p className="admin-kpi-value">
            {totalVolumeEtb > 0 ? `${(totalVolumeEtb / 1000).toFixed(0)}k ETB` : "0 ETB"}
          </p>
          <p className="admin-kpi-hint">Pipeline gross value</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by order ID, student name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 rounded-xl border-border bg-background text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none"
            >
              <option value="all">All Service Types</option>
              <option value="application_package">Application Package</option>
              <option value="mentorship_package">Mentorship</option>
              <option value="essay_writing">Essay Writing</option>
              <option value="essay_editing">Essay Editing</option>
              <option value="common_app_support">Common App Support</option>
              <option value="financial_aid_form">Financial Aid Form</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
          {STATUS_FILTERS.map((f) => {
            const isActive = status === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setStatus(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="h-64 rounded-3xl border border-border/80 bg-muted/30 animate-pulse" />
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card p-12 text-center space-y-3">
          <Receipt className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-bold text-foreground">No orders found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No orders match the selected filters. Try choosing a different status filter or resetting your search.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-border/60">
                <TableHead className="font-bold text-xs uppercase tracking-wider">Order ID</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Client</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Service Type</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Created</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Invoices & Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const isExpanded = expandedId === order.id;
                const totalEtb = (order.invoices || []).reduce((acc, inv) => acc + Number(inv.amount_etb || 0), 0);

                return (
                  <React.Fragment key={order.id}>
                    <TableRow className="border-border/60 hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono text-xs font-bold text-foreground">
                        <div className="flex items-center gap-1.5">
                          <span>{order.id?.slice(0, 10)}…</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(order.id, "Order ID")}
                            className="text-muted-foreground hover:text-foreground"
                            title="Copy full ID"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="font-bold text-xs text-foreground">
                          {order.user_name || "Applicant"}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {order.user_email}
                        </div>
                        {order.contact_phone && (
                          <div className="text-[11px] font-mono text-primary flex items-center gap-1 mt-0.5">
                            <Phone className="h-3 w-3" /> {order.contact_phone}
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="text-xs font-semibold bg-muted/40">
                          {ORDER_TYPE_LABELS[order.order_type] ?? order.order_type}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={STATUS_VARIANT[order.status] ?? "outline"}
                          className="capitalize text-xs font-bold"
                        >
                          {order.status?.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className="text-xs font-extrabold text-foreground font-mono">
                            {Number(totalEtb).toLocaleString()} ETB
                          </span>
                          <Button
                            size="sm"
                            variant={isExpanded ? "default" : "outline"}
                            className="rounded-xl text-xs font-bold px-3 py-1"
                            onClick={() => setExpandedId(isExpanded ? null : order.id)}
                          >
                            {isExpanded ? "Hide Details" : "View Breakdown"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Detailed Invoice Breakdown Panel */}
                    {isExpanded && (
                      <TableRow className="border-border/60 bg-muted/20">
                        <TableCell colSpan={6} className="p-6">
                          <OrderDetailPanel orderId={order.id} orderType={order.order_type} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function OrderDetailPanel({ orderId, orderType }) {
  const { data: order, isLoading } = useOrder(orderId);
  const generateRound = useGenerateNextRoundInvoice();

  if (isLoading) return <div className="h-24 animate-pulse rounded-2xl bg-muted/60" />;
  if (!order) return null;

  const invoices = [...(order.invoices ?? [])].sort(
    (a, b) => (a.round_number ?? 0) - (b.round_number ?? 0)
  );

  const lastRoundInvoice = invoices.filter((i) => i.round_number).slice(-1)[0];
  const nextRoundNumber = lastRoundInvoice ? lastRoundInvoice.round_number + 1 : null;
  const canGenerateNextRound =
    orderType === "application_package" &&
    lastRoundInvoice?.status === "verified" &&
    nextRoundNumber &&
    nextRoundNumber <= 3;

  const handleGenerateRound = async () => {
    try {
      await generateRound.mutateAsync({
        orderId,
        roundNumber: nextRoundNumber,
      });
      toast.success(`Round ${nextRoundNumber} milestone invoice generated!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't generate the next round invoice.");
    }
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h4 className="text-base font-bold text-foreground font-display">
            Milestone Invoices & Payment Schedule
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Order Reference: <span className="font-mono">{order.id}</span>
          </p>
        </div>
        {canGenerateNextRound && (
          <Button
            size="sm"
            onClick={handleGenerateRound}
            disabled={generateRound.isPending}
            className="rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
          >
            {generateRound.isPending ? "Generating…" : `Generate Round ${nextRoundNumber} Invoice`}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {inv.round_number && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary">
                    Round {inv.round_number}
                  </span>
                )}
                <span className="text-xs font-bold text-foreground">{inv.description}</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">ID: {inv.id}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-extrabold text-foreground font-mono">
                {Number(inv.amount_etb).toLocaleString()} ETB
              </span>
              <Badge
                variant={inv.status === "verified" ? "default" : "outline"}
                className="capitalize text-xs font-bold"
              >
                {inv.status?.replace("_", " ")}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
