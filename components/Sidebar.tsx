"use client";
import { useState } from 'react';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden py-16 text-center">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="py-2 px-3 inline-flex justify-center items-center gap-x-2 bg-[#8051B7] text-white text-sm font-medium rounded-lg shadow-2xs hover:bg-[#9c40ff] focus:outline-none"
                >
                    Open Sidebar
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-[#181818] border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col text-white">
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center border-b border-gray-700">
                        <span className="font-semibold text-xl text-[#9c40ff]">Brand</span>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-[#8051B7]/20 rounded-lg"
                        >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center gap-3 p-2 text-white hover:bg-[#8051B7]/30 rounded-lg transition-colors">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </a>
                            </li>

                            {/* Add more menu items here */}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-700">
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center gap-3 hover:bg-[#8051B7]/30 p-2 rounded-lg transition-colors"
                            >
                                <img src="https://via.placeholder.com/40" alt="User" className="w-8 h-8 rounded-full" />
                                <span className="text-sm">John Doe</span>
                                <svg className={`w-4 h-4 ml-auto transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute bottom-full mb-2 w-full bg-[#1f1f2f] border border-[#8051B7] rounded-lg shadow-lg">
                                    <div className="p-2 space-y-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#8051B7]/30 rounded-lg">Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#8051B7]/30 rounded-lg">Settings</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#8051B7]/30 rounded-lg">Logout</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Sidebar;
