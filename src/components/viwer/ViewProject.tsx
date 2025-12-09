import { useState } from "react";
import type { Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getVideoId from "get-video-id";
import { FaExternalLinkAlt, FaPlay } from "react-icons/fa";
import { toast } from "sonner";

export default function ViewProject({ project }: { project: Project[] }) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");

  const ensureAbsoluteUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
      return url;
    }
    return `https://${url}`;
  };

  const handleWatchDemo = (videoUrl: string | undefined, title: string) => {
    if (!videoUrl) {
      toast.error("비디오 링크가 없습니다.");
      return;
    }

    const videoId = getVideoId(videoUrl);

    if (!videoId.id) {
      toast.error("유효하지 않은 유튜브 링크입니다.");
      return;
    }

    if (videoId.service !== "youtube") {
        toast.error("유튜브 링크만 지원합니다.");
        return;
    }

    setSelectedVideoId(videoId.id);
    setSelectedProjectTitle(title);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto" data-aos="fade-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">PROJECTS</h2>
        <p className="text-gray-500 mt-3 text-lg">주요 프로젝트 경험입니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.map((p, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="p-6 sm:p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {p.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 mt-1">{p.date}</p>
                    </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow whitespace-pre-line text-sm sm:text-base">
                    {p.description}
                </p>

                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-100">
                    {p.url && (
                    <Button variant="outline" size="sm" asChild className="gap-2 rounded-full h-8 text-xs sm:text-sm">
                        <a href={ensureAbsoluteUrl(p.url)} target="_blank" rel="noopener noreferrer">
                            <FaExternalLinkAlt size={12} />
                            Visit Site
                        </a>
                    </Button>
                    )}
                    
                    {p.video && (
                        <Button 
                            size="sm" 
                            className="gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white border-none h-8 text-xs sm:text-sm"
                            onClick={() => handleWatchDemo(p.video, p.title)}
                        >
                            <FaPlay size={10} /> Watch Demo
                        </Button>
                    )}
                </div>
              </div>
            </Card>
          ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black border-none">
            <DialogHeader className="sr-only">
                <DialogTitle>{selectedProjectTitle}</DialogTitle>
                <DialogDescription>Project Demo Video</DialogDescription>
            </DialogHeader>
            {selectedVideoId && (
                <div className="relative pt-[56.25%] w-full bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    />
                </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}