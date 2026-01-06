import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import { PostComposer } from "@/components/discussions/PostComposer";
import { Edit, Trash2, FileText, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Draft {
  id: string;
  title: string;
  content: string;
  question_number: number | null;
  images: string[];
  thread_id: string | null;
  created_at: string;
  updated_at: string;
  thread?: {
    title: string;
    paper_id: string;
  };
}

export const DraftsManager = () => {
  const { user } = useDiscussionAuth();
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDraft, setEditDraft] = useState<any>(null);
  const [showComposer, setShowComposer] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchDrafts();
  }, [user]);

  const fetchDrafts = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('posts')
      .select(`
        id, title, content, question_number, images, thread_id, created_at, updated_at,
        paper_threads (title, paper_id)
      `)
      .eq('user_id', user.id)
      .eq('is_draft', true)
      .order('updated_at', { ascending: false });

    if (data) {
      setDrafts(data.map(d => ({
        ...d,
        thread: d.paper_threads as any
      })));
    }
    setLoading(false);
  };

  const handleEdit = (draft: Draft) => {
    setEditDraft({
      id: draft.id,
      title: draft.title,
      content: draft.content,
      question_number: draft.question_number,
      images: draft.images || [],
      tagIds: [],
    });
    setShowComposer(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', deleteId);

    if (error) {
      toast({ title: "Error deleting draft", variant: "destructive" });
    } else {
      toast({ title: "Draft deleted" });
      fetchDrafts();
    }
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="file" mood="shocked" size={80} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading drafts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" />
          My Drafts
        </h2>
        <Badge variant="secondary">{drafts.length} drafts</Badge>
      </div>

      {drafts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <KawaiiMascot character="file" mood="happy" size={80} />
            <p className="mt-4 text-muted-foreground text-center">
              No drafts yet. Saved drafts will appear here!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {drafts.map(draft => (
            <Card key={draft.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{draft.title || "Untitled"}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {draft.content || "No content"}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {draft.thread && (
                        <Badge variant="outline" className="text-xs">
                          {draft.thread.title}
                        </Badge>
                      )}
                      {draft.question_number && (
                        <Badge variant="secondary" className="text-xs">
                          Q{draft.question_number}
                        </Badge>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(draft)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(draft.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Composer */}
      {editDraft && (
        <PostComposer
          isOpen={showComposer}
          onClose={() => { setShowComposer(false); setEditDraft(null); }}
          threadId={editDraft.thread_id || ""}
          onPostCreated={fetchDrafts}
          editPost={editDraft}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your draft.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
