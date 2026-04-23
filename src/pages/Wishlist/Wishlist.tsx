import { NavLink } from "react-router-dom";
import { Heart, X, ArrowRight, BookOpen } from "lucide-react";
import { useWishlist } from "../../features/wishlist/WishlistContext";

function Wishlist() {
    const { items, remove } = useWishlist();

    return (
        <div className="mx-auto max-w-5xl px-5 py-12">
            <header className="mb-10 flex items-center gap-3">
                <Heart className="h-7 w-7 text-[#7b2d26]" aria-hidden />
                <div>
                    <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                        Sua wishlist
                    </h1>
                    <p className="mt-1 text-gray-500">
                        {items.length}{" "}
                        {items.length === 1 ? "livro guardado" : "livros guardados"} para depois.
                    </p>
                </div>
            </header>

            {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-200 bg-white/50 p-10 text-center">
                    <p className="text-gray-500">Sua wishlist está vazia.</p>
                    <NavLink
                        to="/"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7b2d26] hover:underline"
                    >
                        Explorar acervo <ArrowRight className="h-4 w-4" aria-hidden />
                    </NavLink>
                </div>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                    {items.map((i) => {
                        const workId = i.id.split("/").pop();

                        return (
                            <li
                                key={i.id}
                                className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-md"
                            >
                                <NavLink to={`/book/${workId}`} className="flex-shrink-0">
                                    {i.coverUrl ? (
                                        <img
                                            src={i.coverUrl}
                                            alt=""
                                            className="h-24 w-16 rounded object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-16 items-center justify-center rounded bg-[#7b2d26] text-white">
                                            <BookOpen className="h-5 w-5" aria-hidden />
                                        </div>
                                    )}
                                </NavLink>

                                <div className="flex-1 min-w-0">
                                    <NavLink
                                        to={`/book/${workId}`}
                                        className="font-serif text-base font-semibold leading-tight hover:underline line-clamp-2"
                                    >
                                        {i.title}
                                    </NavLink>
                                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                                        {i.author}
                                    </p>
                                    <p className="mt-1 text-[11px] uppercase tracking-wider text-gray-400">
                                        Adicionado em{" "}
                                        {new Date(i.addedAt).toLocaleDateString("pt-BR")}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => remove(i.id)}
                                    aria-label={`Remover ${i.title} da wishlist`}
                                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                                >
                                    <X className="h-4 w-4" aria-hidden />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;