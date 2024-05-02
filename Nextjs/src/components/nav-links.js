'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Links() {
    const pathname = usePathname()

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
                OTSEDF
            </a>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className={`nav-link ${pathname === '/tutorials' ? 'active' : ''}`} href="/tutorials">
                        Tutorials
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                        href="/add"
                    >
                        Add
                    </Link>
                </li>
            </div>
        </nav>

    )
}