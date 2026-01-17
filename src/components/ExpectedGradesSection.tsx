import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Beaker,
  Leaf,
  Heart,
  Save,
  GraduationCap,
} from "lucide-react";
import {
  Session,
  Subject,
  MarkMode,
  SubjectPrediction,
  getMaxMarks,
  getLetterGrades,
} from "@/hooks/useResultsSettings";
import { toast } from "@/hooks/use-toast";

interface ExpectedGradesSectionProps {
  session: Session;
  predictions: SubjectPrediction[];
  onSave: (predictions: SubjectPrediction[]) => void;
}

const subjectIcons: Record<Subject, React.ReactNode> = {
  Chemistry: <Beaker className="h-4 w-4" />,
  Biology: <Leaf className="h-4 w-4" />,
  "Human Bio": <Heart className="h-4 w-4" />,
};

export const ExpectedGradesSection: React.FC<ExpectedGradesSectionProps> = ({
  session,
  predictions,
  onSave,
}) => {
  const [localPredictions, setLocalPredictions] = useState<SubjectPrediction[]>(predictions);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  
  const availableSubjects: Subject[] = session === "oct2025" 
    ? ["Chemistry", "Biology", "Human Bio"] 
    : ["Chemistry", "Biology"];

  useEffect(() => {
    setLocalPredictions(predictions);
    const subjects = predictions.map(p => p.subject);
    setSelectedSubjects(subjects);
  }, [predictions]);

  const toggleSubject = (subject: Subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(prev => prev.filter(s => s !== subject));
      setLocalPredictions(prev => prev.filter(p => p.subject !== subject));
    } else {
      setSelectedSubjects(prev => [...prev, subject]);
      setLocalPredictions(prev => [
        ...prev,
        { subject, mode: "raw", units: [] }
      ]);
    }
  };

  const updateSubjectMode = (subject: Subject, mode: MarkMode) => {
    setLocalPredictions(prev => 
      prev.map(p => 
        p.subject === subject 
          ? { ...p, mode, units: p.units.map(u => ({ ...u, marks: Math.min(u.marks, getMaxMarks(u.unit, mode, subject)) })) } 
          : p
      )
    );
  };

  const toggleUnit = (subject: Subject, unit: number) => {
    setLocalPredictions(prev => 
      prev.map(p => {
        if (p.subject !== subject) return p;
        const hasUnit = p.units.some(u => u.unit === unit);
        if (hasUnit) {
          return { ...p, units: p.units.filter(u => u.unit !== unit) };
        }
        return { ...p, units: [...p.units, { unit, marks: 0 }].sort((a, b) => a.unit - b.unit) };
      })
    );
  };

  const updateUnitMarks = (subject: Subject, unit: number, marks: number) => {
    const pred = localPredictions.find(p => p.subject === subject);
    if (!pred) return;
    
    const maxMarks = getMaxMarks(unit, pred.mode, subject);
    const clampedMarks = Math.min(Math.max(0, marks), maxMarks);
    
    setLocalPredictions(prev =>
      prev.map(p => {
        if (p.subject !== subject) return p;
        return {
          ...p,
          units: p.units.map(u =>
            u.unit === unit ? { ...u, marks: clampedMarks } : u
          ),
        };
      })
    );
  };

  const updateUnitGrade = (subject: Subject, unit: number, letterGrade: string) => {
    setLocalPredictions(prev =>
      prev.map(p => {
        if (p.subject !== subject) return p;
        return {
          ...p,
          units: p.units.map(u =>
            u.unit === unit ? { ...u, letterGrade } : u
          ),
        };
      })
    );
  };

  const handleSave = () => {
    onSave(localPredictions);
    toast({
      title: "Predictions saved!",
      description: "Your expected grades have been saved successfully.",
    });
  };

  const getUnitsForSubject = (subject: Subject): number[] => {
    if (subject === "Human Bio") return []; // Human Bio has no units
    return [1, 2, 3, 4, 5, 6];
  };

  return (
    <Card className="w-full max-w-2xl border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="h-5 w-5" />
          Expected Grades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subject Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Select Subjects</Label>
          <div className="flex flex-wrap gap-2">
            {availableSubjects.map((subject) => (
              <Badge
                key={subject}
                variant="outline"
                className={`cursor-pointer px-3 py-2 transition-all ${
                  selectedSubjects.includes(subject)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "opacity-50 hover:opacity-75"
                }`}
                onClick={() => toggleSubject(subject)}
              >
                {subjectIcons[subject]}
                <span className="ml-1">{subject}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Subject Predictions */}
        {localPredictions.map((pred) => (
          <div
            key={pred.subject}
            className="p-4 rounded-lg border border-border bg-muted/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                {subjectIcons[pred.subject]}
                {pred.subject}
              </div>
              
              {pred.subject !== "Human Bio" && (
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Raw</Label>
                  <Switch
                    checked={pred.mode === "ums"}
                    onCheckedChange={(checked) =>
                      updateSubjectMode(pred.subject, checked ? "ums" : "raw")
                    }
                  />
                  <Label className="text-xs">UMS</Label>
                </div>
              )}
            </div>

            {/* Unit Selection */}
            {pred.subject !== "Human Bio" ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {getUnitsForSubject(pred.subject).map((unit) => (
                    <Badge
                      key={unit}
                      variant="outline"
                      className={`cursor-pointer ${
                        pred.units.some(u => u.unit === unit)
                          ? "bg-secondary text-secondary-foreground border-secondary"
                          : "opacity-50"
                      }`}
                      onClick={() => toggleUnit(pred.subject, unit)}
                    >
                      Unit {unit}
                    </Badge>
                  ))}
                </div>

                {/* Unit Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pred.units.map((unit) => (
                    <div key={unit.unit} className="flex items-center gap-2 bg-background p-2 rounded border border-border">
                      <span className="text-sm font-medium w-12">U{unit.unit}</span>
                      <Input
                        type="number"
                        min={0}
                        max={getMaxMarks(unit.unit, pred.mode, pred.subject)}
                        value={unit.marks}
                        onChange={(e) =>
                          updateUnitMarks(pred.subject, unit.unit, parseInt(e.target.value) || 0)
                        }
                        className="w-20 h-8 text-center"
                        placeholder="Marks"
                      />
                      <span className="text-xs text-muted-foreground">
                        /{getMaxMarks(unit.unit, pred.mode, pred.subject)}
                      </span>
                      <Select
                        value={unit.letterGrade || ""}
                        onValueChange={(val) => updateUnitGrade(pred.subject, unit.unit, val)}
                      >
                        <SelectTrigger className="w-16 h-8">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {getLetterGrades(unit.unit, pred.subject).map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Human Bio - Single total marks */
              <div className="flex items-center gap-3 bg-background p-3 rounded border border-border">
                <span className="text-sm font-medium">Total Marks</span>
                <Input
                  type="number"
                  min={0}
                  max={180}
                  value={pred.units[0]?.marks || 0}
                  onChange={(e) => {
                    const marks = Math.min(180, Math.max(0, parseInt(e.target.value) || 0));
                    setLocalPredictions(prev =>
                      prev.map(p =>
                        p.subject === "Human Bio"
                          ? { ...p, units: [{ unit: 0, marks }] }
                          : p
                      )
                    );
                  }}
                  className="w-20 h-8 text-center"
                />
                <span className="text-xs text-muted-foreground">/180</span>
                <Select
                  value={pred.units[0]?.letterGrade || ""}
                  onValueChange={(val) => {
                    setLocalPredictions(prev =>
                      prev.map(p =>
                        p.subject === "Human Bio"
                          ? { ...p, units: [{ ...p.units[0], unit: 0, letterGrade: val }] }
                          : p
                      )
                    );
                  }}
                >
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {getLetterGrades(0, "Human Bio").map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        ))}

        {/* Save Button */}
        {selectedSubjects.length > 0 && (
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Predictions
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
