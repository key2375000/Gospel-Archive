
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
        <section id="about" className="mt-16 sm:mt-24 px-5 sm:px-10 scroll-mt-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-6 sm:mb-8">
                    {content.title}
                </h2>
                <div className="space-y-4 px-2">
                    <p className="leading-relaxed text-base sm:text-lg font-light text-stone-500">
                        {content.p1}
                    </p>
                    <p className="leading-relaxed text-base sm:text-lg font-light text-stone-500">
                        {content.p2}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
