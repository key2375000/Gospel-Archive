
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, MenuIcon, SendIcon, SearchIcon, CrossIcon } from './icons';
import { Verse, SiteContent } from './siteData';

interface HeaderProps {
    route: string;
    verses: Verse[];
    headerImage: string;
    siteContent: SiteContent;
}

const Header: React.FC<HeaderProps> = ({ route, verses, headerImage, siteContent }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!verses || verses.length === 0) return;
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % verses.length);
                setIsFading(false);
            }, 500);
        }, 10000);
        return () => clearInterval(interval);
    }, [verses]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if(window.location.hash.startsWith('#/board')) {
            window.location.hash = '#';
            setTimeout(() => {
                 const targetElement = document.getElementById(targetId.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return;
        }
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const targetElement = document.getElementById(targetId.substring(1));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isHomePage = !route || !route.startsWith('#/board/');
    
    // Use labels from siteContent
    const { categories, languages } = siteContent.labels;

    return (
        <header className={isHomePage ? "min-h-[450px] sm:min-h-[490px] overflow-hidden bg-stone-900 w-full h-[60vh] sm:h-[67vh] rounded-[1.5rem] sm:rounded-[2rem] relative shadow-2xl" : "w-full"}>
            {isHomePage && (
                <>
                    <img src={headerImage} alt="Header" className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 opacity-80" />
                    <div className="bg-gradient-to-b from-black/40 via-transparent to-black/70 absolute top-0 right-0 bottom-0 left-0"></div>
                </>
            )}

            <nav className={`z-30 flex px-5 sm:px-10 py-6 relative items-center justify-between ${!isHomePage ? 'sm:px-0' : ''}`}>
                <div className="flex items-center gap-4 sm:gap-8">
                    <a href="#" onClick={(e) => handleScroll(e, '#')} className={`text-lg font-medium tracking-tight ${isHomePage ? 'text-white' : 'text-stone-900'}`}>Gospel Archive</a>
                    
                    {/* Desktop Navigation */}
                    <div className={`hidden lg:flex gap-1 border rounded-full p-1.5 backdrop-blur-md items-center relative ${isHomePage ? 'bg-white/10 border-white/10' : 'bg-white/95 border-stone-200/80 shadow-sm'}`}>
                        <a href="#" onClick={(e) => handleScroll(e, '#')} className={`hover:bg-black/10 transition-all duration-300 text-sm rounded-full py-2 px-5 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-stone-700 hover:text-stone-900'}`}>Home</a>
                        <a href="#about" onClick={(e) => handleScroll(e, '#about')} className={`hover:bg-black/10 transition-all duration-300 text-sm rounded-full py-2 px-5 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-stone-700 hover:text-stone-900'}`}>About</a>
                        
                        {Object.entries(categories).map(([key, label]) => (
                            <div key={key} className="group relative">
                                <button className={`flex items-center gap-1 hover:bg-black/10 transition-all duration-300 text-sm rounded-full py-2 px-5 ${isHomePage ? 'text-white/90 hover:text-white' : 'text-stone-700 hover:text-stone-900'}`}>
                                    {label}
                                    <ChevronDownIcon />
                                </button>
                                <div className="dropdown-content">
                                    {Object.entries(languages).map(([langKey, langLabel]) => (
                                        <a key={langKey} href={`#/board/${key}/${langKey}`} className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 rounded-lg transition-colors">
                                            {langLabel}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Desktop Search */}
                    <div className="hidden sm:relative sm:flex items-center">
                        <input type="search" placeholder="Search..." className={`rounded-full border text-sm transition-all duration-300 w-32 md:w-40 focus:w-56 focus:outline-none focus:ring-2 pl-10 pr-4 py-2.5 ${isHomePage ? 'bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:ring-white/50' : 'bg-stone-100 border-stone-200 text-stone-800 placeholder:text-stone-400 focus:ring-stone-800'}`} />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                            <SearchIcon className={`w-4 h-4 ${isHomePage ? 'text-white/60' : 'text-stone-400'}`} />
                        </span>
                    </div>

                    {/* Contact Button Desktop */}
                    <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className={`hidden md:flex group items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full transition-transform hover:scale-105 ${isHomePage ? 'bg-white text-stone-900' : 'bg-stone-900 text-white'}`}>
                        <span className="text-sm font-medium">Contact</span>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isHomePage ? 'bg-stone-900' : 'bg-stone-700'} group-hover:bg-stone-800`}>
                            <SendIcon className="w-4 h-4 text-white" />
                        </span>
                    </a>

                    {/* Mobile Menu Trigger */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`lg:hidden p-2.5 backdrop-blur-md rounded-full transition-colors ${isHomePage ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-stone-100 text-stone-800 hover:bg-stone-200'}`}
                    >
                        <MenuIcon />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <span className="font-bold text-xl text-stone-900">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400">
                                <CrossIcon />
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar">
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Navigation</p>
                                <a href="#" onClick={(e) => handleScroll(e, '#')} className="block text-xl font-medium text-stone-900 py-2">Home</a>
                                <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="block text-xl font-medium text-stone-900 py-2">About</a>
                                <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="block text-xl font-medium text-stone-900 py-2">Contact</a>
                            </div>

                            {Object.entries(categories).map(([key, label]) => (
                                <div key={key} className="space-y-4 pt-4 border-t border-stone-100">
                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(languages).map(([langKey, langLabel]) => (
                                            <a 
                                                key={langKey} 
                                                href={`#/board/${key}/${langKey}`} 
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="bg-stone-50 text-stone-700 px-4 py-3 rounded-xl text-sm font-medium hover:bg-stone-100 active:scale-95 transition-all text-center"
                                            >
                                                {langLabel}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 border-t border-stone-100">
                            <div className="relative">
                                <input type="search" placeholder="Search resources..." className="w-full bg-stone-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-stone-900" />
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isHomePage && verses && verses.length > 0 && (
                 <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-12 text-center">
                    <div className={`max-w-4xl transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        <p className="text-xl sm:text-2xl lg:text-4xl text-white font-light leading-relaxed" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            “{verses[currentIndex]?.text}”
                        </p>
                        <p className="mt-6 text-base sm:text-xl text-white/90 font-medium tracking-wide" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                            {verses[currentIndex]?.reference}
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
