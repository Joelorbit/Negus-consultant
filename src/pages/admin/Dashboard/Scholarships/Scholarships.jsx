import React from "react";
import CreateScholarship from "./new/CreateScholarship";
import ScholarshipsTable from "./components/ScholarshipsTable";
import {
  useScholarships,
  useDeleteScholarship,
} from "../../../../hooks/useScholarships";
import { GraduationCap, Heart, MessageCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import "../admin-shell.css";

export default function Scholarships() {
  const { data, isLoading, isError, refetch } = useScholarships(1);
  const { mutate: deleteScholarship } = useDeleteScholarship();

  const scholarships = data?.scholarships || [];

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this scholarship listing?")) {
      deleteScholarship(id, {
        onSuccess: () => {
          toast.success("Scholarship deleted successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete scholarship");
        },
      });
    }
  };

  const totalLikes = scholarships.reduce((acc, s) => acc + (s.likes_count || 0), 0);
  const totalComments = scholarships.reduce((acc, s) => acc + (s.comments_count || 0), 0);

  return (
    <div className="admin-shell space-y-8">
      {/* Header */}
      <div className="admin-shell-header">
        <div>
          <h1>Scholarships Management</h1>
          <p>
            Publish, edit, and curate international scholarships and funding opportunities for scholars.
          </p>
        </div>
        <div className="admin-shell-actions">
          <CreateScholarship />
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Active Opportunities</span>
            <GraduationCap />
          </div>
          <p className="admin-kpi-value">{scholarships.length}</p>
          <p className="admin-kpi-hint">Verified global listings</p>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Student Likes</span>
            <Heart />
          </div>
          <p className="admin-kpi-value">{totalLikes}</p>
          <p className="admin-kpi-hint">Total student bookmarks & saves</p>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Questions & Q&A</span>
            <MessageCircle />
          </div>
          <p className="admin-kpi-value">{totalComments}</p>
          <p className="admin-kpi-hint">Inquiries from applicants</p>
        </div>

        <div className="admin-kpi-card is-ok">
          <div className="admin-kpi-label">
            <span>Catalog</span>
            <Calendar />
          </div>
          <p className="admin-kpi-value">Published</p>
          <p className="admin-kpi-hint">Synced with public catalog</p>
        </div>
      </div>

      {/* Main Table */}
      {isLoading ? (
        <div className="h-64 rounded-3xl border border-border/80 bg-muted/30 animate-pulse" />
      ) : isError ? (
        <div className="rounded-3xl border border-border/80 bg-card p-8 text-center text-sm text-destructive">
          Failed to load scholarships list.
        </div>
      ) : (
        <ScholarshipsTable scholarships={scholarships} onDelete={onDelete} />
      )}
    </div>
  );
}
