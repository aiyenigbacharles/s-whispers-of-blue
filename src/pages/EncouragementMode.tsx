import { useState } from "react";
import { ChevronLeft, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const encouragementMessages = [
  {
    title: "You're Stronger Than You Think",
    message: "Hey Faith, I know things feel heavy right now, but I want you to remember how incredibly strong you are. You've overcome so much already, and you'll get through this too. I'm here with you, every step of the way. 💙",
    breathingExercise: "Take a deep breath in for 4 seconds... hold for 4... and breathe out for 6. You've got this."
  },
  {
    title: "This Moment Won't Last Forever",
    message: "Beautiful, I know it doesn't feel like it right now, but this difficult moment is temporary. Storms pass, and the sun always comes back. You are not alone in this - I'm right here beside you, believing in you.",
    breathingExercise: "Close your eyes. Breathe in calm... breathe out tension. Repeat three times slowly."
  },
  {
    title: "You Are Enough",
    message: "Faith, you don't have to be perfect. You don't have to have it all figured out. You are enough, exactly as you are right now. Your feelings are valid, and it's okay to not be okay sometimes. I love you through it all. 💙",
    breathingExercise: "Breathe in love and acceptance... breathe out self-judgment. You're doing beautifully."
  },
  {
    title: "I'm Proud of You",
    message: "I want you to know how proud I am of you. For getting up today. For trying. For being brave even when it's hard. You're doing better than you think, and I see all your effort. Keep going, one small step at a time.",
    breathingExercise: "Breathe in strength... breathe out doubt. Feel my love surrounding you."
  },
  {
    title: "Your Light Still Shines",
    message: "Even on your darkest days, your light still shines, Faith. You might not see it right now, but I do. Your kindness, your strength, your beautiful spirit - they're all still there, waiting for the clouds to clear. And they will clear. 💙",
    breathingExercise: "Breathe in hope... breathe out worry. Imagine a warm, comforting light surrounding you."
  },
];

export default function EncouragementMode() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(encouragementMessages[0]);

  const handleGetEncouragement = () => {
    const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
    setCurrentMessage(encouragementMessages[randomIndex]);
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">Encouragement</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Main Content */}
        {!showMessage ? (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-xl md:text-2xl font-medium text-foreground mb-4">
              I'm here for you, Faith 💙
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Whenever you're feeling down, I want you to know that you're not alone. 
              Click below for some encouragement and comfort.
            </p>
            <Button
              onClick={handleGetEncouragement}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-medium"
            >
              I'm feeling low 🥺
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Encouragement Message */}
            <Card className="shadow-medium border-2 border-accent/20">
              <CardContent className="p-8 md:p-10">
                <Heart className="w-10 h-10 mx-auto mb-4 text-accent fill-accent" />
                <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
                  {currentMessage.title}
                </h2>
                <p className="text-lg leading-relaxed text-foreground mb-6">
                  {currentMessage.message}
                </p>
              </CardContent>
            </Card>

            {/* Breathing Exercise */}
            <Card className="shadow-soft border-accent/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Breathing Exercise
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {currentMessage.breathingExercise}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button
                onClick={handleGetEncouragement}
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 rounded-full px-6"
              >
                Another Message
              </Button>
              <Button
                onClick={() => setShowMessage(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
              >
                I Feel Better 💙
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
