"use client";

import { useState } from "react";
import { MobileHeader } from "@/components/mobile-header";
import { MobileNav } from "@/components/mobile-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    image: string;
  };
  location: string;
  type: string;
  postedAt: string;
  applicants: number;
  isEasyApply?: boolean;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: {
      name: "Tech Corp",
      image: "/company-logo-placeholder.png",
    },
    location: "San Francisco, CA",
    type: "Full-time",
    postedAt: "2d",
    applicants: 124,
    isEasyApply: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: {
      name: "Design Co",
      image: "/company-logo-placeholder.png",
    },
    location: "Remote",
    type: "Full-time",
    postedAt: "1d",
    applicants: 89,
  },
  {
    id: "3",
    title: "UX Designer",
    company: {
      name: "Creative Studio",
      image: "/company-logo-placeholder.png",
    },
    location: "New York, NY",
    type: "Contract",
    postedAt: "3d",
    applicants: 56,
    isEasyApply: true,
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "myJobs" | "saved">("all");

  const filteredJobs = mockJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader
        title="Jobs"
        showSearch
        onSearch={setSearchQuery}
      />

      {/* Job Filters */}
      <div className="mt-16 px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "all" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Jobs
          </Button>
          <Button
            variant={activeFilter === "myJobs" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "myJobs" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("myJobs")}
          >
            My Jobs
          </Button>
          <Button
            variant={activeFilter === "saved" ? "default" : "outline"}
            className={`rounded-full text-sm px-4 py-1.5 h-8 ${
              activeFilter === "saved" ? "bg-[#057642] hover:bg-[#057642]" : "border-gray-300"
            }`}
            onClick={() => setActiveFilter("saved")}
          >
            Saved
          </Button>
        </div>
      </div>

      {/* Job List */}
      <div className="mt-2">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border-b border-gray-200 px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={job.company.image} />
                <AvatarFallback>{job.company.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company.name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{job.postedAt} ago • {job.applicants} applicants</span>
                  </div>
                  <Button
                    variant={job.isEasyApply ? "default" : "outline"}
                    className={`${
                      job.isEasyApply ? "bg-[#057642] hover:bg-[#057642]" : ""
                    }`}
                  >
                    {job.isEasyApply ? "Easy Apply" : "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MobileNav />
    </main>
  );
} 