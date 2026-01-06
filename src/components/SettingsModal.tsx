import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChecklistSettings } from "@/types/checklist";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: ChecklistSettings;
  onSettingsChange: (settings: ChecklistSettings) => void;
}

export const SettingsModal = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}: SettingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border p-0 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Syllabus Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Customize how your roadmap checklist appears and behaves.
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Strike Through Completed
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add strikethrough and grey out completed objectives
                </p>
              </div>
              <Switch
                checked={settings.strikeThrough}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, strikeThrough: checked })
                }
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Expand All Topics
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep all topics expanded and disable collapsing
                </p>
              </div>
              <Switch
                checked={settings.expandAll}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, expandAll: checked })
                }
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Collapse All Topics
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Collapse all topics when this setting is toggled
                </p>
              </div>
              <Switch
                checked={settings.collapseAll}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, collapseAll: checked })
                }
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Emoji Mode
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Use emoji reactions instead of checkmarks
                </p>
              </div>
              <Switch
                checked={settings.emojiMode}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, emojiMode: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
