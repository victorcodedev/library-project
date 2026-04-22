import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, BookMarked, Heart } from "lucide-react";

function Header() {
    const navigate = useNavigate();

    const navItem = ({ isActive }: { isActive: boolean }) =>
        `relative inline-flex items-center gap-1.5 px-1 py-1 text-sm font-medium transition hover:text-gray-900 ${isActive ? "text-gray-900" : "text-gray-500"
        }`;

    return (
        <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-[#faf8f5]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">

                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#7b2d26] text-white shadow-sm transition group-hover:rotate-[-4deg]">
                        <BookOpen className="h-4 w-4" aria-hidden />
                    </div>
                    <div className="leading-tight">
                        <p className="font-serif text-lg font-bold tracking-tight text-gray-900">
                            Athenaeum
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 -mt-0.5">
                            Biblioteca Universitária
                        </p>
                    </div>
                </NavLink>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-7" aria-label="Principal">
                    <NavLink to="/" end className={navItem}>
                        Acervo
                    </NavLink>

                    <NavLink to="/loans" className={navItem}>
                        <BookMarked className="h-4 w-4" aria-hidden />
                        Empréstimos
                    </NavLink>

                    <NavLink to="/wishlist" className={navItem}>
                        <Heart className="h-4 w-4" aria-hidden />
                        Wishlist
                    </NavLink>
                </nav>

                {/* Botão */}
                <button
                    onClick={() => navigate("/login")}
                    className="rounded-full bg-[#7b2d26] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#7b2d26]/90"
                >
                    Entrar
                </button>

            </div>

            {/* Nav mobile */}
            <nav className="md:hidden border-t border-gray-200/60 bg-[#faf8f5]/70" aria-label="Mobile">
                <div className="mx-auto flex max-w-7xl items-center justify-around px-4 py-2">
                    <NavLink to="/" end className={navItem}>
                        Acervo
                    </NavLink>
                    <NavLink to="/loans" className={navItem}>
                        <BookMarked className="h-4 w-4" aria-hidden />
                        Empréstimos
                    </NavLink>
                    <NavLink to="/wishlist" className={navItem}>
                        <Heart className="h-4 w-4" aria-hidden />
                        Wishlist
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;