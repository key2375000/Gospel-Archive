
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, MenuIcon, SendIcon, SearchIcon } from './icons';
import { Verse, SiteContent } from './siteData';


interface HeaderProps {
    route: string;
    verses: Verse[];
    headerImage: string;
    siteContent: SiteContent; // Added siteContent to access labels
}

const Header: React.FC<HeaderProps> = ({ route, verses, headerImage, siteContent }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

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
    const headerClasses = isHomePage
        ? "min-h-[490px] overflow-hidden bg-stone-900 w-full h-[67vh] rounded-[2rem] relative shadow-2xl"
        : "w-full";

    const navContainerClasses = isHomePage
        ? "bg-white/10 border-white/10"
        : "bg-white/95 border-stone-200/80 shadow-sm backdrop-blur-lg";
    
    const navLinkBaseClasses = "hover:bg-black/10 transition-all duration-300 text-sm rounded-full py-2 px-5";
    const navLinkColorClasses = isHomePage
        ? "text-white/90 hover:text-white"
        : "text-stone-700 hover:text-stone-900";
    
    const brandClasses = isHomePage ? "text-white" : "text-stone-900";
    const menuIconContainerClasses = isHomePage ? "bg-white/10 text-white" : "bg-stone-100 text-stone-800";
    const contactBtnClasses = isHomePage ? "bg-white text-stone-900" : "bg-stone-900 text-white";
    const contactIconClasses = isHomePage ? "bg-stone-900" : "bg-stone-700";
    const searchInputClasses = isHomePage ? "bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:ring-white/50" : "bg-stone-100 border-stone-200 text-stone-800 placeholder:text-stone-400 focus:ring-stone-800";
    const searchIconClasses = isHomePage ? "text-white/60" : "text-stone-400";
    
    const currentVerse = verses && verses.length > 0 ? verses[currentIndex] : null;

    // Use labels from siteContent
    const { categories, languages } = siteContent.labels;

    return (
        <header className={headerClasses}>
            {isHomePage && (
                <>
                    <img src={headerImage} alt="Header" className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 opacity-80" />
                    <div className="bg-gradient-to-b from-black/40 via-transparent to-black/70 absolute top-0 right-0 bottom-0 left-0"></div>
                </>
            )}

            <nav className={`z-20 flex sm:px-10 p-6 relative items-center justify-between ${!isHomePage ? 'sm:px-0' : ''}`}>
                <div className="flex items-center gap-8">
                    <a href="#" onClick={(e) => handleScroll(e, '#')} className={`text-lg font-medium tracking-tight ${brandClasses}`}>Gospel Archive</a>
                    
                    <div className={`hidden md:flex gap-1 border rounded-full p-1.5 backdrop-blur-md items-center relative ${navContainerClasses}`}>
                        <a href="#" onClick={(e) => handleScroll(e, '#')} className={`${navLinkBaseClasses} ${navLinkColorClasses}`}>Home</a>
                        <a href="#about" onClick={(e) => handleScroll(e, '#about')} className={`${navLinkBaseClasses} ${navLinkColorClasses}`}>About</a>
                        
                        {Object.entries(categories).map(([key, label]) => (
                            <div key={key} className="group relative">
                                <button className={`${navLinkBaseClasses} ${navLinkColorClasses} flex items-center gap-1`}>
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

                <div className="hidden md:flex items-center gap-4">
                    <div className="relative flex items-center">
                        <input type="search" placeholder="Search..." className={`rounded-full border text-sm transition-all duration-300 w-40 focus:w-56 focus:outline-none focus:ring-2 pl-10 pr-4 py-3 ${searchInputClasses}`} />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                            <SearchIcon className={`w-4 h-4 ${searchIconClasses}`} />
                        </span>
                    </div>
                    <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className={`group flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full transition-transform hover:scale-105 ${contactBtnClasses}`}>
                        <span className="text-sm font-medium">Contact</span>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-stone-800 transition-colors ${contactIconClasses}`}>
                            <SendIcon className="w-4 h-4 text-white" />
                        </span>
                    </a>
                </div>
                <button className={`md:hidden p-2 backdrop-blur-md rounded-full ${menuIconContainerClasses}`}><MenuIcon /></button>
            </nav>

            {isHomePage && currentVerse && (
                 <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
                    <div className={`max-w-4xl transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-relaxed" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            “{currentVerse.text}”
                        </p>
                        <p className="mt-6 text-lg sm:text-xl text-white/90 font-medium tracking-wide" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                            {currentVerse.reference}
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
