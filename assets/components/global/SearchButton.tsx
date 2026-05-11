'use client';

// imports
import { useAppContext } from '@/assets/context/AppContext';
import { FiCommand } from 'react-icons/fi';
import { HiMagnifyingGlass } from 'react-icons/hi2';

// const data

export default function SearchButton() {
    const { setSearchEnabled } = useAppContext();
    // const pathname = usePathname();
    // console.log(pathname);
    // console.log(pathname.split('/'));

    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => setSearchEnabled(true)}
                className="bg-primary-bg/50 hover:border-primary-light flex w-full cursor-pointer items-center justify-between rounded-lg border border-transparent px-3 py-1.5 select-none active:bg-blue-100"
            >
                <span className="flex items-center gap-2">
                    <span>
                        <HiMagnifyingGlass className="text-primary-base size-6" />
                    </span>
                    <span className="text-md text-zinc-500">Search {}</span>
                </span>
                <span className="flex items-center gap-1 text-lg text-zinc-500">
                    <span>
                        <FiCommand className="size-4" />
                    </span>

                    <span className="font-semibold">K</span>
                </span>
            </button>
        </div>
    );
}
