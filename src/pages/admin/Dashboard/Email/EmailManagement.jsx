import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  Loader2,
  Mail,
  Users,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
const EmailManagement = () => {
  const [loading, setLoading] = useState(false);
  const [emailStats, setEmailStats] = useState(null);
  const [testEmail, setTestEmail] = useState("");
  const [testResult, setTestResult] = useState(null);

  // Email form states
  const [emailForm, setEmailForm] = useState({
    subject: "",
    content: "",
    type: "custom",
    targetType: "all", // all, role, specific
    roles: [],
    userIds: [],
  });

  const [result, setResult] = useState(null);

  // Load email statistics on component mount
  useEffect(() => {
    loadEmailStats();
  }, []);

  const loadEmailStats = async () => {
    try {
      const response = await axiosInstance.get("/email/stats");
      setEmailStats(response.data.data);
    } catch (error) {
      console.error("Error loading email stats:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEmailForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setEmailForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const sendTestEmail = async () => {
    if (!testEmail) {
      setTestResult({
        success: false,
        message: "Please enter a test email address",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/email/test", {
        testEmail,
      });
      setTestResult(response.data);
    } catch (error) {
      setTestResult({
        success: false,
        message: error.response?.data?.message || "Failed to send test email",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!emailForm.subject || !emailForm.content) {
      setResult({
        success: false,
        message: "Subject and content are required",
      });
      return;
    }

    setLoading(true);
    try {
      let endpoint = "/email/send-to-all";
      let payload = {
        subject: emailForm.subject,
        content: emailForm.content,
        type: emailForm.type,
      };

      if (emailForm.targetType === "role") {
        endpoint = "/email/send-by-role";
        payload.roles = emailForm.roles;
      } else if (emailForm.targetType === "specific") {
        endpoint = "/email/send-to-specific";
        payload.userIds = emailForm.userIds;
      }

      const response = await axiosInstance.post(endpoint, payload);
      setResult(response.data);

      // Refresh stats after sending
      loadEmailStats();
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || "Failed to send email",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmailForm({
      subject: "",
      content: "",
      type: "custom",
      targetType: "all",
      roles: [],
      userIds: [],
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Management</h1>
          <p className="text-gray-600">
            Send emails to users and manage communications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-blue-600" />
          <span className="text-sm text-gray-500">Email System</span>
        </div>
      </div>

      {/* Email Statistics */}
      {emailStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {emailStats.totalUsersWithEmail}
              </div>
              <p className="text-xs text-muted-foreground">
                Users with email addresses
              </p>
            </CardContent>
          </Card>

          {Object.entries(emailStats.usersByRole).map(([role, count]) => (
            <Card key={role}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {role}s
                </CardTitle>
                <Badge variant="secondary">{count}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">
                  Users with {role} role
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList>
          <TabsTrigger value="send">Send Email</TabsTrigger>
          <TabsTrigger value="test">Test Email</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Email to Users</CardTitle>
              <CardDescription>
                Create and send emails to all users, specific roles, or
                individual users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email Type */}
              <div className="space-y-2">
                <Label htmlFor="emailType">Email Type</Label>
                <Select
                  value={emailForm.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select email type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Email</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Type */}
              <div className="space-y-2">
                <Label htmlFor="targetType">Target Audience</Label>
                <Select
                  value={emailForm.targetType}
                  onValueChange={(value) =>
                    handleInputChange("targetType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="role">By Role</SelectItem>
                    <SelectItem value="specific">Specific Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Selection */}
              {emailForm.targetType === "role" && (
                <div className="space-y-2">
                  <Label>Select Roles</Label>
                  <div className="flex flex-wrap gap-2">
                    {["admin", "semiadmin", "member", "user"].map((role) => (
                      <Button
                        key={role}
                        variant={
                          emailForm.roles.includes(role) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleRoleChange(role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* User IDs */}
              {emailForm.targetType === "specific" && (
                <div className="space-y-2">
                  <Label htmlFor="userIds">User IDs (comma-separated)</Label>
                  <Input
                    id="userIds"
                    placeholder="1,2,3,4"
                    value={emailForm.userIds.join(",")}
                    onChange={(e) =>
                      handleInputChange(
                        "userIds",
                        e.target.value
                          .split(",")
                          .map((id) => id.trim())
                          .filter((id) => id)
                      )
                    }
                  />
                </div>
              )}

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={emailForm.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter email content (HTML supported)"
                  rows={8}
                  value={emailForm.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={sendEmail} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Reset Form
                </Button>
              </div>

              {/* Result */}
              {result && (
                <div className="flex items-center">
                  {result.success
                    ? toast.success(result.message)
                    : toast.success(result.message)}
                  {result.details && (
                    <div className="mt-2 text-sm">
                      <p>Total Recipients: {result.details.totalRecipients}</p>
                      <p>Successful: {result.details.successful}</p>
                      <p>Failed: {result.details.failed}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Email Configuration</CardTitle>
              <CardDescription>
                Send a test email to verify your email configuration is working
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testEmail">Test Email Address</Label>
                <Input
                  id="testEmail"
                  type="email"
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
              </div>

              <Button onClick={sendTestEmail} disabled={loading || !testEmail}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Test...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
                  </>
                )}
              </Button>

              {testResult && (
                <div className="flex items-center">
                  {testResult.success
                    ? toast.success(testResult.message)
                    : toast.success(testResult.message)}
                </div>
              )}
              {/* {testResult && (
                <Alert
                  className={
                    testResult.success
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }
                >
                  <div className="flex items-center">
                    {testResult.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className="ml-2">
                      {testResult.message}
                    </AlertDescription>
                  </div>
                </Alert>
              )} */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailManagement;



