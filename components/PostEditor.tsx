
import React, { useState } from 'react';
import { Post } from './posts';

interface PostEditorProps {
     onPublishPost: (post: Omit<Post, 'id' | 'date' | 'author'>) => void;
}

type Category = 'root' | 'stem' | 'fruit';
type Language = 'english' | 'chinese' | 'korean';

const PostEditor: React.FC<PostEditorProps> = ({ onPublishPost }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<Category>('root');
    const [language, setLanguage] = useState<Language>('english');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !content) {
            alert('Title and Content are required.');
            return;
        }
        onPublishPost({ 
            title, 
            category, 
            language, 
            content, 
            imageUrl: imageUrl || undefined, 
            videoUrl: videoUrl || undefined 
        });
        
        // Reset form
        setTitle('');
        setCategory('root');
        setLanguage('english');
        setContent('');
        setImageUrl('');
        setVideoUrl('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-4">Post Title</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="A New Foundation of Hope..." 
                            className="w-full text-3xl font-bold border-0 p-0 focus:ring-0 text-stone-900 placeholder-stone-200" 
                        />
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                         <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-4">Message Content</label>
                         <textarea 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Write your gospel message here..." 
                            className="w-full bg-stone-50 border-0 rounded-2xl px-6 py-5 text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all h-96 resize-y font-light leading-relaxed"
                         />
                    </div>
                    
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4">Media Attachments</h3>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-stone-600">Featured Image URL</label>
                            <input 
                                type="url" 
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="https://images.unsplash.com/..." 
                                className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-stone-600">Video Link (YouTube or Vimeo)</label>
                            <input 
                                type="url" 
                                value={videoUrl}
                                onChange={e => setVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..." 
                                className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all"
                            />
                            <p className="text-[10px] text-stone-400">Paste the full video URL. We will automatically embed it for you.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-6">Publishing</h3>
                        <div className="flex flex-col gap-3">
                            <button type="submit" className="w-full text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl px-5 py-4 transition-all hover:shadow-lg active:scale-95">Publish Post</button>
                            <button type="button" className="w-full text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl px-4 py-4 transition-all">Save Draft</button>
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-6">Category</h3>
                        <div className="space-y-3">
                           <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors">
                               <input type="radio" name="category" value="root" checked={category === 'root'} onChange={() => setCategory('root')} className="w-4 h-4 text-stone-900 focus:ring-stone-900 border-stone-300"/>
                               <span className="text-sm font-medium text-stone-700">The Root of Faith</span>
                           </label>
                           <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors">
                               <input type="radio" name="category" value="stem" checked={category === 'stem'} onChange={() => setCategory('stem')} className="w-4 h-4 text-stone-900 focus:ring-stone-900 border-stone-300"/>
                               <span className="text-sm font-medium text-stone-700">The Stem of the Word</span>
                           </label>
                           <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors">
                               <input type="radio" name="category" value="fruit" checked={category === 'fruit'} onChange={() => setCategory('fruit')} className="w-4 h-4 text-stone-900 focus:ring-stone-900 border-stone-300"/>
                               <span className="text-sm font-medium text-stone-700">The Fruit of the Gospel</span>
                           </label>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-6">Language</h3>
                         <select value={language} onChange={e => setLanguage(e.target.value as Language)} className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-stone-700 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-all">
                            <option value="english">English</option>
                            <option value="chinese">Chinese</option>
                            <option value="korean">Korean</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostEditor;
