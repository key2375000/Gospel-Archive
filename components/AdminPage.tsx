
import React from 'react';
import PostEditor from './PostEditor';
import SiteSettingsEditor from './SiteSettingsEditor';
import { DashboardIcon, PostsIcon, SettingsIcon, LogoutIcon, TrashIcon, GlobeIcon } from './icons';
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

const DashboardView: React.FC = () => {
    const stats = [
        { label: 'Daily Visitors', value: '124', change: '+12%', color: 'text-emerald-600' },
        { label: 'Monthly Visitors', value: '3,842', change: '+5.4%', color: 'text-emerald-600' },
        { label: 'Total Resources', value: '48', change: '+2', color: 'text-blue-600' },
        { label: 'Active Sessions', value: '18', change: 'Live', color: 'text-rose-600 animate-pulse' },
    ];

    const countries = [
        { name: 'United States', percentage: 45, count: '1,728' },
        { name: 'South Korea', percentage: 30, count: '1,152' },
        { name: 'China', percentage: 15, count: '576' },
        { name: 'Brazil', percentage: 6, count: '230' },
        { name: 'Others', percentage: 4, count: '156' },
    ];

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">{stat.value}</h3>
                            <span className={`text-[10px] font-bold ${stat.color}`}>{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <GlobeIcon className="w-5 h-5 text-stone-400" />
                        <h3 className="text-lg font-bold text-stone-900">Geographic Reach</h3>
                    </div>
                    <div className="space-y-5 sm:space-y-6">
                        {countries.map((country, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-700 font-medium">{country.name}</span>
                                    <span className="text-stone-400">{country.count}</span>
                                </div>
                                <div className="w-full h-1.5 sm:h-2 bg-stone-50 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-stone-900 rounded-full" 
                                        style={{ width: `${country.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-900 mb-6">System Health</h3>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-between">
                            <span className="text-emerald-900 text-xs sm:text-sm font-medium">Database Latency</span>
                            <span className="text-emerald-600 text-[10px] sm:text-xs font-bold">8ms</span>
                        </div>
                        <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-between">
                            <span className="text-emerald-900 text-xs sm:text-sm font-medium">Storage Usage</span>
                            <span className="text-emerald-600 text-[10px] sm:text-xs font-bold">1.2 GB / 50 GB</span>
                        </div>
                        <div className="p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-between">
                            <span className="text-blue-900 text-xs sm:text-sm font-medium">CDN Availability</span>
                            <span className="text-blue-600 text-[10px] sm:text-xs font-bold">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminPage: React.FC<AdminPageProps> = ({ onLogout, onPublishPost, siteContent, onSiteContentChange, posts, onDeletePost }) => {
    const [activeView, setActiveView] = React.useState('Dashboard');

    const navItems = [
        { name: 'Dashboard', icon: <DashboardIcon /> },
        { name: 'Posts', icon: <PostsIcon /> },
        { name: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <div className="min-h-screen bg-stone-50">
            <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4 sm:space-x-8">
                           <a href="#/" className="font-semibold text-stone-800 tracking-tight text-sm sm:text-base">Gospel Archive <span className="hidden sm:inline text-stone-400 font-normal">Admin</span></a>
                            <nav className="flex space-x-1 sm:space-x-2">
                                {navItems.map(item => (
                                    <a
                                        key={item.name}
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setActiveView(item.name);}}
                                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-sm font-medium transition-colors ${
                                            activeView === item.name
                                                ? 'bg-stone-100 text-stone-900'
                                                : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                                        }`}
                                    >
                                        <span className="scale-75 sm:scale-100">{item.icon}</span>
                                        <span className="hidden sm:inline">{item.name}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center">
                            <button onClick={onLogout} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-[11px] sm:text-sm font-medium text-stone-500 hover:bg-stone-100 transition-colors">
                                <span className="scale-75 sm:scale-100"><LogoutIcon/></span> <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                {activeView === 'Dashboard' && <DashboardView />}
                {activeView === 'Posts' && (
                    <div className="space-y-8 sm:space-y-12">
                        <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100">
                            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-6">Create New Post</h2>
                            <PostEditor onPublishPost={onPublishPost} />
                        </div>
                        
                        <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100">
                            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-6">Manage Existing Posts</h2>
                            <div className="overflow-x-auto -mx-5 sm:mx-0">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-stone-50 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                            <th className="pb-4 px-5">Title</th>
                                            <th className="pb-4 px-5">Category</th>
                                            <th className="pb-4 px-5">Language</th>
                                            <th className="pb-4 px-5">Date</th>
                                            <th className="pb-4 px-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {posts.map(post => (
                                            <tr key={post.id} className="text-xs sm:text-sm text-stone-700 hover:bg-stone-50/50 transition-colors">
                                                <td className="py-4 px-5 font-medium">{post.title}</td>
                                                <td className="py-4 px-5 uppercase text-[10px]">{post.category}</td>
                                                <td className="py-4 px-5 uppercase text-[10px]">{post.language}</td>
                                                <td className="py-4 px-5 text-stone-400">{post.date}</td>
                                                <td className="py-4 px-5 text-right">
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
            </main>
        </div>
    );
};

export default AdminPage;
