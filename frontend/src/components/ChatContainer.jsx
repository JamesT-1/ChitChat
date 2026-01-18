import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-(--color-bg)">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-(--color-bg)">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-3 ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
              ref={messageEndRef}
            >
              {!isOwnMessage && (
                <div className="w-10 h-10 rounded-full border border-zinc-700 overflow-hidden ">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="Profile Pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`max-w-xs sm:max-w-sm flex flex-col ${
                  isOwnMessage ? "items-end" : "items-start"
                }`}
              >
                <time className="text-xs text-(--color-text) mb-1">
                  {formatMessageTime(message.createdAt)}
                </time>

                <div
                  className={`rounded-lg px-3 py-2 text-sm
                ${
                  isOwnMessage
                    ? "bg-emerald-500 text-white"
                    : "bg-zinc-800 text-zinc-100"
                }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="mb-2 rounded-md max-w-full"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>

              {isOwnMessage && (
                <div className="w-10 h-10 rounded-full border border-zinc-700 overflow-hidden">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="Profile Pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
