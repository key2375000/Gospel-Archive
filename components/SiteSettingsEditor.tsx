
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
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-stone-100 shadow-sm sticky top-20 z-10">
                <h1 className="text-2xl font-bold text-stone-900">Global Configuration</h1>
                <button onClick={handleSaveChanges} className="text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl px-8 py-3 transition-all disabled:bg-stone-300" disabled={isSaving}>
                    {isSaving ? 'Processing...' : 'Save Configuration'}
                </button>
            </div>

            {/* Menu Labels */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-4 mb-8">Navigation & Menu Labels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Category Names</label>
                        {Object.keys(formData.labels.categories).map(key => (
                            <div key={key} className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-stone-300 w-12">{key}:</span>
                                <input type="text" value={formData.labels.categories[key]} onChange={e => handleLabelChange('categories', key, e.target.value)} className="flex-grow bg-stone-50 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-stone-900" />
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
