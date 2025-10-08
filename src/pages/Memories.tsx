import { useState, useEffect } from "react";
import { ChevronLeft, Heart, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder data structure for memories
// Added a 'backgroundImage' property to each memory for the dynamic background
const memoryDates = [
  {
    id: "trukadero",
    name: "Trukadero",
    date: "Bowling",
    description: "Our first date together 💙",
    backgroundImage: "/media/Trukadero/truk 1.jpg",
    media: [
      { type: "image", src: "/media/Trukadero/truk 1.jpg" },
      { type: "image", src: "/media/Trukadero/truk 2.jpg" },
      { type: "image", src: "/media/Trukadero/truk 3.jpg" },
      { type: "video", src: "/media/Trukadero/Vid 1.mp4"},
      { type: "video", src: "/media/Trukadero/Vid 2.mp4"},
      { type: "video", src: "/media/Trukadero/Vid 3.mp4"},
      { type: "video", src: "/media/Trukadero/Vid 4.mp4" },
      { type: "video", src: "/media/Trukadero/Vid 5.mp4" },
      { type: "video", src: "/media/Trukadero/Vid 6.mp4" },
      { type: "image", src: "/media/trukadero-2.jpg", caption: "Your beautiful smile" },
    ]
  },
  {
    id: "magicland",
    name: "Magicland",
    date: "An unforgettable experience",
    description: "Our most memorable date so far",
    backgroundImage: "/media/Magicland/faith 1.png",
    media: [
      { type: "image", src: "/media/Magicland/faith 1.png", },
      { type: "image", src: "/media/Magicland/faith 2.png", },
      { type: "video", src: "/media/Magicland/mag 1.mp4" },
      { type: "video", src: "/media/Magicland/mag 2.mp4" },
      { type: "video", src: "/media/Magicland/mag 3.mp4" },
      { type: "video", src: "/media/Magicland/mag 4.mp4" },
      { type: "video", src: "/media/Magicland/mag 5.mp4" },
      { type: "video", src: "/media/Magicland/mag 6.mp4" },
      { type: "video", src: "/media/Magicland/mag 7.mp4" },
    ]
  },
  {
    id: "piccadilly",
    name: "Piccadilly",
    date: "A wonderful evening",
    description: "Still a great experience",
    backgroundImage: "/media/Picadilly/pica.mp4", // Video can be a background too, but we'll only show the first frame
    media: [
      { type: "video", src: "/media/Picadilly/pica 1.mp4"},
      { type: "video", src: "/media/Picadilly/pica 2.mp4"},
      { type: "video", src: "/media/Picadilly/pica.mp4"},
      { type: "video", src: "/media/Picadilly/pica 4.mp4"},
      { type: "video", src: "/media/Picadilly/pica 5.mp4"},
      { type: "video", src: "/media/Picadilly/pica 6.mp4"},
      { type: "video", src: "/media/Picadilly/pica 7.mp4"},
      { type: "video", src: "/media/Picadilly/pica 8.mp4"},

    ]
  },
  {
    id: "tkmall",
    name: "TK Mall",
    date: "Simple but really enjoyable",
    description: "Sometimes the simplest moments are the most special",
    backgroundImage: "/media/TK Mall/TK 5.jpg",
    media: [
      { type: "image", src: "/media/TK Mall/TK 1.jpg"},
      { type: "image", src: "/media/TK Mall/TK 2.jpg"},
      { type: "image", src: "/media/TK Mall/TK 3.jpg"},
      { type: "image", src: "/media/TK Mall/TK 4.jpg"},
      { type: "image", src: "/media/TK Mall/TK 5.jpg"},
      { type: "video", src: "/media/TK Mall/clip 1.mp4" },
      { type: "video", src: "/media/TK Mall/clip 2.mp4" },
      { type: "video", src: "/media/TK Mall/clip 3.mp4" },
      { type: "video", src: "/media/TK Mall/clip 4.mp4" },
    ]
  },
];


export default function Memories() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(memoryDates[0].id);
  
  // OPTIMIZATION: Updated lightbox state to hold the full context for navigation
  const [lightbox, setLightbox] = useState<{ media: typeof memoryDates[0]['media']; index: number } | null>(null);

  const currentMemory = memoryDates.find(m => m.id === selectedDate) || memoryDates[0];

  // OPTIMIZATION: Effect to toggle a class on the body to prevent scrolling when lightbox is open.
  // This is a more robust method than `overflow: hidden` on a single element.
  useEffect(() => {
    if (lightbox) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }
    // Cleanup function to remove the class if the component unmounts
    return () => document.body.classList.remove('lightbox-open');
  }, [lightbox]);

  // --- Lightbox navigation functions ---
  const handlePrev = () => {
    if (!lightbox) return;
    const newIndex = (lightbox.index - 1 + lightbox.media.length) % lightbox.media.length;
    setLightbox({ ...lightbox, index: newIndex });
  };
  
  const handleNext = () => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + 1) % lightbox.media.length;
    setLightbox({ ...lightbox, index: newIndex });
  };

  const currentLightboxItem = lightbox ? lightbox.media[lightbox.index] : null;

  return (
    <div className="min-h-screen relative p-4 md:p-8">
      {/* Background with blur */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-500" // Added transition for smooth background changes
        style={{
          // OPTIMIZATION: Background image is now dynamic based on the selected tab
          backgroundImage: `url(${encodeURI(currentMemory.backgroundImage)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
        }}
      />
      <div className="fixed inset-0 z-0 bg-background/60" />
      
      <div className="max-w-xl md:max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8 z-20 relative">
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
            <TabsList
              className="w-full flex md:grid md:grid-cols-4 gap-2 mb-4 md:mb-8 bg-muted h-auto p-1 sm:p-1 overflow-x-auto overflow-y-visible no-scrollbar z-30 rounded-lg"
              style={{ paddingLeft: 'calc(0.75rem + env(safe-area-inset-left, 0px))', paddingRight: 'calc(0.75rem + env(safe-area-inset-right, 0px))' }}
            >
              {memoryDates.map((date) => (
                <TabsTrigger 
                  key={date.id} 
                  value={date.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2 sm:py-3 px-3 sm:px-4 min-w-[100px] sm:min-w-[120px] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 mr-2 block" />
                  <span className="whitespace-nowrap">{date.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

          {memoryDates.map((date) => (
            <TabsContent key={date.id} value={date.id} className="animate-fade-in">
              <Card className="mb-6 shadow-medium border-2 border-primary/10">
                <CardContent className="p-6 md:p-8 text-center">
                  <Heart className="w-10 h-10 mx-auto mb-4 text-accent fill-accent" />
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">{date.name}</h2>
                  <p className="text-muted-foreground mb-2">{date.date}</p>
                  <p className="text-foreground/80">{date.description}</p>
                </CardContent>
              </Card>

              {/* Media Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                {date.media.map((item, index) => (
                  <Card key={index} className="shadow-soft overflow-hidden rounded-lg cursor-pointer group">
                    <CardContent className="p-0">
                      {/* Use rectangular responsive heights so images are not cropped half-way on mobile */}
                      <div className={`bg-muted flex items-center justify-center overflow-hidden relative w-full h-56 sm:h-64 md:h-72 lg:h-80 ${item.caption ? 'rounded-t-lg' : 'rounded-lg'}`}>
                        {item.type === "video" ? (
                          <>
                            <video src={item.src} controls={false} playsInline preload="metadata" className="w-full h-full object-contain bg-black" muted />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="play-overlay bg-black/40 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img src={item.src} alt={item.caption || date.name} loading="lazy" className="w-full h-full object-contain bg-black" />
                        )}
                        <button
                          aria-label={`Open media ${index + 1}`}
                          onClick={() => setLightbox({ media: date.media, index: index })}
                          className="absolute inset-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      {/* OPTIMIZATION: Conditionally render the caption area only if a caption exists to avoid empty space */}
                      {item.caption && (
                        <div className="p-3 md:p-4 bg-card">
                          <p className="text-sm md:text-base text-foreground/80 text-center">{item.caption}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* --- Optimized Lightbox Modal --- */}
      {lightbox && currentLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setLightbox(null)} />
          
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            {/* Previous Button */}
            <button onClick={handlePrev} className="lightbox-nav left-2 sm:left-4">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="w-full">
              {currentLightboxItem.type === 'video' ? (
                <video key={currentLightboxItem.src} src={currentLightboxItem.src} controls autoPlay playsInline className="w-full h-auto max-h-[85vh] object-contain" />
              ) : (
                <img key={currentLightboxItem.src} src={currentLightboxItem.src} alt={currentLightboxItem.caption} className="w-full h-auto max-h-[85vh] object-contain" />
              )}
              {currentLightboxItem.caption && (
                <div className="p-3 mt-2 bg-black/50 rounded-b-lg text-center text-sm text-white">{currentLightboxItem.caption}</div>
              )}
            </div>
            
            {/* Next Button */}
            <button onClick={handleNext} className="lightbox-nav right-2 sm:right-4">
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close Button */}
            <button aria-label="Close" onClick={() => setLightbox(null)} className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}