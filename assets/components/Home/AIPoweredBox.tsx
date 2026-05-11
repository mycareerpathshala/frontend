// imports
import Link from 'next/link';
import { HiDocumentText, HiBuildingLibrary } from 'react-icons/hi2';

export default function AIPoweredBox() {
    return (
        <section className="mx-auto mt-20 w-full max-w-7xl rounded-xl border bg-[url(/img/homepage/ai_powered/bg.png)] bg-cover bg-no-repeat px-4 py-8 text-white max-md:px-8 max-sm:px-8">
            <h3 className="text-center text-3xl font-bold max-md:text-2xl">
                Use our unified platform to find your preferred University
            </h3>
            <p className="mt-4 text-center">Explore your chances of admission at your dream university</p>
            <div className="mt-8 flex items-center justify-center gap-4 max-md:flex-col">
                <div className="flex w-fit items-center gap-4 rounded-xl border bg-white px-4 py-2 max-md:w-80 max-md:flex-col max-md:items-center">
                    <span>
                        <HiDocumentText className="text-primary-base size-8 max-md:size-12" />
                    </span>
                    <span className="flex w-full items-center justify-between gap-4 max-md:flex-col max-md:items-center max-md:gap-2">
                        <span className="text-primary-base text-sm">Best Universities</span>
                        <Link
                            href="#"
                            className="bg-primary-base hover:bg-primary-light block w-fit rounded-lg px-4 py-2 text-white transition-all duration-200 ease-in-out"
                        >
                            Find University
                        </Link>
                    </span>
                </div>
                <div className="flex w-fit items-center gap-4 rounded-xl border bg-white px-4 py-2 max-md:w-80 max-md:flex-col max-md:items-center">
                    <span>
                        <HiBuildingLibrary className="text-primary-base size-8 max-sm:size-12" />
                    </span>
                    <span className="flex w-full items-center justify-between gap-4 max-md:flex-col max-md:items-center max-md:gap-2">
                        <span className="text-primary-base text-sm">Already have a program in mind?</span>
                        <Link
                            href="#"
                            className="bg-primary-base hover:bg-primary-light block w-fit rounded-lg px-4 py-2 text-white transition-all duration-200 ease-in-out"
                        >
                            Find Details
                        </Link>
                    </span>
                </div>
            </div>
        </section>
    );
}
