
export interface Verse {
    text: string;
    reference: string;
}

export interface Resource {
    id: string;
    tag: string;
    image?: string;
    alt: string;
    icon: string;
    title: string;
    description: string;
}

export interface SiteContent {
    verses: Verse[];
    about: {
        title: string;
        p1: string;
        p2: string;
    };
    resources: Resource[];
    headerImage: string;
    labels: {
        categories: { [key: string]: string };
        languages: { [key: string]: string };
    };
    boardDescriptions: {
        [category: string]: {
            [language: string]: string;
        };
    };
}

export const initialSiteContent: SiteContent = {
    headerImage: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=3870&auto-format=fit-crop',
    verses: [
        { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16 (NIV)" },
        { text: "\"For I know the plans I have for you,\" declares the Lord, \"plans to prosper you and not to harm you, plans to give you hope and a future.\"", reference: "Jeremiah 29:11 (NIV)" },
        { text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", reference: "Romans 5:8 (NIV)" },
    ],
    about: {
        title: "Mission of Gospel Archive",
        p1: "Welcome to Gospel Archive, a dedicated platform for preserving and distributing the pure essence of the Gospel.",
        p2: "Our mission is to nourish souls and share the message of salvation, helping believers grow in their faith.",
    },
    resources: [
        {
            id: 'root',
            tag: 'The Root',
            image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto-format=fit-crop',
            alt: 'The Root of Faith',
            icon: 'cross',
            title: 'The Root of Faith',
            description: 'Establishing a firm foundation of faith through theological expositions.',
        },
        {
            id: 'stem',
            tag: 'The Stem',
            image: 'https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?q=80&w=2070&auto-format=fit-crop',
            alt: 'The Stem of the Word',
            icon: 'sprout',
            title: 'The Stem of the Word',
            description: 'A joyful space for exploration and fellowship.',
        },
        {
            id: 'fruit',
            tag: 'The Fruit',
            image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=2070&auto-format=fit-crop',
            alt: 'The Fruit of the Gospel',
            icon: 'grape',
            title: 'The Fruit of the Gospel',
            description: 'Sharing creative and enriching worship resources.',
        }
    ],
    labels: {
        categories: {
            root: 'The Root',
            stem: 'The Stem',
            fruit: 'The Fruit'
        },
        languages: {
            english: 'English',
            chinese: 'Chinese',
            korean: 'Korean'
        }
    },
    boardDescriptions: {
        root: {
            english: 'Deep theological insights and foundational teachings of the Christian faith.',
            chinese: '深入的神学洞察和基督信仰的基础教学。',
            korean: '그리스도교 신앙의 깊은 신학적 통찰과 기초 교리를 다룹니다.'
        },
        stem: {
            english: 'Daily meditations and community discussions to grow your spiritual life.',
            chinese: '每日冥想和社区讨论，促进您的灵性成长。',
            korean: '영적 성장을 위한 매일의 묵상과 공동체 토론 공간입니다.'
        },
        fruit: {
            english: 'Practical resources for families, children, and ministry outreach.',
            chinese: '适用于家庭、儿童和事工外展的实用资源。',
            korean: '가정, 어린이 및 사역 활동을 위한 실질적인 자료들을 공유합니다.'
        }
    }
};
