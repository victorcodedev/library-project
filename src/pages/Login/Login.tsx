import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../../features/auth/AuthContext";
import { isValidEmail, sanitizeText } from "../../utils/sanitize";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setErr(null);

        const safeName = sanitizeText(name, 80);
        const safeEmail = sanitizeText(email, 120).toLowerCase();

        if (!isValidEmail(safeEmail)) {
            setErr("Informe um email válido.");
            return;
        }
        if (password.length < 4) {
            setErr("A senha precisa ter ao menos 4 caracteres.");
            return;
        }

        setSubmitting(true);
        try {
            await login(safeEmail, password, safeName);
            navigate("/");
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "Erro ao entrar");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12">

            {/* Ícone */}
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#7b2d26] text-white">
                <BookOpen className="h-5 w-5" aria-hidden />
            </div>

            <h1 className="text-center font-serif text-4xl font-semibold tracking-tight">
                Bem-vindo de volta
            </h1>
            <p className="mt-2 text-center text-sm text-gray-500">
                Entre para emprestar livros e organizar sua leitura.
            </p>

            <form
                onSubmit={submit}
                noValidate
                className="mt-8 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                {/* Nome */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                        Nome (opcional)
                    </label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={80}
                        className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#7b2d26] focus:outline-none focus:ring-2 focus:ring-[#7b2d26]/30"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={120}
                        className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#7b2d26] focus:outline-none focus:ring-2 focus:ring-[#7b2d26]/30"
                    />
                </div>

                {/* Senha */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={4}
                        maxLength={120}
                        className="mt-1.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#7b2d26] focus:outline-none focus:ring-2 focus:ring-[#7b2d26]/30"
                    />
                </div>

                {/* Erro */}
                {err && (
                    <p role="alert" className="text-sm text-red-600">
                        {err}
                    </p>
                )}

                {/* Botão */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[#7b2d26] py-3 text-sm font-semibold text-white transition hover:bg-[#7b2d26]/90 disabled:opacity-50"
                >
                    {submitting ? "Entrando…" : "Entrar"}
                </button>

                <p className="text-center text-[11px] text-gray-400">
                    Autenticação local para fins de demonstração — nenhum dado é enviado a um servidor.
                </p>
            </form>
        </div>
    );
}

export default Login;