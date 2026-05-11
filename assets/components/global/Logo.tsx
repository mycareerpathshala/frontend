'use client';

// imports
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link
            href="/"
            className="relative h-11 w-56 transition-transform active:scale-95 max-[1150px]:h-10 max-[1150px]:w-48"
        >
            <Image
                src="/img/mcp_logo.svg"
                alt="My Career Pathshala Logo"
                fill
                className="inset-0 h-full w-full object-contain"
            />
        </Link>
    );
}
