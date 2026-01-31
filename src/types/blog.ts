export interface BlogTable {
    title?: string;
    headers?: string[];
    columns?: string[];
    rows: string[][];
}

export interface BlogSubsection {
    title: string;
    content: string[];
    comparisonTable?: BlogTable;
}

export interface BlogSection {
    id: string;
    title: string;
    content?: string[];
    image?: string;
    subsections?: BlogSubsection[];
    statisticsTable?: BlogTable;
    toolsTable?: BlogTable;
    sdlcTable?: BlogTable;
    sentimentTable?: BlogTable;
    riskTable?: BlogTable;
}

// New flexible content block types for Web3-style blogs
export interface ContentBlockHeading {
    type: "heading";
    level: number;
    text: string;
}

export interface ContentBlockParagraph {
    type: "paragraph";
    text: string;
}

export interface ContentBlockTable {
    type: "table";
    title?: string;
    columns: string[];
    rows: string[][];
}

export interface ContentBlockList {
    type: "list";
    style: "numbered" | "bulleted";
    items: string[];
}

export interface ContentBlockImage {
    type: "image";
    src: string;
    alt?: string;
    caption?: string;
}

export type ContentBlock =
    | ContentBlockHeading
    | ContentBlockParagraph
    | ContentBlockTable
    | ContentBlockList
    | ContentBlockImage;

// Original structured blog meta
export interface BlogMeta {
    title: string;
    subtitle?: string;
    author?: string | null;
    publishedYear?: number;
    category?: string;
    tags?: string[];
    thumbnail?: string;
    type?: string;
    language?: string;
    format?: string;
    preservation?: string;
}

// Original structured blog format
export interface StructuredBlogPost {
    slug: string;
    meta: BlogMeta;
    introduction?: {
        summary: string;
        keyThemes: string[];
    };
    sections?: BlogSection[];
    conclusion?: {
        title: string;
        content: string[];
    };
    references?: {
        title: string;
        source: string;
        url: string;
    }[];
}

// New flexible content-based blog format
export interface FlexibleBlogPost {
    slug: string;
    meta: BlogMeta;
    content: ContentBlock[];
}

// Union type for both formats
export type BlogPost = StructuredBlogPost | FlexibleBlogPost;

// Type guard to check which format is being used
export function isFlexibleBlog(blog: BlogPost): blog is FlexibleBlogPost {
    return 'content' in blog && Array.isArray(blog.content);
}

export function isStructuredBlog(blog: BlogPost): blog is StructuredBlogPost {
    return 'sections' in blog || 'introduction' in blog;
}
