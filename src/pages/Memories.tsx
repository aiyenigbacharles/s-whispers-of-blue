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
    date: "Bowling",
    description: "Our first date together 💙",
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
  const [lightbox, setLightbox] = useState<{ type: string; src: string; caption?: string } | null>(null);

  const currentMemory = memoryDates.find(m => m.id === selectedDate) || memoryDates[0];

  return (
    <div className="min-h-screen relative p-4 md:p-8">
      {/* Background with blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          // use the supplied image from public/media as the page background
          backgroundImage: `url(${encodeURI('/media/TK Mall/TK 5.jpg')})`,
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
    {/* Tabs become horizontally scrollable on small screens for better mobile UX */}
    <TabsList className="w-full flex md:grid md:grid-cols-4 gap-2 mb-4 md:mb-8 bg-muted h-auto p-1 sm:p-1 overflow-x-auto no-scrollbar">
            {memoryDates.map((date) => (
              <TabsTrigger 
                key={date.id} 
                value={date.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg py-2 sm:py-3 px-3 sm:px-4 min-w-[120px] sm:min-w-[140px] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 mr-2 hidden sm:block" />
                <span className="whitespace-nowrap">{date.name}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                {date.media.map((item, index) => (
                  <Card key={index} className="shadow-soft overflow-hidden rounded-lg cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden rounded-t-lg relative">
                        {item.src ? (
                          item.type === "video" ? (
                            <>
                              <video
                                src={item.src}
                                controls={false}
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover bg-black"
                                muted
                              />
                              {/* Play overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="play-overlay bg-black/40 rounded-full p-3">
                                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            <img
                              src={item.src}
                              alt={item.caption}
                              loading="lazy"
                              className="w-full h-full object-cover bg-black"
                            />
                          )
                        ) : (
                          (item.type === "video") ? (
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
                          )
                        )}
                        {/* clickable overlay to open lightbox */}
                        {item.src && (
                          <button
                            aria-label="Open media"
                            onClick={() => setLightbox({ type: item.type, src: item.src, caption: item.caption })}
                            className="absolute inset-0 bg-transparent"
                          />
                        )}
                      </div>
                      <div className="p-3 md:p-4 bg-card">
                        <p className="text-sm md:text-base text-foreground/80 text-center">{item.caption}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Lightbox modal */}
              {lightbox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
                  <div className="absolute inset-0 bg-black/70" onClick={() => setLightbox(null)} />
                  <div className="relative max-w-full w-full sm:w-11/12 md:w-3/4 lg:w-2/3">
                    <div className="bg-black rounded-lg overflow-hidden">
                      {lightbox.type === 'video' ? (
                        <video src={lightbox.src} controls autoPlay playsInline className="w-full h-auto max-h-[80vh] bg-black" />
                      ) : (
                        <img src={lightbox.src} alt={lightbox.caption} className="w-full h-auto max-h-[80vh] object-contain bg-black" />
                      )}
                      {lightbox.caption && <div className="p-3 bg-card text-center text-sm text-foreground/80">{lightbox.caption}</div>}
                      <button aria-label="Close" onClick={() => setLightbox(null)} className="absolute top-3 right-3 p-2 rounded-full bg-white/10">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Instructions */}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
