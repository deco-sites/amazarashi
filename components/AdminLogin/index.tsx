import { Secret } from "apps/website/loaders/secret.ts";
import { AppContext } from "site/apps/site.ts";
import { sessions } from "site/db/schema.ts";

interface LoginProps {
    username: string;
    password: Secret;
}

interface AdminLoginProps {
    /** @hide true */
    typedUsername: string | null;
    /** @hide true */
    error: string | null;
}

export async function action(
    props: LoginProps,
    req: Request,
    ctx: AppContext,
): Promise<AdminLoginProps> {
    const { username: correctUsername, password: passwordSecret } = props;
    const correctPassword = passwordSecret.get();
    const formData = await req.formData();
    const typedUsername = formData.get("username")?.toString();
    const typedPassword = formData.get("password")?.toString();
    console.log({
        typedUsername,
        typedPassword,
        correctUsername,
        correctPassword,
    });
    if (
        typedUsername !== correctUsername || typedPassword !== correctPassword
    ) {
        return {
            error: "Nome de usuário ou senha incorretos",
            typedUsername: typedUsername ?? null,
        };
    }

    const drizzle = await ctx.invoke.records.loaders.drizzle();
    const sessionToken = globalThis.crypto.randomUUID();
    await drizzle.insert(sessions).values({
        id: sessionToken,
        token: sessionToken,
        expiration: Date.now() + 1000 * 60 * 60 * 24,
    });

    ctx.response.headers.set(
        "Set-Cookie",
        `session=${sessionToken} ; path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=86400`,
    );

    ctx.response.headers.set("Location", "/admin");
    ctx.response.status = 302;

    return {
        error: null,
        typedUsername: null,
    };
}

/**@title Admin Login */
export default function AdminLogin(props: AdminLoginProps) {
    return (
        <div className="py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36">
            <h1>Login</h1>
            <form className="flex flex-col gap-4 mt-5" method="post">
                <div>
                    <div className="label">
                        <label htmlFor="username" className="label-text">
                            Nome de Usuário:
                        </label>
                    </div>
                    <input
                        value={props.typedUsername ?? ""}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Insira seu nome de usuário"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div>
                    <div className="label">
                        <label htmlFor="password" className="text-label">
                            Senha:
                        </label>
                    </div>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Insira sua senha"
                        class="input input-bordered w-full max-w-xs"
                    />
                </div>

                <button
                    type="submit"
                    class="btn btn-primary w-full max-w-xs mt-2"
                >
                    Entrar
                </button>
            </form>
            {props.error && (
                <div className="text-red-500 mt-4">{props.error}</div>
            )}
        </div>
    );
}
