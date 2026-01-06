import { useState } from "react";
import { Download, FileText, Image, Code, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  highlights: any[];
  annotations: any[];
  savedContent: any[];
}

export function ExportModal({
  isOpen,
  onClose,
  subjectName,
  highlights,
  annotations,
  savedContent,
}: ExportModalProps) {
  const [includeHighlights, setIncludeHighlights] = useState(true);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [exportScope, setExportScope] = useState("current-subject");
  const [copied, setCopied] = useState(false);

  const generateExportData = () => {
    const exportData = {
      subject: subjectName,
      exportDate: new Date().toISOString(),
      highlights: includeHighlights ? highlights : [],
      annotations: annotations,
      savedContent: savedContent,
    };
    return JSON.stringify(exportData, null, 2);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    const exportElement = document.getElementById("export-content");

    if (!exportElement) return;

    const canvas = await html2canvas(exportElement, {
      scale: 2, // higher scale = better quality
    });

    if (exportFormat === "image") {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${subjectName}-export.png`;
      link.click();
    }

    if (exportFormat === "pdf") {
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${subjectName}-export.pdf`);
    }
  };

  const totalItems =
    highlights.length + annotations.length + savedContent.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            Export Content
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            Choose what to export and in which format. You can include
            highlights and select specific content.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <h3 className="font-medium">Export Format</h3>
            <div className="flex gap-3">
              <Button
                variant={exportFormat === "pdf" ? "default" : "outline"}
                onClick={() => setExportFormat("pdf")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              <Button
                variant={exportFormat === "image" ? "default" : "outline"}
                onClick={() => setExportFormat("image")}
                className="flex items-center gap-2"
              >
                <Image className="h-4 w-4" />
                Image
              </Button>
            </div>
          </div>

          {/* Include Highlights */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="highlights"
              checked={includeHighlights}
              onCheckedChange={(checked) => setIncludeHighlights(!!checked)}
            />
            <label htmlFor="highlights" className="text-sm font-medium">
              Include highlights ({highlights.length} total)
            </label>
          </div>

          {/* What to Export */}
          <div className="space-y-3">
            <h3 className="font-medium">What to Export</h3>
            <RadioGroup value={exportScope} onValueChange={setExportScope}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-subjects" id="all-subjects" />
                <Label htmlFor="all-subjects">Export all Topics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current-subject" id="current-subject" />
                <Label htmlFor="current-subject">
                  Export current subject ({subjectName})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom selection</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Custom Selection */}
          {exportScope === "custom" && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="math-subject" defaultChecked />
                <FileText className="h-4 w-4" />
                <span className="font-medium">{subjectName}</span>
                <Badge variant="secondary">1 chapters</Badge>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="intro-chapter" defaultChecked />
                  <span className="text-sm">Introduction to {subjectName}</span>
                  <Badge variant="outline" className="text-xs">
                    2 lessons
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-1">
            <p className="text-sm">
              <strong>Selected:</strong> 2 lessons
            </p>
            <p className="text-sm">
              <strong>Format:</strong> {exportFormat.toUpperCase()}
            </p>
            <p className="text-sm">
              <strong>Highlights:</strong>{" "}
              {includeHighlights ? "Included" : "Not included"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export {exportFormat.toUpperCase()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
