export interface GithubProjects {
  author: Author;
  projects: Project[];
}

export interface Author {
  name: string;
  email: string;
  github: string;
  facebook: string;
  twitter: null;
  googleplus: string;
  linkedin: string;
  website: null;
}

export interface Project {
  id: string;
  icon: string;
  playStoreUrl: null | string;
  githubUrl: string;
  wikiUrl: string;
  appleStoreUrl: null;
  websiteUrl: null | string;
  image?: string;
  i18n: I18N[];
}

export interface I18N {
  lang: string;
  title: string;
  description: string;
}
