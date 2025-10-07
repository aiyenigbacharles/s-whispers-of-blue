import { useState, useEffect } from "react";
import { Heart, ChevronLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/background.jpg";

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
  "Good morning, my love. I woke up thinking about you and how lucky I am to have you in my life. - Charles",
  "Faith, your presence in my life is the greatest blessing I could ever ask for. You complete me in every way.",
  "I love how you make me laugh even on my worst days. Your joy is contagious and beautiful.",
  "Every time I see your name pop up on my phone, my heart skips a beat. You still give me butterflies, Faith.",
  "You're the reason I believe in soulmates. Thank you for being mine. 💙",
  "I admire your courage, your resilience, and the way you never give up. You inspire me every single day.",
  "Faith, you have a heart of gold and a spirit that shines brighter than any star. Never dim your light.",
  "Charles here, just reminding you that you're the most incredible woman I've ever known. Keep being amazing.",
  "The world is better because you're in it. I'm better because you're in my life.",
  "I love the little things about you - the way you laugh, the way you think, the way you care about others.",
  "Faith, you make me want to be a better person every single day. Thank you for inspiring me. 💙",
  "Your smile could light up the darkest room. Never stop smiling, beautiful.",
  "I'm counting down the moments until I can see you again. You're always on my mind.",
  "You are my today and all of my tomorrows. I can't wait to build a beautiful future with you.",
  "Faith, your love is the fuel that keeps me going. Thank you for loving me so completely.",
  "I fall in love with you more and more each day. That's not something I thought was possible, but you prove me wrong. 💙",
  "You're not just beautiful on the outside - your soul is the most beautiful thing about you, Faith.",
  "Charles loves you more than words could ever express. You mean absolutely everything to me.",
  "Every love song reminds me of you. Every romantic movie makes me think of us.",
  "I love how we can talk about anything and everything. You're my favorite person to talk to.",
  "Faith, you make me feel understood in a way no one else ever has. Thank you for seeing me.",
  "Your dreams matter to me. Your happiness matters to me. YOU matter to me more than anything. 💙",
  "I love watching you pursue your passions. Your dedication and drive are so attractive.",
  "You're the first person I want to share good news with and the only person I want comfort from when things go wrong.",
  "Faith, loving you is the easiest and best thing I've ever done. You make it so natural.",
  "I promise to always support you, encourage you, and love you with everything I have. - Charles 💙",
  "Your voice is my favorite sound. Your name is my favorite word.",
  "I love how you see the good in people. Your compassion makes the world a better place.",
  "Faith, you deserve to be treated like the queen you are. I'll spend my life making sure you feel valued.",
  "Every day with you is an adventure I never want to end. Thank you for making life exciting.",
  "I love your mind. The way you think, the things you say, the perspectives you share - it all fascinates me. 💙",
  "You're my safe haven, my happy place, my home. Wherever you are, that's where I want to be.",
  "Faith, your strength during tough times amazes me. You're so much braver than you give yourself credit for.",
  "I love making you happy. Your happiness is my happiness. - Charles",
  "You have a way of making everything better just by being there. That's your superpower, Faith.",
  "I'm so grateful for your patience, your understanding, and your unconditional love. 💙",
  "Every moment away from you makes me appreciate you even more. Distance really does make the heart grow fonder.",
  "Faith, you're the answer to prayers I didn't even know I was praying. You're my miracle.",
  "I love how we can be silly together. You bring out the best, most playful side of me.",
  "Your love has changed me in the most beautiful ways. I'm a better man because of you.",
  "Faith, I choose you. Today, tomorrow, and every day after that. Always. 💙",
  "You make me believe in forever. I want forever with you, beautiful.",
  "I love the way you care for others. Your kindness and generosity inspire me daily. - Charles",
  "Every time I think I couldn't love you more, you prove me wrong. My love for you knows no limits.",
  "Faith, you're my greatest adventure and my safest place all at once. Thank you for being both.",
  "I love waking up knowing that you're mine and I'm yours. Best feeling in the world. 💙",
  "You're not just my girlfriend, you're my partner in everything. We're a team, and I love that.",
  "Faith, your laugh is my favorite melody. I could listen to it all day, every day.",
  "I'm so proud to call you mine. You make me the luckiest guy in the world. - Charles 💙",
  "You deserve all the love, respect, and happiness this world has to offer. I'll spend my life giving you that.",
  "Faith, thank you for choosing me. Thank you for loving me. Thank you for being you.",
  "I love how you make me feel - valued, understood, loved, and cherished. You're everything to me. 💙",
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
    <div className="min-h-screen relative p-4 md:p-8">
      {/* Background with blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
        }}
      />
      <div className="fixed inset-0 z-0 bg-background/60" />
      
      <div className="max-w-2xl mx-auto relative z-10">
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
