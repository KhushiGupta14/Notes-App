import React from 'react';
import NoteCard from './NoteCard';
import { FileText } from 'lucide-react';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <FileText className="empty-icon" />
        <h2>No notes found</h2>
        <p>Create a new note to get started!</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard 
          key={note._id} 
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default NoteList;
