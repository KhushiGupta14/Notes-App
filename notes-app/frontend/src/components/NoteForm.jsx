import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NoteForm = ({ currentNote, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setTagsInput(currentNote.tags ? currentNote.tags.join(', ') : '');
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tagsInput.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
      
    onSave({
      title,
      content,
      tags: tagsArray
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="header" style={{ marginBottom: '1.5rem' }}>
          <h2>{currentNote ? 'Edit Note' : 'Create New Note'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Design Meeting Notes"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              className="form-textarea" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input 
              type="text" 
              className="form-input" 
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="react, UI, planning" 
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-danger" onClick={onClose} style={{background: 'transparent', color: 'var(--text-secondary)'}}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {currentNote ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
