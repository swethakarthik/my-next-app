"use client";

import { MobileHeader } from "@/components/mobile-header";
import { MobileNav } from "@/components/mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, UserPlus, ThumbsUp, MessageSquare } from "lucide-react";

interface Notification {
  id: string;
  type: "connection" | "like" | "comment";
  user: {
    name: string;
    image: string;
  };
  content: string;
  timeAgo: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "connection",
    user: {
      name: "John Doe",
      image: "/avatar-placeholder.png",
    },
    content: "wants to connect with you",
    timeAgo: "2h",
    read: false,
  },
  {
    id: "2",
    type: "like",
    user: {
      name: "Jane Smith",
      image: "/avatar-placeholder.png",
    },
    content: "liked your post",
    timeAgo: "4h",
    read: true,
  },
  {
    id: "3",
    type: "comment",
    user: {
      name: "Mike Johnson",
      image: "/avatar-placeholder.png",
    },
    content: "commented on your post",
    timeAgo: "1d",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader title="Notifications" />

      <div className="mt-16">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white border-b border-gray-200 px-4 py-3 ${
              !notification.read ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={notification.user.image} />
                  <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  {notification.type === "connection" && (
                    <UserPlus className="h-4 w-4 text-blue-600" />
                  )}
                  {notification.type === "like" && (
                    <ThumbsUp className="h-4 w-4 text-blue-600" />
                  )}
                  {notification.type === "comment" && (
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{notification.user.name}</span>{" "}
                    <span className="text-gray-600">{notification.content}</span>
                  </div>
                  <span className="text-sm text-gray-500">{notification.timeAgo}</span>
                </div>
                {notification.type === "connection" && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="default"
                      className="flex-1 bg-[#057642] hover:bg-[#057642]"
                    >
                      Accept
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Ignore
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MobileNav />
    </main>
  );
} 