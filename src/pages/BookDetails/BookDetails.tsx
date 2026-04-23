import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Heart, BookmarkCheck, Clock } from "lucide-react";
import { getBookDetails } from "../../features/books/bookService";
import { useLoans } from "../../features/loans/LoansContext";
import { useWishlist } from "../../features/wishlist/WishlistContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Book, ReadingStatus } from "../../features/books/types";

function BookDetails() {
    const { workId } = useParams<{ workId: string }>();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { isLoaned, getLoan, borrow, giveBack, reserve } = useLoans();
    const { has, toggle } = useWishlist();
    const [readingMap, setReadingMap] = useLocalStorage<Record<string, ReadingStatus>>(
        "lib.reading.status",
        {}
    );

    useEffect(() => {
        if (!workId) return;
        setLoading(true);
        setError(null);
        getBookDetails(`/works/${workId}`)
            .then(setBook)
            .catch((e: unknown) =>
                setError(e instanceof Error ? e.message : "Erro ao carregar")
            )
            .finally(() => setLoading(false));
    }, [workId]);

    const fullId = `/works/${workId}`;
    const loaned = isLoaned(fullId);
    const loan = getLoan(fullId);
    const wished = has(fullId);
    const status: ReadingStatus = readingMap[fullId] ?? "none";

    const setStatus = (s: ReadingStatus) =>
        setReadingMap((m) => ({ ...m, [fullId]: s }));

    const dueDate = loan ? new Date(loan.dueAt).toLocaleDateString("pt-BR") : null;

    // Loading
    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-5 py-12">
                <div className="grid gap-10 md:grid-cols-[260px_1fr]">
                    <div className="aspect-[2/3] w-full animate-pulse rounded-md bg-gray-200" />
                    <div className="space-y-4">
                        <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                        <div className="h-32 w-full animate-pulse rounded bg-gray-200" />
                    </div>
                </div>
            </div>
        );
    }

    // Erro
    if (error || !book) {
        return (
            <div className="mx-auto max-w-2xl px-5 py-20 text-center">
                <p className="font-serif text-2xl text-gray-900">Livro não encontrado</p>
                <p className="mt-2 text-sm text-gray-500">{error}</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 rounded-full bg-[#7b2d26] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#7b2d26]/90"
                >
                    Voltar ao acervo
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">

            {/* Voltar */}
            <NavLink
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition"
            >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Voltar ao acervo
            </NavLink>

            <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">

                {/* Coluna esquerda — capa + ações */}
                <div>
                    <div className="overflow-hidden rounded-md shadow-md aspect-[2/3] bg-gray-100">
                        {book.coverUrl ? (
                            <img
                                src={book.coverUrl}
                                alt={`Capa de ${book.title}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#7b2d26]/90 to-[#7b2d26] p-6 text-center font-serif text-white">
                                {book.title}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 space-y-2">
                        {loaned ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => giveBack(fullId)}
                                    className="w-full rounded-full bg-[#7b2d26] py-3 text-sm font-semibold text-white transition hover:bg-[#7b2d26]/90"
                                >
                                    Devolver livro
                                </button>
                                <button
                                    type="button"
                                    onClick={() => reserve(fullId, "usuario@email.com")}
                                    className="w-full rounded-full border border-gray-200 bg-white py-3 text-sm font-medium transition hover:bg-gray-50"
                                >
                                    Reservar para depois
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => borrow(book)}
                                className="w-full rounded-full bg-[#7b2d26] py-3 text-sm font-semibold text-white transition hover:bg-[#7b2d26]/90"
                            >
                                Emprestar por 14 dias
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => toggle(book)}
                            aria-pressed={wished}
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-sm font-medium transition hover:bg-gray-50"
                        >
                            <Heart
                                className={`h-4 w-4 transition ${wished ? "fill-[#7b2d26] text-[#7b2d26]" : ""}`}
                                aria-hidden
                            />
                            {wished ? "Na sua wishlist" : "Adicionar à wishlist"}
                        </button>
                    </div>
                </div>

                {/* Coluna direita — informações */}
                <div>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        loaned
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                    }`}>
                        {loaned ? "Emprestado" : "Disponível"}
                    </span>

                    <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                        {book.title}
                    </h1>

                    <p className="mt-2 text-lg text-gray-500">
                        por <span className="text-gray-900">{book.authors.join(", ")}</span>
                        {book.firstPublishYear && ` · ${book.firstPublishYear}`}
                    </p>

                    {loaned && dueDate && (
                        <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                            <Calendar className="h-4 w-4 text-[#7b2d26]" aria-hidden />
                            Devolução até <span className="font-semibold">{dueDate}</span>
                        </div>
                    )}

                    {book.description && (
                        <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-gray-700">
                            {book.description}
                        </p>
                    )}

                    {book.subjects.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                                Temas
                            </h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {book.subjects.map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Status de leitura */}
                    <div className="mt-10">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                            Status de leitura
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Status de leitura">
                            {[
                                { v: "none" as const, label: "Nenhum", icon: null },
                                { v: "reading" as const, label: "Lendo", icon: BookOpen },
                                { v: "completed" as const, label: "Concluído", icon: BookmarkCheck },
                                { v: "wishlist" as const, label: "Quero ler", icon: Clock },
                            ].map(({ v, label, icon: Icon }) => (
                                <button
                                    key={v}
                                    role="radio"
                                    aria-checked={status === v}
                                    onClick={() => setStatus(v)}
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition ${
                                        status === v
                                            ? "border-[#7b2d26] bg-[#7b2d26] text-white"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;