import { useEffect, useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { sanitizeText } from "../../utils/sanitize";

interface Props {
    initial?: string;
    onSearch: (q: string) => void;
}

function SearchBar({ initial = "", onSearch }: Props) {
    const [value, setValue] = useState(initial);

    useEffect(() => {
        setValue(initial);
    }, [initial]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(sanitizeText(value, 120));
    };

    return (
        <form onSubmit={submit} role="search" className="relative flex w-full items-center">
            <label htmlFor="book-search" className="sr-only">
                Buscar livros por título, autor ou palavra-chave
            </label>
            <Search
                className="pointer-events-none absolute left-4 h-4 w-4 text-gray-400"
                aria-hidden
            />
            <input
                id="book-search"
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Busque por título, autor, palavra-chave…"
                maxLength={120}
                className="w-full rounded-full border border-gray-200 bg-white/80 py-3 pl-11 pr-28 text-sm shadow-sm backdrop-blur placeholder:text-gray-400 focus:border-[#7b2d26] focus:outline-none focus:ring-2 focus:ring-[#7b2d26]/30"
            />
            <button
                type="submit"
                className="absolute right-1.5 rounded-full bg-[#7b2d26] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#7b2d26]/90"
            >
                Buscar
            </button>
        </form>
    );
}

export default SearchBar;