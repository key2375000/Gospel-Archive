
import React, { useState } from 'react';
import { SiteContent, Verse, Resource } from './siteData';
import { TrashIcon } from './icons';

interface SiteSettingsEditorProps {
    content: SiteContent;
    onSave: (newContent: SiteContent) => void;
}

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({ content, onSave }) => {
    const [formData, setFormData] = useState<SiteContent>(content);
    const [isSaving, setIsSaving] = useState(false);

    const handleLabelChange = (type: 'categories' | 'languages', key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            labels: {
                ...prev.labels,
                [type]: {
                    ...prev.labels[type],
                    [key]: value
                }
            }
        }));
    };

    const deleteCategory = (key: string) => {
        if (!window.confirm(`Remove ${key} from navigation? Posts in this category will still exist but won't be accessible via the menu.`)) return;
        setFormData(prev => {
            const newCats = { ...prev.labels.categories };
            delete newCats[key];
            return {
                ...prev,
                labels: { ...prev.labels, categories: newCats }
            };
        });
    };

    const handleVerseChange = (index: number, field: keyof Verse, value: string) => {
        const newVerses = [...formData.verses];
        newVerses[index] = { ...newVerses[index], [field]: value };
        setFormData(prev => ({ ...prev, verses: newVerses }));
    };

    const addVerse = () => {
        setFormData(prev => ({
            ...prev,
            verses: [...prev.verses, { text: '', reference: '' }]
        }));
    };

    const deleteVerse = (index: number) => {
        setFormData(prev => ({
            ...prev,
            verses: prev.verses.filter((_, i) => i !== index)
        }));
    };

    const handleAboutChange = (field: 'title' | 'p1' | 'p2', value: string) => {
        setFormData(prev => ({
            ...prev,
            about: { ...prev.about, [field]: value }
        }));
    };

    const handleBoardDescriptionChange = (category: string, language: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            boardDescriptions: {
                ...prev.boardDescriptions,
                [category]: {
                    ...prev.boardDescriptions[category],
                    [language]: value
                }
            }
        }));
    };

    const handleResourceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof Resource) => {
        const value = e.target.value;
        setFormData(prev => {
            const newResources = [...prev.resources];
            newResources[index] = { ...newResources[index], [field]: value };
            return { ...prev, resources: newResources };
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const base64 = await toBase64(file);
            callback(base64);
        }
    };
    
    const handleSaveChanges = () => {
        setIsSaving(true);
        onSave(formData);
        setTimeout(() => {
            setIsSaving(false);
            alert('Site configuration synchronized!');
        }, 500);
    };
    
    return (
        <div className="space-y-12 pb-20">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-stone-100 shadow-sm sticky top-20 z-10">
                <h1 className="text-2xl font-bold text-stone-900">Site Configuration</h1>
                <button onClick={handleSaveChanges} className="text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl px-8 py-3 transition-all disabled:bg-stone-300" disabled={isSaving}>
                    {isSaving ? 'Processing...' : 'Save Configuration'}
                </button>
            </div>

            {/* Navigation Management */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-8">Navigation & Menu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex justify-between">
                            Top Menu Categories 
                            <span className="text-stone-300 normal-case font-normal">(Change order via code or edit labels)</span>
                        </label>
                        {Object.keys(formData.labels.categories).map(key => (
                            <div key={key} className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-stone-300 w-12">{key}:</span>
                                <input type="text" value={formData.labels.categories[key]} onChange={e => handleLabelChange('categories', key, e.target.value)} className="flex-grow bg-stone-50 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-900" />
                                <button onClick={() => deleteCategory(key)} className="text-stone-300 hover:text-rose-500 transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Language Names</label>
                        {Object.keys(formData.labels.languages).map(key => (
                            <div key={key} className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-stone-300 w-12">{key}:</span>
                                <input type="text" value={formData.labels.languages[key]} onChange={e => handleLabelChange('languages', key, e.target.value)} className="flex-grow bg-stone-50 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-900" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Header Settings */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-8">Home Header & Verses</h3>
                <div className="space-y-8">
                    <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-4">Header Background Image</label>
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <img src={formData.headerImage} alt="Header Preview" className="w-full md:w-64 aspect-video object-cover rounded-2xl shadow-sm" />
                            <div className="space-y-2">
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setFormData(prev => ({...prev, headerImage: url})))} className="text-sm" />
                                <p className="text-[10px] text-stone-400 max-w-xs">Upload a high-resolution landscape image (recommended 3840x2160).</p>
                                <button onClick={() => setFormData(prev => ({...prev, headerImage: ''}))} className="text-xs text-rose-500 font-medium hover:underline">Remove current photo</button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-stone-50">
                        <div className="flex justify-between items-center mb-6">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Rotating Bible Verses</label>
                            <button onClick={addVerse} className="text-xs font-bold text-stone-900 bg-stone-100 px-4 py-2 rounded-full hover:bg-stone-200 transition-colors">+ Add Verse</button>
                        </div>
                        <div className="space-y-4">
                            {formData.verses.map((verse, idx) => (
                                <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 relative group">
                                    <button onClick={() => deleteVerse(idx)} className="absolute top-4 right-4 text-stone-300 hover:text-rose-500">
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pr-10">
                                        <div className="md:col-span-3">
                                            <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Verse Text</label>
                                            <textarea value={verse.text} onChange={e => handleVerseChange(idx, 'text', e.target.value)} className="w-full bg-white border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-900 h-20 resize-none" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Reference</label>
                                            <input type="text" value={verse.reference} onChange={e => handleVerseChange(idx, 'reference', e.target.value)} className="w-full bg-white border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-900" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section Settings */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-8">Mission Statement (About)</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Section Title</label>
                        <input type="text" value={formData.about.title} onChange={e => handleAboutChange('title', e.target.value)} className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-lg font-bold" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Primary Paragraph</label>
                        <textarea value={formData.about.p1} onChange={e => handleAboutChange('p1', e.target.value)} className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-sm h-32" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Secondary Paragraph</label>
                        <textarea value={formData.about.p2} onChange={e => handleAboutChange('p2', e.target.value)} className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-sm h-32" />
                    </div>
                </div>
            </div>

            {/* Board Descriptions */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-8">Board Descriptions</h3>
                <div className="space-y-8">
                    {Object.keys(formData.labels.categories).map(catKey => (
                        <div key={catKey} className="space-y-4">
                            <h4 className="text-xs font-bold text-stone-900 uppercase">{formData.labels.categories[catKey]} Boards</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.keys(formData.labels.languages).map(langKey => (
                                    <div key={langKey} className="space-y-2">
                                        <label className="text-[9px] font-bold text-stone-400 uppercase">{formData.labels.languages[langKey]}</label>
                                        <textarea 
                                            value={formData.boardDescriptions[catKey]?.[langKey] || ''} 
                                            onChange={e => handleBoardDescriptionChange(catKey, langKey, e.target.value)}
                                            className="w-full bg-stone-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-stone-900 h-24 resize-none"
                                            placeholder={`Description for ${formData.labels.categories[catKey]} (${langKey})`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resource Cards Settings */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-8">Home Content Cards</h3>
                <div className="space-y-12">
                    {formData.resources.map((resource, index) => (
                        <div key={resource.id} className="p-8 bg-stone-50 rounded-3xl border border-stone-100">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Card Image</label>
                                    <img src={resource.image} alt={resource.alt} className="w-full aspect-video object-cover rounded-2xl shadow-sm border border-stone-200" />
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (dataUrl) => {
                                        const newResources = [...formData.resources];
                                        newResources[index].image = dataUrl;
                                        setFormData(prev => ({...prev, resources: newResources}));
                                    })} className="text-[10px] font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white file:text-stone-900 cursor-pointer"/>
                                </div>
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Display Title</label>
                                        <input type="text" value={resource.title} onChange={e => handleResourceChange(e, index, 'title')} className="w-full bg-white border border-stone-100 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Short Description</label>
                                        <textarea value={resource.description} onChange={e => handleResourceChange(e, index, 'description')} className="w-full bg-white border border-stone-100 rounded-xl px-4 py-3 text-sm h-24" />
                                    </div>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SiteSettingsEditor;
