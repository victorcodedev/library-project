function BookGridSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            aria-busy="true"
            aria-label="Carregando livros"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col">
                    <div className="aspect-[2/3] w-full animate-pulse rounded-md bg-gray-200" />
                    <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-2.5 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
            ))}
        </div>
    );
}

export default BookGridSkeleton;