import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, GraduationCap, Globe, X, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import universitiesData from "@/data/world_universities_and_domains.json";
import type { University, UserUniversity } from "@/types/university";

const universities = universitiesData as University[];

// Get unique countries
const countries = [...new Set(universities.map(u => u.country))].sort();

interface UniversitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onUniversityAdded?: () => void;
  existingUniversities?: UserUniversity[];
  mode?: 'add' | 'navigate';
}

export const UniversitySelector = ({ 
  isOpen, 
  onClose, 
  onUniversityAdded, 
  existingUniversities = [],
  mode = 'add'
}: UniversitySelectorProps) => {
  const [step, setStep] = useState(1);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [uniSearch, setUniSearch] = useState("");
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useDiscussionAuth();
  const { toast } = useToast();

  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  const filteredUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return universities
      .filter(u => u.country === selectedCountry)
      .filter(u => u.name.toLowerCase().includes(uniSearch.toLowerCase()))
      .slice(0, 100); // Limit for performance
  }, [selectedCountry, uniSearch]);

  const isUniversityAlreadyAdded = (uni: University) => {
    return existingUniversities.some(
      e => e.university_name === uni.name && e.alpha_two_code === uni.alpha_two_code
    );
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setStep(2);
  };

  const handleSelectUniversity = (uni: University) => {
    setSelectedUni(uni);
  };

  const handleConfirm = async () => {
    if (!selectedUni) return;

    if (mode === 'navigate') {
      const slug = `${selectedUni.alpha_two_code.toLowerCase()}-${selectedUni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}`;
      navigate(`/discussions/universities/${slug}`);
      handleReset();
      onClose();
      return;
    }

    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_universities')
        .insert({
          user_id: user.id,
          university_name: selectedUni.name,
          country: selectedUni.country,
          alpha_two_code: selectedUni.alpha_two_code,
          web_page: selectedUni.web_pages[0] || null,
          state_province: selectedUni["state-province"],
        });

      if (error) throw error;

      toast({ title: "University added!" });
      onUniversityAdded?.();
      handleReset();
      onClose();
    } catch (error: any) {
      toast({ title: "Error adding university", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setCountrySearch("");
    setSelectedCountry("");
    setUniSearch("");
    setSelectedUni(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {mode === 'add' ? 'Add Target University' : 'Go to University Discussion'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Search Country</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder="Type to search countries..."
                  className="pl-10"
                />
              </div>
            </div>
            <ScrollArea className="h-64 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredCountries.map(country => (
                  <button
                    key={country}
                    onClick={() => handleSelectCountry(country)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {country}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {selectedCountry}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                Change
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Search University</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={uniSearch}
                  onChange={(e) => setUniSearch(e.target.value)}
                  placeholder="Type to search universities..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="h-64 border rounded-md">
              <div className="p-2 space-y-1">
                {filteredUniversities.map((uni, idx) => {
                  const isExisting = isUniversityAlreadyAdded(uni);
                  const isSelected = selectedUni?.name === uni.name;
                  
                  return (
                    <button
                      key={`${uni.name}-${idx}`}
                      onClick={() => !isExisting && handleSelectUniversity(uni)}
                      disabled={isExisting && mode === 'add'}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors
                        ${isExisting && mode === 'add' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'}
                        ${isSelected ? 'bg-primary/10 border border-primary' : ''}`}
                    >
                      <div className="font-medium text-sm">{uni.name}</div>
                      {uni["state-province"] && (
                        <div className="text-xs text-muted-foreground">{uni["state-province"]}</div>
                      )}
                      {isExisting && mode === 'add' && (
                        <Badge variant="outline" className="text-xs mt-1">Already added</Badge>
                      )}
                    </button>
                  );
                })}
                {filteredUniversities.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No universities found</p>
                )}
              </div>
            </ScrollArea>

            {selectedUni && (
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <div className="font-medium">{selectedUni.name}</div>
                {selectedUni.web_pages[0] && (
                  <a 
                    href={selectedUni.web_pages[0]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {selectedUni.web_pages[0]}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedUni || loading}
          >
            {loading ? 'Adding...' : mode === 'add' ? 'Add University' : 'Go to Discussion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface UserUniversitiesDisplayProps {
  universities: UserUniversity[];
  onRemove?: (id: string) => void;
  editable?: boolean;
}

export const UserUniversitiesDisplay = ({ universities, onRemove, editable = false }: UserUniversitiesDisplayProps) => {
  const navigate = useNavigate();
  
  const getSlug = (uni: UserUniversity) => {
    return `${uni.alpha_two_code.toLowerCase()}-${uni.university_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {universities.map((uni) => (
        <Badge 
          key={uni.id} 
          variant="secondary" 
          className="flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-primary/20"
          onClick={() => navigate(`/discussions/universities/${getSlug(uni)}`)}
        >
          <GraduationCap className="h-3 w-3" />
          <span>{uni.university_name}</span>
          <span className="text-xs text-muted-foreground">({uni.alpha_two_code})</span>
          {editable && onRemove && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemove(uni.id);
              }} 
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
};
