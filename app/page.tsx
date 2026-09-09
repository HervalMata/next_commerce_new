import Image from "next/image";
import {auth} from "@/auth";
import {homePathForRole, loginPathForArea} from "@/lib/roles";
import Link from "next/link";
import {SignOutButton} from "@/components/auth/SignOutButton";

export default async function Home() {
  const session = await auth()
  const dest = session?.user ? homePathForRole(session.user.role, session.user.vendorStatus) : null


  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <header className="border-b border-line-soft bg-surface">
        <div className="mx-auto flex h-20 max-w-310 items-center px-8">
          <span className="font-display text-[27px] font-extrabold tracking-[-0.02em] text-ink">
            Cris <span className="text-iris-500">Laços</span>
          </span>
          <div className="ml-auto flex items-center gap-3">
            {session?.user ? (
                <>
                  <Link
                      className="flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-5 font-sans
                                    text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
                      href={dest!}>
                      Ir Para o Dashboard
                  </Link>
                  <SignOutButton redirectTo={loginPathForArea(dest ?? "/login")} />
                </>
            ) : (
                <>
                  <Link
                      className="flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-5 font-sans
                                    text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
                      href="/login">
                    Entrar
                  </Link>
                  <Link
                      className="flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-5 font-sans
                                    text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
                      href="/register">
                    Cadastrar
                  </Link>
                </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-310 flex-1 flex-col items-center justify-center py-20 px-8 text-center">
        <span className="mb-5 rounded-full bg-pink-50 px-4 py-1.5 font-sans text-[12px] font-semibold uppercase
                        tracking-[0.86em] text-pink-700">
          Cris Laços Acessórios
        </span>
        <h1 className="max-w-180 font-display text-[46px] font-extrabold leading-[1.05] tracking-[-0.02em] text-link">
          Uma Loja para te deixar ainda{" "}
          <span className="text-pink-500">mais bonita</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
              className="flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-5 font-sans
                                    text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
              href="/register">
            Cadastrar
          </Link>
          <Link
              className="flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-5 font-sans
                                    text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
              href="/vendor/register">
            Seja um Colaborador Nosso
          </Link>
        </div>
        <p className="mt-6 font-sans text-[13px] text-muted-soft">
          Administrador{" "}
          <Link
              href="/admin/login"
              className="font-semibold text-pink-500 hover:text-pink-600"
          >
            Admin Login
          </Link>
        </p>
      </main>
    </div>
  );
}
