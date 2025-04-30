"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Share2, ThumbsUp, Mic, Sparkles } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";

interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    image: string;
    timeAgo: string;
  };
  content: string;
  stats: {
    likes: number;
    comments: number;
  };
}

const filterTabs = [
  { name: "All", active: true },
  { name: "Jobs", active: false },
  { name: "My posts", active: false },
  { name: "Mentions", active: false },
];

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Microsoft",
      title: "Official Company Group",
      image: "/company-logo-placeholder.png",
      timeAgo: "32m"
    },
    content: "Microsoft announced Q3 Earnings today, and in case you missed it, here are 3 LinkedIn numbers worth knowing...",
    stats: {
      likes: 128,
      comments: 32
    }
  },
  {
    id: "2",
    author: {
      name: "LinkedIn Company Group",
      title: "Official Company Group",
      image: "/linkedin-logo.png",
      timeAgo: "2h"
    },
    content: "#QuestionForGroup Hi Trust & Safety's teams! I came across a public post discussing sensitive information...",
    stats: {
      likes: 87,
      comments: 14
    }
  },
  {
    id: "3",
    author: {
      name: "Digital Creator",
      title: "Content Professional",
      image: "/avatar-placeholder.png",
      timeAgo: "2h"
    },
    content: "Digital creator roles have grown sevenfold in recent years. Read about the job growth from Axios.",
    stats: {
      likes: 42,
      comments: 28
    }
  }
];

// Add this type for the audio recording state
type RecordingState = 'inactive' | 'recording' | 'processing';

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchState, setSearchState] = useState<'default' | 'summary' | 'expanded'>('default');
  const [searchQuery, setSearchQuery] = useState("");
  const [recordingState, setRecordingState] = useState<RecordingState>('inactive');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setSearchState('summary');
    } else {
      setSearchState('default');
    }
  };

  const handleToggle = () => {
    if (searchState === 'default') setSearchState('summary');
    else if (searchState === 'summary') setSearchState('expanded');
    else setSearchState('default');
  };

  // Add this function to handle the recording
  const handleMicClick = async () => {
    if (recordingState !== 'inactive') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordingState('processing');
        
        try {
          // Create form data for the API request
          const formData = new FormData();
          formData.append('file', audioBlob, 'audio.webm');
          formData.append('model', 'whisper-1');

          // Send to OpenAI API
          const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: formData,
          });

          const data = await response.json();
          setSearchQuery(data.text);
        } catch (error) {
          console.error('Transcription error:', error);
        }

        setRecordingState('inactive');
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording
      setRecordingState('recording');
      mediaRecorder.start();

      // Stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 5000);

    } catch (error) {
      console.error('Recording error:', error);
      setRecordingState('inactive');
    }
  };

  const renderCopilot = () => {
    if (searchState === 'summary') {
      return (
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm">
          <div className="text-sm text-blue-700 font-medium">✨ 3 events you should attend this week</div>
          <button onClick={handleToggle} className="text-gray-500">✨</button>
        </div>
      );
    }
    if (searchState === 'expanded') {
      return (
        <div className="px-4 py-3 bg-white border-b shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">✨ What do you do?</h2>
              <p className="text-sm text-gray-600 mt-1">
                I can help you discover opportunities, explore connections, and provide career advice.
              </p>
            </div>
            <button className="text-gray-500">🎤</button>
          </div>
          <div className="mt-4 border-t pt-3">
            <h3 className="font-semibold text-sm">Microsoft</h3>
            <p className="text-sm text-gray-600">Join us for our upcoming virtual career fair! Learn about opportunities in software engineering, product management, and more.</p>
            <div className="text-xs text-gray-500 mt-2">1,234 reactions · 56 comments</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-[#f3f2ef] pb-20">
      {/* Search Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar-placeholder.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="3 events you should attend this week"
              className="w-full pl-10 pr-20 bg-[#eef3f8] border-none rounded-full h-9 text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <button 
                onClick={handleMicClick}
                disabled={recordingState !== 'inactive'}
                className={`p-1 rounded-full ${
                  recordingState === 'recording' ? 'bg-red-500' : 
                  recordingState === 'processing' ? 'bg-yellow-500' : ''
                }`}
              >
                <Mic className={`h-4 w-4 ${
                  recordingState !== 'inactive' ? 'text-white' : 'text-gray-500'
                }`} />
              </button>
              <Sparkles className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-600">
              <path fill="currentColor" d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/>
            </svg>
          </Button>
        </div>
      </div>

      {/* Copilot Section */}
      {renderCopilot()}

      {/* Filter Tabs */}
      <div className="fixed top-[60px] left-0 right-0 bg-white z-40 border-b border-gray-200">
        <div className="flex overflow-x-auto px-4 py-2 gap-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.name}
              className={`text-sm font-medium whitespace-nowrap ${
                tab.active ? "text-[#057642] font-semibold" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="pt-[108px]">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.image} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[15px]">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{post.author.title}</p>
                    <p className="text-xs text-gray-500">{post.author.timeAgo}</p>
                  </div>
                  <button className="text-gray-500">
                    <span className="sr-only">More</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-[15px]">{post.content}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1 text-gray-500">
                      <ThumbsUp className="h-5 w-5" />
                      <span className="text-sm">{post.stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-sm">{post.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
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
