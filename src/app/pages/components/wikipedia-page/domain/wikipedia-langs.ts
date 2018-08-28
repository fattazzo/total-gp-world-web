export class WikipediaLangs {

    batchcomplete: boolean;
    query: Query;
}

export class Query {

    pages: Page[];
}

export class Page {

    pageid: number;
    ns: number;
    title: string;

    langlinks: WikiLang[];
}

export class WikiLang {

    lang: string;
}