
import React from 'react';
import { ArrowRightIcon } from './icons';

interface ResourceCardProps {
    id: string;
    tag: string;
    image?: string;
    alt: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ id, tag, image, icon, title, description, alt }) => {
    // Navigate specifically to the English version as requested
    const handleNavigation = () => {
        window.location.hash = `#/board/${id}/english`;
    };

    return (
        <div id={id} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-3xl p-4 sm:p-6 relative shadow-sm border border-stone-100 flex flex-col h-full">
            {image && (
                <div className="w-full aspect-video overflow-hidden rounded-2xl mb-6 bg-stone-100">
                    <img 
                        src={image} 
                        alt={alt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                </div>
            )}
            
            <div className="flex flex-col flex-grow">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">{tag}</p>
                
                <div className="flex items-center gap-2 mb-3">
                    <div className="text-stone-400 group-hover:text-stone-900 transition-colors duration-300">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 leading-tight">{title}</h3>
                </div>
                
                <p className="text-sm text-stone-500 mb-6 leading-relaxed flex-grow">
                    {description}
                </p>
                
                <button 
                    onClick={handleNavigation}
                    className="hover:bg-stone-900 hover:text-white transition-all duration-300 flex gap-2 font-semibold text-stone-900 w-full border-stone-200 border rounded-2xl py-3.5 items-center justify-center text-sm mt-auto"
                >
                    View Resources <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
};

export default ResourceCard;
