import { useState } from "react";
import { DateTime } from "luxon";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { mentor as fallbackMentor } from "./MentorData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRequestMentorBooking } from "../../../../hooks/useMentorBooking";
import { useParams } from "react-router";
import { useMe } from "../../../../hooks/useAuth";
import {
  COUNTRY_TIMEZONES,
  getTimezoneForCountry,
} from "@/constants/timezones";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const BookingModal = ({ open, onOpenChange, mentor }) => {
  const { id } = useParams();
  const { data: user } = useMe();

  const { mutate: requestBooking, isPending: bookingRequesting } =
    useRequestMentorBooking();

  const m = mentor || fallbackMentor;

  const [date, setDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [studentCountry, setStudentCountry] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mentorTimezone =
    mentor?.timezone ||
    getTimezoneForCountry(mentor.country) ||
    "Africa/Addis_Ababa";
  const studentTimezone =
    getTimezoneForCountry(studentCountry) ||
    (typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "");
  const mentorAvailability = (() => {
    try {
      return mentor?.availability || null;
    } catch {
      return null;
    }
  })();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !selectedSlot || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!studentCountry) {
      toast.error("Please select your country.");
      return;
    }

    const timeParts = selectedSlot.match(/(\d+):(\d+)\s?(AM|PM)/);
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const meridian = timeParts[3];

    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    // Create datetime in mentor's timezone, then convert to ISO UTC
    const baseDate = DateTime.fromJSDate(date).set({
      hour: hours,
      minute: minutes,
      second: 0,
      millisecond: 0,
    });

    const mentorDateTime = baseDate.setZone(mentorTimezone, {
      keepLocalTime: true,
    });
    const scheduledAt = mentorDateTime.toUTC().toISO();
    const payload = {
      student_email: email,
      student_id: user?.id,
      mentor_profile_id: id,
      topic: message || "Mentorship session",
      scheduled_at: scheduledAt,
      duration_minutes: Number(m.sessionDuration) || 60,
      student_timezone: studentTimezone,
      mentor_timezone: mentorTimezone,
    };

    requestBooking(payload, {
      onSuccess: () => {
        toast.success("Booking request sent! We'll confirm shortly.");
        onOpenChange(false);
        // Reset form
        setDate(undefined);
        setSelectedSlot("");
        setStudentCountry("");
        setEmail("");
        setMessage("");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to request booking",
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden border-border/50 shadow-premium-hover">
        {/* Header */}
        <div className="gradient-primary p-6 pb-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary-foreground">
              Book a Session with {m.name}
            </DialogTitle>
            <p className="text-sm text-primary-foreground/70 mt-1">
              {m.sessionRate} / {m.sessionDuration} min
            </p>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-xl h-11",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? DateTime.fromJSDate(date).toFormat("DDD")
                    : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={(d) => d < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Slots */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Time Slot *</Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                // If mentor has availability JSON from profile editor in the
                // shape { days: ["Mon",...], from: "07:00", to: "21:00" },
                // then only enable slots that fall within that window.

                let isDisabled = false;
                if (date && mentorAvailability && mentorAvailability.days) {
                  const jsDay = date.getDay(); // 0 (Sun) - 6 (Sat)
                  const dayMap = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ];
                  const label = dayMap[jsDay];
                  const allowedDays = mentorAvailability.days || [];
                  if (!allowedDays.includes(label)) {
                    isDisabled = true;
                  } else if (mentorAvailability.from && mentorAvailability.to) {
                    const timeParts = slot.match(/(\d+):(\d+)\s?(AM|PM)/);
                    let hours = parseInt(timeParts[1]);
                    const minutes = parseInt(timeParts[2]);
                    const meridian = timeParts[3];

                    if (meridian === "PM" && hours !== 12) hours += 12;
                    if (meridian === "AM" && hours === 12) hours = 0;

                    const slotMinutes = hours * 60 + minutes;

                    const [fromH, fromM] = mentorAvailability.from
                      .split(":")
                      .map((n) => parseInt(n));
                    const [toH, toM] = mentorAvailability.to
                      .split(":")
                      .map((n) => parseInt(n));
                    const fromMinutes = fromH * 60 + fromM;
                    const toMinutes = toH * 60 + toM;

                    if (slotMinutes < fromMinutes || slotMinutes > toMinutes) {
                      isDisabled = true;
                    }
                  }
                }

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => !isDisabled && setSelectedSlot(slot)}
                    className={cn(
                      "py-2 px-1 rounded-xl text-xs font-medium transition-all duration-200 border",
                      isDisabled
                        ? "bg-muted text-muted-foreground border-border/30 cursor-not-allowed opacity-60"
                        : selectedSlot === slot
                          ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
                          : "bg-secondary text-secondary-foreground border-border/50 hover:border-primary/30",
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <p className="text-[12.5px] text-muted-foreground mt-1">
              Mentor time zone:{" "}
              <span className="font-medium">{mentorTimezone}</span> · Your time
              zone:{" "}
              <span className="font-medium">
                {studentCountry ? studentTimezone || "" : "Select your country"}
              </span>
            </p>
          </div>

          {/* Student Country */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Your Country *</Label>
            <select
              className="w-full h-11 rounded-xl border px-3 text-sm bg-background"
              value={studentCountry}
              onChange={(e) => setStudentCountry(e.target.value)}
            >
              <option value="">Select your country</option>
              {COUNTRY_TIMEZONES.map((c) => (
                <option key={c.timezone} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email *</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-11"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Message</Label>
            <Textarea
              placeholder="What would you like to discuss?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl min-h-[80px]"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full gradient-primary text-primary-foreground rounded-xl h-12 font-semibold text-base hover:shadow-glow transition-all duration-300"
            disabled={bookingRequesting}
          >
            {bookingRequesting ? "Requesting..." : "Request Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
