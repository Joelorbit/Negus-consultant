import { useState } from "react";
import {
  useAdminListMentorApplications,
  useAdminScheduleVerification,
  useAdminApproveMentorApplication,
  useAdminRejectMentorApplication,
} from "../../../../hooks/useMentorAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Calendar,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Info,
  Clock,
  ExternalLink,
  FileText,
  Video,
} from "lucide-react";
import axiosInstance from "../../../../lib/axiosInstance";

import { useAdminListMentorDocuments } from "../../../../hooks/useMentorAdmin";
import { formatBookingTime } from "../../../../utils/timeZone";
const DocumentList = ({ applicationId }) => {
  const { data } = useAdminListMentorDocuments(applicationId);
  const docs = data?.data || [];

  if (!docs.length)
    return (
      <p className="text-xs text-muted-foreground">No documents uploaded.</p>
    );

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-xs"
        >
          <div className="flex items-center gap-2">
            {doc.type === "intro_video" ? (
              <Video className="w-3.5 h-3.5 text-purple-600" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span className="font-medium capitalize">
              {doc.type === "intro_video"
                ? "Verification Video"
                : String(doc.type || "document").replace("_", " ")}
            </span>
            {doc.metadata?.originalName && (
              <span className="text-[11px] text-muted-foreground">
                ({doc.metadata.originalName})
              </span>
            )}
          </div>
          <button
            className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 hover:underline"
            onClick={async () => {
              try {
                const res = await axiosInstance.get(
                  `/mentors/admin/documents/${doc.id}`,
                  {
                    responseType: "blob",
                  },
                );
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const a = document.createElement("a");
                a.href = url;
                a.download = doc.metadata?.originalName || `document-${doc.id}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error(err);
                alert("Failed to download document");
              }
            }}
          >
            <ExternalLink className="w-3 h-3" /> Download
          </button>
        </div>
      ))}
    </div>
  );
};

const MentorApplications = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const { data, isLoading } = useAdminListMentorApplications(
    statusFilter || undefined,
  );
  const viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Keep existing state logic
  const [scheduleForm, setScheduleForm] = useState({});
  const [approveForm, setApproveForm] = useState({});
  const [rejectNotes, setRejectNotes] = useState({});

  const scheduleMutation = useAdminScheduleVerification();
  const approveMutation = useAdminApproveMentorApplication();
  const rejectMutation = useAdminRejectMentorApplication();

  const apps = data?.data || [];

  const toLabel = (key) =>
    String(key)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const renderValue = (value, key) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">—</span>;
    }

    if (typeof value === "boolean") {
      return value ? (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
          Yes
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-50 text-red-700">
          No
        </Badge>
      );
    }

    if (typeof value === "number") {
      return <span className="font-medium text-foreground">{value}</span>;
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed ? (
        <span className="text-foreground break-words">{trimmed}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-muted-foreground">—</span>;
      }

      const allPrimitive = value.every(
        (v) =>
          v === null ||
          v === undefined ||
          ["string", "number", "boolean"].includes(typeof v),
      );

      if (allPrimitive) {
        return (
          <div className="flex flex-wrap gap-2">
            {value
              .filter((v) => v !== null && v !== undefined && String(v).trim())
              .map((v, idx) => (
                <Badge key={idx} variant="secondary" className="capitalize">
                  {String(v)}
                </Badge>
              ))}
          </div>
        );
      }

      return (
        <div className="space-y-2">
          {value.map((item, idx) => (
            <div
              key={idx}
              className="rounded-md border bg-background p-3 text-sm"
            >
              {typeof item === "object" && item !== null ? (
                <div className="grid gap-2">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-12 gap-3">
                      <div className="col-span-4 text-xs font-semibold text-muted-foreground">
                        {toLabel(k)}
                      </div>
                      <div className="col-span-8">{renderValue(v, k)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                renderValue(item)
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return <span className="text-muted-foreground">—</span>;
      }

      // Special handling for availability object from mentor application form
      if (key === "availability") {
        const days = Array.isArray(value.days)
          ? value.days.join(", ")
          : value.days;
        const slots = Array.isArray(value.slots) ? value.slots : [];

        return (
          <div className="space-y-2 text-sm">
            {days && (
              <div>
                <span className="font-semibold">Days:&nbsp;</span>
                <span className="text-muted-foreground">{days}</span>
              </div>
            )}
            {slots.length > 0 && (
              <div className="space-y-1">
                <div className="font-semibold">Time Window:</div>
                {slots.map((slot, idx) => {
                  const from = slot?.from;
                  const to = slot?.to;

                  if (!from || !to) {
                    return null;
                  }

                  // Build a dummy ISO date so we can reuse formatBookingTime
                  const today = new Date().toISOString().slice(0, 10);
                  const fromIso = `${today}T${from}`;
                  const toIso = `${today}T${to}`;

                  return (
                    <div key={idx} className="text-muted-foreground">
                      {formatBookingTime(fromIso, viewerTimezone)}
                      {"  →  "}
                      {formatBookingTime(toIso, viewerTimezone)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      return (
        <div className="grid gap-2">
          {entries.map(([k, v]) => (
            <div key={k} className="grid grid-cols-12 gap-3">
              <div className="col-span-4 text-xs font-semibold text-muted-foreground">
                {toLabel(k)}
              </div>
              <div className="col-span-8">{renderValue(v, k)}</div>
            </div>
          ))}
        </div>
      );
    }

    return <span className="text-muted-foreground">—</span>;
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      scheduled: "bg-blue-100 text-blue-700 border-blue-200",
      approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <Badge variant="outline" className={`${styles[status] || ""} capitalize`}>
        {status}
      </Badge>
    );
  };

  // Original Logic Handlers (Unchanged)
  const schedule = (id) => {
    const form = scheduleForm[id] || {};
    if (!form.scheduled_at || !form.meeting_link) return;
    scheduleMutation.mutate({ id, ...form });
  };

  const approve = (id) => {
    const form = approveForm[id] || {};
    const skills = (form.skills_csv || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    approveMutation.mutate({
      id,
      headline: form.headline || null,
      bio: form.bio || null,
      availability: form.availability_json || null,
      hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : null,
      visibility: form.visibility !== false,
      skills,
      notes: form.notes || null,
    });
  };

  const reject = (id) => {
    rejectMutation.mutate({ id, notes: rejectNotes[id] || null });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Mentor Applications
          </h1>
          <p className="text-muted-foreground text-sm">
            Review, schedule, and verify new mentor applicants.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by status..."
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-64 pl-9"
          />
        </div>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-gray-200">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[250px]">Applicant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Data</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  Loading applications...
                </TableCell>
              </TableRow>
            )}

            {apps.map((app) => (
              <>
                <TableRow key={app.id} className="group hover:bg-gray-50/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {app.first_name} {app.last_name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {app.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{getStatusBadge(app.status)}</TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs gap-1.5"
                      onClick={() =>
                        setExpandedId((current) =>
                          current === app.id ? null : app.id,
                        )
                      }
                    >
                      <Info className="w-3.5 h-3.5" />
                      {expandedId === app.id ? "Hide Form" : "View Form"}
                    </Button>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Schedule Action */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            Schedule
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-blue-600" />{" "}
                              Schedule Interview
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase">
                                Date & Time
                              </label>
                              <Input
                                type="datetime-local"
                                value={scheduleForm[app.id]?.scheduled_at || ""}
                                onChange={(e) =>
                                  setScheduleForm((s) => ({
                                    ...s,
                                    [app.id]: {
                                      ...(s[app.id] || {}),
                                      scheduled_at: e.target.value,
                                    },
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase">
                                Meeting Link
                              </label>
                              <Input
                                placeholder="https://zoom.us/j/..."
                                value={scheduleForm[app.id]?.meeting_link || ""}
                                onChange={(e) =>
                                  setScheduleForm((s) => ({
                                    ...s,
                                    [app.id]: {
                                      ...(s[app.id] || {}),
                                      meeting_link: e.target.value,
                                    },
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              className="w-full"
                              onClick={() => schedule(app.id)}
                            >
                              Send Invitation
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Approve Action */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="h-8 bg-emerald-600 hover:bg-emerald-700"
                          >
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />{" "}
                              Approve & Set Profile
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Input
                              placeholder="Headline"
                              value={approveForm[app.id]?.headline || ""}
                              onChange={(e) =>
                                setApproveForm((s) => ({
                                  ...s,
                                  [app.id]: {
                                    ...(s[app.id] || {}),
                                    headline: e.target.value,
                                  },
                                }))
                              }
                            />
                            <Input
                              type="number"
                              placeholder="Hourly Rate ($)"
                              value={approveForm[app.id]?.hourly_rate || ""}
                              onChange={(e) =>
                                setApproveForm((s) => ({
                                  ...s,
                                  [app.id]: {
                                    ...(s[app.id] || {}),
                                    hourly_rate: e.target.value,
                                  },
                                }))
                              }
                            />
                            <Input
                              placeholder="Skills (comma separated)"
                              value={approveForm[app.id]?.skills_csv || ""}
                              onChange={(e) =>
                                setApproveForm((s) => ({
                                  ...s,
                                  [app.id]: {
                                    ...(s[app.id] || {}),
                                    skills_csv: e.target.value,
                                  },
                                }))
                              }
                            />
                            <Input
                              placeholder="Notes for the mentor"
                              value={approveForm[app.id]?.notes || ""}
                              onChange={(e) =>
                                setApproveForm((s) => ({
                                  ...s,
                                  [app.id]: {
                                    ...(s[app.id] || {}),
                                    notes: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                          <DialogFooter>
                            <Button
                              className="w-full bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => approve(app.id)}
                            >
                              Finalize Approval
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Reject Action */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Application</DialogTitle>
                          </DialogHeader>
                          <div className="py-4 space-y-3">
                            <label className="text-sm font-medium">
                              Rejection Reason
                            </label>
                            <Input
                              placeholder="Provide feedback for the applicant..."
                              value={rejectNotes[app.id] || ""}
                              onChange={(e) =>
                                setRejectNotes((s) => ({
                                  ...s,
                                  [app.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => reject(app.id)}
                            >
                              Reject Application
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>

                {expandedId === app.id && (
                  <TableRow key={`${app.id}-details`} className="bg-gray-50/30">
                    <TableCell colSpan={4} className="p-0">
                      <div className="p-4">
                        <Card className="border-none shadow-sm ring-1 ring-gray-200">
                          <CardContent className="p-5">
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="text-sm font-semibold text-foreground">
                                    Application Form Details
                                  </div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="font-medium text-foreground">
                                      {app.first_name} {app.last_name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      •
                                    </span>
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>{app.email}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(app.status)}
                                </div>
                              </div>

                              <div className="rounded-lg border bg-background p-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {app.form_data &&
                                    Object.entries(app.form_data).map(
                                      ([key, value]) => (
                                        <div key={key} className="space-y-1">
                                          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                            {toLabel(key)}
                                          </div>
                                          <div className="text-sm">
                                            {renderValue(value)}
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  {!app.form_data && (
                                    <div className="text-sm text-muted-foreground">
                                      No form data available.
                                    </div>
                                  )}
                                </div>

                                <div className="pt-3 border-t mt-2">
                                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                                    Documents
                                  </div>
                                  <DocumentList applicationId={app.id} />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>

        {apps.length === 0 && !isLoading && (
          <div className="p-20 text-center flex flex-col items-center gap-2">
            <Clock className="w-10 h-10 text-gray-300" />
            <p className="text-gray-500 font-medium">
              No mentor applications found.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MentorApplications;
