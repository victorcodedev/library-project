import { NavLink } from "react-router-dom";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { useLoans } from "../../features/loans/LoansContext";

function EmptyState({ text, cta }: { text: string; cta: string }) {
    return (
        <div className="mt-5 rounded-lg border border-dashed border-gray-200 bg-white/50 p-10 text-center">
            <p className="text-gray-500">{text}</p>
            <NavLink
                to="/"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7b2d26] hover:underline"
            >
                {cta} <ArrowRight className="h-4 w-4" aria-hidden />
            </NavLink>
        </div>
    );
}

function Loans() {
    const { loans, history, giveBack } = useLoans();

    return (
        <div className="mx-auto max-w-5xl px-5 py-12">
            <header className="mb-10">
                <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                    Seus empréstimos
                </h1>
                <p className="mt-2 text-gray-500">
                    Gerencie devoluções e revisite o histórico de leitura.
                </p>
            </header>

            {/* Empréstimos ativos */}
            <section aria-labelledby="active-loans">
                <h2
                    id="active-loans"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500"
                >
                    Ativos · {loans.length}
                </h2>

                {loans.length === 0 ? (
                    <EmptyState
                        text="Você não tem empréstimos no momento."
                        cta="Explorar acervo"
                    />
                ) : (
                    <ul className="mt-5 space-y-3">
                        {loans.map((l) => {
                            const due = new Date(l.dueAt);
                            const overdue = due.getTime() < Date.now();
                            const workId = l.bookId.split("/").pop();

                            return (
                                <li
                                    key={l.id}
                                    className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3 sm:p-4"
                                >
                                    <NavLink to={`/book/${workId}`} className="flex-shrink-0">
                                        {l.coverUrl ? (
                                            <img
                                                src={l.coverUrl}
                                                alt=""
                                                className="h-20 w-14 rounded object-cover shadow-md"
                                            />
                                        ) : (
                                            <div className="flex h-20 w-14 items-center justify-center rounded bg-[#7b2d26] text-white">
                                                <BookOpen className="h-5 w-5" aria-hidden />
                                            </div>
                                        )}
                                    </NavLink>

                                    <div className="flex-1 min-w-0">
                                        <NavLink
                                            to={`/book/${workId}`}
                                            className="font-serif text-lg font-semibold leading-tight hover:underline line-clamp-1"
                                        >
                                            {l.title}
                                        </NavLink>
                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {l.author}
                                        </p>
                                        <p className={`mt-1 inline-flex items-center gap-1 text-xs ${
                                            overdue ? "text-red-600 font-medium" : "text-gray-500"
                                        }`}>
                                            <Calendar className="h-3 w-3" aria-hidden />
                                            {overdue ? "Atrasado · " : "Devolução: "}
                                            {due.toLocaleDateString("pt-BR")}
                                        </p>
                                        {l.reservedBy && l.reservedBy.length > 0 && (
                                            <p className="mt-1 text-[11px] text-amber-600">
                                                {l.reservedBy.length} reserva(s)
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => giveBack(l.bookId)}
                                        className="rounded-full bg-[#7b2d26] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#7b2d26]/90"
                                    >
                                        Devolver
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>

            {/* Histórico */}
            <section aria-labelledby="history" className="mt-14">
                <h2
                    id="history"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500"
                >
                    Histórico · {history.length}
                </h2>

                {history.length === 0 ? (
                    <p className="mt-4 text-sm text-gray-500">
                        Nenhum livro devolvido ainda.
                    </p>
                ) : (
                    <ul className="mt-5 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                        {history.slice(0, 20).map((l) => (
                            <li
                                key={l.id}
                                className="flex items-center justify-between gap-4 p-3 sm:p-4"
                            >
                                <div className="min-w-0">
                                    <p className="font-serif font-semibold line-clamp-1">
                                        {l.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Devolvido em{" "}
                                        {l.returnedAt &&
                                            new Date(l.returnedAt).toLocaleDateString("pt-BR")}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default Loans;