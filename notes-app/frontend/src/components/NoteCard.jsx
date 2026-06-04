import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, dateOptions);

  return (
    <div className="note-card glass-panel">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button className="btn-icon" onClick={() => onEdit(note)} aria-label="Edit note">
            <Pencil size={18} />
          </button>
          <button className="btn-icon" onClick={() => onDelete(note._id)} aria-label="Delete note">
            <Trash2 size={18} className="danger" />
          </button>
        </div>
      </div>
      
      <p className="note-content">{note.content}</p>
      
      <div className="note-footer">
        <div className="note-tags">
          {note.tags && note.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <span className="text-secondary" style={{ fontSize: '0.8rem' }}>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NoteCard;
