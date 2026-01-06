import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pp_data } from "@/data/pp_data";
import { FileText, MessageSquare } from "lucide-react";

export const PaperSelector = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<string>("");

  const standardPapers = pp_data.filter(p => p.id && p.id.trim() !== "" && p.type !== "other" && p.year && p.season);
  
  // Group by year
  const papersByYear = standardPapers.reduce((acc, paper) => {
    if (!paper.year) return acc;
    if (!acc[paper.year]) acc[paper.year] = [];
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, typeof standardPapers>);

  const years = Object.keys(papersByYear).map(Number).sort((a, b) => b - a);

  const handleGo = () => {
    if (selectedPaper) {
      navigate(`/discussion/${selectedPaper}`);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Past Paper Discussions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Go to Paper Discussion
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Select value={selectedPaper} onValueChange={setSelectedPaper}>
            <SelectTrigger>
              <SelectValue placeholder="Select a past paper..." />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {years.map(year => (
                <SelectGroup key={year}>
                  <SelectLabel>{year}</SelectLabel>
                  {papersByYear[year].map(paper => (
                    <SelectItem key={paper.id} value={paper.id}>
                      {paper.year} {paper.season?.charAt(0).toUpperCase()}{paper.season?.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGo} disabled={!selectedPaper}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Go to Discussion
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
