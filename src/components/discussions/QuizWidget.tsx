import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { KawaiiMascot } from "./KawaiiMascot";
import { biologyQuestions, Question } from "@/data/biologyQuestions.data";
import { Timer, Gamepad2, Check, X, RotateCcw, Trophy, ChevronDown, ChevronUp, EyeOff, ExternalLink } from "lucide-react";

const QUIZ_SIZE = 3;
const TIME_PER_QUESTION = 60; // seconds
const STORAGE_KEY = 'quiz_solved_questions';

const VISIBILITY_KEY = 'quiz_widget_visible';
const COLLAPSED_KEY = 'quiz_widget_collapsed';

const QuizWidget = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION * QUIZ_SIZE);
  const [isRunning, setIsRunning] = useState(false);
  const [allSolved, setAllSolved] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(() => {
    const stored = localStorage.getItem(VISIBILITY_KEY);
    return stored !== 'false';
  });
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem(COLLAPSED_KEY);
    return stored === 'true';
  });

  const toggleVisibility = () => {
    const newValue = !isVisible;
    setIsVisible(newValue);
    localStorage.setItem(VISIBILITY_KEY, String(newValue));
  };

  const toggleCollapsed = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem(COLLAPSED_KEY, String(newValue));
  };

  const getSolvedIds = (): number[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveSolvedIds = (ids: number[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const selectRandomQuestions = useCallback(() => {
    const solvedIds = getSolvedIds();
    const available = biologyQuestions.filter(q => !solvedIds.includes(q.id));
    
    if (available.length === 0) {
      setAllSolved(true);
      return [];
    }
    
    // Shuffle and pick QUIZ_SIZE questions
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length));
  }, []);

  const startQuiz = () => {
    const selected = selectRandomQuestions();
    if (selected.length === 0) return;
    
    setQuestions(selected);
    setAnswers(new Array(selected.length).fill(''));
    setCurrentIndex(0);
    setSubmitted(false);
    setTimeLeft(TIME_PER_QUESTION * selected.length);
    setIsRunning(true);
    setScores([]);
  };

  useEffect(() => {
    // Check if all questions are solved on mount
    const solvedIds = getSolvedIds();
    if (solvedIds.length >= biologyQuestions.length) {
      setAllSolved(true);
    }
  }, []);

  useEffect(() => {
    if (!isRunning || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, submitted]);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
  };

  const gradeAnswer = (answer: string, question: Question): number => {
    const lowerAnswer = answer.toLowerCase();
    let marksAwarded = 0;
    
    for (const pointGroup of question.markingPoints) {
      if (pointGroup.some(keyword => lowerAnswer.includes(keyword.toLowerCase()))) {
        marksAwarded++;
      }
    }
    
    return marksAwarded;
  };

  const handleSubmit = () => {
    setIsRunning(false);
    setSubmitted(true);
    
    // Grade all answers
    const newScores = questions.map((q, i) => gradeAnswer(answers[i], q));
    setScores(newScores);
    
    // Mark questions as solved
    const solvedIds = getSolvedIds();
    const newSolved = [...new Set([...solvedIds, ...questions.map(q => q.id)])];
    saveSolvedIds(newSolved);
    
    // Check if all done
    if (newSolved.length >= biologyQuestions.length) {
      setAllSolved(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = questions.reduce((a, q) => a + q.markingPoints.length, 0);

  // Hidden state
  if (!isVisible) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleVisibility}
        className="w-full"
      >
        <Gamepad2 className="h-4 w-4 mr-2" />
        Show Quiz Widget
      </Button>
    );
  }

  // Wrapper component for collapse/hide controls
  const WidgetHeader = () => (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium flex items-center gap-2">
        <Gamepad2 className="h-4 w-4" />
        Quick Quiz
      </span>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleCollapsed}>
          {isCollapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleVisibility}>
          <EyeOff className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigate('/game')}>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  if (allSolved) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-4">
          <WidgetHeader />
          {!isCollapsed && (
            <div className="flex flex-col items-center pt-2">
              <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
              <p className="text-center text-muted-foreground">
                You've solved all questions! 🎉<br />
                <span className="text-xs">Wait for new questions to be added.</span>
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setAllSolved(false);
                  startQuiz();
                }}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset Progress
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-4">
          <WidgetHeader />
          {!isCollapsed && (
            <div className="flex flex-col items-center pt-2">
              <KawaiiMascot character="cat" mood="excited" size={60} />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Quick Quiz Challenge!<br />
                <span className="text-xs">3 random questions • {TIME_PER_QUESTION * QUIZ_SIZE}s timer</span>
              </p>
              <Button size="sm" className="mt-3" onClick={startQuiz}>
                <Gamepad2 className="h-4 w-4 mr-1" />
                Start Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Quiz Results: {totalScore}/{maxScore} marks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((q, i) => (
            <div key={q.id} className="text-xs space-y-1 p-2 bg-muted rounded">
              <div className="flex items-center justify-between">
                <span className="font-medium">Q{i + 1}: {q.topic}</span>
                <Badge variant={scores[i] > 0 ? "default" : "destructive"} className="text-xs">
                  {scores[i]}/{q.markingPoints.length}
                </Badge>
              </div>
              <p className="text-muted-foreground">{q.question}</p>
              <p className="text-green-600 dark:text-green-400">✓ {q.answer}</p>
            </div>
          ))}
          <Button size="sm" className="w-full" onClick={startQuiz}>
            <RotateCcw className="h-3 w-3 mr-1" />
            New Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Q{currentIndex + 1}/{questions.length}
          </CardTitle>
          <Badge variant={timeLeft < 30 ? "destructive" : "secondary"} className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            {formatTime(timeLeft)}
          </Badge>
        </div>
        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-1" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Badge variant="outline" className="text-xs mb-2">{currentQuestion.topic} • {currentQuestion.difficulty}</Badge>
          <p className="text-sm font-medium">{currentQuestion.question}</p>
        </div>
        
        <Textarea
          value={answers[currentIndex]}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Type your answer..."
          rows={3}
          className="text-sm"
        />
        
        <div className="flex gap-2">
          {currentIndex > 0 && (
            <Button variant="outline" size="sm" onClick={() => setCurrentIndex(i => i - 1)}>
              Previous
            </Button>
          )}
          {currentIndex < questions.length - 1 ? (
            <Button size="sm" onClick={() => setCurrentIndex(i => i + 1)} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button size="sm" onClick={handleSubmit} className="ml-auto">
              <Check className="h-3 w-3 mr-1" />
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizWidget;
