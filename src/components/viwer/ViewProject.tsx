import type { Project } from "@/types/portfolio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ViewProject({project} : {project: Project[]}) {

    function getYoutubeVideoId(url: string | undefined): string | null {
        if (!url) return null;

        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|)([a-zA-Z0-9_-]{11})(?:\S+)?|https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11}))/;
        const match = url.match(regex);

        if (match) {
            return match[1] || match[2] || null;
        }

        if (url.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url;
        }

        return null;
    }

    return (
        <div className="w-full px-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    PROJECTS
                </h1>
                <div className="grid grid-cols-2 gap-4 mt-8">
                {project.map((project) => {
                    const youtubeVideoId = getYoutubeVideoId(project.video);
                    
                    return (
                    
                        <Card key={project.title}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    {project.description}
                                </p>
                                <blockquote className="mt-6 border-l-2 pl-3 italic text-xs mb-5">
                                    <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
                                </blockquote>
                                <Dialog>
                                <DialogTrigger asChild><Button size="sm" variant="outline">시연 영상</Button></DialogTrigger>
                                <DialogContent className="sm:max-w-[1600px] w-full max-h-[100vh] overflow-auto">
                                    <DialogHeader>
                                        <DialogTitle>{project.title}</DialogTitle>
                                        <DialogDescription></DialogDescription>
                                    </DialogHeader>
                                    {youtubeVideoId ? 
                                        <div className="relative pt-[56.25%] w-full overflow-hidden bg-black">
                                            <iframe
                                                // YouTube 임베드 URL을 구성합니다.
                                                // ?autoplay=1: 자동 재생 (모바일에서는 제한될 수 있음)
                                                // &rel=0: 관련 동영상 표시 안함 (깔끔한 UI)
                                                // &modestbranding=1: YouTube 로고를 최소화
                                                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                                                frameBorder="0" // 테두리 없음
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen // 전체 화면 허용
                                                title={project.title} // 접근성을 위한 iframe 제목
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            ></iframe>
                                        </div> :
                                        <p className="text-center text-muted-foreground">비디오를 불러올 수 없습니다.</p>
                                    }
                                </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                )})}
                </div>
            </div>
        </div>
    )
}