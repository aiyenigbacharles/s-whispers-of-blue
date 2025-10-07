import { useState } from "react";
import { ChevronLeft, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/background.jpg";

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
  {
    title: "Charles Believes in You",
    message: "Faith, it's me, Charles. I need you to know that I believe in you with my whole heart. Whatever you're facing right now, you have the strength to overcome it. You've proven that time and time again. I'm right here, and I'm not going anywhere. 💙",
    breathingExercise: "Breathe in confidence... breathe out fear. Feel my hand in yours."
  },
  {
    title: "You're Not Alone",
    message: "Beautiful, I know it can feel lonely when you're struggling, but please remember - you are never, ever alone. I'm here. I see you. I hear you. And I'm holding space for whatever you're feeling right now. You don't have to carry this by yourself.",
    breathingExercise: "Take a slow breath in... hold it gently... and release. I'm here with you."
  },
  {
    title: "This Too Shall Pass",
    message: "Faith, I promise you that this heavy feeling won't last forever. You've made it through 100% of your worst days so far. That's a perfect track record. This is just another chapter, not the whole story. Better days are coming. 💙",
    breathingExercise: "Breathe in patience... breathe out frustration. Trust the process."
  },
  {
    title: "Your Feelings Are Valid",
    message: "Hey love, whatever you're feeling right now is completely valid. You don't need to justify it, explain it, or apologize for it. Feel what you need to feel. I'm here to support you through all of it, no judgment. - Charles",
    breathingExercise: "Breathe in acceptance... breathe out shame. Your emotions matter."
  },
  {
    title: "You're Making Progress",
    message: "Faith, even if you can't see it right now, you're making progress. Every breath, every moment you keep going - that's progress. Healing isn't linear, and that's okay. You're moving forward, even when it feels like you're standing still. I'm so proud of you. 💙",
    breathingExercise: "Breathe in slowly for 5 counts... hold for 3... exhale for 7. You're doing great."
  },
  {
    title: "Rest is Not Giving Up",
    message: "Beautiful, if you need to rest, please rest. Taking a break doesn't mean you're weak or giving up. It means you're wise enough to take care of yourself. You deserve gentleness and compassion, especially from yourself.",
    breathingExercise: "Breathe in self-compassion... breathe out guilt. Rest is healing."
  },
  {
    title: "I See Your Effort",
    message: "Faith, I see how hard you're trying. I see the effort you're putting in, even when it feels invisible. I see you fighting battles that others don't even know about. That takes incredible courage, and I want you to know that I see it and I'm in awe of you. 💙 - Charles",
    breathingExercise: "Breathe in recognition... breathe out the need for perfection. You're enough."
  },
  {
    title: "You've Survived Before",
    message: "Hey love, remember all the times you thought you wouldn't make it through? You did. You're still here. You're still fighting. That's not luck - that's your incredible strength and resilience. You'll make it through this time too.",
    breathingExercise: "Breathe in your resilience... breathe out doubt. Remember your strength."
  },
  {
    title: "Take It One Moment at a Time",
    message: "Faith, you don't have to figure out tomorrow or next week right now. Just focus on this moment. Right now, in this breath, you're okay. And that's enough. One moment at a time, beautiful. 💙",
    breathingExercise: "Breathe in presence... breathe out worry about the future. Just be here, now."
  },
  {
    title: "You Deserve Kindness",
    message: "Beautiful Faith, please be kind to yourself today. Speak to yourself the way I would speak to you - with love, gentleness, and understanding. You deserve that kindness, especially from yourself. - Charles",
    breathingExercise: "Breathe in self-love... breathe out self-criticism. Be gentle with yourself."
  },
  {
    title: "Your Story Isn't Over",
    message: "Hey love, this chapter might be difficult, but it's not the end of your story. There are so many beautiful pages yet to be written. Don't give up on your story, Faith. The best parts might still be ahead. 💙",
    breathingExercise: "Breathe in hope for tomorrow... breathe out despair. Your story continues."
  },
  {
    title: "You're Loved Unconditionally",
    message: "Faith, I need you to hear this: my love for you doesn't depend on you being happy all the time, or strong all the time, or perfect all the time. I love you exactly as you are, in this moment, with whatever you're feeling. Unconditionally. Always.",
    breathingExercise: "Breathe in unconditional love... breathe out fear of being too much. You are loved."
  },
  {
    title: "It's Okay to Ask for Help",
    message: "Beautiful, you don't have to do this alone. It's not weakness to ask for help - it's wisdom. It's courage. Reach out if you need to. I'm here, and I want to help carry this with you. 💙 - Charles",
    breathingExercise: "Breathe in support... breathe out the burden of carrying everything alone."
  },
  {
    title: "You're Doing Your Best",
    message: "Faith, your best is enough. Even when your best today doesn't look like your best yesterday, it's still your best. And that's all anyone can ask of you, including yourself. I'm proud of you for showing up.",
    breathingExercise: "Breathe in self-acceptance... breathe out comparison. Your best is enough."
  },
  {
    title: "Feel the Ground Beneath You",
    message: "Hey love, when everything feels overwhelming, remember to ground yourself. Feel your feet on the floor. Feel the air on your skin. You're here. You're real. You're safe in this moment. 💙",
    breathingExercise: "Take a deep breath. Wiggle your toes. Feel yourself connected to the earth. You're grounded."
  },
  {
    title: "Your Pain is Temporary",
    message: "Faith, I know it hurts right now. I know it feels like it will never end. But pain, like all feelings, is temporary. It comes in waves, and waves always recede. Hold on. Relief is coming. - Charles",
    breathingExercise: "Breathe in patience... breathe out urgency. The wave will pass."
  },
  {
    title: "You're More Than This Moment",
    message: "Beautiful, this difficult moment doesn't define you. You are so much more than what you're going through right now. You're kind, strong, loving, and wonderful. Don't let this temporary struggle make you forget who you are. 💙",
    breathingExercise: "Breathe in your true identity... breathe out temporary struggles. You are more."
  },
  {
    title: "Small Steps Count",
    message: "Faith, you don't need to take giant leaps right now. Small steps count. Getting out of bed counts. Drinking water counts. Every tiny thing you do to take care of yourself matters. You're doing great.",
    breathingExercise: "Breathe in appreciation for small victories... breathe out pressure to do more. Small is enough."
  },
  {
    title: "I'm Here No Matter What",
    message: "Hey love, I need you to know - I'm not going anywhere. On your good days and your bad days, when you're strong and when you're struggling, I'm here. You don't have to earn my presence. You already have it. Always. 💙 - Charles",
    breathingExercise: "Breathe in constancy... breathe out fear of abandonment. I'm here."
  },
  {
    title: "You've Overcome So Much",
    message: "Faith, look back at everything you've already overcome. All those moments you didn't think you'd survive - you did. You're a survivor. You're a warrior. And you'll get through this too, just like you've gotten through everything else.",
    breathingExercise: "Breathe in your history of resilience... breathe out current doubt. You've done this before."
  },
  {
    title: "Let Yourself Feel",
    message: "Beautiful, it's okay to feel sad. It's okay to cry. It's okay to not be okay. You don't have to put on a brave face all the time. Feel what you need to feel, and know that I'm here holding space for all of it. 💙",
    breathingExercise: "Breathe in permission to feel... breathe out the need to be strong. Your tears are valid."
  },
  {
    title: "You Deserve Peace",
    message: "Faith, you deserve peace. You deserve moments of calm in the storm. You deserve to feel okay. And even if you don't feel it right now, I'm going to keep reminding you until you believe it. - Charles",
    breathingExercise: "Breathe in peace... breathe out chaos. Feel calm entering your body."
  },
  {
    title: "Your Worth Isn't Conditional",
    message: "Hey love, your worth doesn't come from what you do or what you achieve. Your worth is inherent. You are valuable simply because you exist. You don't have to earn your place in this world or in my heart. 💙",
    breathingExercise: "Breathe in your inherent worth... breathe out performance anxiety. You matter."
  },
  {
    title: "Tomorrow is a New Day",
    message: "Faith, if today was hard, that's okay. Tomorrow is a brand new day with new possibilities. Every sunset brings the promise of a new sunrise. Don't give up before you see tomorrow's light.",
    breathingExercise: "Breathe in hope for tomorrow... breathe out today's struggles. New beginnings await."
  },
  {
    title: "You're Not a Burden",
    message: "Beautiful, please hear me: you are not a burden. Your needs are not too much. Your feelings are not too heavy. I want to be here for you. Supporting you is not a burden - it's a privilege. 💙 - Charles",
    breathingExercise: "Breathe in acceptance... breathe out shame. You are not too much."
  },
  {
    title: "Focus on Right Now",
    message: "Faith, if the future feels overwhelming, come back to right now. In this exact moment, you're breathing. You're here. You're okay. That's all you need to focus on - just this breath, just this moment.",
    breathingExercise: "Breathe in the present moment... breathe out future worries. Just be here now."
  },
  {
    title: "Your Strength is Showing Up",
    message: "Hey love, strength isn't about never falling. It's about getting back up. It's about showing up, even when it's hard. And you're here. You showed up. That's strength, Faith. That's courage. 💙",
    breathingExercise: "Breathe in acknowledgment of your courage... breathe out feelings of weakness. You're strong."
  },
  {
    title: "You're Making a Difference",
    message: "Faith, even when you feel small or insignificant, please remember - you make a difference. In my life, in the lives of people around you. Your presence matters. You matter. - Charles",
    breathingExercise: "Breathe in your significance... breathe out feelings of insignificance. You matter."
  },
  {
    title: "Trust Your Journey",
    message: "Beautiful, I know the path isn't always clear. I know it's hard to trust when you can't see where you're going. But trust your journey, Faith. Trust that you're exactly where you need to be right now. 💙",
    breathingExercise: "Breathe in trust... breathe out the need for control. Trust the journey."
  },
  {
    title: "You're Allowed to Struggle",
    message: "Faith, you're allowed to have hard days. You're allowed to struggle. That doesn't make you weak or broken. It makes you human. And being human is beautiful, even in the difficult moments.",
    breathingExercise: "Breathe in your humanity... breathe out perfectionism. It's okay to struggle."
  },
  {
    title: "I See the Real You",
    message: "Hey love, I see you - the real you, beneath the smile you put on for others. I see your pain, your struggles, and your strength. And I love all of it. All of you. 💙 - Charles",
    breathingExercise: "Breathe in being truly seen... breathe out the masks. You are loved as you are."
  },
  {
    title: "You're Not Failing",
    message: "Faith, having a hard time doesn't mean you're failing. Needing help doesn't mean you're failing. Feeling overwhelmed doesn't mean you're failing. You're human, and you're doing the best you can. That's success.",
    breathingExercise: "Breathe in self-compassion... breathe out self-judgment. You're not failing."
  },
  {
    title: "There's Light Ahead",
    message: "Beautiful, even in the darkest tunnel, there's light at the end. You might not see it yet, but it's there. Keep moving forward, even if it's just tiny steps. The light is waiting for you. 💙",
    breathingExercise: "Breathe in hope... breathe out despair. The light is coming."
  },
  {
    title: "You Inspire Me",
    message: "Faith, watching you face your challenges with such grace and courage inspires me every single day. You might not feel brave, but you are. You might not feel strong, but you are. I see it, even when you can't. - Charles",
    breathingExercise: "Breathe in the recognition of your bravery... breathe out self-doubt. You inspire."
  },
  {
    title: "Take Care of Yourself",
    message: "Hey love, please remember to take care of yourself today. Drink some water. Eat something nourishing. Rest if you need to. Self-care isn't selfish - it's necessary. You deserve to be taken care of, especially by you. 💙",
    breathingExercise: "Breathe in self-care... breathe out guilt. You deserve to be cared for."
  },
  {
    title: "You're Worthy of Love",
    message: "Faith, you are worthy of love - all the love in the world. Not because of what you do or what you achieve, but because of who you are. You are inherently worthy, and nothing can change that.",
    breathingExercise: "Breathe in your worthiness... breathe out feelings of unworthiness. You are worthy."
  },
  {
    title: "I'm Grateful for You",
    message: "Beautiful, even on your hardest days, I'm grateful for you. Grateful for your existence, for your presence in my life, for the gift of knowing you. You make my world better just by being in it. 💙 - Charles",
    breathingExercise: "Breathe in gratitude... breathe out feelings of being a burden. You are a gift."
  },
  {
    title: "You Can Get Through This",
    message: "Faith, I know it feels impossible right now. I know it feels like too much. But you can get through this. You have everything you need inside you. And you have me right beside you. We'll get through this together. 💙",
    breathingExercise: "Breathe in capability... breathe out overwhelm. You can do this."
  },
  {
    title: "Rest and Reset",
    message: "Hey love, sometimes the bravest thing you can do is rest. Take a moment to reset. Close your eyes, breathe deeply, and give yourself permission to just be. You don't always have to be doing. - Charles",
    breathingExercise: "Take 5 deep, slow breaths. Let each one reset your nervous system. You're safe."
  },
  {
    title: "Your Best Days Are Ahead",
    message: "Faith, I truly believe that your best days are still ahead of you. This difficult season is preparing you for something beautiful. Don't give up before you get to see it. Keep going, beautiful. 💙",
    breathingExercise: "Breathe in faith in the future... breathe out current hopelessness. Better days are coming."
  },
  {
    title: "You're Exactly Where You Need to Be",
    message: "Beautiful, even if it doesn't feel like it, you're exactly where you need to be right now. Trust the timing of your life. Trust that even this difficult moment has a purpose. You're on the right path.",
    breathingExercise: "Breathe in trust... breathe out resistance to where you are. You're right where you need to be."
  },
  {
    title: "I Choose You Every Day",
    message: "Faith, on your good days and your hard days, when you're happy and when you're hurting, I choose you. Every single day, I choose you. You never have to wonder if I'll be there - I will be. Always. 💙 - Charles",
    breathingExercise: "Breathe in security... breathe out fear of being left. You are chosen."
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
