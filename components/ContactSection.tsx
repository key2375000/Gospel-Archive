
import React from 'react';
import { MailIcon, SendIcon } from './icons';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="mt-24 mb-12 scroll-mt-20">
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-xl border border-stone-100 flex flex-col lg:flex-row gap-12 lg:gap-24">
                <div className="lg:w-1/2 flex flex-col justify-center">
                    <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-stone-900 mb-6">Contact with me</h2>
                    <p className="text-stone-500 text-lg font-light mb-8">
                        Gospel Archive values your thoughts and feedback. If you have any insights you would like to share regarding our gospel materials, or if there are specific resources you need for your ministry, please feel free to let us know.
                    </p>
                    <p className="text-stone-500 text-lg font-light mb-10">
                        Your suggestions play a vital role in building a richer gospel ecosystem, serving as a precious way for us to store up heavenly rewards together.
                    </p>
                </div>

                <div className="lg:w-1/2 bg-stone-50 rounded-3xl p-8">
                    <form action="https://formspree.io/f/xeeeeqlw" method="POST" className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Name</label>
                            <input type="text" name="name" className="w-full bg-white border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-shadow" placeholder="Your Name" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Email</label>
                            <input type="email" name="email" className="w-full bg-white border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-shadow" placeholder="email@example.com" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Message</label>
                            <textarea name="message" className="w-full bg-white border-0 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-900 focus:outline-none transition-shadow h-32 resize-none" placeholder="Share your insights or request resources..." required></textarea>
                        </div>
                        
                        <button type="submit" className="w-full bg-stone-900 text-white font-medium py-4 rounded-xl mt-4 hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 group">
                            Send Message
                            <SendIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
