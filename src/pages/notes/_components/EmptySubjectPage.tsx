import { BookOpen, Download, Play, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subject } from "@/types";

interface EmptySubjectPageProps {
  subject: Subject;
}

export function EmptySubjectPage({ subject }: EmptySubjectPageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Subject Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="p-6 rounded-xl text-5xl"
            style={{ backgroundColor: `${subject.color}20` }}
          >
            {subject.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary">{subject.name}</h1>
            <Badge variant="outline" className="mt-2 text-lg px-3 py-1">
              {subject.code}
            </Badge>
          </div>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subject.description}
        </p>
      </div>

      {/* Coming Soon Message */}
      <Card className="border-2 border-dashed border-primary/30">
        <CardContent className="p-8 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary/60" />
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            Content Coming Soon
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            We're currently preparing comprehensive learning materials for this
            subject. Check back soon for interactive lessons, practice
            exercises, and detailed notes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Syllabus
            </Button>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Join Study Group
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">
                  {subject.estimatedHours} hours
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Chapters:</span>
              <span className="font-medium">{subject.totalChapters}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Level:</span>
              <Badge variant="secondary">Intermediate</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">What to Expect</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <span className="text-sm">
                  Interactive lessons with practical examples
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <span className="text-sm">Practice exercises and quizzes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <span className="text-sm">
                  Downloadable notes and resources
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <span className="text-sm">
                  Progress tracking and assessments
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for upcoming features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Want to be notified when this course becomes available? We'll send
            you an update as soon as the content is ready.
          </p>
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            Notify Me When Available
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
