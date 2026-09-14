import {signOutAction} from "@/lib/auth-actions";

export function SignOutButton({
    redirectTo = "/login",
    className = "",
} : {
    redirectTo?: string;
    className?: string;
}) {
    const action = signOutAction.bind(null, redirectTo)

    return (
        <form action={action}>
            <button className={
                className ||
                        "flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-4 font-sans" +
                        "text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
            }
                    type="submit">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sair
            </button>
        </form>
    )
}
