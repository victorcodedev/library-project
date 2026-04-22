import { useEffect, useRef, useState } from "react";
import { searchBooks } from "../features/books/bookService";
import type { Book, SearchParams } from "../features/books/types";

export function useBooks(params: SearchParams) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const reqId = useRef(0);

    useEffect(() => {
        const id = ++reqId.current;
        setLoading(true);
        setError(null);

        searchBooks(params)
            .then((res) => {
                if (id === reqId.current) setBooks(res);
            })
            .catch((e: unknown) => {
                if (id === reqId.current) {
                    const msg = e instanceof Error ? e.message : "Erro ao buscar livros";
                    setError(msg);
                }
            })
            .finally(() => {
                if (id === reqId.current) setLoading(false);
            });
    }, [params.q, params.subject, params.sort, params.page]);

    return { books, loading, error };
}