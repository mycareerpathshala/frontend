/* eslint-disable @next/next/no-img-element */
'use client';

// imports
import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSolidUserCircle } from 'react-icons/bi';
import { HiPhone } from 'react-icons/hi2';
import SearchButton from './SearchButton';

// local components
function AuthUserMenuItem({ avatar, name }: { avatar: string; name: string }) {
    const { authPopupEnabled, setAuthPopupEnabled } = useAppContext();

    return (
        <button
            type="button"
            onClick={() => setAuthPopupEnabled(!authPopupEnabled)}
            className="group flex cursor-pointer items-center gap-2.5 rounded-full bg-blue-500 py-1.5 pr-3.5 pl-2 shadow-lg ring-1 ring-transparent transition-all duration-150 select-none hover:bg-white hover:shadow-md hover:ring-blue-500 active:scale-95"
        >
            {/* avatar */}
            <div className="size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white">
                <img src={`/img/auth/avatars/${avatar}`} alt="User avatar" className="size-full object-center" />
            </div>

            {/* name */}
            <span className="text-sm font-semibold text-white group-hover:text-blue-500">{name}</span>
        </button>
    );
}

function MenuItem({ currentPath, menuPath, menuTitle }: { currentPath: string; menuPath: string; menuTitle: string }) {
    // use pathname hook
    const pathName = usePathname();
    const navPath = pathName.split(/\/+/);
    const filteredPathName = navPath.filter((part) => part !== '')[0];

    return (
        <Link
            href={menuPath}
            className={`hover:text-primary-base hover:border-primary-base flex cursor-pointer items-center rounded-lg border-2 border-transparent px-2.5 py-1 whitespace-nowrap transition-all duration-200 select-none ${
                filteredPathName === currentPath ? 'text-primary-base border-primary-base' : 'border-transparent'
            }`}
        >
            {menuTitle}
        </Link>
    );
}

export default function Navigation() {
    const { authPopupEnabled, setAuthPopupEnabled, session } = useAppContext();

    return (
        <nav className="flex w-full items-center justify-between gap-8">
            <ul className="text-md flex w-full items-center gap-1">
                <li>
                    <MenuItem currentPath="countries" menuPath="/countries" menuTitle="Countries" />
                </li>
                <li>
                    <MenuItem currentPath="mbbs" menuPath="/mbbs" menuTitle="MBBS Abroad" />
                </li>
                <li>
                    <MenuItem currentPath="universities" menuPath="/universities" menuTitle="Universities" />
                </li>
                <li>
                    <MenuItem currentPath="courses" menuPath="/courses" menuTitle="Courses" />
                </li>
                <li>
                    <MenuItem currentPath="blogs" menuPath="/blogs" menuTitle="Blogs" />
                </li>
            </ul>

            {/* search button */}
            <SearchButton />

            <ul className="flex items-center gap-4">
                <li>
                    <Link
                        href="/contact"
                        className="bg-primary-light hover:outline-primary-light flex items-center justify-center rounded-full p-1.25 outline-offset-[7px] transition-all duration-100 hover:bg-blue-600 hover:outline-2 active:bg-blue-400"
                    >
                        <HiPhone className="size-5 text-white" />
                    </Link>
                </li>
                <li className="relative">
                    {session ? (
                        <AuthUserMenuItem avatar={session.avatar} name={session.firstName} />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setAuthPopupEnabled(!authPopupEnabled)}
                            className="text-primary-light hover:border-primary-base hover:text-primary-base flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-1 transition-all duration-100 select-none active:text-blue-400"
                        >
                            <div className="flex items-center justify-center">
                                <BiSolidUserCircle className="size-9" />
                            </div>
                        </button>
                    )}

                </li>
            </ul>
        </nav>
    );
}
