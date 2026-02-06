"use client";
import Link from "next/link";
import Hero from "../components/common/Hero"; // আপনার পাথ অনুযায়ী
import { ArrowUpRight } from "lucide-react";

export default function ComingSoon() {
    return (
        <div className="min-h-screen">
            <Hero
                title="Coming Soon"
                breadcrumb="Home › Maintenance"
                description="We are working hard to bring something amazing. Stay tuned!"
                hideContent={true} // আপনার আপডেট করা হিরো কম্পোনেন্ট অনুযায়ী
            >
                <div className="flex flex-col items-center justify-center w-full text-center px-4 mb-20 md:mb-40">

                    {/* আপনার 404 পেজের মতো এখানেও একটি ইমেজ দিতে পারেন */}
                    <div className="mb-8 w-7xl flex justify-center px-4">
                        <h1
                            className="text-white opacity-20 select-none text-center"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '400',
                                fontStyle: 'normal',
                                // মোবাইলে ছোট দেখাবে, বড় স্ক্রিনে (md) ১২০ পিক্সেল হবে
                                fontSize: 'clamp(48px, 10vw, 90px)',
                                lineHeight: '110%',
                                letterSpacing: '-0.04em', // -4% letter spacing
                                textTransform: 'capitalize',
                            }}
                        >
                            Thanks—your project is in!
                        </h1>
                    </div>

                    <p
                        className="text-white mb-10 text-center mx-auto max-w-7xl px-10"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '500',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            lineHeight: '120%',
                            letterSpacing: '0%',
                            textTransform: 'capitalize',
                        }}
                    >
                        We’ll email you within 1 business day with a short list of questions or a link to book a quick intro. 
                    </p>

                    <Link
                        href="/"
                        className="inline-flex transition-all group hover:scale-105 active:scale-95 shadow-xl"
                        style={{
                            display: 'flex',
                            height: '52px',
                            width: '190px',
                            padding: '4px 4px 4px 12px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            borderRadius: '100px',
                            background: '#FFFFFF',
                            color: '#0168B4',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        Go Back Home
                        <span className="bg-[#0168B4] text-white rounded-full flex items-center justify-center w-[44px] h-[44px]">
                            <ArrowUpRight className="w-6 h-6" />
                        </span>
                    </Link>

                </div>
            </Hero>
        </div>
    );
}