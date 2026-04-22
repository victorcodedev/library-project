import { api, buildCoverUrl } from "../../services/api";
import type { Book, SearchParams } from "./types";

interface OLDoc {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    subject?: string[];
    edition_count?: number;
    ia?: string[];
}

interface OLSearchResponse {
    numFound: number;
    docs: OLDoc[];
}

const docToBook = (doc: OLDoc): Book => ({
    id: doc.key,
    title: doc.title,
    authors: doc.author_name ?? ["Autor desconhecido"],
    coverUrl: buildCoverUrl(doc.cover_i, "M"),
    subjects: (doc.subject ?? []).slice(0, 8),
    firstPublishYear: doc.first_publish_year,
    editionCount: doc.edition_count,
});

const sortMap: Record<string, string | undefined> = {
    relevance: undefined,
    title: "title",
    year: "new",
    popularity: "readinglog",
    author: undefined,
};

export async function searchBooks(params: SearchParams): Promise<Book[]> {
    const q = params.q?.trim() || "literature";
    const search: Record<string, string | number> = {
        q,
        limit: 24,
        page: params.page ?? 1,
        fields: "key,title,author_name,cover_i,first_publish_year,subject,edition_count",
    };
    if (params.subject) search.subject = params.subject;
    const olSort = sortMap[params.sort ?? "relevance"];
    if (olSort) search.sort = olSort;

    const { data } = await api.get<OLSearchResponse>("/search.json", {
        params: search,
    });

    let books = data.docs.map(docToBook);
    if (params.sort === "author") {
        books = [...books].sort((a, b) =>
            (a.authors[0] ?? "").localeCompare(b.authors[0] ?? ""),
        );
    }
    return books;
}

interface OLWork {
    title: string;
    description?: string | { value: string };
    subjects?: string[];
    covers?: number[];
    first_publish_date?: string;
    authors?: { author: { key: string } }[];
}

interface OLAuthor {
    name: string;
}

export async function getBookDetails(workKey: string): Promise<Book> {
    // workKey looks like "/works/OL12345W"
    const path = workKey.startsWith("/") ? workKey : `/works/${workKey}`;
    const { data } = await api.get<OLWork>(`${path}.json`);

    const description =
        typeof data.description === "string"
            ? data.description
            : data.description?.value;

    const authorKeys = (data.authors ?? []).map((a) => a.author.key);
    const authorNames = await Promise.all(
        authorKeys.slice(0, 3).map(async (key) => {
            try {
                const { data: a } = await api.get<OLAuthor>(`${key}.json`);
                return a.name;
            } catch {
                return null;
            }
        }),
    );

    return {
        id: path,
        title: data.title,
        authors: authorNames.filter((n): n is string => !!n).length
            ? (authorNames.filter((n): n is string => !!n) as string[])
            : ["Autor desconhecido"],
        coverUrl: buildCoverUrl(data.covers?.[0], "L"),
        description: description?.replace(/\(\[source\].*?\)/g, "").trim(),
        subjects: (data.subjects ?? []).slice(0, 12),
        firstPublishYear: data.first_publish_date
            ? parseInt(data.first_publish_date.match(/\d{4}/)?.[0] ?? "0", 10) ||
            undefined
            : undefined,
    };
}
