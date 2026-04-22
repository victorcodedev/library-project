import { NavLink } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import type { Book } from "./types";

interface Props {
    book: Book;
}

function BookCard({ book }: Props) {
    const workId = book.id.split("/").pop() ?? book.id;

    return (
        <article className="group relative flex flex-col">

            {/* Capa */}
            <NavLink
                to={`/book/${workId}`}
                aria-label={`Ver detalhes de ${book.title}`}
                className="relative block overflow-hidden rounded-md bg-gray-100 aspect-[2/3] shadow-md transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-0.5deg]"
            >
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={`Capa de ${book.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#7b2d26]/90 to-[#7b2d26] p-4 text-white">
                        <BookOpen className="h-8 w-8 opacity-60" aria-hidden />
                        <p className="font-serif text-center text-sm leading-tight line-clamp-4">
                            {book.title}
                        </p>
                    </div>
                )}

                {/* Badge disponível */}
                <span className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md bg-green-500/90 text-white">
                    Disponível
                </span>
            </NavLink>

            {/* Botão wishlist */}
            <button
                type="button"
                aria-label="Adicionar à wishlist"
                className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-gray-700 shadow-md backdrop-blur transition hover:scale-110"
            >
                <Heart className="h-4 w-4" aria-hidden />
            </button>

            {/* Informações */}
            <div className="mt-3 px-0.5">
                <h3 className="font-serif text-base font-semibold leading-snug line-clamp-2">
                    {book.title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                    {book.authors.join(", ")}
                </p>
                {book.firstPublishYear && (
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-gray-400">
                        {book.firstPublishYear}
                    </p>
                )}
            </div>

        </article>
    );
}

export default BookCard;