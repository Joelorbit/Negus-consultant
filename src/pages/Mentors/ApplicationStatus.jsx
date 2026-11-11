import { useMyMentorApplication } from "../../hooks/useMentorApplications";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  CheckCircle2,
  Clock,
  FileText,
  Video,
  ExternalLink,
  AlertCircle,
  Calendar,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, isLoading, isError, error, refetch } = useMyMentorApplication();

  if (!token) {
    return (
      <Card className="border-dashed bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-background p-3 rounded-full shadow-sm mb-4">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Authentication Required</CardTitle>
          <CardDescription className="max-w-[250px] mt-2">
            Please log in to track your mentor application progress.
          </CardDescription>
          <Button
            className="mt-6 shadow-md"
            onClick={() =>
              navigate("/login", { state: { from: "/profile" } })
            }
          >
            Sign In to Account
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  const noApplication = error?.response?.status === 404;

  if (isError && !noApplication)
    return (
      <Card className="border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] shadow-sm">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--yellow-soft)] text-[var(--ink-secondary)]">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Mentor application status is unavailable.</p>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">Your account is fine. Try loading this section again.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>Try again</Button>
        </CardContent>
      </Card>
    );

  if (noApplication || !data?.data)
    return (
      <Card className="border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] shadow-sm">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--green-subtle)] text-[var(--green)]">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Mentor application</p>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">You have no active application. Start one whenever you are ready.</p>
          </div>
          <button type="button" className="public-button public-button-primary" onClick={() => navigate("/mentor/apply")}>
            Start application <ArrowRight aria-hidden="true" />
          </button>
        </CardContent>
      </Card>
    );

  const app = data.data;

  // SaaS Status Styling Logic
  const getStatusConfig = (status) => {
    const config = {
      pending: {
        color: "bg-[var(--yellow-soft)] text-[var(--ink-secondary)] border-[var(--line)]",
        icon: Clock,
      },
      approved: {
        color: "bg-[var(--green-subtle)] text-[var(--green)] border-[var(--line)]",
        icon: CheckCircle2,
      },
      rejected: {
        color: "bg-red-100 text-red-700 border-red-200",
        icon: AlertCircle,
      },
    };
    return config[status.toLowerCase()] || config.pending;
  };

  const statusConfig = getStatusConfig(app.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] shadow-sm">
        <div className={`h-1.5 w-full ${statusConfig.color.split(" ")[0]}`} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Mentor Application
            </CardTitle>
            <CardDescription>
              Submitted on{" "}
              {new Date(app.submitted_at).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </CardDescription>
          </div>
          <Badge
            className={`px-3 py-1 flex items-center gap-1.5 capitalize font-semibold border ${statusConfig.color}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {app.status}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Video Verification Section */}
          {app.video_verification && (
            <div className="rounded-xl border border-[var(--line)] bg-[var(--green-subtle)] p-5">
              <div className="mb-4 flex items-center gap-2 text-[var(--green)]">
                <Video className="h-5 w-5" />
                <h3 className="font-bold">Next Step: Video Interview</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-[var(--line)] bg-[var(--white)] p-2 shadow-sm">
                    <Calendar className="h-4 w-4 text-[var(--ink-muted)]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Scheduled Date
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(
                        app.video_verification.scheduled_at
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full bg-[var(--green)] text-white hover:opacity-90 md:w-auto"
                    asChild
                  >
                    <a
                      href={app.video_verification.meeting_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Meeting <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Documents Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-[var(--ink-muted)]" />
              <h3 className="font-semibold text-[var(--ink)]">
                Application Documents
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {Array.isArray(app.documents) &&
                app.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group flex items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--paper)]/50 p-3 transition-colors hover:bg-[var(--green-subtle)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-md border border-[var(--line)] bg-[var(--white)] p-2 transition-colors group-hover:border-[var(--green)]">
                        <FileText className="h-4 w-4 text-[var(--green)]" />
                      </div>
                      <span className="text-sm font-medium capitalize text-[var(--ink-secondary)]">
                        {doc.type.replace("_", " ")}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--green)] hover:bg-[var(--green-subtle)]"
                      asChild
                    >
                      <a href={doc.url} target="_blank" rel="noreferrer">
                        View File
                      </a>
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SaaS Help/Footer */}
      <p className="text-center text-xs text-muted-foreground">
        Need help? Contact our support team at{" "}
        <span className="text-primary cursor-pointer underline">
          support@negusconsultants.com
        </span>
      </p>
    </div>
  );
};

export default ApplicationStatus;
