"use client";

import { useState } from "react";
import { MobileHeader } from "@/components/mobile-header";
import { MobileNav } from "@/components/mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

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
}

const filterTabs = [
  { name: "Focused", active: true },
  { name: "Jobs", active: false },
  { name: "Unread", active: false },
  { name: "Drafts", active: false },
  { name: "InMail", active: false },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Focused");

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
    <main className="min-h-screen bg-[#f3f2ef]">
      <MobileHeader showSearch onSearch={setSearchQuery} />

      {/* Filter tabs */}
      <div className="fixed top-[52px] left-0 right-0 bg-white z-40 border-b border-gray-200">
        <div className="overflow-x-auto">
          <div className="flex px-3 py-2 gap-2">
            {filterTabs.map((tab) => (
              <Button
                key={tab.name}
                variant={tab.active ? "default" : "outline"}
                className={`rounded-full text-sm px-4 py-1.5 h-8 whitespace-nowrap ${
                  tab.active ? "bg-[#057642] hover:bg-[#057642] text-white" : "border-gray-300 text-gray-600"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Message list */}
      <div className="pt-[100px] pb-20">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`bg-white border-b border-gray-200 px-3 py-3 ${
              message.unread ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
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
          </div>
        ))}
      </div>

      {/* Floating action button */}
      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="icon"
      >
        <Edit2 className="h-6 w-6 text-white" />
      </Button>

      <MobileNav />
    </main>
  );
} 