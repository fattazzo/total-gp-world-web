export class Thumbnail {

    source: string;
    width: number;
    height: number;
}

export interface ContentUrl {

    page: string;
}

export class WikipediaPage {

    title: string;
    displaytitle: string;

    content_urls: ContentUrl[];

    thumbnail: Thumbnail;

    extract: string;
}