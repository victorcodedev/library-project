import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Book } from "../../features/books/types";

export interface WishlistItem {
    id: string;
    title: string;
    author: string;
    coverUrl: string | null;
    addedAt: string;
}

interface WishlistContextValue {
    items: WishlistItem[];
    has: (id: string) => boolean;
    toggle: (book: Book) => void;
    remove: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useLocalStorage<WishlistItem[]>("lib.wishlist", []);

    const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

    const toggle = useCallback<WishlistContextValue["toggle"]>(
        (book) => {
            setItems((prev) =>
                prev.some((i) => i.id === book.id)
                    ? prev.filter((i) => i.id !== book.id)
                    : [
                        {
                            id: book.id,
                            title: book.title,
                            author: book.authors[0] ?? "Desconhecido",
                            coverUrl: book.coverUrl,
                            addedAt: new Date().toISOString(),
                        },
                        ...prev,
                    ],
            );
        },
        [setItems],
    );

    const remove = useCallback<WishlistContextValue["remove"]>(
        (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
        [setItems],
    );

    const value = useMemo<WishlistContextValue>(
        () => ({ items, has, toggle, remove }),
        [items, has, toggle, remove],
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
}
