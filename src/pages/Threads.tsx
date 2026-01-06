import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, BookOpen, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { initialBiologyData } from "@/data/biologyData";
import { extractAllObjectives, generateCommunitySlug, getCommunityColor } from "@/utils/threadHelpers";

interface Community {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  postCount: number;
  objective_id?: string;
}

interface PastPaperCommunity {
  id: string;
  slug: string;
  name: string;
  description: string;
  postCount: number;
}

const Threads = () => {
  const [objectiveCommunities, setObjectiveCommunities] = useState<Community[]>([]);
  const [pastPaperCommunities, setPastPaperCommunities] = useState<PastPaperCommunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      await Promise.all([
        initializeObjectiveCommunities(),
        initializePastPaperCommunities()
      ]);
    } catch (error) {
      console.error("Error initializing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeObjectiveCommunities = async () => {
    const objectives = extractAllObjectives(initialBiologyData);
    
    // Fetch existing communities
    const { data: existingCommunities, error: fetchError } = await (supabase as any)
      .from("threads_communities")
      .select("*")
      .not("objective_id", "is", null);

    if (fetchError) {
      console.error("Error fetching communities:", fetchError);
      return;
    }

    // Only create if none exist
    if (!existingCommunities || existingCommunities.length === 0) {
      const communitiesToCreate = objectives.map((obj, index) => ({
        objective_id: obj.id,
        slug: generateCommunitySlug(obj.id, obj.text),
        name: obj.text,
        description: `${obj.topicTitle} - ${obj.lessonTitle}`,
        color: getCommunityColor(index),
      }));

      const { error: insertError } = await (supabase as any)
        .from("threads_communities")
        .insert(communitiesToCreate);

      if (insertError) {
        console.error("Error creating communities:", insertError);
        return;
      }
    }

    // Fetch communities with post counts
    const { data: communitiesData, error: countError } = await (supabase as any)
      .from("threads_communities")
      .select("id, slug, name, description, color, objective_id")
      .not("objective_id", "is", null);

    if (countError) {
      console.error("Error fetching communities:", countError);
      return;
    }

    if (communitiesData) {
      // Get post counts separately
      const communitiesWithCounts = await Promise.all(
        communitiesData.map(async (comm) => {
          const { count } = await (supabase as any)
            .from("threads_posts")
            .select("*", { count: "exact", head: true })
            .eq("community_id", comm.id);

          return {
            ...comm,
            postCount: count || 0,
          };
        })
      );

      setObjectiveCommunities(communitiesWithCounts);
    }
  };

  const initializePastPaperCommunities = async () => {
    // Fetch past papers
    const { data: pastPapers, error: papersError } = await (supabase as any)
      .from("past_papers")
      .select("id, year, season")
      .order("year", { ascending: false })
      .order("season", { ascending: false });

    if (papersError) {
      console.error("Error fetching past papers:", papersError);
      return;
    }

    if (!pastPapers) return;

    // Create communities for past papers if they don't exist
    const existingPaperCommunities = await (supabase as any)
      .from("threads_communities")
      .select("*")
      .is("objective_id", null);

    const paperCommunities = pastPapers.map((paper) => {
      const slug = `${paper.year}${paper.season}`;
      const existing = existingPaperCommunities.data?.find((c) => c.slug === slug);
      
      if (existing) return existing;

      return {
        slug,
        name: `${paper.year} ${paper.season.charAt(0).toUpperCase() + paper.season.slice(1)}`,
        description: `Discuss Paper 1 from ${paper.year} ${paper.season}`,
        color: "#8b5cf6",
        objective_id: null,
      };
    });

    // Insert new communities
    const newCommunities = paperCommunities.filter((c) => !c.id);
    if (newCommunities.length > 0) {
      await (supabase as any).from("threads_communities").insert(newCommunities);
    }

    // Get communities with post counts
    const { data: finalCommunities } = await (supabase as any)
      .from("threads_communities")
      .select("id, slug, name, description")
      .is("objective_id", null);

    if (finalCommunities) {
      const communitiesWithCounts = await Promise.all(
        finalCommunities.map(async (comm) => {
          const { count } = await (supabase as any)
            .from("threads_posts")
            .select("*", { count: "exact", head: true })
            .eq("community_id", comm.id);

          return {
            ...comm,
            postCount: count || 0,
          };
        })
      );

      setPastPaperCommunities(communitiesWithCounts);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading communities...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Biology Discussion Forums</h1>
          <p className="text-muted-foreground">
            Discuss learning objectives and past papers with the community
          </p>
        </div>

        {/* Past Papers Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Past Paper Discussions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pastPaperCommunities.map((community) => (
              <Link key={community.id} to={`/threads/${community.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{community.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {community.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>{community.postCount} posts</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Objectives Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Learning Objective Discussions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectiveCommunities.map((community) => (
              <Link key={community.id} to={`/threads/${community.slug}`}>
                <Card
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full"
                  style={{ borderLeft: `4px solid ${community.color}` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{community.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {community.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>{community.postCount} posts</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Threads;
