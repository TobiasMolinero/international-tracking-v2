import Link from "next/link";

export default function Header() {
    return(
        <header className="px-4 py-4 sm:px-6 lg:px-8 bg-slate-200">
            <nav>
                <ul className="flex gap-x-4">
                    <li className="font-semibold"><Link href='/admin'>Administrar envios</Link></li>
                    <li className="font-semibold"><Link href='/admin/usuarios'>Administrar usuarios</Link></li>
                </ul>
            </nav>
        </header>
    )
}