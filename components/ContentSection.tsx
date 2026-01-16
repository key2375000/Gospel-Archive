
import React from 'react';
import ResourceCard from './ResourceCard';
import { CrossIcon, SproutIcon, GrapeIcon } from './icons';
import { Resource } from './siteData';

const iconMap: { [key: string]: React.ReactNode } = {
    cross: <CrossIcon />,
    sprout: <SproutIcon />,
    grape: <GrapeIcon />,
};

interface ContentSectionProps {
    resources: Resource[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ resources }) => {
    return (
        <section className="sm:px-6 mt-24 px-4 scroll-mt-24" id="content">
            <div className="text-center mb-12">
                <h2 className="sm:text-4xl text-3xl font-medium text-stone-900 tracking-tight">Gospel Content</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <ResourceCard
                        key={resource.id}
                        id={resource.id}
                        tag={resource.tag}
                        image={resource.image}
                        alt={resource.alt}
                        icon={iconMap[resource.icon] || <CrossIcon />}
                        title={resource.title}
                        description={resource.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default ContentSection;
