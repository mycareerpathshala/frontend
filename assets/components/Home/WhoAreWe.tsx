// imports
import Link from 'next/link';
import {
    HiMagnifyingGlass,
    HiPresentationChartLine,
    HiHomeModern,
    HiFolderArrowDown,
    HiArrowDownLeft,
} from 'react-icons/hi2';
import Image from 'next/image';
import potraitImage from '@/public/img/homepage/introduction/potrait_img.png';
import rupeesIcon from '@/public/img/homepage/introduction/rupees_img.png';
import dottedBar from '@/public/img/homepage/introduction/dotted_bar.png';

export default function WhoAreWe() {
    return (
        <section className="mx-auto mt-20 w-full max-w-7xl px-4 max-lg:hidden">
            <h3 className="text-center text-3xl font-bold max-md:text-2xl">Who we are?</h3>
            <p className="mx-auto mt-2 w-full max-w-175 text-center">
                Guiding each individual on how to become financially strong to pursue their dream career abroad
            </p>

            {/* thumbnail */}
            <div className="relative mt-20">
                {/* layer 2 */}
                <div className="relative mx-auto w-75">
                    {/* this div is for border */}
                    <div className="absolute bottom-2 left-3 h-120 w-full rounded-2xl border-4"></div>

                    <div className="from-primary-base to-secondary-base absolute top-[-15%] left-[22%] -z-50 h-150 w-45 rotate-236 rounded-full bg-linear-to-b from-50% to-50%"></div>
                    <div>
                        <Image src={potraitImage} alt="Potrait of Kumar Ranjan" />
                    </div>
                </div>

                {/* layer 3 */}
                <div>
                    {/* search box in the thumbnail */}
                    <Link
                        href="/universities"
                        className="bg-primary-light absolute -top-14 left-[23%] flex w-fit items-center gap-3 rounded-xl py-2 pr-4 pl-3 text-white"
                    >
                        <span>
                            <HiMagnifyingGlass className="size-8" />
                        </span>
                        <span className="flex flex-col">
                            <span>University</span>
                            <span>Search</span>
                        </span>
                    </Link>

                    {/* career mentor box in the thumbnail */}
                    <div className="bg-primary-light absolute top-0 right-[13%] w-fit rounded-xl p-4 text-white">
                        <h4 className="font-bold">CAREER MENTOR</h4>
                        <div className="mt-1 text-sm">
                            <p>
                                <span>Your Goal:&nbsp;</span>
                                <span>MBBS</span>
                            </p>
                            <p>
                                <span>Destination:&nbsp;</span>
                                <span>Italy</span>
                            </p>
                        </div>
                        <Link
                            href="/dashboard/counselling"
                            className="mt-2 flex cursor-pointer items-center justify-center bg-linear-to-r from-blue-300 to-blue-500 px-4 py-1.5 text-sm select-none"
                        >
                            <span className="font-bold">Get Help</span>
                            <span>&gt;</span>
                        </Link>
                    </div>

                    {/* university box / going to replace it with static content */}
                    <div className="absolute top-[15%] left-[9%] flex flex-col gap-4">
                        <div className="flex w-fit items-center gap-3 rounded-xl bg-linear-to-r from-red-400 to-red-600 p-4 text-white">
                            <div>
                                <HiPresentationChartLine className="size-8" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span>Best Finance Course</span>
                                <span>in Australia</span>
                            </div>
                        </div>
                        <div className="flex w-fit items-center gap-3 rounded-xl bg-linear-to-r from-blue-400 to-blue-600 p-4 text-white">
                            <div>
                                <HiHomeModern className="size-8" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span>Top Architecture Courses</span>
                                <span>in USA</span>
                            </div>
                        </div>
                    </div>

                    {/* statistical buttons */}
                    <div>
                        <div className="absolute top-[59%] left-[9%] w-fit cursor-pointer rounded-xl bg-blue-500 p-4 text-white select-none">
                            <div className="flex items-center gap-8">
                                <span>
                                    <HiFolderArrowDown className="size-10" />
                                </span>
                                <span className="text-3xl font-bold">85+</span>
                            </div>
                            <div className="mt-3 flex flex-col font-medium">
                                <span>Applied</span>
                                <span>Application</span>
                            </div>
                        </div>

                        <div className="bg-secondary-base absolute top-[59%] left-[23%] w-fit cursor-pointer rounded-xl p-4 text-white select-none">
                            <div className="flex items-center gap-8">
                                <span>
                                    <HiArrowDownLeft className="size-10" />
                                </span>
                                <span className="text-3xl font-bold">23+</span>
                            </div>
                            <div className="mt-3 flex flex-col font-medium">
                                <span>Offer</span>
                                <span>Received</span>
                            </div>
                        </div>
                    </div>

                    {/* financial advice thumbnail box */}
                    <div className="absolute top-[35%] right-[4%] flex w-fit items-center gap-4 rounded-xl bg-linear-to-br from-blue-300 to-blue-600 px-4 py-2 text-white">
                        <div>
                            <Image src={rupeesIcon} alt="Rupees Image" className="w-20" />
                        </div>
                        <p className="w-65 text-base">
                            Get best financial advice on how to select university in your budget
                        </p>
                    </div>

                    {/* message and dotted bar */}
                    <div className="absolute top-[62%] right-[5%] flex w-95 flex-col items-center gap-6">
                        <div className="bg-secondary-base rounded-xl p-4 text-white">
                            <p>Compare more than 400+ Top Universities for your study abroad journey</p>
                        </div>
                        <div>
                            <Image src={dottedBar} alt="Dotted Bar Image" />
                        </div>
                    </div>
                </div>

                {/* layer 4 */}
                <div></div>
            </div>
        </section>
    );
}
