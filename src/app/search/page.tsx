"use client";

import { useState } from "react";
import { MobileHeader } from "@/components/mobile-header";
import { MobileNav } from "@/components/mobile-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, Building2, Briefcase } from "lucide-react";

interface SearchResult {
  id: string;
  type: "person" | "company" | "job";
  title: string;
  subtitle: string;
  image?: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "person",
    title: "John Doe",
    subtitle: "Software Engineer at Tech Corp",
    image: "/avatar-placeholder.png",
  },
  {
    id: "2",
    type: "company",
    title: "Tech Corp",
    subtitle: "Technology • 10,001+ employees",
    image: "/company-logo-placeholder.png",
  },
  {
    id: "3",
    type: "job",
    title: "Senior Software Engineer",
    subtitle: "Tech Corp • San Francisco, CA",
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "people" | "companies" | "jobs">("all");

  const filteredResults = mockResults.filter((result) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "people" && result.type === "person") return true;
    if (activeFilter === "companies" && result.type === "company") return true;
    if (activeFilter === "jobs" && result.type === "job") return true;
    return false;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader
        title="Search"
        showSearch
        onSearch={setSearchQuery}
      />

      {/* Search Filters */}
      <div className="mt-16 px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "all" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "people" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "people" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("people")}
          >
            People
          </Button>
          <Button
            variant={activeFilter === "companies" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "companies" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("companies")}
          >
            Companies
          </Button>
          <Button
            variant={activeFilter === "jobs" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "jobs" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("jobs")}
          >
            Jobs
          </Button>
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-2">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-white border-b border-gray-200 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {result.image ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={result.image} />
                  <AvatarFallback>{result.title[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  {result.type === "person" && <Users className="h-6 w-6 text-gray-500" />}
                  {result.type === "company" && <Building2 className="h-6 w-6 text-gray-500" />}
                  {result.type === "job" && <Briefcase className="h-6 w-6 text-gray-500" />}
                </div>
              )}
              <div>
                <h3 className="font-semibold">{result.title}</h3>
                <p className="text-sm text-gray-600">{result.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MobileNav />
    </main>
  );
} 