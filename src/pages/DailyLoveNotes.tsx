import { useState, useEffect } from "react";
import { Heart, ChevronLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const loveNotes = [
  "Hey beautiful 💙, just wanted to remind you that you make every day brighter. Your smile is my favorite thing in the world.",
  "Faith, you're not just my partner, you're my best friend. Thank you for being you, exactly as you are.",
  "Every moment with you feels like a gift. I'm so grateful to have you in my life, today and always.",
  "You are stronger than you know, more beautiful than you can see, and more loved than you can imagine. 💙",
  "When I think about what makes me happiest, it's always you. Your laughter, your kindness, your heart.",
  "Distance means nothing when someone means everything. You mean everything to me, Faith.",
  "I love the way you see the world. Your perspective makes everything more beautiful.",
  "You're my calm in the chaos, my light in the darkness. Thank you for being my safe place.",
  "Just thinking about you makes me smile. I hope this message does the same for you. 💙",
  "Faith, you deserve all the happiness in the world. Never forget how special you are.",
  "Your strength inspires me. Your kindness moves me. Your love completes me.",
  "I'm so proud of you for everything you do and everything you are. Keep shining, beautiful.",
  "Some days are harder than others, but with you by my side, I know we can face anything together.",
  "You make ordinary moments feel extraordinary. That's the magic of loving you.",
  "I hope you know that you're not just loved, you're cherished, valued, and absolutely adored. 💙",
];

export default function DailyLoveNotes() {
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved notes from localStorage
    const saved = localStorage.getItem("savedLoveNotes");
    if (saved) {
      setSavedNotes(JSON.parse(saved));
    }
    
    // Get a random note
    getRandomNote();
  }, []);

  const getRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * loveNotes.length);
    const note = loveNotes[randomIndex];
    setCurrentNote(note);
    setIsSaved(savedNotes.includes(note));
  };

  const toggleSaveNote = () => {
    let updated: string[];
    if (isSaved) {
      updated = savedNotes.filter(note => note !== currentNote);
    } else {
      updated = [...savedNotes, currentNote];
    }
    setSavedNotes(updated);
    setIsSaved(!isSaved);
    localStorage.setItem("savedLoveNotes", JSON.stringify(updated));
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
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">Daily Love Note</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Love Note Card */}
        <Card className="mb-6 shadow-medium border-2 border-primary/10 animate-fade-in">
          <CardContent className="p-8 md:p-12 text-center">
            <Heart className="w-12 h-12 mx-auto mb-6 text-accent fill-accent" />
            <p className="text-lg md:text-xl leading-relaxed text-foreground mb-8">
              {currentNote}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={getRandomNote}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-soft"
              >
                New Note
              </Button>
              <Button
                onClick={toggleSaveNote}
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 rounded-full px-6"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Notes Section */}
        {savedNotes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Your Saved Notes 💙</h2>
            <div className="space-y-3">
              {savedNotes.map((note, index) => (
                <Card key={index} className="shadow-soft">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground/80">{note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
