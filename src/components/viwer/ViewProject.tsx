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
import getVideoId from 'get-video-id';

export default function ViewProject({project} : {project: Project[]}) {

    return (
        <div className="w-full px-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    PROJECTS
                </h1>
                <div className="grid grid-cols-2 gap-4 mt-8">
                {project.map((project) => {
                    const youtubeVideoId = project.video ? getVideoId(project.video) : null;
                    
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
                                        {youtubeVideoId?.id ? 
                                            <div className="relative pt-[56.25%] w-full overflow-hidden bg-black">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${youtubeVideoId.id}?autoplay=1&rel=0&modestbranding=1`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    title={project.title}
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