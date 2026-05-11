'use client';

// imports
import MCPLogo from '@/public/img/mcp_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
// import RegisterBanner from '@/public/img/auth/register_banner.png';
import LoginBanner from '@/public/img/auth/login_banner.png';
import { useFormStatus } from 'react-dom';

// submit button
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-4/5 cursor-pointer rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 ease-out select-none hover:bg-sky-400 hover:shadow-lg disabled:bg-slate-600"
        >
            Register
        </button>
    );
}

export default function Register() {
    return (
        <div className="flex h-[90%] w-5xl overflow-hidden rounded-xl shadow-lg">
            {/* banner */}
            <div className="flex w-1/2 flex-col items-center justify-center gap-20 bg-white/20 backdrop-blur-sm">
                <div className="relative h-64 w-64">
                    <Image className="object-contain" fill src={LoginBanner} alt="Login Banner Image" />
                </div>

                {/* quote */}
                <div>
                    <p className="flex flex-col gap-1 px-6 text-center">
                        <span className="text-xs italic">Nelson Mandela</span>
                        <span className="text-xl font-semibold">
                            &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
                        </span>
                    </p>
                </div>
            </div>

            {/* auth content */}
            <div className="flex w-1/2 flex-col justify-center bg-white px-2.5 py-4">
                {/* logo */}
                <div className="relative h-12 w-full">
                    <Image src={MCPLogo} fill className="object-contain" alt="My Career Pathshala Logo" />
                </div>

                {/* title */}
                <div className="mt-6 flex w-full flex-col items-center gap-1">
                    <h2 className="text-2xl font-semibold">Register Now</h2>
                    <p className="text-xs">Enter your basic information to create a new account</p>
                </div>

                {/* login form */}
                <div className="mt-8 flex w-full justify-center">
                    <form className="flex w-4/5 flex-col">
                        {/* firstName and lastName */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col items-start gap-1">
                                <label htmlFor="firstname" className="text-sm">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstname"
                                    placeholder="First Name"
                                    className="focus:border-primary-lighter invalid:border-secondary-lighter w-full rounded-sm border-2 border-transparent bg-gray-100 px-2.5 py-1.5 text-sm transition-all duration-200 ease-in outline-none focus:shadow-md"
                                />
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <label htmlFor="lastname" className="text-sm">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastname"
                                    placeholder="Last Name"
                                    className="focus:border-primary-lighter invalid:border-secondary-lighter w-full rounded-sm border-2 border-transparent bg-gray-100 px-2.5 py-1.5 text-sm transition-all duration-200 ease-in outline-none focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="mt-3 flex flex-col items-start gap-1">
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="focus:border-primary-lighter invalid:border-secondary-lighter w-full rounded-sm border-2 border-transparent bg-gray-100 px-2.5 py-1.5 text-sm transition-all duration-200 ease-in outline-none focus:shadow-md"
                            />
                        </div>
                        <div className="mt-3 flex flex-col items-start gap-1">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="focus:border-primary-lighter invalid:border-secondary-lighter w-full rounded-sm border-2 border-transparent bg-gray-100 px-2.5 py-1.5 text-sm transition-all duration-200 ease-in outline-none focus:shadow-md"
                            />
                        </div>
                        <div className="mt-3 flex flex-col items-start gap-1">
                            <label htmlFor="confirm-password" className="text-sm">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                className="focus:border-primary-lighter invalid:border-secondary-lighter w-full rounded-sm border-2 border-transparent bg-gray-100 px-2.5 py-1.5 text-sm transition-all duration-200 ease-in outline-none focus:shadow-md"
                            />
                        </div>
                        <div className="mt-2 flex w-full items-center justify-start gap-2">
                            <input type="checkbox" name="agree" id="agree" />
                            <label htmlFor="agree" className="cursor-pointer text-xs select-none">
                                I agree to all the Terms & Privacy Policies
                            </label>
                        </div>
                        <div className="mt-6 flex w-full items-center justify-center">
                            {/* submit button with form status */}
                            <SubmitButton />
                        </div>
                    </form>
                </div>

                {/* sign up footer */}
                <div className="mt-4 w-full">
                    <p className="w-full text-center text-sm">
                        Already have an account?&nbsp;
                        <Link
                            href="#"
                            className="border-primary-lighter hover:bg-primary-dark hover:border-primary-dark ml-1 rounded-md border-2 bg-transparent px-2 py-0.5 transition-all duration-150 ease-in-out select-none hover:text-white"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
