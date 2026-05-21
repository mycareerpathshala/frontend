// imports
import Image from 'next/image';
import Link from 'next/link';

export default function InlineBanner() {
    return (
        <div
            style={{
                background: 'url(/img/banners/college_search_img.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="mx-auto my-8 flex h-80 w-full max-w-7xl items-start justify-start rounded-lg px-52 py-16 max-md:items-center max-md:justify-center max-md:p-4 max-sm:mt-6"
        >
            <div className="flex flex-col items-center">
                <div className="relative h-16 w-2xs">
                    <Image
                        width={280}
                        height={60}
                        src="/img/mcp_logo.svg"
                        alt="My Career Pathshala Pen Icon"
                        className="absolute inset-0 h-full w-full object-contain"
                    />
                </div>
                <div className="mt-1">
                    <p className="text-center text-xl max-sm:text-xl">Find the right University and Courses for you</p>
                    <div className="mt-6 flex items-center justify-start gap-8 max-sm:flex-col max-sm:gap-3">
                        <Link
                            href="/mbbs"
                            className="border-primary-light text-primary-base hover:bg-primary-base cursor-pointer rounded-full border bg-white px-4 py-2 font-semibold select-none hover:text-white max-sm:text-center"
                        >
                            MBBS Universities
                        </Link>
                        <Link
                            href="/courses"
                            className="border-secondary-light text-secondary-base hover:bg-secondary-base cursor-pointer rounded-full border bg-white px-4 py-2 font-semibold select-none hover:text-white"
                        >
                            Best Courses
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
