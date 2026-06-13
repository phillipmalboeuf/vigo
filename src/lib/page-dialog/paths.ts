export const PAGE_PATHS = ['/about', '/blog', '/gallery'] as const;

export type PagePath = (typeof PAGE_PATHS)[number];

export const PAGE_PATH_SET = new Set<string>(PAGE_PATHS);
