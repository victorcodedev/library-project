import type { SortOption } from "../../features/books/types";

interface Props {
    subject: string;
    sort: SortOption;
    onSubjectChange: (s: string) => void;
    onSortChange: (s: SortOption) => void;
}

const SUBJECTS = [
    { value: "", label: "Todas as categorias" },
    { value: "fiction", label: "Ficção" },
    { value: "science", label: "Ciência" },
    { value: "history", label: "História" },
    { value: "philosophy", label: "Filosofia" },
    { value: "poetry", label: "Poesia" },
    { value: "biography", label: "Biografia" },
    { value: "technology", label: "Tecnologia" },
    { value: "art", label: "Arte" },
];

const SORTS: { value: SortOption; label: string }[] = [
    { value: "relevance", label: "Relevância" },
    { value: "title", label: "Título" },
    { value: "author", label: "Autor" },
    { value: "year", label: "Mais recentes" },
    { value: "popularity", label: "Popularidade" },
];

function Filters({ subject, sort, onSubjectChange, onSortChange }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
                <label htmlFor="filter-subject" className="text-xs uppercase tracking-wider text-gray-500">
                    Categoria
                </label>
                <select
                    id="filter-subject"
                    value={subject}
                    onChange={(e) => onSubjectChange(e.target.value)}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-[#7b2d26] focus:outline-none focus:ring-2 focus:ring-[#7b2d26]/30"
                >
                    {SUBJECTS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="filter-sort" className="text-xs uppercase tracking-wider text-gray-500">
                    Ordenar
                </label>
                <select
                    id="filter-sort"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-[#7b2d26] focus:outline-none focus:ring-2 focus:ring-[#7b2d26]/30"
                >
                    {SORTS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Filters;