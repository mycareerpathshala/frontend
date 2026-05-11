import Image from 'next/image';
import Link from 'next/link';

// prob type
interface BannerPropType {
    bannerUrl: string;
    colorOne: string;
    colorTwo: string;
}

export default function Banner({ bannerUrl, colorOne, colorTwo }: BannerPropType) {
    return (
        <section
            style={{
                backgroundImage: `linear-gradient(to right, ${colorOne} 34%, ${colorTwo})`,
            }}
            className="py-12"
        >
            <div className="mx-auto flex w-full max-w-7xl justify-between px-4 max-lg:flex-col max-lg:items-center max-lg:gap-y-4 max-sm:px-2">
                <div className="max-sm:px-1">
                    <h1 className="text-4xl max-lg:text-2xl max-sm:text-center max-sm:text-xl">
                        <span className="text-secondary-base block">Making Study Abroad Easy</span>
                        <span className="mt-2 block font-bold max-sm:mt-0.5">
                            Global Education{' '}
                            <span className="text-primary-base relative inline-block font-semibold">
                                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#FDFF86]"></span>
                                <span className="relative z-10">in Your Budget</span>
                            </span>
                        </span>
                    </h1>
                    <p className="mt-6 text-3xl max-lg:mt-4 max-lg:text-xl max-sm:px-2 max-sm:text-center">
                        Make your &nbsp;<span>study abroad</span>&nbsp;dream in to reality
                    </p>
                    <div className="mt-12 space-x-4 font-semibold max-lg:mt-10 max-md:flex max-md:w-full max-md:flex-col max-md:gap-3 max-sm:gap-2 max-sm:px-2">
                        <Link
                            href="#"
                            className="bg-primary-base border-primary-base hover:text-primary-base cursor-pointer rounded-lg border px-5 py-3 text-white transition-all duration-100 select-none hover:bg-white max-lg:text-sm max-md:w-full max-md:text-center"
                        >
                            Find My University
                        </Link>
                        <Link
                            href="/dashboard/counselling"
                            className="text-secondary-base border-secondary-light hover:bg-secondary-base cursor-pointer rounded-lg border bg-transparent px-5 py-3 transition-all duration-200 select-none hover:text-white max-lg:text-sm max-md:w-full max-md:text-center"
                        >
                            Talk to Counsellor
                        </Link>
                    </div>
                    <div className="mt-10 inline-block max-lg:mt-10 max-sm:block">
                        <p className="text-gray-600 max-lg:text-sm">Journey so far</p>
                        <ul className="bg-tertiary-lighter text-primary-base mt-2 flex gap-5 rounded-lg py-5 max-lg:py-3 max-md:gap-4 max-md:p-4 max-sm:w-full max-sm:flex-col">
                            <li className="flex flex-col items-center border-r-2 border-r-white px-5 max-lg:border-r-transparent max-lg:px-2">
                                <span className="font-semibold max-lg:text-base max-sm:text-sm">40K+</span>
                                <span className="text-xs">University Programs</span>
                            </li>
                            <li className="flex flex-col items-center border-r-2 border-r-white px-5 max-lg:border-r-transparent max-lg:px-2">
                                <span className="font-semibold max-lg:text-base max-sm:text-sm">2K+</span>
                                <span className="text-xs">Universities</span>
                            </li>
                            <li className="flex flex-col items-center border-r-2 border-r-white px-5 max-lg:border-r-transparent max-lg:px-2">
                                <span className="font-semibold max-lg:text-base max-sm:text-sm">5K+</span>
                                <span className="text-xs">Students Enrolled</span>
                            </li>
                            <li className="flex flex-col items-center pr-5 max-lg:border-r-transparent max-lg:px-2">
                                <span className="font-semibold max-lg:text-base max-sm:text-sm">20+</span>
                                <span className="text-xs">Countries</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="relative h-95 w-125 overflow-hidden max-lg:h-70 max-lg:w-100 max-md:w-70">
                    <Image src={bannerUrl} alt="Banner Image" fill className="object-contain" />
                </div>
            </div>
        </section>
    );
}
