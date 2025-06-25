import type { Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import getVideoId from "get-video-id";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ViewProject({ project }: { project: Project[] }) {
  const ensureAbsoluteUrl = (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <section className="w-full px-4 py-14 bg-white" data-aos="fade-up" data-aos-delay="100">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold">PROJECTS</h2>
        <p className="text-gray-500 text-sm mt-2">제가 참여한 주요 프로젝트들입니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {project.map((project) => {
          const youtubeVideoId = project.video ? getVideoId(project.video) : null;

          return (
            <Card
              key={project.title}
              className="rounded-xl shadow hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{project.date}</p>
                <p className="text-gray-700 text-sm mb-4">{project.description}</p>
                {project.url && (
                  <a
                    href={ensureAbsoluteUrl(project.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 text-sm hover:underline"
                  >
                    {project.url}
                    <FaExternalLinkAlt size={11} />
                  </a>
                )}
              </div>

              {project.video && (
                <div className="mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        시연 영상 보기
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                      </DialogHeader>
                      {youtubeVideoId?.id ? (
                        <div className="relative pt-[56.25%] w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideoId.id}?autoplay=1&rel=0&modestbranding=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title={project.title}
                            className="absolute top-0 left-0 w-full h-full"
                          ></iframe>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">
                          비디오를 불러올 수 없습니다.
                        </p>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
