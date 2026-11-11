import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
  ExternalLink,
} from "lucide-react";
import {
  useStudentBookings,
  useUploadPayment,
  useCancelBooking,
  useWalletBalance,
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
import ScreenshotUploader from "../Package/components/ScreenShotUploader";
import ChatRoom from "../../components/ChatRoom";
import { MessageSquare } from "lucide-react";

const StudentBookings = () => {
  const { data: bookings, isLoading } = useStudentBookings();
  const { data: walletData, walletLoading } = useWalletBalance();
  const { mutate: uploadPayment, isPending: uploading } = useUploadPayment();
  const { mutate: cancelBooking, isPending: cancelling } = useCancelBooking();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [amount, setAmount] = useState("");
  const [hasEnoughWalletBalance, setHasEnoughWalletBalance] = useState(false);

  useEffect(() => {
    setHasEnoughWalletBalance(
      walletData?.balance >= (selectedBooking?.hourly_rate || 0),
    );
  }, [walletData, selectedBooking]);

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

  const handleUploadPayment = () => {
    if (!screenshot) {
      return toast.error("Please upload a payment screenshot");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      uploadPayment(
        {
          booking_id: selectedBooking.id,
          student_id: selectedBooking.student_id,
          screenshot_string: base64String,
          amount: amount || selectedBooking.hourly_rate,
          currency: selectedBooking.currency || "ETB",
        },
        {
          onSuccess: () => {
            toast.success("Payment uploaded successfully");
            setShowPaymentModal(false);
            setScreenshot(null);
            setAmount("");
            setSelectedBooking(null);
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message || "Failed to upload payment",
            );
          },
        },
      );
    };
    reader.readAsDataURL(screenshot);
  };

  const handleCancel = (booking) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this booking? This action cannot be undone.",
      )
    ) {
      return;
    }

    cancelBooking(
      { booking_id: booking.id, reason: "Student cancelled" },
      {
        onSuccess: () => {
          toast.success("Booking cancelled");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to cancel booking",
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your mentorship session bookings</p>
      </div>

      {/* Wallet Balance Card */}
      {walletData && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Wallet Balance</p>
              <p className="text-3xl font-bold">
                {walletData.balance?.toFixed(2) || "0.00"} ETB
              </p>
            </div>
            <Wallet className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      )}

      {/* Bookings List */}
      {!bookings || bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-500">
            Start by booking a session with a mentor
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Booking Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {booking.mentor_image ? (
                      <img
                        src={booking.mentor_image}
                        alt={`${booking.mentor_first_name} ${booking.mentor_last_name}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {booking.mentor_first_name?.[0]}
                        {booking.mentor_last_name?.[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {booking.mentor_first_name} {booking.mentor_last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {booking.mentor_headline || "Mentor"}
                      </p>
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
                            {new Date(booking.scheduled_at).toLocaleString(
                              "en-US",
                              {
                                timeZone: viewerTimezone,
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
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
                        Join Meeting
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

                  <div className="flex gap-2">
                    {booking.status === "PAYMENT_PENDING" && (
                      <Button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowPaymentModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Payment
                      </Button>
                    )}

                    {booking.status === "BOOKED" && (
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

      {/* Payment Upload Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Payment Proof</DialogTitle>
            <DialogDescription>
              Upload a screenshot of your payment transaction
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedBooking && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Mentor</p>
                <p className="font-semibold">
                  {selectedBooking.mentor_first_name}{" "}
                  {selectedBooking.mentor_last_name}
                </p>
                <p className="text-sm text-gray-600 mt-2 mb-1">Amount</p>
                <p className="font-semibold">
                  {selectedBooking.hourly_rate}{" "}
                  {selectedBooking.currency || "ETB"}
                </p>
              </div>
            )}

            <div>
              <Label>Payment Amount (optional)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={selectedBooking?.hourly_rate || "0"}
              />
            </div>

            <div>
              <Label>Payment Screenshot</Label>
              <ScreenshotUploader
                screenshot={screenshot}
                setScreenshot={setScreenshot}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPaymentModal(false);
                setScreenshot(null);
                setAmount("");
              }}
            >
              Cancel
            </Button>
            <div>
              {walletLoading ? (
                <Button disabled className="bg-blue-600">
                  Checking wallet...
                </Button>
              ) : hasEnoughWalletBalance ? (
                <Button
                  onClick={handleUploadPayment}
                  disabled={!screenshot || uploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {uploading ? "Uploading..." : "Wallet Payment"}
                </Button>
              ) : (
                <Button
                  onClick={handleUploadPayment}
                  disabled={!screenshot || uploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {uploading ? "Uploading..." : "Upload Payment"}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle>Chat</DialogTitle>
            <DialogDescription>
              Chat with your mentor about the booking
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-6 pb-6">
            {selectedBooking && (
              <ChatRoom
                bookingId={selectedBooking.id}
                otherUser={{
                  first_name: selectedBooking.mentor_first_name,
                  last_name: selectedBooking.mentor_last_name,
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentBookings;
//make the booking allowed by mentors avaliable time
//remove email from booking request
//make not remove chat feature after link added
//--Availableity of user profile
//--Youtube video for mentor
//--Make sure date will show up in users country region
//---make the student make attention seek to choose role page

//Cant--(make sure the email is institutal email())
//expertice (get from luel)
//add more description for Availability for Verification Call ( from luel)
// dont have --- select time zone for mentor meeting
//--add phone number for whatsapp
//--add mentor benefites on new page befor registeration
//make new project for this platform
//--make animation for successfull registeration
//chat feature for schedile metor verification call as mentor
//--add video introductory for reference for mentor
//--avaliblity switch for and time in a week they are available
//--price setting description
//-- remove recommended
//Work 1) Mentor Expertise Questions
// 2) Video Interview Section - Description
//move the button up or arounde many palces
//--wahts up not opption
//video instruction in the form
//--date and time time zone by
//--vailablty date selection by mentors profile(avalibale at this day or continue)
//--hover on mentors card show youtube video in card popup
//referal system for mentors and advertisors
