
import React from 'react';
import PostEditor from './PostEditor';
import SiteSettingsEditor from './SiteSettingsEditor';
import { DashboardIcon, PostsIcon, MediaIcon, SettingsIcon, LogoutIcon, TrashIcon } from './icons';
import { Post } from './posts';
import { SiteContent } from './siteData';


interface AdminPageProps {
    onLogout: () => void;
    onPublishPost: (post: Omit<Post, 'id' | 'date' | 'author'>) => void;
    siteContent: SiteContent;
    onSiteContentChange: (newContent: SiteContent) => void;
    posts: Post[];
    onDeletePost: (id: number) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onLogout, onPublishPost, siteContent, onSiteContentChange, posts, onDeletePost }) => {
    const [activeView, setActiveView] = React.useState('Posts');

    const navItems = [
        { name: 'Dashboard', icon: <DashboardIcon /> },
        { name: 'Posts', icon: <PostsIcon /> },
        { name: 'Media', icon: <MediaIcon /> },
        { name: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <div className="min-h-screen bg-stone-50">
            <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                           <a href="#/" className="font-semibold text-stone-800 tracking-tight">Gospel Archive <span className="text-stone-400 font-normal">Admin</span></a>
                            <nav className="hidden md:flex space-x-2">
                                {navItems.map(item => (
                                    <a
                                        key={item.name}
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setActiveView(item.name);}}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            activeView === item.name
                                                ? 'bg-stone-100 text-stone-900'
                                                : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center">
                            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-stone-500 hover:bg-stone-100 transition-colors">
                                <LogoutIcon/> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {activeView === 'Posts' && (
                    <div className="space-y-12">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                            <h2 className="text-xl font-bold text-stone-900 mb-6">Create New Post</h2>
                            <PostEditor onPublishPost={onPublishPost} />
                        </div>
                        
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                            <h2 className="text-xl font-bold text-stone-900 mb-6">Manage Existing Posts</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-stone-50 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                            <th className="pb-4 px-4">Title</th>
                                            <th className="pb-4 px-4">Category</th>
                                            <th className="pb-4 px-4">Language</th>
                                            <th className="pb-4 px-4">Date</th>
                                            <th className="pb-4 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {posts.map(post => (
                                            <tr key={post.id} className="text-sm text-stone-700">
                                                <td className="py-4 px-4 font-medium">{post.title}</td>
                                                <td className="py-4 px-4 uppercase text-[10px]">{post.category}</td>
                                                <td className="py-4 px-4 uppercase text-[10px]">{post.language}</td>
                                                <td className="py-4 px-4 text-stone-400">{post.date}</td>
                                                <td className="py-4 px-4 text-right">
                                                    <button onClick={() => onDeletePost(post.id)} className="text-stone-300 hover:text-red-600 transition-colors p-2">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {activeView === 'Settings' && <SiteSettingsEditor content={siteContent} onSave={onSiteContentChange} />}
                {(activeView === 'Dashboard' || activeView === 'Media') && (
                    <div className="bg-white rounded-[2rem] shadow-sm p-16 text-center border border-stone-100">
                        <h2 className="text-2xl font-bold text-stone-900">{activeView}</h2>
                        <p className="text-stone-400 mt-2 font-light">This administrative module is currently being calibrated.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
