// TeamDetails.tsx
import React from "react";
import { useParams, Link, Navigate, NavLink } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  BookOpen,
  GraduationCap,
  Award,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";
import { teamMembers } from "../Components/TeamSection";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export default function MentorDetails() {
  const { id } = useParams();
  const member = teamMembers.find((m) => String(m.id) === id);
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Mentor not found.</p>
      </div>
    );
  }

  // Normalize image path: items reference images like "./team1.png" which are
  // placed in the public folder. Convert leading "./" to "/" so the browser
  // requests e.g. "/team1.png" (served from client/public).
  const imageSrc = member.image?.startsWith("./")
    ? member.image.replace(/^\.\//, "/")
    : member.image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--card)] to-[var(--background)] dark:from-[var(--background)] dark:via-[var(--card)] dark:to-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-8 border border-[var(--border)] sticky top-8">
              <div className="text-center mb-8">
                <img
                  src={imageSrc}
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover object-center mx-auto mb-6 border-4 border-[var(--primary)]"
                />
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  {member.name}
                </h1>
                <p className="text-xl font-medium mb-2 text-[var(--primary)]">
                  {member.role}
                </p>
                <p className="text-[var(--muted-foreground)]">
                  {member.department}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-[var(--foreground)]">
                  <Calendar className="w-5 h-5 mr-3 text-[var(--primary)]" />
                  <span>{member.experience} of experience</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[var(--primary)]" />
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-[var(--primary)]" />
                About {member.name.split(" ")[1]}
              </h2>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
                {member.bio}
              </p>

              <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-xl p-6 border-l-4 border-[var(--primary)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">
                  Teaching Philosophy
                </h3>
                <p className="text-[var(--muted-foreground)] italic leading-relaxed">
                  {member.teachingPhilosophy}
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-[var(--primary)]" />
                Education
              </h2>
              <div className="space-y-4">
                {member.education.map((degree, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-[var(--muted-foreground)]">{degree}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses Taught */}
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-[var(--primary)]" />
                Courses Taught
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {member.courses.map((course, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[var(--background)] dark:bg-[var(--card)] rounded-lg border border-[var(--border)]"
                  >
                    <p className="text-[var(--foreground)] font-medium">
                      {course}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl shadow-lg p-8 border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-[var(--primary)]" />
                Achievements & Recognition
              </h2>
              <div className="space-y-4">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-[var(--muted-foreground)]">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-[var(--primary)] dark:bg-[var(--primary)] rounded-2xl shadow-lg p-8 text-[var(--primary-foreground)]">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-[var(--primary-foreground)]/80 mb-6">
                Have questions about courses or want to discuss research
                opportunities?
                {member.name.split(" ")[1]} is always happy to connect with
                students and colleagues.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/packages/39b3b3c4-2ca9-4a66-b21c-8e708a0dd523">
                  <Button variant="outline" className="text-black">
                    Book 1-3 month mentorship with {member.name}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
