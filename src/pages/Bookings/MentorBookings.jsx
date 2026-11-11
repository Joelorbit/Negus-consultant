import React, { useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Video,
  User,
  Mail,
} from "lucide-react";
import {
  useMentorBookings,
  useAcceptBooking,
  useRejectBooking,
  useConfirmBooking,
  useCancelBooking,
  useCompleteBooking,
} from "../../hooks/useMentorBooking";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { toast } from "sonner";
import { useMyMentorProfile } from "../../hooks/useMentorApplications";
import ChatRoom from "../../components/ChatRoom";
import { MessageSquare } from "lucide-react";
import { formatBookingTime } from "../../utils/timeZone";

const MentorBookings = () => {
  const { data: mentorProfile } = useMyMentorProfile();
  const mentor_profile_id = mentorProfile?.data?.id;

  const { data: bookings, isLoading } = useMentorBookings(mentor_profile_id);
  const { mutate: acceptBooking, isPending: accepting } = useAcceptBooking();
  const { mutate: rejectBooking, isPending: rejecting } = useRejectBooking();
  const { mutate: confirmBooking, isPending: confirming } = useConfirmBooking();
  const { mutate: cancelBooking, isPending: cancelling } = useCancelBooking();
  const { mutate: completeBooking, isPending: completing } =
    useCompleteBooking();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const getStatusColor = (status) => {
    const colors = {
      REQUESTED: "bg-yellow-100 text-yellow-800",
      PAYMENT_PENDING: "bg-blue-100 text-blue-800",
      BOOKED: "bg-purple-100 text-purple-800",
      CONFIRMED: "bg-green-100 text-green-800",
      COMPLETED: "bg-gray-100 text-gray-800",
      CANCELLED: "bg-red-100 text-red-800",
      REFUNDED: "bg-orange-100 text-orange-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    if (status === "COMPLETED" || status === "CONFIRMED") {
      return <CheckCircle className="w-4 h-4" />;
    }
    if (status === "CANCELLED" || status === "REFUNDED") {
      return <XCircle className="w-4 h-4" />;
    }
    return <AlertCircle className="w-4 h-4" />;
  };

  const viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleAccept = (booking) => {
    acceptBooking(booking.id, {
      onSuccess: () => {
        toast.success("Booking accepted");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to accept booking",
        );
      },
    });
  };

  const handleReject = () => {
    if (!selectedBooking) return;

    rejectBooking(
      { booking_id: selectedBooking.id, reason: rejectReason },
      {
        onSuccess: () => {
          toast.success("Booking rejected");
          setShowRejectModal(false);
          setRejectReason("");
          setSelectedBooking(null);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to reject booking",
          );
        },
      },
    );
  };

  const handleConfirm = () => {
    if (!selectedBooking || !meetingLink) {
      return toast.error("Please provide a meeting link");
    }

    confirmBooking(
      { booking_id: selectedBooking.id, meeting_link: meetingLink },
      {
        onSuccess: () => {
          toast.success("Booking confirmed");
          setShowConfirmModal(false);
          setMeetingLink("");
          setSelectedBooking(null);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to confirm booking",
          );
        },
      },
    );
  };

  const handleCancel = (booking) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this booking? If payment was made, it will be refunded to the student's wallet.",
      )
    ) {
      return;
    }

    cancelBooking(
      { booking_id: booking.id, reason: "Mentor cancelled" },
      {
        onSuccess: (data) => {
          toast.success(
            data.refunded
              ? "Booking cancelled and refunded"
              : "Booking cancelled",
          );
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to cancel booking",
          );
        },
      },
    );
  };

  const handleComplete = (booking) => {
    completeBooking(booking.id, {
      onSuccess: () => {
        toast.success("Session marked as completed");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to complete booking",
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (!mentor_profile_id) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            No Mentor Profile Found
          </h3>
          <p className="text-yellow-700">
            Please complete your mentor profile to view bookings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your mentorship session bookings</p>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-500">
            You don't have any booking requests yet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Booking Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {booking.student_first_name?.[0]}
                      {booking.student_last_name?.[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {booking.student_first_name} {booking.student_last_name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>{booking.student_email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {booking.topic && (
                      <p className="text-gray-700">
                        <span className="font-medium">Topic:</span>{" "}
                        {booking.topic}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {booking.scheduled_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatBookingTime(
                              booking.scheduled_at,
                              booking.mentor_timezone ||
                                booking.student_timezone ||
                                viewerTimezone,
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.duration_minutes || 60} minutes</span>
                      </div>
                      {booking.hourly_rate && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>
                            {booking.hourly_rate} {booking.currency || "ETB"}
                          </span>
                        </div>
                      )}
                    </div>

                    {booking.meeting_link && (
                      <a
                        href={booking.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Meeting Link
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Status & Actions */}
                <div className="flex flex-col items-end gap-3">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status,
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    {booking.status.replace(/_/g, " ")}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {booking.status === "REQUESTED" && (
                      <>
                        <Button
                          onClick={() => handleAccept(booking)}
                          disabled={accepting}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowRejectModal(true);
                          }}
                          disabled={rejecting}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}

                    {booking.status === "BOOKED" && (
                      <>
                        <Button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowChatModal(true);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowConfirmModal(true);
                          }}
                          disabled={confirming}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Confirm & Add Link
                        </Button>
                      </>
                    )}

                    {booking.status === "CONFIRMED" && (
                      <Button
                        onClick={() => handleComplete(booking)}
                        disabled={completing}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}

                    {[
                      "REQUESTED",
                      "PAYMENT_PENDING",
                      "BOOKED",
                      "CONFIRMED",
                    ].includes(booking.status) && (
                      <Button
                        variant="outline"
                        onClick={() => handleCancel(booking)}
                        disabled={cancelling}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Booking Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Add the meeting link (Zoom, Google Meet, etc.)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Meeting Link</Label>
              <Input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://zoom.us/j/..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmModal(false);
                setMeetingLink("");
                setSelectedBooking(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!meetingLink || confirming}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {confirming ? "Confirming..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Booking Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this booking
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Reason (optional)</Label>
              <Input
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason("");
                setSelectedBooking(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={rejecting}
              className="bg-red-600 hover:bg-red-700"
            >
              {rejecting ? "Rejecting..." : "Reject Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle>Chat</DialogTitle>
            <DialogDescription>
              Chat with the student about the booking
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-6 pb-6">
            {selectedBooking && (
              <ChatRoom
                bookingId={selectedBooking.id}
                otherUser={{
                  first_name: selectedBooking.student_first_name,
                  last_name: selectedBooking.student_last_name,
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorBookings;
