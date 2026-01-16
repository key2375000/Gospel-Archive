
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ContentSection from './components/ContentSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BoardPage from './components/BoardPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPage from './components/AdminPage';
import { posts as initialPosts, Post } from './components/posts';
import { SiteContent, initialSiteContent } from './components/siteData';
import ScrollToTopButton from './components/ScrollToTopButton';

const MainPageContent: React.FC<{ content: SiteContent }> = ({ content }) => (
    <>
        <AboutSection content={content.about} />
        <ContentSection resources={content.resources} />
        <ContactSection />
    </>
);

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [posts, setPosts] = useState<Post[]>(() => {
        try {
            const savedPosts = localStorage.getItem('sitePosts');
            return savedPosts ? JSON.parse(savedPosts) : initialPosts;
        } catch {
            return initialPosts;
        }
    });
    
    const [siteContent, setSiteContent] = useState<SiteContent>(() => {
        try {
            const savedContent = localStorage.getItem('siteContent');
            if (savedContent) {
                const parsed = JSON.parse(savedContent);
                if (parsed.verses && parsed.about && parsed.resources) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error("Failed to parse site content", error);
        }
        return initialSiteContent;
    });

    useEffect(() => {
        const handleHashChange = () => {
            window.scrollTo(0, 0);
            setRoute(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        if (window.location.hash) {
            handleHashChange();
        } else {
            window.location.hash = '#/';
        }
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('siteContent', JSON.stringify(siteContent));
    }, [siteContent]);

    useEffect(() => {
        localStorage.setItem('sitePosts', JSON.stringify(posts));
    }, [posts]);


    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        window.location.hash = '#/admin';
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        window.location.hash = '#/';
    };

    const handlePublishPost = (newPost: Omit<Post, 'id' | 'date' | 'author'>) => {
        const publishedPost: Post = {
            ...newPost,
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            date: new Date().toISOString().split('T')[0],
            author: 'Admin',
        };
        setPosts(prev => [publishedPost, ...prev]);
        alert('Post published successfully!');
        setTimeout(() => {
            window.location.hash = `#/board/${newPost.category}/${newPost.language}`;
        }, 500);
    };

    const handleDeletePost = (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(prev => prev.filter(p => p.id !== id));
        }
    };

    const renderContent = () => {
        if (route.startsWith('#/admin')) {
            if (!isAuthenticated) {
                return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />;
            }
            return <AdminPage onLogout={handleLogout} onPublishPost={handlePublishPost} siteContent={siteContent} onSiteContentChange={setSiteContent} posts={posts} onDeletePost={handleDeletePost} />;
        }

        if (route.startsWith('#/board/')) {
            const parts = route.split('/');
            if (parts.length === 4) {
                const [, , category, language] = parts;
                return (
                    <div className="sm:p-4 lg:p-6 max-w-[1600px] mx-auto p-2">
                        <Header route={route} verses={siteContent.verses} headerImage={siteContent.headerImage} siteContent={siteContent} />
                        <main className="mt-8">
                            <BoardPage category={category} language={language} posts={posts} siteContent={siteContent} />
                        </main>
                        <Footer />
                    </div>
                );
            }
        }

        return (
            <div className="sm:p-4 lg:p-6 max-w-[1600px] mx-auto p-2">
                <Header route={route} verses={siteContent.verses} headerImage={siteContent.headerImage} siteContent={siteContent} />
                <main>
                    <MainPageContent content={siteContent} />
                </main>
                <Footer />
            </div>
        );
    };

    return (
        <>
            {renderContent()}
            <ScrollToTopButton />
        </>
    );
};

export default App;
