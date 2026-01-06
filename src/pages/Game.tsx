import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Award, Sparkles, Home, RotateCcw, Trophy } from "lucide-react";
import { biologyQuestions, Question } from "@/data/biologyQuestions.data";
import { gradeAnswer, GradeResult } from "@/utils/answerGrading.utils";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_SIZE = 3;
const SOLVED_KEY = "quiz_solved_questions";

interface QuizState {
  currentIndex: number;
  answers: Record<number, string>;
  results: Record<number, {
    grade: GradeResult;
    earnedXP: number;
    matchedPoints: number;
    totalPoints: number;
  }>;
  submitted: boolean;
}

// Shuffle array utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get solved question IDs from localStorage
function getSolvedQuestionIds(): number[] {
  try {
    const stored = localStorage.getItem(SOLVED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save solved question IDs to localStorage
function saveSolvedQuestionIds(ids: number[]): void {
  localStorage.setItem(SOLVED_KEY, JSON.stringify(ids));
}

// Highlight matched keywords in user's answer
function highlightKeywords(answer: string, question: Question): React.ReactNode {
  if (!answer) return answer;
  
  const words = answer.split(/(\s+)/);
  const normalizedWords = words.map(w => w.toLowerCase().replace(/[^\w\s]/g, ""));
  
  const matchedIndices = new Set<number>();
  
  question.markingPoints.forEach(group => {
    group.forEach(keyword => {
      normalizedWords.forEach((word, idx) => {
        if (word.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(word)) {
          if (word.length > 2) matchedIndices.add(idx);
        }
      });
    });
  });
  
  return words.map((word, idx) => {
    if (matchedIndices.has(idx)) {
      return <span key={idx} className="bg-green-500/30 text-green-400 font-semibold px-1 rounded">{word}</span>;
    }
    return <span key={idx}>{word}</span>;
  });
}

export default function Game() {
  const navigate = useNavigate();
  const { profile, refreshProfile } = useDiscussionAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [allSolved, setAllSolved] = useState(false);
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    answers: {},
    results: {},
    submitted: false,
  });
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize with shuffled unsolved questions
  useEffect(() => {
    const solvedIds = getSolvedQuestionIds();
    const unsolvedQuestions = biologyQuestions.filter(q => !solvedIds.includes(q.id));
    
    if (unsolvedQuestions.length === 0) {
      setAllSolved(true);
      return;
    }
    
    const shuffled = shuffleArray(unsolvedQuestions);
    setQuestions(shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length)));
  }, []);

  const currentQuestion = questions[state.currentIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((state.currentIndex + 1) / totalQuestions) * 100 : 0;

  // Load saved answer when navigating
  useEffect(() => {
    if (currentQuestion) {
      setCurrentAnswer(state.answers[currentQuestion.id] || "");
    }
  }, [state.currentIndex, currentQuestion, state.answers]);

  const saveCurrentAnswer = useCallback(() => {
    if (currentQuestion && currentAnswer.trim()) {
      setState(prev => ({
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: currentAnswer }
      }));
    }
  }, [currentQuestion, currentAnswer]);

  const handlePrevious = () => {
    saveCurrentAnswer();
    setState(prev => ({ ...prev, currentIndex: Math.max(0, prev.currentIndex - 1) }));
  };

  const handleNext = async () => {
    if (!currentQuestion) return;
    
    // Save answer
    const answerToGrade = currentAnswer.trim();
    const newAnswers = { ...state.answers, [currentQuestion.id]: answerToGrade };
    
    // Grade the answer
    const result = gradeAnswer(answerToGrade, currentQuestion);
    const newResults = { ...state.results, [currentQuestion.id]: result };
    
    // Check if this is the last question
    const isLast = state.currentIndex === totalQuestions - 1;
    
    setState(prev => ({
      ...prev,
      answers: newAnswers,
      results: newResults,
      currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
      submitted: isLast,
    }));
    
    if (isLast) {
      // Mark questions as solved in localStorage
      const solvedIds = getSolvedQuestionIds();
      const newSolvedIds = [...new Set([...solvedIds, ...questions.map(q => q.id)])];
      saveSolvedQuestionIds(newSolvedIds);
      
      // Calculate total XP and save to database
      const totalXP = Object.values(newResults).reduce((sum, r) => sum + r.earnedXP, 0);
      
      if (profile && totalXP > 0) {
        setIsSubmitting(true);
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ xp: (profile.xp || 0) + totalXP })
            .eq('user_id', profile.user_id);
          
          if (error) throw error;
          
          await refreshProfile();
          toast({
            title: "🎉 Quiz Complete!",
            description: `You earned ${totalXP} XP!`,
          });
        } catch (error) {
          console.error('Error updating XP:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const restartQuiz = () => {
    const solvedIds = getSolvedQuestionIds();
    const unsolvedQuestions = biologyQuestions.filter(q => !solvedIds.includes(q.id));
    
    if (unsolvedQuestions.length === 0) {
      setAllSolved(true);
      return;
    }
    
    const shuffled = shuffleArray(unsolvedQuestions);
    setQuestions(shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length)));
    setState({
      currentIndex: 0,
      answers: {},
      results: {},
      submitted: false,
    });
    setCurrentAnswer("");
  };

  const totalXP = Object.values(state.results).reduce((sum, r) => sum + r.earnedXP, 0);
  const totalMarks = Object.values(state.results).reduce((sum, r) => sum + r.matchedPoints, 0);
  const maxMarks = Object.values(state.results).reduce((sum, r) => sum + r.totalPoints, 0);

  // All questions solved state
  if (allSolved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Congratulations!</h1>
            <p className="text-muted-foreground mb-6">
              You've solved all questions in the question bank! Check back later for new questions.
            </p>
            <Button onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading quiz...</div>
      </div>
    );
  }

  // Results screen
  if (state.submitted) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Quiz Complete!</h1>
            <div className="flex justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{totalXP} XP earned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{totalMarks}/{maxMarks} marks</span>
              </div>
            </div>
          </motion.div>

          {/* Question Results */}
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const result = state.results[q.id];
              const userAnswer = state.answers[q.id] || "";
              
              return (
                <motion.div
                  key={q.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className={`border-l-4 ${
                    result?.grade === "correct" ? "border-l-green-500" :
                    result?.grade === "partial" ? "border-l-yellow-500" : "border-l-red-500"
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <Badge variant="outline" className="mb-2">{q.topic}</Badge>
                          <CardTitle className="text-base font-medium">{q.question}</CardTitle>
                        </div>
                        <Badge className={
                          result?.grade === "correct" ? "bg-green-500" :
                          result?.grade === "partial" ? "bg-yellow-500" : "bg-red-500"
                        }>
                          {result?.matchedPoints}/{result?.totalPoints}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Your answer:</p>
                        <p className="text-sm bg-muted/50 p-2 rounded">
                          {highlightKeywords(userAnswer, q) || <span className="text-muted-foreground italic">No answer</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Model answer:</p>
                        <p className="text-sm bg-primary/10 p-2 rounded text-primary">{q.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span>+{result?.earnedXP || 0} XP</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button onClick={restartQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{profile?.xp || 0} XP</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {state.currentIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{currentQuestion.topic}</Badge>
                  <Badge className={
                    currentQuestion.difficulty === "Easy" ? "bg-green-500" :
                    currentQuestion.difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"
                  }>
                    {currentQuestion.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="ml-auto">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {currentQuestion.baseXP} XP
                  </Badge>
                </div>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your answer here..."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="min-h-[150px] resize-none"
                  autoFocus
                />
                
                <div className="text-xs text-muted-foreground">
                  💡 Include key terms and concepts for maximum marks
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={state.currentIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className={state.currentIndex === totalQuestions - 1 ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : state.currentIndex === totalQuestions - 1 ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Quiz
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
