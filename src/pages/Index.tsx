import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  ArrowRight,
  MessageCircle,
  FileText,
  Timer,
  Notebook,
  Power,
} from "lucide-react";
import { ThemeControls } from "@/components/ThemeControls";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { FaBook, FaWhatsapp } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { Alert } from "@/components/ui/alert";
import { GlobalProfileButton } from "@/components/GlobalProfileButton";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <StarsBackground className="pointer-events-none" />
      <ShootingStars className="pointer-events-none" />
      {/* Top Announcement Banner */}
      <div className="w-full bg-primary/20 text-primary/90 backdrop-blur-md py-3 px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 rounded-b-lg shadow-sm border-b border-primary/30">
        {/* Icon & Label */}
        <div className="flex items-center gap-2">
          <FaBook className="w-5 h-5 text-primary/80" />
          <span className="font-medium">Notes for IGCSE:</span>
        </div>

        {/* Links */}
        <a
          href="/BioSME.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-primary/100 hover:underline underline hover:opacity-80 transition-colors"
        >
          SME Bio
        </a>
        <span className="hidden sm:block">|</span>
        <a
          href="/ChemSME.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-primary/100 hover:underline underline hover:opacity-80 transition-colors"
        >
          SME Chem
        </a>
      </div>

      <div className="text-center space-y-8 p-8 max-w-3xl mx-auto mt-0">
        <div className="flex justify-end mb-2 gap-2">
          <ThemeControls />
          <GlobalProfileButton />
        </div>

        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-6 animate-pulse">
          <CheckSquare className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 bg-clip-text">
          Ace IAL Bio <span className="text-primary">U4</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10 leading-relaxed">
          Master Edexcel Unit 4 IAL Biology with interactive checklists, past
          papers, and collaborative discussion forums (soon)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/timer">
            <Button
              variant="outline"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto"
            >
              <Timer className="w-5 h-5 text-red-600 dark:text-red-400" />
              Countdown
            </Button>
          </Link>{" "}
          <Link to="/checklist">
            <Button
              variant="outline"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto"
            >
              Syllabus Checklist
              <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
            </Button>
          </Link>
          <Link to="/pastpapers-checklist">
            <Button
              variant="outline"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto"
            >
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Past Papers+
            </Button>
          </Link>{" "}
          <Link to="/notes">
            <Button
              variant="outline"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto"
            >
              <Notebook className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              Notes+
            </Button>
          </Link>{" "}
          {/* 
          <Link to="/threads">
            <Button variant="outline" className="gap-2 text-lg px-8 py-6 w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" />
              Community
            </Button>
          </Link> */}
        </div>
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/whatsapp">
                <FaWhatsapp />
                Join WhatsApp Community
              </Link>
            </Button>
            <Link to="/chat">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <MdQuestionAnswer />
                Live Chat with me!
              </Button>
            </Link>
          </div>
        </footer>
      </div>
      {/* <div className="fixed bottom-0 left-0 w-full bg-primary/90 text-white py-4 px-6 flex flex-col sm:flex-row items-center justify-center gap-6 shadow-lg z-50">
        <Link to="/sme-chem" className="font-semibold hover:underline">
          SME Chem
        </Link>
        <span className="hidden sm:block">|</span>
        <Link to="/sme-bio" className="font-semibold hover:underline">
          SME Bio
        </Link>
      </div> */}
    </div>
  );
};

export default Index;
