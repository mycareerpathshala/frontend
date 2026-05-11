'use client';

// imports
import MCPLogo from '@/public/img/mcp_logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import LoginBanner from '@/public/img/auth/login_banner.png';

export default function Login() {
    return (
        <div className="flex h-[80%] w-4xl overflow-hidden rounded-xl shadow-lg">
            {/* banner */}
            <div className="flex w-1/2 flex-col items-center justify-center gap-20 bg-white/20 backdrop-blur-sm">
                <div className="relative h-64 w-64">
                    <Image className="object-contain" fill src={LoginBanner} alt="Login Banner Image" />
                </div>

                {/* quote */}
                <div>
                    <p className="flex flex-col gap-1 px-6 text-center">
                        <span className="text-xs italic">Mark Twain</span>
                        <span className="text-xl font-semibold">
                            &ldquo;The expert in anything was once a beginner.&rdquo;
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
                <div className="mt-10 flex w-full flex-col items-center gap-1">
                    <h2 className="text-2xl font-semibold">Welcome Back</h2>
                    <p className="text-xs">Enter your email and password to access your account</p>
                </div>

                {/* login form */}
                <div className="mt-10 flex w-full justify-center">
                    <form className="flex w-4/5 flex-col">
                        <div className="flex flex-col items-start gap-1">
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
                        <div className="mt-2 flex w-full items-center justify-between">
                            <div className="flex items-center justify-start gap-1">
                                <input type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember" className="cursor-pointer text-xs select-none">
                                    Remember me
                                </label>
                            </div>
                            <div className="flex items-center">
                                <Link href="#" className="text-xs">
                                    Forgot Password
                                </Link>
                            </div>
                        </div>
                        <div className="mt-8 flex w-full items-center justify-center">
                            <button
                                type="button"
                                className="w-4/5 cursor-pointer rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 ease-out select-none hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-lg active:-translate-y-px active:shadow-md"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                {/* sign up footer */}
                <div className="mt-6 w-full">
                    <p className="w-full text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="#"
                            className="border-primary-lighter hover:bg-primary-dark hover:border-primary-dark ml-1 rounded-md border-2 bg-transparent px-2 py-0.5 transition-all duration-150 ease-in-out select-none hover:text-white"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
