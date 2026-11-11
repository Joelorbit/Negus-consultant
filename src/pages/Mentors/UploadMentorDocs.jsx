import { useState } from "react";
import {
  useMyMentorApplication,
  useUploadMentorDocuments,
} from "../../hooks/useMentorApplications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileText,
  ShieldCheck,
  Upload,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  Info,
} from "lucide-react";

const UploadMentorDocs = () => {
  const navigate = useNavigate();
  const token = (() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  })();

  const { data } = useMyMentorApplication();
  const applicationId = data?.data?.id;
  const upload = useUploadMentorDocuments(applicationId);

  const [files, setFiles] = useState([
    { type: "acceptance_letter", file: null },
    { type: "student_id", file: null },
  ]);

  const handleFileChange = (idx) => (e) => {
    const file = e.target.files?.[0] || null;
    const next = [...files];
    next[idx] = { ...next[idx], file };
    setFiles(next);
  };

  const handleUpload = () => {
    if (!applicationId) return;
    const present = files.filter((f) => f.file);
    if (!present.length) return;

    upload.mutate({
      files: present.map((p) => p.file),
      types: present.map((p) => p.type),
    });
  };

  // Auth Guard Design
  if (!token) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-gray-50 rounded-full border shadow-sm">
            <Lock className="w-10 h-10 text-gray-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-3">Authentication Required</h1>
        <p className="text-muted-foreground mb-8">
          Please log in to your account to securely upload your verification
          documents.
        </p>
        <Button
          size="lg"
          className="w-full shadow-md"
          onClick={() =>
            navigate("/login", { state: { from: "/mentor/upload-docs" } })
          }
        >
          Sign In to Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Identity Verification
          </h1>
          <p className="text-muted-foreground">
            Provide proof of your academic status to activate your mentor
            profile.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure Upload
        </div>
      </div>

      {!applicationId && (
        <Card className="border-red-200 bg-red-50 shadow-none">
          <CardContent className="pt-6 flex items-center gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              No active application found. Please complete the initial
              application form before uploading documents.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {files.map((doc, idx) => (
          <Card
            key={idx}
            className="overflow-hidden border-none shadow-sm ring-1 ring-gray-200"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 bg-gray-50/50 border-r p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-3 bg-white rounded-xl shadow-sm border">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <Label className="text-xs font-bold uppercase tracking-widest text-gray-600">
                  {doc.type.replace("_", " ")}
                </Label>
              </div>
              <div className="flex-1 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">
                      Upload Document
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="h-11 focus-visible:ring-blue-500"
                      onChange={handleFileChange(idx)}
                    />
                  </div>
                  {doc.file && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Selected: {doc.file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Info className="w-4 h-4" />
          Only PDF, PNG, or JPG files up to 5MB are accepted.
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {upload.isSuccess && (
            <span className="text-emerald-600 text-sm font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2">
              <CheckCircle2 className="w-4 h-4" />
              Documents Saved
            </span>
          )}
          {upload.isError && (
            <span className="text-red-600 text-sm font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Save Failed
            </span>
          )}

          <Button
            size="lg"
            className="w-full sm:w-[180px] shadow-lg bg-blue-600 hover:bg-blue-700 transition-all"
            onClick={handleUpload}
            disabled={upload.isLoading || !applicationId}
          >
            {upload.isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Save Documents
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-dashed flex flex-col md:flex-row items-center gap-6">
        <div className="p-3 bg-white rounded-full border shadow-sm shrink-0">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
        </div>
        <div className="text-center md:text-left space-y-1">
          <p className="font-bold text-gray-900">Your data is secure</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All documents are encrypted and only accessible by our verification
            team. Once your profile is approved, these documents are moved to
            cold storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadMentorDocs;
