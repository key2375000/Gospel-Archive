
export interface Post {
    id: number;
    category: 'root' | 'stem' | 'fruit';
    language: 'english' | 'chinese' | 'korean';
    title: string;
    author: string;
    date: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
}

export const posts: Post[] = [
    { 
        id: 1, 
        category: 'root', 
        language: 'english', 
        title: 'The Foundation of Faith in Christ', 
        author: 'John Calvin', 
        date: '2024-07-20', 
        content: 'Full theological exposition on the foundational principles of faith. This message explores how the Gospel serves as the ultimate bedrock for all spiritual life.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    { 
        id: 2, 
        category: 'root', 
        language: 'english', 
        title: 'Understanding Grace and Law', 
        author: 'Martin Luther', 
        date: '2024-07-18', 
        content: 'A deep dive into the relationship between divine grace and Mosaic law. How do we live under grace while respecting the moral order of God?',
        imageUrl: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=2070&auto-format=fit-crop'
    },
    { id: 3, category: 'root', language: 'chinese', title: '信仰的根基', author: '王明道', date: '2024-07-20', content: '关于信仰基本原则的完整神学论述...' },
    { id: 4, category: 'root', language: 'chinese', title: '理解恩典与律法', author: '宋尚节', date: '2024-07-18', content: '深入探讨神的恩典与摩西律法之间的关系...' },
    { id: 5, category: 'root', language: 'korean', title: '그리스도 안의 믿음의 기초', author: '박윤선', date: '2024-07-20', content: '믿음의 기초 원리에 대한 완전한 신학적 해설...' },
    { id: 6, category: 'root', language: 'korean', title: '은혜와 율법의 이해', author: '김익두', date: '2024-07-18', content: '하나님의 은혜와 모세의 율법 사이의 관계에 대한 깊은 탐구...' },
    { id: 7, category: 'stem', language: 'english', title: 'Growing in Fellowship: A Study of Acts 2', author: 'Dietrich Bonhoeffer', date: '2024-07-19', content: 'Exploring the importance of community and shared faith...', videoUrl: 'https://vimeo.com/76979871' },
    { id: 11, category: 'fruit', language: 'english', title: 'Worship Resources for the Next Generation', author: 'Hillsong Kids', date: '2024-07-21', content: 'Creative and enriching materials to help children grow in faith...', imageUrl: 'https://images.unsplash.com/photo-1471440671318-55dfe1f5ad65?q=80&w=2070&auto-format=fit-crop' },
];
