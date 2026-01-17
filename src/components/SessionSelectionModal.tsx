import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Leaf, Snowflake } from "lucide-react";
import { Session } from "@/hooks/useResultsSettings";

interface SessionSelectionModalProps {
  open: boolean;
  onSelectSession: (session: Session) => void;
}

export const SessionSelectionModal: React.FC<SessionSelectionModalProps> = ({
  open,
  onSelectSession,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5 text-teal-500" />
            Which session did you sit?
          </DialogTitle>
          <DialogDescription>
            Select your exam session to see your results countdown
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 mt-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col gap-2 border-2 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all group"
            onClick={() => onSelectSession("oct2025")}
          >
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">October 2025</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Results: 22nd January 2026
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col gap-2 border-2 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/20 transition-all group"
            onClick={() => onSelectSession("jan2026")}
          >
            <div className="flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-sky-500 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">January 2026</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Results: 5th March 2026
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
