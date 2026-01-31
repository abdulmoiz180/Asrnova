export interface CaseStudyOverview {
    description: string;
    status: string;
    platforms: string[];
    role: string;
}

export interface CaseStudyProblem {
    summary: string;
    problems: string[];
}

export interface CaseStudySolution {
    description: string;
    coreConcepts: string[];
}

export interface CaseStudyFeature {
    title: string;
    details: string[];
}

export interface CaseStudyTechStack {
    frontend: string[];
    backend: string[];
    services: string[];
}

export interface CaseStudyArchitecture {
    multiTenancy: string;
    dataModel: string[];
    realtime: string;
}

export interface CaseStudyOutcome {
    status: string;
    roadmap: string[];
}

export interface CaseStudy {
    slug: string;
    title: string;
    overview: CaseStudyOverview;
    problemStatement: CaseStudyProblem;
    responsibilities: string[];
    solution: CaseStudySolution;
    features: CaseStudyFeature[];
    techStack: CaseStudyTechStack;
    architecture: CaseStudyArchitecture;
    challenges: string[];
    outcome: CaseStudyOutcome;
    impact: string[];
}
