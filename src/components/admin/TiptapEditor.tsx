'use client';

import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  ImagePlus,
  Loader2,
} from 'lucide-react';

const BRAND_COLORS = [
  { name: 'Deep Emerald', hex: '#264E41' },
  { name: 'Forest Pine', hex: '#1D3D33' },
  { name: 'Deep Charcoal', hex: '#1C2321' },
  { name: 'Amber Gold', hex: '#D97706' },
  { name: 'Slate Gray', hex: '#4A5568' },
];

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      TextStyle,
      Color,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Compose your detailed travel story, day-by-day itinerary stops, or packing guides...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'editorial-content prose prose-stone max-w-none focus:outline-none min-h-[340px] p-5 text-sm text-brand-slate',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Synchronize content when editing an existing post or when content prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
    } catch (err: any) {
      alert(err.message || 'Image upload failed.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!editor) return null;

  return (
    <div className="border border-brand-stone rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Sticky Formatting Toolbar */}
      <div className="sticky top-0 z-20 bg-brand-alabaster/95 backdrop-blur border-b border-brand-stone p-2.5 flex flex-wrap items-center gap-1.5 text-brand-charcoal">
        {/* Headings Selector */}
        <select
          value={
            editor.isActive('heading', { level: 2 })
              ? '2'
              : editor.isActive('heading', { level: 3 })
              ? '3'
              : editor.isActive('heading', { level: 4 })
              ? '4'
              : 'p'
          }
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'p') editor.chain().focus().setParagraph().run();
            else if (val === '2') editor.chain().focus().toggleHeading({ level: 2 }).run();
            else if (val === '3') editor.chain().focus().toggleHeading({ level: 3 }).run();
            else if (val === '4') editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-brand-stone bg-white text-brand-charcoal focus:outline-none focus:border-brand-emerald"
        >
          <option value="p">Normal Text</option>
          <option value="2">Heading 2 (Playfair)</option>
          <option value="3">Heading 3 (Playfair)</option>
          <option value="4">Heading 4</option>
        </select>

        <div className="h-4 w-px bg-brand-stone mx-1" />

        {/* Brand Text Color Swatches */}
        <div className="flex items-center gap-1 px-1">
          {BRAND_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              title={c.name}
              onClick={() => editor.chain().focus().setColor(c.hex).run()}
              className="w-5 h-5 rounded-full border border-black/10 hover:scale-110 transition shadow-xs"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="h-4 w-px bg-brand-stone mx-1" />

        {/* Basic Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition ${
            editor.isActive('bold')
              ? 'bg-brand-emerald text-white'
              : 'hover:bg-white text-brand-slate'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition ${
            editor.isActive('italic')
              ? 'bg-brand-emerald text-white'
              : 'hover:bg-white text-brand-slate'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg transition ${
            editor.isActive('strike')
              ? 'bg-brand-emerald text-white'
              : 'hover:bg-white text-brand-slate'
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg transition ${
            editor.isActive('bulletList')
              ? 'bg-brand-emerald text-white'
              : 'hover:bg-white text-brand-slate'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg transition ${
            editor.isActive('orderedList')
              ? 'bg-brand-emerald text-white'
              : 'hover:bg-white text-brand-slate'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg transition ${
            editor.isActive('blockquote')
              ? 'bg-brand-emerald text-white'
              : 'hover:bg-white text-brand-slate'
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-lg hover:bg-white text-brand-slate transition"
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-brand-stone mx-1" />

        {/* Inline Image Upload Trigger */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />
        <button
          type="button"
          disabled={uploadingImage}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-brand-stone/40 border border-brand-stone rounded-lg text-xs font-semibold text-brand-emerald transition"
        >
          {uploadingImage ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <ImagePlus className="w-3.5 h-3.5" />
              <span>+ Insert Image Inside Text</span>
            </>
          )}
        </button>
      </div>

      {/* Writing Canvas */}
      <EditorContent editor={editor} />
    </div>
  );
}
