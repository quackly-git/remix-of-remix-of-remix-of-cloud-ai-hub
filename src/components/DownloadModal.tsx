import { X, Download, FileText, Image, Copy, ExternalLink } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChecklistState } from "@/types/checklist";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: ChecklistState;
}

export const DownloadModal = ({
  open,
  onOpenChange,
  state,
}: DownloadModalProps) => {
  const handleDownloadPDF = async () => {
    try {
      const element = document.querySelector(".checklist-content");
      if (!element) return;

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--background"),
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("syllabus-checklist.pdf");
      toast.success("PDF downloaded successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to download PDF");
    }
  };
  const handleDownloadSyllabus = () => {
    const link = document.createElement("a");
    link.href = "/unit4.pdf"; // file located in /public/unit4.pdf
    link.download = "IAL_Biology_Unit4_Syllabus.pdf";
    link.click();

    toast.success("Unit 4 syllabus downloaded");
    onOpenChange(false);
  };

  const handleDownloadImage = async () => {
    try {
      const element = document.querySelector(".checklist-content");
      if (!element) return;

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--background"),
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "syllabus-checklist.png";
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          toast.success("Image downloaded successfully");
          onOpenChange(false);
        }
      });
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const handleCopyToClipboard = () => {
    const objectives: string[] = [];
    state.topics.forEach((topic) => {
      objectives.push(`\n${topic.title}\n${"=".repeat(topic.title.length)}`);
      topic.lessons.forEach((lesson) => {
        objectives.push(`\n${lesson.title}:`);
        lesson.objectives.forEach((obj) => {
          objectives.push(`  ${obj.completed ? "✓" : "○"} ${obj.text}`);
        });
      });
    });

    navigator.clipboard.writeText(objectives.join("\n"));
    toast.success("Objectives copied to clipboard");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Download Options
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Export your progress in various formats
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleDownloadSyllabus}
              className="w-full justify-start gap-3 h-auto py-4 bg-card hover:bg-secondary border border-border text-foreground"
              variant="outline"
            >
              <FileText className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Download as PDF</div>
                <div className="text-xs text-muted-foreground">
                  Save your checklist as a PDF document
                </div>
              </div>
            </Button>

            <Button
              onClick={handleDownloadSyllabus}
              className="w-full justify-start gap-3 h-auto py-4 bg-card hover:bg-secondary border border-border text-foreground"
              variant="outline"
            >
              <Image className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Download as Image</div>
                <div className="text-xs text-muted-foreground">
                  Export your checklist as a PNG image
                </div>
              </div>
            </Button>

            <Button
              onClick={handleCopyToClipboard}
              className="w-full justify-start gap-3 h-auto py-4 bg-card hover:bg-secondary border border-border text-foreground"
              variant="outline"
            >
              <Copy className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Copy to Clipboard</div>
                <div className="text-xs text-muted-foreground">
                  Copy all objectives as plain text
                </div>
              </div>
            </Button>

            <Button
              onClick={handleDownloadSyllabus}
              className="w-full justify-start gap-3 h-auto py-4 bg-card hover:bg-secondary border border-border text-foreground"
              variant="outline"
            >
              <ExternalLink className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Official Syllabus</div>
                <div className="text-xs text-muted-foreground">
                  Download the official Edexcel IAL Biology syllabus PDF
                </div>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
