import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  X,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Star,
  Calendar,
  FileText,
  Image,
  Mic,
  Search,
  Settings,
  Shield,
  Clock,
  CheckCheck,
  Check,
  Circle,
  Menu,
  ChevronDown,
  Users,
  Award,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import { NavLink, useParams } from "react-router";
import { useGetMentorById, useGetMentorReview } from "../../../hooks/useMentor";
import { averageRating, renderStars } from "../../../utils/functions";

const ChatWindow = () => {
  const { id } = useParams();

  const { data: mentor } = useGetMentorById(id);
  const { data: reviews } = useGetMentorReview(id);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // const mentor = {
  //   id: 1,
  //   name: "Dr. Sarah Johnson",
  //   university: "MIT",
  //   scholarship: "Fulbright Scholar",
  //   expertise: "STEM Applications",
  //   rating: 4.9,
  //   sessions: 156,
  //   online: true,
  //   image:
  //     "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
  //   bio: "Former MIT Admissions Officer with 10+ years of experience helping students secure scholarships worth over $50M.",
  //   responseTime: "Usually responds within 2 hours",
  //   specialties: [
  //     "STEM Applications",
  //     "Essay Writing",
  //     "Interview Prep",
  //     "International Students",
  //   ],
  // };

  const messages = useMemo(() => [
    {
      id: 1,
      sender: "mentor",
      content:
        "Hello! I've reviewed your scholarship application draft. Your research background is impressive, especially your work on sustainable energy solutions. Let's discuss how to highlight this in your personal statement.",
      timestamp: "2:30 PM",
      status: "read",
      type: "text",
    },
    {
      id: 2,
      sender: "student",
      content:
        "Thank you! I'm particularly proud of that project. Should I focus more on the technical aspects or the potential impact?",
      timestamp: "2:35 PM",
      status: "read",
      type: "text",
    },
    {
      id: 3,
      sender: "mentor",
      content:
        "Great question! For scholarship applications, I'd recommend emphasizing both, but lead with the impact. Scholarship committees want to see how your work benefits society. The technical details can support that narrative.",
      timestamp: "2:37 PM",
      status: "read",
      type: "text",
    },
    {
      id: 4,
      sender: "student",
      content:
        "That makes sense. I've been working on a revised version. Could you review it when you have time?",
      timestamp: "2:40 PM",
      status: "delivered",
      type: "text",
    },
    {
      id: 5,
      sender: "mentor",
      content:
        "Absolutely! I've also prepared a document with some successful essay examples that might inspire you. Let me share that with you.",
      timestamp: "2:42 PM",
      status: "read",
      type: "text",
    },
    {
      id: 6,
      sender: "mentor",
      content: "Scholarship Essay Examples - STEM Fields.pdf",
      timestamp: "2:43 PM",
      status: "read",
      type: "file",
      fileName: "Scholarship Essay Examples - STEM Fields.pdf",
      fileSize: "2.4 MB",
    },
  ], []);

  const progressSteps = [
    {
      name: "Profile Completed",
      completed: true,
      date: "Jan 5, 2025",
      description: "Basic information and goals set",
    },
    {
      name: "Learning Path Started",
      completed: true,
      date: "Jan 12, 2025",
      description: "Enrolled in STEM scholarship track",
    },
    {
      name: "First Live Session",
      completed: true,
      date: "Jan 20, 2025",
      description: "Essay writing fundamentals",
    },
    {
      name: "Mentor Assignment",
      completed: true,
      date: "Jan 25, 2025",
      description: "Matched with Dr. Sarah Johnson",
    },
    {
      name: "Draft Submission",
      completed: false,
      date: "Pending",
      description: "Submit your first essay draft",
    },
    {
      name: "Interview Prep",
      completed: false,
      date: "Pending",
      description: "Practice mock interviews",
    },
    {
      name: "Application Submission",
      completed: false,
      date: "Pending",
      description: "Final application review and submission",
    },
  ];

  const stats = [
    {
      label: "Sessions Completed",
      value: "8",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Progress",
      value: "67%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Next Milestone",
      value: "Draft",
      icon: Target,
      color: "text-orange-600",
    },
    { label: "Days Left", value: "45", icon: Clock, color: "text-purple-600" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      setMessage("");
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-300" />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 md:px-6 py-4 flex items-center justify-between text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                // src={mentor.data.image}
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt={mentor?.data?.first_name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/20"
              />
              {/* {mentor.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 border-2 border-white rounded-full"></div>
              )} */}

              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-semibold">
                {mentor?.data?.first_name + " " + mentor?.data?.last_name}
              </h2>
              <div className="flex items-center space-x-2 text-[12.5px] md:text-sm text-blue-100">
                {/* <span>{mentor.university}</span> */}

                <span className="hidden sm:flex items-center space-x-1">
                  {renderStars(averageRating(reviews), Star)}
                  <span>{reviews[0]?.rating}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                {/* <span
                  className={`hidden sm:inline ${
                    mentor.online ? "text-green-300" : "text-gray-300"
                  }`}
                >
                  {mentor.online ? "Online" : "Last seen 2h ago"}
                </span> */}
                <span className={`hidden sm:inline text-green-300`}>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-3">
          <button className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
            <Video className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="hidden md:block p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <NavLink to="/profile">
            <button className="hidden md:block p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Mentor Info Bar */}
      <div className="bg-blue-50 px-4 md:px-6 py-3 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-6 text-sm overflow-x-auto">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">
                {/* {mentor.scholarship}  */}
                Scholar
              </span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">
                {/* {mentor.sessions}  */}
                sessions
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-2 whitespace-nowrap">
              <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">
                Specializes in
                {/* {mentor.expertise} */}
              </span>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 min-h-[44px] inline-flex items-center justify-center rounded-lg text-[14px] font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
            Schedule Session
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "student" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg ${
                    msg.sender === "student" ? "order-2" : "order-1"
                  }`}
                >
                  {msg.sender === "mentor" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                        // src={mentor.image}
                        alt={mentor?.data?.first_name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[12.5px] text-gray-500 font-medium">
                        {mentor?.data?.first_name}
                      </span>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === "student"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    {msg.type === "file" ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {msg.fileName}
                          </p>
                          <p className="text-[12.5px] opacity-75">
                            PDF • {msg.fileSize}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                  </div>

                  <div
                    className={`flex items-center space-x-2 mt-1 ${
                      msg.sender === "student" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-[12.5px] text-gray-500">
                      {msg.timestamp}
                    </span>
                    {msg.sender === "student" && getMessageStatus(msg.status)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <div className="flex items-center px-4 py-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm"
                    />
                    <div className="flex items-center space-x-2 ml-3">
                      <button className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
              <button className="bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-80 bg-white border-l border-gray-200 flex-col shadow-lg md:shadow-none flex`}
        >
          <div className="bg-white h-full flex flex-col overflow-hidden">
            {/* Mobile sidebar header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Mentor Profile</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mentor Profile */}
            <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="text-center">
                {/* <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                /> */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {mentor?.data?.first_name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {/* {mentor.university} */}
                </p>
                <div className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <Star className="w-4 h-4 fill-current" />
                  <span>
                    {mentor?.data?.rating} •{/* {mentor.sessions}  */}
                    sessions
                  </span>
                </div>
                <p className="text-[13px] text-gray-500 mb-4 line-clamp-3">
                  {mentor?.data?.bio}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors">
                  Schedule New Session
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  View Full Profile
                </button>
              </div>

              <div className="text-center">
                {/* <p className="text-[12.5px] text-gray-500">{mentor.responseTime}</p> */}
                5
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">
                Your Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 mb-2`}
                    >
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-[12.5px] text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="p-4 md:p-6 flex-1 overflow-y-auto min-h-0">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">
                Your Progress
              </h4>
              <div className="space-y-4">
                {progressSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 mt-0.5 ${
                        step.completed
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          step.completed ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </p>
                      <p className="text-[12.5px] text-gray-400 mb-1">{step.date}</p>
                      <p className="text-[12.5px] text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
