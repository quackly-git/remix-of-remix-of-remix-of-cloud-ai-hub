import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { pp_data } from "@/data/pp_data";
import universitiesData from "@/data/world_universities_and_domains.json";
import type { University, CustomDiscussion } from "@/types/university";
import { FileText, GraduationCap, MessageSquare, Plus, Search, Globe } from "lucide-react";

const universities = universitiesData as University[];

type DiscussionType = 'paper' | 'university' | 'custom' | 'general';

interface DiscussionTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: DiscussionType, id: string, label: string) => void;
}

export const DiscussionTypeSelector = ({ isOpen, onClose, onSelect }: DiscussionTypeSelectorProps) => {
  const [type, setType] = useState<DiscussionType>('general');
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  
  // Paper selection
  const [selectedPaper, setSelectedPaper] = useState<string>("");
  
  // University selection
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [uniSearch, setUniSearch] = useState("");
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  
  // Custom discussions
  const [customDiscussions, setCustomDiscussions] = useState<CustomDiscussion[]>([]);
  const [selectedCustom, setSelectedCustom] = useState<string>("");

  const countries = useMemo(() => 
    [...new Set(universities.map(u => u.country))].sort()
  , []);

  const filteredCountries = useMemo(() => 
    countries.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase()))
  , [countries, countrySearch]);

  const filteredUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return universities
      .filter(u => u.country === selectedCountry)
      .filter(u => u.name.toLowerCase().includes(uniSearch.toLowerCase()))
      .slice(0, 50);
  }, [selectedCountry, uniSearch]);

  const papers = useMemo(() => 
    pp_data.filter(p => p.id && p.year && p.season)
  , []);

  const filteredPapers = useMemo(() => 
    papers.filter(p => 
      `${p.year} ${p.season}`.toLowerCase().includes(search.toLowerCase())
    )
  , [papers, search]);

  const filteredCustom = useMemo(() => 
    customDiscussions.filter(d => 
      d.name.toLowerCase().includes(search.toLowerCase())
    )
  , [customDiscussions, search]);

  useEffect(() => {
    if (isOpen) {
      fetchCustomDiscussions();
    }
  }, [isOpen]);

  const fetchCustomDiscussions = async () => {
    const { data } = await supabase
      .from('custom_discussions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setCustomDiscussions(data as CustomDiscussion[]);
    }
  };

  const handleTypeSelect = () => {
    if (type === 'general') {
      onSelect('general', '', 'General Discussion');
      handleReset();
      onClose();
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    if (type === 'paper' && selectedPaper) {
      const paper = papers.find(p => p.id === selectedPaper);
      onSelect('paper', selectedPaper, `${paper?.year} ${paper?.season}`);
    } else if (type === 'university' && selectedUni) {
      const slug = `${selectedUni.alpha_two_code.toLowerCase()}-${selectedUni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}`;
      onSelect('university', slug, selectedUni.name);
    } else if (type === 'custom' && selectedCustom) {
      const disc = customDiscussions.find(d => d.slug === selectedCustom);
      onSelect('custom', selectedCustom, disc?.name || selectedCustom);
    }
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setType('general');
    setStep(1);
    setSearch("");
    setSelectedPaper("");
    setCountrySearch("");
    setSelectedCountry("");
    setUniSearch("");
    setSelectedUni(null);
    setSelectedCustom("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Where do you want to post?</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <RadioGroup value={type} onValueChange={(v) => setType(v as DiscussionType)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general" className="cursor-pointer flex-1 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  General Discussion
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="paper" id="paper" />
                <Label htmlFor="paper" className="cursor-pointer flex-1 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Past Paper Discussion
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="university" id="university" />
                <Label htmlFor="university" className="cursor-pointer flex-1 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  University Discussion
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer flex-1 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  User-Created Discussion
                </Label>
              </div>
            </RadioGroup>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleTypeSelect}>Next</Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && type === 'paper' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search papers..."
                className="pl-10"
              />
            </div>
            <ScrollArea className="h-64 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredPapers.map(paper => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper.id)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors
                      ${selectedPaper === paper.id ? 'bg-primary/10 border border-primary' : ''}`}
                  >
                    {paper.year} {paper.season?.charAt(0).toUpperCase()}{paper.season?.slice(1)}
                  </button>
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleConfirm} disabled={!selectedPaper}>Select</Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && type === 'university' && !selectedCountry && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                placeholder="Search country..."
                className="pl-10"
              />
            </div>
            <ScrollArea className="h-64 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredCountries.map(country => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {country}
                  </button>
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && type === 'university' && selectedCountry && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {selectedCountry}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCountry("")}>
                Change
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                placeholder="Search university..."
                className="pl-10"
              />
            </div>
            <ScrollArea className="h-48 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredUniversities.map((uni, idx) => (
                  <button
                    key={`${uni.name}-${idx}`}
                    onClick={() => setSelectedUni(uni)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors
                      ${selectedUni?.name === uni.name ? 'bg-primary/10 border border-primary' : ''}`}
                  >
                    <div className="font-medium text-sm">{uni.name}</div>
                    {uni["state-province"] && (
                      <div className="text-xs text-muted-foreground">{uni["state-province"]}</div>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCountry("")}>Back</Button>
              <Button onClick={handleConfirm} disabled={!selectedUni}>Select</Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && type === 'custom' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search discussions..."
                className="pl-10"
              />
            </div>
            <ScrollArea className="h-64 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredCustom.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No discussions found</p>
                ) : (
                  filteredCustom.map(disc => (
                    <button
                      key={disc.id}
                      onClick={() => setSelectedCustom(disc.slug)}
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors
                        ${selectedCustom === disc.slug ? 'bg-primary/10 border border-primary' : ''}`}
                    >
                      <div className="font-medium text-sm">{disc.name}</div>
                      {disc.description && (
                        <div className="text-xs text-muted-foreground line-clamp-1">{disc.description}</div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleConfirm} disabled={!selectedCustom}>Select</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
