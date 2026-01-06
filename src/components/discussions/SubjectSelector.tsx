import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Beaker, 
  Atom, 
  Calculator, 
  BookOpen, 
  Dna, 
  FlaskConical,
  Plus,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const subjects: Subject[] = [
  { id: 'biology', name: 'Biology', icon: <Dna className="h-4 w-4" /> },
  { id: 'chemistry', name: 'Chemistry', icon: <Beaker className="h-4 w-4" /> },
  { id: 'physics', name: 'Physics', icon: <Atom className="h-4 w-4" /> },
  { id: 'mathematics', name: 'Mathematics', icon: <Calculator className="h-4 w-4" /> },
  { id: 'english', name: 'English', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'further_maths', name: 'Further Maths', icon: <FlaskConical className="h-4 w-4" /> },
];

export const getSubjectIcon = (subjectName: string) => {
  const subject = subjects.find(s => s.id === subjectName || s.name.toLowerCase() === subjectName.toLowerCase());
  return subject?.icon || <BookOpen className="h-4 w-4" />;
};

interface SubjectSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectsAdded?: () => void;
  existingSubjects?: Array<{ subject_name: string; exam_board: string; level: string }>;
}

export const SubjectSelector = ({ isOpen, onClose, onSubjectsAdded, existingSubjects = [] }: SubjectSelectorProps) => {
  const [step, setStep] = useState(1);
  const [selectedBoard, setSelectedBoard] = useState<'cambridge' | 'edexcel' | ''>('');
  const [selectedLevel, setSelectedLevel] = useState<'igcse' | 'alevel' | ''>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useDiscussionAuth();
  const { toast } = useToast();

  const isSubjectAlreadyAdded = (subjectId: string) => {
    return existingSubjects.some(
      s => s.subject_name === subjectId && s.exam_board === selectedBoard && s.level === selectedLevel
    );
  };

  const handleSubjectToggle = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleAddSubjects = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const newSubjects = selectedSubjects.map(subjectId => ({
        user_id: user.id,
        subject_name: subjectId,
        exam_board: selectedBoard,
        level: selectedLevel,
      }));

      const { error } = await supabase
        .from('user_subjects')
        .insert(newSubjects);

      if (error) throw error;

      toast({ title: `Added ${selectedSubjects.length} subject(s)!` });
      onSubjectsAdded?.();
      handleReset();
      onClose();
    } catch (error: any) {
      toast({ title: "Error adding subjects", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedBoard('');
    setSelectedLevel('');
    setSelectedSubjects([]);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Subjects</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <Label>Select Exam Board</Label>
            <RadioGroup value={selectedBoard} onValueChange={(v) => setSelectedBoard(v as 'cambridge' | 'edexcel')}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="cambridge" id="cambridge" />
                <Label htmlFor="cambridge" className="cursor-pointer flex-1">Cambridge (CAIE)</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="edexcel" id="edexcel" />
                <Label htmlFor="edexcel" className="cursor-pointer flex-1">Edexcel (Pearson)</Label>
              </div>
            </RadioGroup>
            <DialogFooter>
              <Button onClick={() => setStep(2)} disabled={!selectedBoard}>
                Next
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label>Select Level</Label>
            <RadioGroup value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as 'igcse' | 'alevel')}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="igcse" id="igcse" />
                <Label htmlFor="igcse" className="cursor-pointer flex-1">IGCSE / O Level</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="alevel" id="alevel" />
                <Label htmlFor="alevel" className="cursor-pointer flex-1">A Level / AS Level</Label>
              </div>
            </RadioGroup>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!selectedLevel}>
                Next
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label>Select Subjects</Label>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((subject) => {
                const isExisting = isSubjectAlreadyAdded(subject.id);
                const isSelected = selectedSubjects.includes(subject.id);
                
                return (
                  <div
                    key={subject.id}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors
                      ${isExisting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'}
                      ${isSelected ? 'border-primary bg-primary/10' : ''}`}
                    onClick={() => !isExisting && handleSubjectToggle(subject.id)}
                  >
                    <Checkbox 
                      checked={isSelected} 
                      disabled={isExisting}
                      onCheckedChange={() => !isExisting && handleSubjectToggle(subject.id)}
                    />
                    {subject.icon}
                    <span className="text-sm">{subject.name}</span>
                  </div>
                );
              })}
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleAddSubjects} disabled={selectedSubjects.length === 0 || loading}>
                {loading ? 'Adding...' : `Add ${selectedSubjects.length} Subject(s)`}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface UserSubjectsDisplayProps {
  subjects: Array<{ id: string; subject_name: string; exam_board: string; level: string }>;
  onRemove?: (id: string) => void;
  editable?: boolean;
}

export const UserSubjectsDisplay = ({ subjects, onRemove, editable = false }: UserSubjectsDisplayProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <Badge 
          key={subject.id} 
          variant="secondary" 
          className="flex items-center gap-1 py-1 px-2"
        >
          {getSubjectIcon(subject.subject_name)}
          <span className="capitalize">{subject.subject_name.replace('_', ' ')}</span>
          <span className="text-xs text-muted-foreground">
            ({subject.level.toUpperCase()} • {subject.exam_board})
          </span>
          {editable && onRemove && (
            <button onClick={() => onRemove(subject.id)} className="ml-1 hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
};
