import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Search, MessageSquare, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SearchResult {
  id: string;
  type: 'post' | 'comment';
  title?: string;
  content: string;
  post_id?: string;
  discussion_type?: string;
  discussion_id?: string;
  created_at: string;
  username?: string;
  matchIndex: number;
  matchText: string;
}

interface PostSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostSearch = ({ isOpen, onClose }: PostSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const debounce = setTimeout(async () => {
      setLoading(true);
      
      try {
        // Search posts
        const { data: posts } = await supabase
          .from('posts')
          .select('id, title, content, discussion_type, discussion_id, created_at, user_id')
          .eq('is_draft', false)
          .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
          .limit(20);

        // Search comments
        const { data: comments } = await supabase
          .from('post_comments')
          .select('id, content, post_id, created_at, user_id')
          .ilike('content', `%${query}%`)
          .limit(20);

        // Get usernames
        const userIds = [
          ...(posts?.map(p => p.user_id) || []),
          ...(comments?.map(c => c.user_id) || [])
        ];
        
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, username')
          .in('user_id', [...new Set(userIds)]);

        const profileMap = new Map(profiles?.map(p => [p.user_id, p.username]));

        const postResults: SearchResult[] = (posts || []).map(p => {
          const searchIn = `${p.title} ${p.content}`.toLowerCase();
          const idx = searchIn.indexOf(query.toLowerCase());
          const start = Math.max(0, idx - 30);
          const end = Math.min(searchIn.length, idx + query.length + 30);
          
          return {
            id: p.id,
            type: 'post',
            title: p.title,
            content: p.content,
            discussion_type: p.discussion_type,
            discussion_id: p.discussion_id,
            created_at: p.created_at,
            username: profileMap.get(p.user_id),
            matchIndex: idx,
            matchText: `...${searchIn.slice(start, end)}...`
          };
        });

        const commentResults: SearchResult[] = (comments || []).map(c => {
          const idx = c.content.toLowerCase().indexOf(query.toLowerCase());
          const start = Math.max(0, idx - 30);
          const end = Math.min(c.content.length, idx + query.length + 30);
          
          return {
            id: c.id,
            type: 'comment',
            content: c.content,
            post_id: c.post_id,
            created_at: c.created_at,
            username: profileMap.get(c.user_id),
            matchIndex: idx,
            matchText: `...${c.content.slice(start, end)}...`
          };
        });

        setResults([...postResults, ...commentResults].slice(0, 30));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const highlightMatch = (text: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded">{part}</mark>
        : part
    );
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'post') {
      if (result.discussion_type === 'university' && result.discussion_id) {
        navigate(`/discussion/${result.discussion_id}/post/${result.id}`);
      } else if (result.discussion_type === 'custom' && result.discussion_id) {
        navigate(`/discussion/${result.discussion_id}/post/${result.id}`);
      } else if (result.discussion_id) {
        navigate(`/discussion/${result.discussion_id}/post/${result.id}`);
      } else {
        navigate(`/discussions/post/${result.id}`);
      }
    } else if (result.type === 'comment' && result.post_id) {
      navigate(`/discussions/post/${result.post_id}#comment-${result.id}`);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Discussions
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts and comments..."
            className="pl-10"
            autoFocus
          />
        </div>

        <ScrollArea className="h-96">
          {loading && (
            <div className="text-center py-8 text-muted-foreground">
              Searching...
            </div>
          )}
          
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <Card 
                  key={`${result.type}-${result.id}`}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <Badge variant={result.type === 'post' ? 'default' : 'secondary'} className="text-xs shrink-0">
                        {result.type === 'post' ? 'Post' : 'Comment'}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        {result.title && (
                          <p className="font-medium text-sm">{highlightMatch(result.title)}</p>
                        )}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {highlightMatch(result.matchText)}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          {result.username && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              @{result.username}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
