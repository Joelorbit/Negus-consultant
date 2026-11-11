import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Search,
  ExternalLink,
  Trash2,
  Calendar,
  Building2,
  Globe2,
  Heart,
  MessageCircle,
} from "lucide-react";
import EditScholarship from "../edit/EditScholarship";

export default function ScholarshipsTable({ scholarships = [], onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredScholarships = useMemo(() => {
    if (!searchTerm.trim()) return scholarships;
    const q = searchTerm.toLowerCase();
    return scholarships.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.university?.toLowerCase().includes(q) ||
        s.country?.toLowerCase().includes(q)
    );
  }, [scholarships, searchTerm]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search scholarships by title, university, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 rounded-xl border-border bg-background text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="border-border/60">
              <TableHead className="font-bold text-xs uppercase tracking-wider">Opportunity</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Institution & Region</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Deadline</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Official Link</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-center">Engagement</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredScholarships.map((s) => {
              const deadlineDate = s.deadline ? new Date(s.deadline) : null;
              const isExpired = deadlineDate && deadlineDate < new Date();

              return (
                <TableRow key={s.id} className="border-border/60 hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                        <img
                          src={s.image_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&auto=format&fit=crop&q=80"}
                          alt={s.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-xs text-foreground truncate">{s.title}</p>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      {s.university || "International"}
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Globe2 className="h-3 w-3" />
                      {s.country || "Worldwide"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-mono font-medium text-foreground">
                        {deadlineDate ? deadlineDate.toLocaleDateString() : "Rolling"}
                      </span>
                    </div>
                    {isExpired && (
                      <Badge variant="destructive" className="text-[10px] py-0 px-1.5 mt-0.5">
                        Expired
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    {s.link ? (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                      >
                        Portal <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1" title="Likes">
                        <Heart className="h-3 w-3 text-rose-500 fill-rose-500/20" />
                        {s.likes_count ?? 0}
                      </span>
                      <span className="flex items-center gap-1" title="Comments">
                        <MessageCircle className="h-3 w-3 text-primary" />
                        {s.comments_count ?? 0}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <EditScholarship scholarship={s} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(s.id)}
                        className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Delete scholarship"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
