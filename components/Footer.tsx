
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col md:flex-row gap-6 border-stone-200 border-t p-8 items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="font-semibold text-stone-900 tracking-tight">Gospel Archive</span>
                <a href="#/admin" className="text-xs text-stone-400 hover:text-stone-900 transition-colors">Admin</a>
            </div>

            <div className="text-xs text-stone-400">© 2026 Gospel Archive. All rights reserved.</div>
        </footer>
    );
};

export default Footer;