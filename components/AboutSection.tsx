
import React from 'react';

interface AboutSectionProps {
    content: {
        title: string;
        p1: string;
        p2: string;
    };
}

const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
    return (
        <section id="about" className="mt-24 px-4 sm:px-6 scroll-mt-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="sm:text-4xl text-3xl font-medium text-stone-900 tracking-tight mb-8">
                    {content.title}
                </h2>
                <div className="space-y-4">
                    <p className="leading-relaxed text-lg font-light text-stone-500">
                        {content.p1}
                    </p>
                    <p className="leading-relaxed text-lg font-light text-stone-500">
                        {content.p2}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
