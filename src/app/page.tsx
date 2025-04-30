import { Navbar } from "@/components/navbar";
import { Feed } from "@/components/feed";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-16">
        <Feed />
      </div>
    </main>
  );
}
