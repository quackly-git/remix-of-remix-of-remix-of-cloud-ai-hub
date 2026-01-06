import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface MarksLog {
  id: string;
  marks: number;
  created_at: string;
}

interface MarksLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  pastPaperId: string;
  paperTitle: string;
}

export const MarksLogModal = ({ isOpen, onClose, pastPaperId, paperTitle }: MarksLogModalProps) => {
  const [marks, setMarks] = useState("");
  const [existingLogs, setExistingLogs] = useState<MarksLog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, pastPaperId]);

  const fetchLogs = () => {
    const storageKey = `marks_log_${pastPaperId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setExistingLogs(JSON.parse(stored));
    } else {
      setExistingLogs([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const marksValue = parseInt(marks);
    if (isNaN(marksValue) || marksValue < 0 || marksValue > 90) {
      toast({ title: "Please enter a valid mark between 0 and 90", variant: "destructive" });
      return;
    }

    const newLog: MarksLog = {
      id: Date.now().toString(),
      marks: marksValue,
      created_at: new Date().toISOString(),
    };

    const storageKey = `marks_log_${pastPaperId}`;
    const updatedLogs = [newLog, ...existingLogs];
    localStorage.setItem(storageKey, JSON.stringify(updatedLogs));
    
    toast({ title: "Marks logged successfully!" });
    setMarks("");
    fetchLogs();
  };

  const handleDelete = (logId: string) => {
    const storageKey = `marks_log_${pastPaperId}`;
    const updatedLogs = existingLogs.filter(log => log.id !== logId);
    localStorage.setItem(storageKey, JSON.stringify(updatedLogs));
    
    toast({ title: "Log deleted" });
    fetchLogs();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Marks - {paperTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="marks">Marks (out of 90)</Label>
            <Input
              id="marks"
              type="number"
              min="0"
              max="90"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Enter your marks"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Log Marks
          </Button>
        </form>

        {existingLogs.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Your Previous Attempts</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {existingLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div>
                    <p className="font-medium">{log.marks}/90</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(log.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
