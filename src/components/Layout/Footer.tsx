function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-200/60 bg-[#faf8f5]/70">
            <div className="mx-auto max-w-7xl px-5 py-8 text-xs text-gray-500">

                <p className="font-serif text-sm text-gray-900">
                    Athenaeum · Biblioteca Universitária
                </p>

                <p className="mt-1">
                    Dados fornecidos pela{" "}

                    <a
                        href="https://openlibrary.org"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline hover:text-gray-900 transition"
                    >
                        Open Library
                    </a>{" "}

                    · Construído com React + Vite.
                </p>

            </div>
        </footer>
    );
}

export default Footer;