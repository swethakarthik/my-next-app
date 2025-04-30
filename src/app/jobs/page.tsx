"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Search, MapPin, Briefcase, Building2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  postedAt: string;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-16">
          <div className="text-center">Please sign in to view jobs</div>
        </div>
      </main>
    );
  }

  // Mock jobs data
  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "We're looking for an experienced frontend developer to join our team...",
      salary: "$120,000 - $150,000",
      postedAt: "2024-04-30T10:00:00Z",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Startup Inc",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our growing team as a Product Manager to help shape the future...",
      salary: "$100,000 - $130,000",
      postedAt: "2024-04-29T15:30:00Z",
    },
    {
      id: "3",
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Contract",
      description:
        "We're seeking a talented UX Designer to create beautiful and intuitive...",
      salary: "$80 - $100 per hour",
      postedAt: "2024-04-28T09:15:00Z",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location
      ? job.location.toLowerCase().includes(location.toLowerCase())
      : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Jobs</h1>
            <Button>Post a Job</Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <Button>Apply</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{job.salary}</p>
                    <p className="text-sm text-muted-foreground">
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </p>
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