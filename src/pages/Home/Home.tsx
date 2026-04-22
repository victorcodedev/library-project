import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import BookCard from "../../features/books/BookCard";
import BookGridSkeleton from "../../features/books/BookGridSkeleton";
import { useBooks } from "../../hooks/useBooks";
import type { SortOption } from "../../features/books/types";

function Home() {
    const [q, setQ] = useState("");
    const [subject, setSubject] = useState("");
    const [sort, setSort] = useState<SortOption>("relevance");

    const params = useMemo(
        () => ({ q, subject: subject || undefined, sort }),
        [q, subject, sort]
    );

    const { books, loading, error } = useBooks(params);

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-gray-200/60">
                <div className="absolute inset-0 -z-10 opacity-60">
                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#7b2d26]/10 blur-3xl" />
                    <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 backdrop-blur">
                            <Sparkles className="h-3 w-3 text-amber-500" aria-hidden />
                            Acervo digital
                        </span>

                        <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                            Cada livro é uma{" "}
                            <span className="italic text-[#7b2d26]">porta</span> aberta para outro tempo.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base text-gray-500 md:text-lg">
                            Pesquise, empreste e organize sua leitura num acervo construído sobre a{" "}
                            <span className="font-medium text-gray-900">Open Library</span> — milhões de
                            títulos ao alcance de uma busca.
                        </p>

                        <div className="mt-8 max-w-2xl">
                            <SearchBar initial={q} onSearch={setQ} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Catálogo */}
            <section className="mx-auto max-w-7xl px-5 py-12">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="font-serif text-3xl font-semibold tracking-tight">
                            Resultados para <span className="italic">"{q}"</span>
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {loading ? "Buscando..." : `${books.length} títulos encontrados`}
                        </p>
                    </div>
                    <Filters
                        subject={subject}
                        sort={sort}
                        onSubjectChange={setSubject}
                        onSortChange={setSort}
                    />
                </div>

                {error && (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        Não foi possível carregar os livros: {error}
                    </div>
                )}

                {loading ? (
                    <BookGridSkeleton />
                ) : books.length === 0 ? (
                    <p className="py-16 text-center text-gray-500">
                        Nenhum livro encontrado. Tente outra busca.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

export default Home;