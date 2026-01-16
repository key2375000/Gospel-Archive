
import React from 'react';
import { Post } from './posts';
import { SiteContent } from './siteData';
import { FileIcon } from './icons';

interface BoardPageProps {
    category: string;
    language: string;
    posts: Post[];
    siteContent: SiteContent;
}

// Utility to parse video URLs for embedding
const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
    if (ytMatch && ytMatch[1]) {
        const id = ytMatch[1].split('&')[0];
        return `https://www.youtube.com/embed/${id}`;
    }
    const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(.+)/);
    if (vimeoMatch && vimeoMatch[1]) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return null;
};

const BoardPage: React.FC<BoardPageProps> = ({ category, language, posts, siteContent }) => {
    const filteredPosts = posts.filter(
        (post) => post.category === category && post.language === language
    );

    const catLabel = siteContent.labels.categories[category] || category;
    const langLabel = siteContent.labels.languages[language] || language;
    const pageDescription = siteContent.boardDescriptions[category]?.[language] || '';

    return (
        <div className="bg-[#F9F9F8] rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-stone-200/50 min-h-screen">
            <div className="mb-12">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
                        {catLabel} - {langLabel}
                    </h1>
                    <div className="h-1 w-16 bg-stone-900 rounded-full mb-4"></div>
                </div>
                {pageDescription && (
                    <p className="text-stone-500 text-sm font-light max-w-2xl leading-relaxed">
                        {pageDescription}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.slice(0, 9).map((post) => {
                        const embedUrl = post.videoUrl ? getEmbedUrl(post.videoUrl) : null;
                        
                        return (
                            <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
                                {post.imageUrl && !embedUrl && (
                                    <div className="w-full aspect-video overflow-hidden">
                                        <img 
                                            src={post.imageUrl} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                                        />
                                    </div>
                                )}
                                {embedUrl && (
                                    <div className="w-full aspect-video bg-black">
                                        <iframe
                                            src={embedUrl}
                                            className="w-full h-full border-0"
                                            allowFullScreen
                                            title={post.title}
                                        ></iframe>
                                    </div>
                                )}
                                {!post.imageUrl && !embedUrl && (
                                    <div className="w-full aspect-video bg-stone-50 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-stone-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-[9px] font-bold text-stone-400 gap-3 uppercase tracking-widest mb-4">
                                        <span className="text-stone-600">{post.author}</span>
                                        <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-stone-900 mb-3 leading-tight group-hover:text-stone-700 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-stone-500 text-sm font-light line-clamp-3 mb-6 flex-grow">
                                        {post.content}
                                    </p>
                                    
                                    {post.attachmentData && post.attachmentName && (
                                        <div className="mb-4">
                                            <a 
                                                href={post.attachmentData} 
                                                download={post.attachmentName}
                                                className="inline-flex items-center gap-2 text-[10px] font-bold text-stone-600 hover:text-stone-900 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100 transition-colors"
                                            >
                                                <FileIcon className="w-3 h-3" />
                                                Download: {post.attachmentName}
                                            </a>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-stone-50 flex items-center gap-2">
                                        {post.videoUrl && <span className="text-[8px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full uppercase">Video</span>}
                                        {post.imageUrl && <span className="text-[8px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">Image</span>}
                                        {post.attachmentData && <span className="text-[8px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full uppercase">File</span>}
                                    </div>
                                </div>
                            </article>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border border-dashed border-stone-200">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 2v4h4" /></svg>
                        </div>
                        <p className="text-stone-900 text-xl font-bold">Still Preparing...</p>
                        <p className="text-stone-400 mt-2 text-sm font-medium">Heavenly treasures are being gathered for this section.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardPage;
