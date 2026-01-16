
import React, { useState } from 'react';

interface AdminLoginPageProps {
    onLoginSuccess: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, this would be a secure API call.
        // For this demo, we use hardcoded credentials for a single administrator.
        if (username === 'vpqtl43' && password === 'TNwhdrla12!') {
            setError('');
            onLoginSuccess();
        } else {
            setError('Incorrect ID or password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold text-center text-stone-900">Admin Login</h2>
                    <p className="text-sm text-center text-stone-500">Gospel Archive CMS</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                         <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">ID</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-shadow"
                            placeholder="Enter ID"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                         <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-shadow"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-stone-900 text-white font-medium py-3 rounded-xl hover:bg-stone-800 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                     <div className="text-center">
                        <a href="#/" className="text-xs text-stone-500 hover:underline">Return to main site</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;