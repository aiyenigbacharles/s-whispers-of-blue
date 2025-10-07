import { useState } from "react";
import { ChevronLeft, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import backgroundImage from "@/assets/background.jpg";

// Placeholder data structure for memories
const memoryDates = [
  {
    id: "trukadero",
    name: "Trukadero",
    date: "A magical day",
    description: "Our adventure at Trukadero was filled with laughter and joy",
    media: [
      { type: "image", caption: "Starting our day together" },
      { type: "video", caption: "Captured moments of pure happiness" },
      { type: "image", caption: "Your beautiful smile" },
    ]
  },
  {
    id: "magicland",
    name: "Magicland",
    date: "An unforgettable experience",
    description: "Every ride, every moment was magical with you",
    media: [
      { type: "image", caption: "Ready for adventure" },
      { type: "video", caption: "Our favorite moments" },
      { type: "image", caption: "Creating memories together" },
    ]
  },
  {
    id: "piccadilly",
    name: "Piccadilly",
    date: "A perfect evening",
    description: "Walking through Piccadilly, hand in hand",
    media: [
      { type: "image", caption: "The lights reflecting in your eyes" },
      { type: "video", caption: "Our walk through the city" },
      { type: "image", caption: "Moments I'll treasure forever" },
    ]
  },
  {
    id: "tkmall",
    name: "TK Mall",
    date: "Simple joys",
    description: "Sometimes the simplest moments are the most special",
    media: [
      { type: "image", caption: "Just us, enjoying our time together" },
      { type: "video", caption: "Candid moments" },
      { type: "image", caption: "Your laughter is my favorite sound" },
    ]
  },
];

export default function Memories() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(memoryDates[0].id);

  const currentMemory = memoryDates.find(m => m.id === selectedDate) || memoryDates[0];

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
      
      <div className="max-w-4xl mx-auto relative z-10">
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
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">Our Memories</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Date Tabs */}
        <Tabs value={selectedDate} onValueChange={setSelectedDate} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8 bg-muted h-auto p-1">
            {memoryDates.map((date) => (
              <TabsTrigger 
                key={date.id} 
                value={date.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-3"
              >
                <Calendar className="w-4 h-4 mr-2 hidden sm:block" />
                {date.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {memoryDates.map((date) => (
            <TabsContent key={date.id} value={date.id} className="animate-fade-in">
              {/* Date Header */}
              <Card className="mb-6 shadow-medium border-2 border-primary/10">
                <CardContent className="p-6 md:p-8 text-center">
                  <Heart className="w-10 h-10 mx-auto mb-4 text-accent fill-accent" />
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
                    {date.name}
                  </h2>
                  <p className="text-muted-foreground mb-2">{date.date}</p>
                  <p className="text-foreground/80">{date.description}</p>
                </CardContent>
              </Card>

              {/* Media Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {date.media.map((item, index) => (
                  <Card key={index} className="shadow-soft overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        {item.type === "video" ? (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 4l10 6-10 6V4z" />
                              </svg>
                            </div>
                            <p className="text-sm text-muted-foreground">Video placeholder</p>
                          </div>
                        ) : (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-sm text-muted-foreground">Image placeholder</p>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-card">
                        <p className="text-sm text-foreground/80 text-center">{item.caption}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upload Instructions */}
              <Card className="mt-6 shadow-soft border-accent/20">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    💙 You can add your videos and images by replacing the placeholders above. 
                    Each memory can hold multiple videos and photos from our special day.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
