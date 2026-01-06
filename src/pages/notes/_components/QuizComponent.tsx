import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string; // Made optional to match the mock data
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  title: string;
}

export function QuizComponent({ questions, title }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const correctAnswers = selectedAnswers.filter(
    (answer, index) => answer === questions[index]?.correctAnswer
  ).length;

  const score = Math.round((correctAnswers / questions.length) * 100);

  if (showResults) {
    return (
      <Card className="border border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Quiz Results: {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{score}%</div>
            <p className="text-muted-foreground">
              You got {correctAnswers} out of {questions.length} questions
              correct
            </p>
            <Badge
              variant={score >= 70 ? "default" : "destructive"}
              className="mt-2"
            >
              {score >= 70 ? "Passed" : "Failed"}
            </Badge>
          </div>

          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-3 bg-background">
                <div className="flex items-start gap-2 mb-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{question.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </p>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <p className="text-xs text-green-600 mt-1">
                        Correct: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={resetQuiz} className="w-full gap-2">
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="border border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between mr-7">
          <CardTitle>📝 {title}</CardTitle>
          <Badge variant="outline" className="whitespace-nowrap">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">{currentQ.question}</h3>

          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-accent"
                }`}
                disabled={quizCompleted}
              >
                {option}
              </button>
            ))}
          </div>

          {hasAnswered && !quizCompleted && currentQ.explanation && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          <Button onClick={nextQuestion} disabled={!hasAnswered}>
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
