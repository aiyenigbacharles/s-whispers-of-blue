import { Heart, Sparkles, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Hey Faith 💙");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning, beautiful 💙");
    } else if (hour < 18) {
      setGreeting("Hey Faith 💙");
    } else {
      setGreeting("Good evening, love 💫");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          {/* Hero Message */}
          <Card className="shadow-medium border-2 border-primary/10">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-6 flex justify-center gap-2">
                <Heart className="w-8 h-8 text-accent fill-accent animate-pulse" />
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4">
                {greeting}
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Just a reminder that I love you endlessly. 
                This space is filled with love notes, encouragement, and our beautiful memories together.
              </p>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="shadow-soft hover:shadow-medium transition-all cursor-pointer group"
              onClick={() => navigate("/daily-love-notes")}
            >
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <h2 className="text-lg font-semibold text-primary mb-2">Daily Love Notes</h2>
                <p className="text-sm text-muted-foreground">
                  Sweet messages just for you
                </p>
              </CardContent>
            </Card>

            <Card 
              className="shadow-soft hover:shadow-medium transition-all cursor-pointer group"
              onClick={() => navigate("/encouragement-mode")}
            >
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <h2 className="text-lg font-semibold text-primary mb-2">Encouragement</h2>
                <p className="text-sm text-muted-foreground">
                  For when you need support
                </p>
              </CardContent>
            </Card>

            <Card 
              className="shadow-soft hover:shadow-medium transition-all cursor-pointer group"
              onClick={() => navigate("/memories")}
            >
              <CardContent className="p-6 text-center">
                <Camera className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <h2 className="text-lg font-semibold text-primary mb-2">Our Memories</h2>
                <p className="text-sm text-muted-foreground">
                  Relive our special moments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Message */}
          <p className="text-center text-sm text-muted-foreground">
            Made with endless love for Faith 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
