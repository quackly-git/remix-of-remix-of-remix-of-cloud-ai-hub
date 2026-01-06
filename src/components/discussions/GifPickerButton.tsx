import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Smile, Search, Loader2 } from "lucide-react";

interface GifPickerButtonProps {
  onGifSelect: (gifUrl: string) => void;
}

// Simple GIF search using Tenor API (no API key required for limited use)
export const GifPickerButton = ({ onGifSelect }: GifPickerButtonProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const searchGifs = async (query: string) => {
    if (!query.trim()) {
      setGifs([]);
      return;
    }

    setLoading(true);
    try {
      // Using Tenor's search endpoint with anonymous access
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&client_key=my_test_app&limit=20`
      );
      const data = await response.json();
      
      const gifUrls = data.results?.map((result: any) => 
        result.media_formats?.tinygif?.url || result.media_formats?.gif?.url
      ).filter(Boolean) || [];
      
      setGifs(gifUrls);
    } catch (error) {
      console.error("GIF search failed:", error);
      setGifs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchGifs(search);
  };

  const handleSelect = (url: string) => {
    onGifSelect(url);
    setOpen(false);
    setSearch("");
    setGifs([]);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Smile className="h-4 w-4 mr-2" />
        GIF
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Search GIFs</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for GIFs..."
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </form>

          <div className="flex-1 overflow-y-auto mt-4">
            {gifs.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {gifs.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(url)}
                    className="aspect-square rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all"
                  >
                    <img 
                      src={url} 
                      alt={`GIF ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                {loading ? "Searching..." : "Search for GIFs above"}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
