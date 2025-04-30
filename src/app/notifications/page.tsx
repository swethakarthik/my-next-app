"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Bell, Check, X } from "lucide-react";

interface Notification {
  id: string;
  type: "connection" | "like" | "comment" | "message";
  message: string;
  sender: {
    name: string;
    image: string;
  };
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-16">
          <div className="text-center">Please sign in to view notifications</div>
        </div>
      </main>
    );
  }

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      type: "connection",
      message: "wants to connect with you",
      sender: {
        name: "John Doe",
        image: "https://github.com/shadcn.png",
      },
      timestamp: "2024-04-30T10:00:00Z",
      read: false,
    },
    {
      id: "2",
      type: "like",
      message: "liked your post",
      sender: {
        name: "Jane Smith",
        image: "https://github.com/shadcn.png",
      },
      timestamp: "2024-04-29T15:30:00Z",
      read: true,
    },
    {
      id: "3",
      type: "comment",
      message: "commented on your post",
      sender: {
        name: "Mike Johnson",
        image: "https://github.com/shadcn.png",
      },
      timestamp: "2024-04-28T09:15:00Z",
      read: true,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={notification.read ? "opacity-75" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={notification.sender.image} />
                      <AvatarFallback>
                        {notification.sender.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          <span className="font-medium">
                            {notification.sender.name}
                          </span>{" "}
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 