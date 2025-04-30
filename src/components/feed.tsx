"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export function Feed() {
  const { data: session } = useSession();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !session?.user) return;

    // In a real app, you would make an API call here
    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      content: newPost,
      author: {
        name: session.user.name || "Anonymous",
        image: session.user.image || "",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {session?.user && (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Post</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.image} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 