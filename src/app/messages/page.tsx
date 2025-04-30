"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { ArrowLeft, MoreVertical, Search, Edit2 } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    image: string;
    isOnline?: boolean;
    isSponsored?: boolean;
    subtitle?: string;
    isLinkedInOffer?: boolean;
  };
  content: string;
  timestamp: string;
  unread?: boolean;
  isLinkedInOffer?: boolean;
}

const filterTabs = [
  { name: "Focused", active: true },
  { name: "Jobs", active: false },
  { name: "Unread", active: false },
  { name: "Drafts", active: false },
  { name: "InMail", active: false },
];

export default function MessagesPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-16">
          <div className="text-center">Please sign in to view messages</div>
        </div>
      </main>
    );
  }

  // Mock messages data
  const messages: Message[] = [
    {
      id: "1",
      sender: {
        id: "usps",
        name: "United States Postal Service",
        image: "/usps-logo.png",
        isSponsored: true,
        subtitle: "From carrier to career, fuel your future at USPS®.",
      },
      content: "Sponsored",
      timestamp: "1:30 PM",
    },
    {
      id: "2",
      sender: {
        id: "jacqueline",
        name: "Jacqueline Keyes",
        image: "/avatar-placeholder.png",
        isOnline: true,
        isSponsored: true,
        subtitle: "Hi DJ - As a Chief Operating Officer at LinkedIn, I know you want to focus on strategy and s...",
      },
      content: "Sponsored",
      timestamp: "Apr 14",
    },
    {
      id: "3",
      sender: {
        id: "kristen",
        name: "Kristen J.",
        image: "/avatar-placeholder.png",
        subtitle: "Hi DJ, Are you currently exploring new job opportunities...",
        isLinkedInOffer: true,
      },
      content: "LinkedIn Offer • Hi DJ,",
      timestamp: "Apr 8",
      unread: true,
    },
    {
      id: "4",
      sender: {
        id: "wgu",
        name: "Western Governors University",
        image: "/wgu-logo.png",
        isSponsored: true,
        subtitle: "Hello DJ! Are you looking to advance your career in Software...",
      },
      content: "Sponsored • Hello DJ!",
      timestamp: "Apr 5",
      unread: true,
    },
    {
      id: "5",
      sender: {
        id: "nandeesh",
        name: "Nandeesh Rajashekar",
        image: "/avatar-placeholder.png",
        isOnline: true,
        subtitle: "You: Checking the image cropping",
      },
      content: "You: Checking the image cropping",
      timestamp: "Mar 30",
    },
  ];

  const filteredMessages = messages.filter(message =>
    message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Messaging</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-3 py-2 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search messages"
              className="pl-10 bg-gray-100 border-none rounded-full h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="overflow-x-auto border-b">
          <div className="flex px-3 py-1.5 gap-2">
            {filterTabs.map((tab) => (
              <Button
                key={tab.name}
                variant={tab.active ? "default" : "outline"}
                className={`rounded-full text-sm px-4 py-1.5 h-8 whitespace-nowrap ${
                  tab.active ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
                }`}
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Message list */}
      <div className="pt-[152px] pb-20">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="flex items-start gap-3 px-3 py-3 bg-white border-b hover:bg-gray-50"
          >
            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={message.sender.image} />
                <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
              </Avatar>
              {message.sender.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold truncate text-[15px]">{message.sender.name}</h3>
                    {message.sender.isSponsored && (
                      <span className="text-xs text-gray-500">• Sponsored</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate leading-snug">
                    {message.sender.subtitle}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-gray-500 whitespace-nowrap">{message.timestamp}</span>
                  {message.unread && (
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating action button */}
      <Button
        className="fixed bottom-6 right-4 h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="icon"
      >
        <Edit2 className="h-5 w-5" />
      </Button>
    </main>
  );
} 