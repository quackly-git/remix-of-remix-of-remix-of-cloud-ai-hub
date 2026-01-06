import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  Download,
  Plus,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Maximize,
  Minimize,
  Palette,
  Type as TypeIcon,
  ArrowLeft,
  Link2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "@/components/SettingsModal";
import { ProgressBar } from "@/components/ProgressBar";
import { TopicSection } from "@/components/TopicSection";
import { ManageTagsModal } from "@/components/ManageTagsModal";
import { AddCommentModal } from "@/components/AddCommentModal";
import { DownloadModal } from "@/components/DownloadModal";
import { AddObjectiveModal } from "@/components/AddObjectiveModal";
import { StyleSettingsModal } from "@/components/StyleSettingsModal";
import { FirstVisitModal } from "@/components/FirstVisitModal";
import { EditObjectiveModal } from "@/components/EditObjectiveModal";
import { loadChecklistState, saveChecklistState } from "@/utils/localStorage";
import { ChecklistState, Tag, Comment, Objective } from "@/types/checklist";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const Checklist = () => {
  const [state, setState] = useState<ChecklistState>(loadChecklistState);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tagsModalOpen, setTagsModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [addObjectiveModalOpen, setAddObjectiveModalOpen] = useState(false);
  const [styleSettingsOpen, setStyleSettingsOpen] = useState(false);
  const [colorThemeOpen, setColorThemeOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [firstVisitModalOpen, setFirstVisitModalOpen] = useState(false);
  const [editObjectiveModalOpen, setEditObjectiveModalOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<{
    topicId: string;
    lessonId: string;
    objectiveId: string;
  } | null>(null);

  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();

  useEffect(() => {
    saveChecklistState(state);
  }, [state]);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setFirstVisitModalOpen(true);
    }
  }, []);

  const handleFirstVisitChoice = (useEmoji: boolean) => {
    localStorage.setItem("hasVisited", "true");
    setFirstVisitModalOpen(false);
    if (useEmoji) {
      setState((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          emojiMode: true,
        },
      }));
      toast.success("Emoji mode enabled! 😊");
    }
  };

  useEffect(() => {
    if (state.settings.expandAll) {
      setState((prev) => ({
        ...prev,
        topics: prev.topics.map((topic) => ({
          ...topic,
          collapsed: false,
          lessons: topic.lessons.map((lesson) => ({
            ...lesson,
            collapsed: false,
          })),
        })),
      }));
    }
  }, [state.settings.expandAll]);

  useEffect(() => {
    if (state.settings.collapseAll) {
      setState((prev) => ({
        ...prev,
        topics: prev.topics.map((topic) => ({
          ...topic,
          collapsed: true,
          lessons: topic.lessons.map((lesson) => ({
            ...lesson,
            collapsed: true,
          })),
        })),
        settings: {
          ...prev.settings,
          collapseAll: false,
        },
      }));
    }
  }, [state.settings.collapseAll]);

  const handleToggleTopicCollapsed = (topicId: string) => {
    if (state.settings.expandAll) return;
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId ? { ...topic, collapsed: !topic.collapsed } : topic
      ),
    }));
  };

  const handleToggleLessonCollapsed = (topicId: string, lessonId: string) => {
    if (state.settings.expandAll) return;
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, collapsed: !lesson.collapsed }
                  : lesson
              ),
            }
          : topic
      ),
    }));
  };

  const handleToggleObjective = (
    topicId: string,
    lessonId: string,
    objectiveId: string
  ) => {
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === objectiveId
                          ? { ...obj, completed: !obj.completed }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
  };

  const handleEmojiChange = (
    topicId: string,
    lessonId: string,
    objectiveId: string,
    status: "happy" | "neutral" | "sad" | null
  ) => {
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === objectiveId
                          ? { ...obj, emojiStatus: status }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
  };

  const handleManageObjectiveTags = (
    topicId: string,
    lessonId: string,
    objectiveId: string
  ) => {
    setSelectedObjective({ topicId, lessonId, objectiveId });
    setTagsModalOpen(true);
  };

  const handleSaveTags = (tags: Tag[]) => {
    if (!selectedObjective) return;
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === selectedObjective.topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === selectedObjective.lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === selectedObjective.objectiveId
                          ? { ...obj, tags }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Tags updated successfully");
  };

  const handleAddObjectiveComment = (
    topicId: string,
    lessonId: string,
    objectiveId: string
  ) => {
    setSelectedObjective({ topicId, lessonId, objectiveId });
    setCommentModalOpen(true);
  };

  const handleSaveComment = (commentText: string) => {
    if (!selectedObjective) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text: commentText,
      timestamp: Date.now(),
    };
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === selectedObjective.topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === selectedObjective.lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === selectedObjective.objectiveId
                          ? { ...obj, comments: [...obj.comments, newComment] }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Comment added successfully");
  };

  const handleEditComment = (commentId: string, newText: string) => {
    if (!selectedObjective) return;
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === selectedObjective.topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === selectedObjective.lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === selectedObjective.objectiveId
                          ? {
                              ...obj,
                              comments: obj.comments.map((c) =>
                                c.id === commentId ? { ...c, text: newText } : c
                              ),
                            }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Comment updated successfully");
  };

  const handleDeleteComment = (commentId: string) => {
    if (!selectedObjective) return;
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === selectedObjective.topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === selectedObjective.lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === selectedObjective.objectiveId
                          ? {
                              ...obj,
                              comments: obj.comments.filter(
                                (c) => c.id !== commentId
                              ),
                            }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Comment deleted successfully");
  };

  const handleToggleObjectiveHidden = (
    topicId: string,
    lessonId: string,
    objectiveId: string
  ) => {
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === objectiveId
                          ? { ...obj, hidden: !obj.hidden }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Objective visibility updated");
  };

  const handleToggleLessonHidden = (topicId: string, lessonId: string) => {
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, hidden: !lesson.hidden }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Lesson visibility updated");
  };

  const handleToggleTopicHidden = (topicId: string) => {
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId ? { ...topic, hidden: !topic.hidden } : topic
      ),
    }));
    toast.success("Topic visibility updated");
  };

  const handleEditObjective = (
    topicId: string,
    lessonId: string,
    objectiveId: string
  ) => {
    setSelectedObjective({ topicId, lessonId, objectiveId });
    setEditObjectiveModalOpen(true);
  };

  const handleSaveObjectiveEdit = (newText: string) => {
    if (!selectedObjective) return;
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === selectedObjective.topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === selectedObjective.lessonId
                  ? {
                      ...lesson,
                      objectives: lesson.objectives.map((obj) =>
                        obj.id === selectedObjective.objectiveId
                          ? { ...obj, text: newText }
                          : obj
                      ),
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Objective updated successfully");
  };

  const handleAddObjective = (
    topicId: string,
    lessonId: string,
    objectiveText: string
  ) => {
    const newObjective: Objective = {
      id: `objective-${Date.now()}`,
      text: objectiveText,
      completed: false,
      tags: [],
      comments: [],
      hidden: false,
    };
    setState((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              lessons: topic.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      objectives: [...lesson.objectives, newObjective],
                    }
                  : lesson
              ),
            }
          : topic
      ),
    }));
    toast.success("Objective added successfully");
  };

  const handleAddTopic = (topicTitle: string, topicDescription: string) => {
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: topicTitle,
      description: topicDescription,
      lessons: [
        {
          id: `lesson-${Date.now()}`,
          title: "New Lesson",
          objectives: [],
          collapsed: false,
          hidden: false,
        },
      ],
      collapsed: false,
      hidden: false,
    };
    setState((prev) => ({ ...prev, topics: [...prev.topics, newTopic] }));
    toast.success("Topic created successfully");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getSelectedObjectiveData = () => {
    if (!selectedObjective) return null;
    const topic = state.topics.find((t) => t.id === selectedObjective.topicId);
    const lesson = topic?.lessons.find(
      (l) => l.id === selectedObjective.lessonId
    );
    const objective = lesson?.objectives.find(
      (o) => o.id === selectedObjective.objectiveId
    );
    return objective;
  };

  const visibleTopics = state.topics.filter((topic) => !topic.hidden);
  const hiddenTopics = state.topics.filter((topic) => topic.hidden);

  const colorThemes = [
    { name: "Orange", value: "orange" as const, color: "hsl(18, 95%, 60%)" },
    { name: "Blue", value: "blue" as const, color: "hsl(221, 83%, 53%)" },
    { name: "Green", value: "green" as const, color: "hsl(142, 71%, 45%)" },
    { name: "Purple", value: "purple" as const, color: "hsl(271, 81%, 56%)" },
    { name: "Red", value: "red" as const, color: "hsl(0, 72%, 51%)" },
  ];

  return (
    <div
      className={`min-h-screen bg-background transition-colors duration-300 ${
        isFullscreen ? "p-0" : ""
      }`}
    >
      {" "}
      <div
        className={`max-w-6xl mx-auto ${
          isFullscreen ? "p-4" : "p-4 sm:p-6 lg:p-8"
        } space-y-6 checklist-content`}
      >
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Edexcel Unit 4 IAL Biology
            </h1>
            <p className="text-muted-foreground">
              Track your progress through the syllabus
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="border-border hover:bg-secondary"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setColorThemeOpen(!colorThemeOpen)}
                className="border-border hover:bg-secondary"
              >
                <Palette className="h-4 w-4" />
              </Button>
              {colorThemeOpen && (
                <div className="absolute right-0 top-12 z-50 bg-card border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex gap-2">
                    {colorThemes.map((ct) => (
                      <button
                        key={ct.value}
                        onClick={() => {
                          setColorTheme(ct.value);
                          setColorThemeOpen(false);
                          toast.success(`Theme changed to ${ct.name}`);
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          colorTheme === ct.value
                            ? "border-foreground scale-110"
                            : "border-border hover:scale-105"
                        }`}
                        style={{ backgroundColor: ct.color }}
                        title={ct.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStyleSettingsOpen(true)}
              className="border-border hover:bg-secondary"
            >
              <TypeIcon className="h-4 w-4" />
            </Button>{" "}
            <Button
              asChild
              variant="outline"
              size="icon"
              className="border-border hover:bg-secondary"
            >
              <a
                href="https://drive.google.com/file/d/1sGtM7dLBFpcdtX1liaWrEvTJYMhXoX5n/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className="border-border hover:bg-secondary"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              className="border-border hover:bg-secondary"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDownloadModalOpen(true)}
              className="border-border hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setAddObjectiveModalOpen(true)}
              className="border-border hover:bg-secondary gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>

        <ProgressBar topics={visibleTopics} />

        <div className="space-y-4">
          {visibleTopics.map((topic) => (
            <TopicSection
              key={topic.id}
              topic={topic}
              strikeThrough={state.settings.strikeThrough}
              emojiMode={state.settings.emojiMode}
              expandAll={state.settings.expandAll}
              onToggleCollapsed={() => handleToggleTopicCollapsed(topic.id)}
              onToggleLessonCollapsed={(lessonId) =>
                handleToggleLessonCollapsed(topic.id, lessonId)
              }
              onToggleObjective={(lessonId, objectiveId) =>
                handleToggleObjective(topic.id, lessonId, objectiveId)
              }
              onEmojiChange={(lessonId, objectiveId, status) =>
                handleEmojiChange(topic.id, lessonId, objectiveId, status)
              }
              onManageObjectiveTags={(lessonId, objectiveId) =>
                handleManageObjectiveTags(topic.id, lessonId, objectiveId)
              }
              onAddObjectiveComment={(lessonId, objectiveId) =>
                handleAddObjectiveComment(topic.id, lessonId, objectiveId)
              }
              onToggleObjectiveHidden={(lessonId, objectiveId) =>
                handleToggleObjectiveHidden(topic.id, lessonId, objectiveId)
              }
              onToggleLessonHidden={(lessonId) =>
                handleToggleLessonHidden(topic.id, lessonId)
              }
              onToggleTopicHidden={() => handleToggleTopicHidden(topic.id)}
              onEditObjective={(lessonId, objectiveId) =>
                handleEditObjective(topic.id, lessonId, objectiveId)
              }
            />
          ))}
        </div>

        {hiddenTopics.length > 0 && (
          <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
            <div className="group">
              <button
                onClick={() => setShowHidden(!showHidden)}
                className="w-full flex items-start gap-3 p-6 hover:bg-secondary/30 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                    {showHidden ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    Hidden Items
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {hiddenTopics.length} hidden topic
                    {hiddenTopics.length > 1 ? "s" : ""}
                  </p>
                </div>
              </button>
              {showHidden && (
                <div className="px-6 pb-6 space-y-3 opacity-60">
                  {hiddenTopics.map((topic) => (
                    <TopicSection
                      key={topic.id}
                      topic={topic}
                      strikeThrough={state.settings.strikeThrough}
                      emojiMode={state.settings.emojiMode}
                      expandAll={state.settings.expandAll}
                      onToggleCollapsed={() =>
                        handleToggleTopicCollapsed(topic.id)
                      }
                      onToggleLessonCollapsed={(lessonId) =>
                        handleToggleLessonCollapsed(topic.id, lessonId)
                      }
                      onToggleObjective={(lessonId, objectiveId) =>
                        handleToggleObjective(topic.id, lessonId, objectiveId)
                      }
                      onEmojiChange={(lessonId, objectiveId, status) =>
                        handleEmojiChange(
                          topic.id,
                          lessonId,
                          objectiveId,
                          status
                        )
                      }
                      onManageObjectiveTags={(lessonId, objectiveId) =>
                        handleManageObjectiveTags(
                          topic.id,
                          lessonId,
                          objectiveId
                        )
                      }
                      onAddObjectiveComment={(lessonId, objectiveId) =>
                        handleAddObjectiveComment(
                          topic.id,
                          lessonId,
                          objectiveId
                        )
                      }
                      onToggleObjectiveHidden={(lessonId, objectiveId) =>
                        handleToggleObjectiveHidden(
                          topic.id,
                          lessonId,
                          objectiveId
                        )
                      }
                      onToggleLessonHidden={(lessonId) =>
                        handleToggleLessonHidden(topic.id, lessonId)
                      }
                      onToggleTopicHidden={() =>
                        handleToggleTopicHidden(topic.id)
                      }
                      onEditObjective={(lessonId, objectiveId) =>
                        handleEditObjective(topic.id, lessonId, objectiveId)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <FirstVisitModal
        open={firstVisitModalOpen}
        onChoice={handleFirstVisitChoice}
      />
      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={state.settings}
        onSettingsChange={(settings) => setState({ ...state, settings })}
      />
      <ManageTagsModal
        open={tagsModalOpen}
        onOpenChange={setTagsModalOpen}
        currentTags={getSelectedObjectiveData()?.tags || []}
        onSaveTags={handleSaveTags}
      />
      <AddCommentModal
        open={commentModalOpen}
        onOpenChange={setCommentModalOpen}
        currentComments={getSelectedObjectiveData()?.comments || []}
        onSaveComment={handleSaveComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />
      <DownloadModal
        open={downloadModalOpen}
        onOpenChange={setDownloadModalOpen}
        state={state}
      />
      <AddObjectiveModal
        open={addObjectiveModalOpen}
        onOpenChange={setAddObjectiveModalOpen}
        topics={state.topics}
        onAddObjective={handleAddObjective}
        onAddTopic={handleAddTopic}
      />
      <StyleSettingsModal
        open={styleSettingsOpen}
        onOpenChange={setStyleSettingsOpen}
      />
      <EditObjectiveModal
        open={editObjectiveModalOpen}
        onOpenChange={setEditObjectiveModalOpen}
        currentText={getSelectedObjectiveData()?.text || ""}
        onSave={handleSaveObjectiveEdit}
      />
    </div>
  );
};

export default Checklist;
