import React from 'react';

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-300 bg-gradient-to-br from-[#212130] via-[#2e2a44] to-[#39304A]">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img
                        className="h-9"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoDark.svg"
                        alt="dummyLogoDark"
                    />
                    <p className="mt-6 text-sm">
                        Fundify is a sample platform connecting investors and entrepreneurs. This is a non-commercial demo.
                        This is a demo project built for portfolio and educational purposes. No real investments are made here.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-100">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">About us</a></li>
                            <li><a href="invest" className="hover:text-white">Invest</a></li>
                            <li><a href="postIdea" className="hover:text-white">Share your idea</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-100">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+1-212-456-7890</p>
                            <p>riteshkaushal57@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-400">
                Copyright 2025 © Fundify. All Right Reserved.
            </p>
        </footer>
    );
};

export default Footer;
