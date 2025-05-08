'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/actions/auth.action';

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser!);
        };

        fetchUser();
    }, []);

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

                    {/* Footer - Improved Design */}
                    <div className="mt-auto p-4 border-t border-gray-700">
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center gap-3 hover:bg-[#8051B7]/30 p-2 rounded-lg transition-colors"
                            >
                                <div className="flex items-center flex-1">
                                    <div className="h-8 w-8 rounded-full bg-[#9c40ff] flex items-center justify-center mr-3">
                                        <span className="text-sm font-medium">{user?.fullname ? user.fullname[0] : '?'}</span>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium">{user?.fullname || 'Guest'}</span>
                                        <span className="text-xs text-gray-400">Online</span>
                                    </div>
                                </div>
                                <svg className={`w-4 h-4 ml-auto transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown positioned correctly */}
                            {isDropdownOpen && (
                                <div className="absolute bottom-12 left-0 w-full bg-[#1f1f2f] border border-[#8051B7]/50 rounded-lg shadow-lg overflow-hidden">
                                    <div className="py-1">
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#8051B7]/30">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </a>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#8051B7]/30">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </a>
                                        <div className="border-t border-gray-700 my-1"></div>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-[#8051B7]/30">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </a>
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