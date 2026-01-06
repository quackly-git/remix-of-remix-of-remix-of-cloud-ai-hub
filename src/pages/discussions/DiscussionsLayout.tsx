import { Navigate, Outlet } from "react-router-dom";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { DiscussionAuthModal } from "@/components/discussions/DiscussionAuthModal";
import { ProfileButton } from "@/components/discussions/ProfileButton";
import { KawaiiMascot, getRandomCharacter } from "@/components/discussions/KawaiiMascot";
import { Button } from "@/components/ui/button";
import { Home, Trophy, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { ThemeToggle } from "../notes/ThemeToggle";
import { ColorThemeSelector } from "../notes/_components/ColorThemeSelector";

const DiscussionsLayout = () => {
  const { isAuthenticated, loading } = useDiscussionAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const mascotCharacter = useMemo(() => getRandomCharacter(), []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <KawaiiMascot character="ghost" mood="shocked" size={120} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <KawaiiMascot character={mascotCharacter} mood="happy" size={150} />
        <h1 className="text-3xl font-bold mt-6 text-center">Welcome to Discussions</h1>
        <p className="text-muted-foreground mt-2 text-center max-w-md">
          Join our community to ask questions, share knowledge, and earn XP!
        </p>
        <div className="flex gap-4 mt-6">
          <Button onClick={() => setShowAuthModal(true)} size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <ColorThemeSelector />
          <ThemeToggle />
        </div>
        <DiscussionAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  const navItems = [
    { path: "/discussions", label: "Discussions", icon: MessageSquare, exact: true },
    { path: "/discussions/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Home</span>
            </Link>
            
            <div className="h-4 w-px bg-border" />
            
            <Link to="/discussions" className="flex items-center gap-2">
              <KawaiiMascot character="speechBubble" mood="happy" size={32} />
              <span className="font-bold hidden sm:inline">Discussions</span>
            </Link>
            
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
                
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ColorThemeSelector />
            <ThemeToggle />
            <ProfileButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Outlet />
      </main>

      {/* Floating Mascot */}
      <div className="fixed bottom-4 right-4 hidden lg:block opacity-50 hover:opacity-100 transition-opacity">
        <KawaiiMascot character={mascotCharacter} mood="blissful" size={60} />
      </div>
    </div>
  );
};

export default DiscussionsLayout;
