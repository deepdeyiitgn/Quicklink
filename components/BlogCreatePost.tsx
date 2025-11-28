

import React, { useState, useContext, useRef } from 'react';
// FIX: Corrected import from "react-router-dom" to resolve module not found errors by changing single quotes to double quotes.
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { BlogContext } from '../contexts/BlogContext';
import { LoadingIcon, UploadIcon, MicrophoneIcon, XIcon } from './icons/IconComponents';
import type { User, UserBadge, AuthContextType } from '../types';
import { IKUpload } from 'imagekitio-react';

type PostType = 'normal' | 'html';

const getUserBadge = (user: User | null): UserBadge => {
    if (!user) return 'normal';
    if (user.isAdmin) return 'owner';
    const hasActiveSub = (user.subscription && user.subscription.expiresAt > Date.now()) || (user.apiAccess?.subscription && user.apiAccess.subscription.expiresAt > Date.now());
    return hasActiveSub ? 'premium' : 'normal';
};

const BlogCreatePost: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const blog = useContext(BlogContext);
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState<PostType>('normal');
    const [images, setImages] = useState<{ url: string; name: string; size: number }[]>([]);
    const [audio, setAudio] = useState<{ url: string; name: string; size: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const imageUploadRef = useRef<any>(null);
    const audioUploadRef = useRef<any>(null);

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    
    const totalImageSize = images.reduce((sum, img) => sum + img.size, 0);
    const MAX_TOTAL_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

    const canUploadImage = !audio && images.length < 2 && totalImageSize < MAX_TOTAL_IMAGE_SIZE;
    const canUploadAudio = images.length === 0 && !audio;
    
    const validateImage = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError(`"${file.name}" is not a valid image file.`);
            return false;
        }
        if (file.size > MAX_TOTAL_IMAGE_SIZE) {
            setError(`Image "${file.name}" is too large. Max size per image is 10MB.`);
            return false;
        }
        if (totalImageSize + file.size > MAX_TOTAL_IMAGE_SIZE) {
            setError(`Total image size cannot exceed 10MB. You have ${formatBytes(MAX_TOTAL_IMAGE_SIZE - totalImageSize)} remaining.`);
            return false;
        }
        return true;
    };

    const validateAudio = (file: File) => {
        const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB
        if (!file.type.startsWith('audio/')) {
            setError('Please select a valid audio file.');
            return false;
        }
        if (file.size > MAX_AUDIO_SIZE) {
            setError(`Audio file is too large. Max size is 10MB.`);
            return false;
        }
        return true;
    };
    
    const removeImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };
    
    const removeAudio = () => {
        setAudio(null);
        if (audioUploadRef.current?.getInputRef()) {
            audioUploadRef.current.getInputRef().value = "";
        }
    };
    
    const insertTag = (tag: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = `${content.substring(0, start)}<${tag}>${selectedText}</${tag}>${content.substring(end)}`;
        
        setContent(newText);
        textarea.focus();
        setTimeout(() => textarea.setSelectionRange(start + tag.length + 2, end + tag.length + 2), 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.currentUser || !blog) return;

        if (!title.trim() || !content.trim()) {
            setError('Title and content are required.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await blog.addPost({
                userId: auth.currentUser.id,
                userName: auth.currentUser.name,
                userBadge: getUserBadge(auth.currentUser),
                title,
                content,
                postType,
                imageUrls: images.map(img => img.url),
                audioUrl: audio ? audio.url : null,
            });
            navigate('/blog');
        } catch (err) {
            setError('Failed to create post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 md:p-8 rounded-2xl mb-8 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">Create a New Post</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post Title"
                    className="block w-full rounded-md border-0 bg-black/30 py-2.5 px-3 text-brand-light shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm"
                    required
                />

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-300">Post Type:</span>
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="postType" value="normal" checked={postType === 'normal'} onChange={() => setPostType('normal')} className="text-brand-primary focus:ring-brand-primary bg-black/30 border-white/30" />
                            <span className="text-sm">Normal</span>
                        </label>
                         <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="postType" value="html" checked={postType === 'html'} onChange={() => setPostType('html')} className="text-brand-primary focus:ring-brand-primary bg-black/30 border-white/30" />
                            <span className="text-sm">HTML</span>
                        </label>
                    </div>
                </div>
                
                <div className={`${postType === 'normal' ? 'flex' : 'hidden'} p-2 bg-black/30 rounded-t-md border-b border-white/20 items-center gap-2`}>
                    <button type="button" onClick={() => insertTag('b')} className="px-3 py-1 text-sm bg-white/10 rounded font-bold hover:bg-white/20">B</button>
                    <button type="button" onClick={() => insertTag('i')} className="px-3 py-1 text-sm bg-white/10 rounded italic hover:bg-white/20">I</button>
                    <button type="button" onClick={() => insertTag('pre')} className="px-3 py-1 text-sm bg-white/10 rounded font-mono hover:bg-white/20">&lt;/&gt;</button>
                </div>
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={postType === 'html' ? "Enter your full HTML code here..." : "Share your thoughts..."}
                    rows={6}
                    className={`block w-full border-0 bg-black/30 py-2.5 px-3 text-brand-light shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm resize-y ${postType === 'normal' ? 'rounded-b-md' : 'rounded-md'}`}
                    required
                />

                <div className="grid sm:grid-cols-2 gap-4">
                     <button
                        type="button"
                        onClick={() => imageUploadRef.current?.click()}
                        disabled={isUploading || !canUploadImage}
                        className={`cursor-pointer w-full text-center px-4 py-3 text-sm font-semibold text-gray-300 bg-white/10 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}>
                        <UploadIcon className="h-5 w-5"/>
                        {images.length > 0 ? `Add Image (${images.length}/2)` : 'Upload Image(s)'}
                    </button>
                    <IKUpload
                        style={{ display: 'none' }}
                        ref={imageUploadRef}
                        folder="/quicklink-blog-images"
                        validateFile={validateImage}
                        onUploadStart={() => { setIsUploading(true); setError(''); }}
                        onError={(err) => {
                            console.error("ImageKit upload error:", err);
                            setError(error || "An image failed to upload. Please check the file size and type.");
                            setIsUploading(false);
                        }}
                        onSuccess={(res) => {
                             setImages(prev => [...prev, { url: res.url, name: res.name, size: res.size }]);
                             if (audio) removeAudio();
                             setIsUploading(false);
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => audioUploadRef.current?.click()}
                        disabled={isUploading || !canUploadAudio}
                        className={`cursor-pointer w-full text-center px-4 py-3 text-sm font-semibold text-gray-300 bg-white/10 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}>
                        <MicrophoneIcon className="h-5 w-5"/>
                        {audio ? 'Change Audio' : 'Upload Audio'}
                    </button>
                    <IKUpload
                        style={{ display: 'none' }}
                        ref={audioUploadRef}
                        folder="/quicklink-blog-audio"
                        validateFile={validateAudio}
                        onUploadStart={() => { setIsUploading(true); setError(''); }}
                        onError={(err) => {
                            console.error("ImageKit upload error:", err);
                            setError(error || "Audio upload failed. Please check the file size and type.");
                            setIsUploading(false);
                        }}
                        onSuccess={(res) => {
                            setAudio({ url: res.url, name: res.name, size: res.size });
                            setImages([]); // Clear images if audio is added
                            setIsUploading(false);
                        }}
                    />
                </div>
                
                {images.length > 0 && (
                     <div className="p-2 bg-black/20 rounded-lg space-y-2">
                        <div className="flex items-center gap-4 flex-wrap">
                            {images.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img src={img.url} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                        <p className="text-white text-[10px] font-mono text-center break-all leading-tight">{img.name}</p>
                                        <p className="text-white text-[10px] font-mono">{formatBytes(img.size)}</p>
                                    </div>
                                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                                        <XIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-right text-xs text-gray-400 font-mono">Total: {formatBytes(totalImageSize)} / 10MB</div>
                     </div>
                )}

                 {audio && (
                     <div className="p-2 bg-black/20 rounded-lg space-y-2">
                         <audio src={audio.url} controls className="h-10 w-full" />
                         <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 truncate pr-4">{audio.name} ({formatBytes(audio.size)})</p>
                            <button type="button" onClick={removeAudio} className="text-xs text-red-400 hover:underline flex-shrink-0">Remove Audio</button>
                         </div>
                     </div>
                )}


                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button type="submit" disabled={isLoading || isUploading} className="w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_15px_rgba(0,229,255,0.5)] hover:bg-brand-primary/80 disabled:opacity-50 transition-all">
                    {isLoading || isUploading ? <LoadingIcon className="animate-spin h-5 w-5" /> : 'Submit Post'}
                </button>
            </form>
        </div>
    );
};

export default BlogCreatePost;