import type { TechStack } from "@/types/portfolio";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { FaLaptopCode, FaHtml5, FaCloud } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";


export default function ViewTechStack({ techstack }: { techstack: TechStack }) {

    return (
        <div className="w-full px-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                    Tech Stack
                </h1>
                <Card className="mt-8">
                    <CardContent>
                        {/* Language */}
                        <div className="flex items-center gap-6">
                          <div className="flex items-center min-w-[120px]">
                            <FaLaptopCode size={40} className="mr-2" />
                            <span className="font-semibold">Language</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {techstack.language.length > 0
                              ? techstack.language.map((lang) => (
                                  <span key={lang} className="bg-gray-100 px-2 py-1 rounded text-sm">{lang}</span>
                                ))
                              : <span className="text-gray-400">-</span>
                            }
                          </div>
                        </div>
                        {/* Frontend */}
                        <div className="flex items-center gap-6 mt-6">
                          <div className="flex items-center min-w-[120px]">
                            <FaHtml5 size={41} className="mr-2 pr-1" />
                            <span className="font-semibold">Frontend</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {techstack.frontend.length > 0
                              ? techstack.frontend.map((fe) => (
                                  <span key={fe} className="bg-gray-100 px-2 py-1 rounded text-sm">{fe}</span>
                                ))
                              : <span className="text-gray-400">-</span>
                            }
                          </div>
                        </div>
                        {/* Backend */}
                        <div className="flex items-center gap-6 mt-6">
                          <div className="flex items-center min-w-[120px]">
                            <FaServer size={35} className="mr-3 ml-0.5" />
                            <span className="font-semibold">Backend</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {techstack.backend.length > 0
                              ? techstack.backend.map((be) => (
                                  <span key={be} className="bg-gray-100 px-2 py-1 rounded text-sm">{be}</span>
                                ))
                              : <span className="text-gray-400">-</span>
                            }
                          </div>
                        </div>
                        {/* DevOps */}
                        <div className="flex items-center gap-6 mt-6">
                          <div className="flex items-center min-w-[120px]">
                            <FaCloud size={39} className="mr-2.5" />
                            <span className="font-semibold">DevOps</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {techstack.devops.length > 0
                              ? techstack.devops.map((dev) => (
                                  <span key={dev} className="bg-gray-100 px-2 py-1 rounded text-sm">{dev}</span>
                                ))
                              : <span className="text-gray-400">-</span>
                            }
                          </div>
                        </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      )
      
  }