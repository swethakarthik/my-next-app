"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Edit, MapPin, Link as LinkIcon, Briefcase } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-16">
          <div className="text-center">Please sign in to view your profile</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
            <CardHeader className="relative -mt-16">
              <div className="flex items-end justify-between">
                <div className="flex items-end space-x-4">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{session.user.name}</h1>
                    <p className="text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a href="#" className="hover:underline">
                    example.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>Tech Corp</span>
                </div>
              </div>
              <p className="text-sm">
                Passionate about building great software and solving complex
                problems. Experienced in full-stack development with a focus on
                modern web technologies.
              </p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Experience</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Senior Software Engineer</h3>
                  <p className="text-sm text-muted-foreground">Tech Corp</p>
                  <p className="text-sm text-muted-foreground">
                    Jan 2020 - Present
                  </p>
                  <p className="text-sm mt-2">
                    Leading the development of core products and mentoring junior
                    developers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Education</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
                  <p className="text-sm text-muted-foreground">University of Technology</p>
                  <p className="text-sm text-muted-foreground">
                    2015 - 2019
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 