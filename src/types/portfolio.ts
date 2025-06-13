export interface Description {
    title: string
    detail: string
}

export interface UserInfo {
    name: string
    birthdate?: string
    email?: string
    phone?: string
    education?: string
    githubUsername?: string
    photo?: string
}

export interface TechStack {
    language: string[]
    frontend: string[]
    backend: string[]
    devops: string[]
}

export interface RelatedLink {
    name: string
    url: string
    description: string
}

export interface Project {
    title: string
    date: string
    description: string
    url?: string
    techStack?: string[]
    video?: string
}

export interface PortfolioData {
    id: string
    password: string
    description: Description
    userInfo: UserInfo
    techStack?: TechStack
    relatedLinks?: RelatedLink[]
    projects?: Project[]
}
