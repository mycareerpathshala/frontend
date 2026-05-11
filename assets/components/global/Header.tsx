'use client';

// imports
import Logo from './Logo';
import Navigation from './Navigation';
import MobileNav from './MobileNav';
import AuthPopUp from './AuthPopUp';

export default function Header() {
    return (
        <header className="sticky top-0 z-100 bg-white py-3.5 shadow-lg">
            <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4">
                <Logo />

                {/* Desktop navigation */}
                <div className="w-full max-[1150px]:hidden">
                    <Navigation />
                </div>

                {/* Mobile hamburger */}
                <div className="min-[1150px]:hidden">
                    <MobileNav />
                </div>

                <AuthPopUp />
            </div>
        </header>
    );
}
