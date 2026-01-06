import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KawaiiMascot } from "./KawaiiMascot";
import { Sparkles, Gamepad2 } from "lucide-react";

const QuizWidget = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-dashed bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="py-6">
        <div className="flex flex-col items-center gap-3">
          <KawaiiMascot character="cat" mood="excited" size={50} />
          <div className="text-center">
            <h3 className="font-semibold text-sm">Want to earn XP?</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Play the quiz game and boost your rank!
            </p>
          </div>
          <Button 
            onClick={() => navigate('/game')} 
            className="w-full"
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Boost Your XP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizWidget;
