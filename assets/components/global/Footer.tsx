// imports
import Image from 'next/image';
import Link from 'next/link';
import { HiPhone, HiEnvelope } from 'react-icons/hi2';

export default function Footer() {
    return (
        <footer className="bg-gray-800 py-16 max-xl:py-8">
            <div className="relative mx-auto flex w-full max-w-7xl items-center gap-16 max-xl:flex-wrap max-xl:items-start max-xl:gap-8 max-xl:p-6">
                <div>
                    <Image
                        className="h-auto w-auto"
                        width={300}
                        height={150}
                        src="/img/mcp_logo_footer.svg"
                        alt="My Career Pathshala Logo"
                    />
                </div>
                <div className="flex flex-wrap gap-8 text-white max-md:flex-col max-md:gap-2 max-md:text-[10px]">
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold">Student</h4>
                        <ul className="flex flex-col items-start gap-1 text-sm">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/schools">Find Universities</Link>
                            </li>
                            <li>
                                <Link href="/courses">Find Programs</Link>
                            </li>
                            <li>
                                <Link href="/resources">Resources</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold">Company</h4>
                        <ul className="flex flex-col items-start gap-1 text-sm">
                            <li>
                                <Link href="/about">About US</Link>
                            </li>
                            <li>
                                <Link href="/resources">Resource</Link>
                            </li>
                            <li>
                                <Link href="/terms">Terms & Condition</Link>
                            </li>
                            <li>
                                <Link href="/privacy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact US</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold">Contact Us</h4>
                        <ul className="flex flex-col items-start gap-1 text-sm">
                            <li className="flex items-center gap-2">
                                <HiPhone className="size-4" />
                                <span>+91-9861905-906</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <HiEnvelope className="size-4" />
                                <span>info@mycareerpathshala.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="absolute right-0 -bottom-4 w-70 rounded-xl bg-gray-900 max-xl:static max-md:w-full">
                    <div className="flex flex-col gap-6 p-6 text-white max-md:gap-4 max-md:p-4">
                        <p className="text-lg font-bold">Get Your Personalised Guidance</p>
                        <Link
                            href="/dashboard/counselling"
                            className="bg-primary-base cursor-pointer rounded-lg py-2.5 text-center text-sm select-none"
                        >
                            Talk to Counsellor
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
