"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

interface SearchResult {
  id: string;
  type: "user" | "post" | "job";
  title: string;
  description: string;
  image?: string;
  author?: {
    name: string;
    image: string;
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // In a real app, you would make an API call to your semantic search endpoint
      // For now, we'll simulate some results
      const mockResults: SearchResult[] = [
        {
          id: "1",
          type: "user",
          title: "John Doe",
          description: "Software Engineer at Tech Corp",
          image: "https://github.com/shadcn.png",
        },
        {
          id: "2",
          type: "post",
          title: "Exciting News!",
          description: "Just launched our new product...",
          author: {
            name: "Jane Smith",
            image: "https://github.com/shadcn.png",
          },
        },
        {
          id: "3",
          type: "job",
          title: "Senior Frontend Developer",
          description: "Looking for an experienced React developer...",
        },
      ];

      setResults(mockResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Search for people, posts, or jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          {isLoading && <div className="text-center">Searching...</div>}

          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  {result.type === "user" && (
                    <Avatar>
                      <AvatarImage src={result.image} />
                      <AvatarFallback>{result.title[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  {result.type === "post" && result.author && (
                    <Avatar>
                      <AvatarImage src={result.author.image} />
                      <AvatarFallback>{result.author.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-medium">{result.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 