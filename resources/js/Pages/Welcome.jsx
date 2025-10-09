import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="  bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div>
                    <div>
                        <header>
                            <nav>
                                {auth.user ? (
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route("login")}>
                                            Log in
                                        </Link>
                                        <Link href={route("register")}>
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                    </div>
                </div>
            </div>
        </>
    );
}
