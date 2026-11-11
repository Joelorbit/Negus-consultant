import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, Download, Image as ImageIcon } from "lucide-react";
import { useChatMessages, useSendMessage } from "../hooks/useChat";
import { useMe } from "../hooks/useAuth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import axiosInstance from "../lib/axiosInstance";

const ChatRoom = ({ bookingId, otherUser }) => {
  const { data: currentUser } = useMe();
  const currentUserId = currentUser?.id;
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { data: messages = [], isLoading } = useChatMessages(
    bookingId,
    !!bookingId
  );
  const { mutate: sendMessage, isPending: sending } = useSendMessage();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Allowed: images, PDF, Word documents."
      );
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (!message.trim() && !selectedFile) {
      toast.error("Please enter a message or select a file");
      return;
    }

    sendMessage(
      {
        bookingId,
        message: message.trim() || null,
        file: selectedFile,
      },
      {
        onSuccess: () => {
          setMessage("");
          setSelectedFile(null);
          setFilePreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to send message"
          );
        },
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isImage = (fileType) => {
    return fileType?.startsWith("image/");
  };

  const isPDF = (fileType) => {
    return fileType === "application/pdf";
  };

  const isWordDoc = (fileType) => {
    return (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
  };

  const getFileIcon = (fileType) => {
    if (isImage(fileType)) return <ImageIcon className="w-4 h-4" />;
    if (isPDF(fileType) || isWordDoc(fileType))
      return <Download className="w-4 h-4" />;
    return <Download className="w-4 h-4" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getBaseUrl = () => {
    // Get base URL - extract from axios instance or use current origin
    try {
      const baseURL = axiosInstance.defaults.baseURL;
      if (baseURL) {
        // Remove /api suffix if present
        return baseURL.replace("/api", "") || window.location.origin;
      }
    } catch {
      // Fallback to current origin
    }
    return window.location.origin;
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">
          Chat with {otherUser?.first_name} {otherUser?.last_name}
        </h3>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: "500px" }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.sender_id === currentUserId;
            const isFileMessage = !!msg.file_url;

            return (
              <div
                key={msg.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isOwnMessage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {/* Sender name (only for other user's messages) */}
                  {!isOwnMessage && (
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isOwnMessage ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {msg.first_name} {msg.last_name}
                    </p>
                  )}

                  {/* Text message */}
                  {msg.message && (
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.message}
                    </p>
                  )}

                  {/* File message */}
                  {isFileMessage && (
                    <div className="mt-2">
                      {isImage(msg.file_type) ? (
                        <div className="rounded overflow-hidden">
                          <img
                            src={`${getBaseUrl()}${msg.file_url}`}
                            alt={msg.file_name || "Image"}
                            className="max-w-full max-h-64 object-contain rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                          <div
                            className="hidden p-4 bg-gray-200 text-center text-sm text-gray-600"
                            style={{ display: "none" }}
                          >
                            Failed to load image
                          </div>
                        </div>
                      ) : (
                        <a
                          href={`${getBaseUrl()}${msg.file_url}`}
                          download={msg.file_name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded border ${
                            isOwnMessage
                              ? "bg-blue-500 hover:bg-blue-400 border-blue-400 text-white"
                              : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
                          } transition-colors`}
                        >
                          {getFileIcon(msg.file_type)}
                          <span className="text-sm font-medium">
                            {msg.file_name || "Download file"}
                          </span>
                          {msg.file_size && (
                            <span className="text-xs opacity-75">
                              ({formatFileSize(msg.file_size)})
                            </span>
                          )}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Timestamp */}
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {format(new Date(msg.created_at), "MMM dd, h:mm a")}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            {filePreview ? (
              <img
                src={filePreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                {getFileIcon(selectedFile.type)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0"
            disabled={sending}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={sending || (!message.trim() && !selectedFile)}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

