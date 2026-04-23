import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Book } from "../books/types";

export interface Loan {
    id: string;
    bookId: string;
    title: string;
    author: string;
    coverUrl: string | null;
    borrowedAt: string;
    dueAt: string;
    returnedAt?: string;
    reservedBy?: string[];
}

interface LoansContextValue {
    loans: Loan[];
    history: Loan[];
    isLoaned: (bookId: string) => boolean;
    getLoan: (bookId: string) => Loan | undefined;
    borrow: (book: Book, days?: number) => void;
    giveBack: (bookId: string) => void;
    reserve: (bookId: string, userEmail: string) => void;
}

const LoansContext = createContext<LoansContextValue | null>(null);

export function LoansProvider({ children }: { children: ReactNode }) {
    const [loans, setLoans] = useLocalStorage<Loan[]>("lib.loans", []);
    const [history, setHistory] = useLocalStorage<Loan[]>("lib.loans.history", []);

    const isLoaned = useCallback(
        (bookId: string) => loans.some((l) => l.bookId === bookId && !l.returnedAt),
        [loans],
    );
    const getLoan = useCallback(
        (bookId: string) => loans.find((l) => l.bookId === bookId && !l.returnedAt),
        [loans],
    );

    const borrow = useCallback<LoansContextValue["borrow"]>(
        (book, days = 14) => {
            if (loans.some((l) => l.bookId === book.id && !l.returnedAt)) return;
            const now = new Date();
            const due = new Date(now.getTime() + days * 86400000);
            const newLoan: Loan = {
                id: `${book.id}-${now.getTime()}`,
                bookId: book.id,
                title: book.title,
                author: book.authors[0] ?? "Desconhecido",
                coverUrl: book.coverUrl,
                borrowedAt: now.toISOString(),
                dueAt: due.toISOString(),
                reservedBy: [],
            };
            setLoans((prev) => [newLoan, ...prev]);
        },
        [loans, setLoans],
    );

    const giveBack = useCallback<LoansContextValue["giveBack"]>(
        (bookId) => {
            setLoans((prev) => {
                const target = prev.find((l) => l.bookId === bookId && !l.returnedAt);
                if (target) {
                    setHistory((h) => {
                        const alreadyExists = h.some((l) => l.id === target.id);
                        if (alreadyExists) return h;
                        return [{ ...target, returnedAt: new Date().toISOString() }, ...h];
                    });
                }
                return prev.filter((l) => !(l.bookId === bookId && !l.returnedAt));
            });
        },
        [setLoans, setHistory],
    );

    const reserve = useCallback<LoansContextValue["reserve"]>(
        (bookId, userEmail) => {
            setLoans((prev) =>
                prev.map((l) =>
                    l.bookId === bookId && !l.returnedAt
                        ? {
                            ...l,
                            reservedBy: Array.from(new Set([...(l.reservedBy ?? []), userEmail])),
                        }
                        : l,
                ),
            );
        },
        [setLoans],
    );

    const value = useMemo<LoansContextValue>(
        () => ({ loans, history, isLoaned, getLoan, borrow, giveBack, reserve }),
        [loans, history, isLoaned, getLoan, borrow, giveBack, reserve],
    );

    return <LoansContext.Provider value={value}> {children} </LoansContext.Provider>;
}

export function useLoans() {
    const ctx = useContext(LoansContext);
    if (!ctx) throw new Error("useLoans must be used within LoansProvider");
    return ctx;
}
