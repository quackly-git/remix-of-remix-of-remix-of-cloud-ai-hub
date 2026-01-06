import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeControls } from "@/components/ThemeControls";
import { pp_data, PastPaperData } from "@/data/pp_data"; // adjust path

import {
  ArrowLeft,
  FileText,
  BookOpen,
  MessageSquare,
  Check,
  List,
  Grid,
  ExternalLink,
} from "lucide-react";
import { MarksLogModal } from "@/components/MarksLogModal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import ReactConfetti from "react-confetti";

interface PastPaper {
  id: string;
  year?: number; // optional for "Other Papers"
  season?: string; // optional for "Other Papers"
  question_paper_url?: string;
  mark_scheme_url?: string;
  examiner_report_url?: string; // optional
  title?: string; // optional, for custom names
  type?: "standard" | "other"; // optional, to distinguish normal vs other
}

const PastPapersChecklist = () => {
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [showOldPapers, setShowOldPapers] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [completedPapers, setCompletedPapers] = useState<Set<string>>(
    new Set()
  );
  const [openYears, setOpenYears] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  // Inside your component
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // fetchPapers(); // remove Supabase fetch
    setPapers(pp_data); // use local data

    const savedShowOld = localStorage.getItem("showOldPapers");
    if (savedShowOld) setShowOldPapers(JSON.parse(savedShowOld));

    const savedCompleted = localStorage.getItem("completedPapers");
    if (savedCompleted) setCompletedPapers(new Set(JSON.parse(savedCompleted)));

    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) setViewMode(savedViewMode as "list" | "grid");
  }, []);

  const handleShowOldPapersChange = (checked: boolean) => {
    setShowOldPapers(checked);
    localStorage.setItem("showOldPapers", JSON.stringify(checked));
  };

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  const togglePaperComplete = (paperId: string) => {
    const newCompleted = new Set(completedPapers);
    if (newCompleted.has(paperId)) {
      newCompleted.delete(paperId);
    } else {
      newCompleted.add(paperId);
      setShowConfetti(true); // trigger confetti
      setTimeout(() => setShowConfetti(false), 3000); // stop after 3s
    }
    setCompletedPapers(newCompleted);
    localStorage.setItem("completedPapers", JSON.stringify([...newCompleted]));
  };

  const toggleYear = (year: number) => {
    const newOpen = new Set(openYears);
    if (newOpen.has(year)) {
      newOpen.delete(year);
    } else {
      newOpen.add(year);
    }
    setOpenYears(newOpen);
  };

  const filteredPapers = showOldPapers
    ? papers
    : papers.filter((p) => p.year >= 2020);
  const totalPapers = filteredPapers.length;
  const solvedPapers = filteredPapers.filter((p) =>
    completedPapers.has(p.id)
  ).length;
  const progressPercent =
    totalPapers > 0 ? (solvedPapers / totalPapers) * 100 : 0;

  const papersByYear = filteredPapers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, PastPaper[]>);
  const [openOtherPapers, setOpenOtherPapers] = useState(false);

  const years = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const openMarksModal = (paper: PastPaper) => {
    setSelectedPaper(paper);
    setIsMarksModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex justify-end mb-4">
            <ThemeControls />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Past Papers Checklist
          </h1>
          <p className="text-muted-foreground mb-4">
            Track your progress through past examination papers
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex items-center gap-2 p-4 bg-card rounded-lg flex-1">
              <Checkbox
                id="showOldPapers"
                checked={showOldPapers}
                onCheckedChange={handleShowOldPapersChange}
              />
              <label
                htmlFor="showOldPapers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show papers from 2013-2019
              </label>
            </div>

            <div className="flex gap-2 p-2 bg-card rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("grid")}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-foreground">
              Overall Progress: {solvedPapers}/{totalPapers} solved
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : "space-y-4"
          }
        >
          {" "}
          <Collapsible open={openOtherPapers} onOpenChange={setOpenOtherPapers}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors">
                <h2 className="text-2xl font-bold">Nice Resources</h2>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openOtherPapers ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {papers
                  .filter((p) => p.type === "other")
                  .map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-card rounded-lg p-4 flex flex-col justify-between"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {paper.title}
                      </h3>
                      <div className="flex flex-col gap-2 mt-auto">
                        {(paper.question_paper_url ||
                          paper.mark_scheme_url) && (
                          <Button variant="outline" asChild size="sm">
                            <a
                              href={
                                paper.question_paper_url ||
                                paper.mark_scheme_url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open
                            </a>
                          </Button>
                        )}
                        {paper.examiner_report_url && (
                          <Button variant="outline" asChild size="sm">
                            <a
                              href={paper.examiner_report_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Examiner Report
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          {years.map((year) => (
            <Collapsible
              key={year}
              open={openYears.has(year)}
              onOpenChange={() => toggleYear(year)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors">
                  <h2 className="text-2xl font-bold">{year}</h2>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openYears.has(year) ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                      : "grid grid-cols-1 md:grid-cols-2 gap-4"
                  }
                >
                  {(papersByYear[year] || []).map((paper) => (
                    <div
                      key={paper.id}
                      className="relative bg-card rounded-lg  transition-all"
                      style={{
                        borderColor: completedPapers.has(paper.id)
                          ? "hsl(var(--primary))"
                          : "",
                        borderWidth: completedPapers.has(paper.id)
                          ? "2px"
                          : "1px",
                      }}
                    >
                      {completedPapers.has(paper.id) && (
                        <div className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none" />
                      )}
                      <div className="p-4 relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-semibold">
                            {paper.season.charAt(0).toUpperCase() +
                              paper.season.slice(1)}
                          </h3>
                          <Button
                            variant={
                              completedPapers.has(paper.id)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => togglePaperComplete(paper.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          {showConfetti && (
                            <ReactConfetti
                              width={windowSize.width}
                              height={windowSize.height}
                              recycle={false}
                              numberOfPieces={200}
                              gravity={0.3}
                            />
                          )}
                        </div>

                        <div
                          className={
                            viewMode === "grid"
                              ? "space-y-2"
                              : "flex flex-wrap gap-2"
                          }
                        >
                          {paper.question_paper_url && (
                            <Button
                              variant="outline"
                              className="w-full"
                              size="sm"
                              asChild
                            >
                              <a
                                href={paper.question_paper_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Question Paper
                              </a>
                            </Button>
                          )}

                          {paper.mark_scheme_url && (
                            <Button
                              variant="outline"
                              className="w-full"
                              size="sm"
                              asChild
                            >
                              <a
                                href={paper.mark_scheme_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <BookOpen className="mr-2 h-4 w-4" />
                                Mark Scheme
                              </a>
                            </Button>
                          )}
                          {paper.examiner_report_url && (
                            <Button
                              variant="outline"
                              className="w-full"
                              size="sm"
                              asChild
                            >
                              <a
                                href={paper.examiner_report_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Examiner Report
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                            onClick={() => openMarksModal(paper)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Log Marks
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                            asChild
                          >
                            <Link to={`/discussion/${paper.id}`}>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Discuss
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {selectedPaper && (
        <MarksLogModal
          isOpen={isMarksModalOpen}
          onClose={() => setIsMarksModalOpen(false)}
          pastPaperId={selectedPaper.id}
          paperTitle={`${selectedPaper.year} ${selectedPaper.season}`}
        />
      )}
    </div>
  );
};

export default PastPapersChecklist;
