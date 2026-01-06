import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Check,
  ArrowLeft,
  Moon,
  Sun,
  Palette,
} from "lucide-react";
import { FaBacteria } from "react-icons/fa";
import { FaVirus } from "react-icons/fa";
import { GiVirus } from "react-icons/gi";
import { FaMicroscope } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa6";
import { GiDna2 } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineVaccines } from "react-icons/md";

import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { IoLogoWhatsapp } from "react-icons/io";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const Whatsapp = () => {
  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();
  const [colorThemeOpen, setColorThemeOpen] = useState(false);

  const colorThemes = [
    { name: "Orange", value: "orange" as const, color: "hsl(18, 95%, 60%)" },
    { name: "Blue", value: "blue" as const, color: "hsl(221, 83%, 53%)" },
    { name: "Green", value: "green" as const, color: "hsl(142, 71%, 45%)" },
    { name: "Purple", value: "purple" as const, color: "hsl(271, 81%, 56%)" },
    { name: "Red", value: "red" as const, color: "hsl(0, 72%, 51%)" },
  ];
  const icons = [
    MdOutlineVaccines,
    FaBacteria,
    FaVirus,
    IoIosChatbubbles,
    GiDna2,
    FaLeaf,
    FaMicroscope,
    GiVirus,
  ];
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
  ];

  const rules = [
    "Share resources and study materials",
    "Get motivation and stay consistent with others",
    "Ask questions and clarify doubts",
    "Find study partners for live revision sessions",
    "Discuss past paper questons and your paper",
    "Discuss answers once youre done with the exam!",
    "Share exam tips, mnemonics, and high-scoring strategies",
    "Daily reminders and small challenges to keep you on track",
  ];

  return (
    <div className="min-h-screen bg-background relative py-8 px-4">
      {/* Top Controls Bar */} {/* Main content */}{" "}
      <ShootingStars className="pointer-events-none" />
      <StarsBackground className="pointer-events-none" />
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        {/* Back to Home */}
        <Link to="/">
          <Button
            variant="outline"
            className="border-border hover:bg-secondary flex items-center gap-2 px-3"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Button>
        </Link>

        {/* Theme + Color Picker */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-border hover:bg-secondary"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setColorThemeOpen(!colorThemeOpen)}
              className="border-border hover:bg-secondary"
            >
              <Palette className="h-4 w-4" />
            </Button>

            {colorThemeOpen && (
              <div className="absolute right-0 top-10 z-50 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex gap-2">
                  {colorThemes.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => {
                        setColorTheme(ct.value);
                        setColorThemeOpen(false);
                        toast.success(`Theme changed to ${ct.name}`);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        colorTheme === ct.value
                          ? "border-foreground scale-110"
                          : "border-border hover:scale-105"
                      }`}
                      style={{ backgroundColor: ct.color }}
                      title={ct.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-14">
        <div className="text-center space-y-6">
          {" "}
          <div className="text-[#25D366] rounded-full p-6 shadow-lg w-28 h-28 mx-auto flex items-center justify-center">
            <IoLogoWhatsapp className="w-32 h-32 text-[#25D366]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Join <span className="text-[#25D366]">WhatsApp</span> Community!
            </h1>
            <p className="text-muted-foreground">
              Connect with IAL Bio unit-4 students!
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary hover:text-white hover:border-8 hover:border-primary text-white  transition-all"
            asChild
          >
            <a
              href="https://chat.whatsapp.com/Ect0o9qkk8Q5kRqMWLJjlF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Now
            </a>
          </Button>
          <div className="bg-card border border-border rounded-lg p-6 text-left">
            <h2 className="text-xl font-bold text-foreground mb-4">Why?</h2>
            <div className="space-y-2">
              {rules.map((rule, index) => {
                const Icon = icons[index % icons.length]; // cycle through icons
                const color = colors[index % colors.length]; // cycle through colors
                return (
                  <div key={index} className="flex items-start gap-2">
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                    <p className="text-sm text-foreground">{rule}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
