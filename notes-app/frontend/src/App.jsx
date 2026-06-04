import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import { Plus } from 'lucide-react';

function App() {
  const [notes, setNotes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch notes on load and when search changes
  useEffect(() => {
    fetchNotes(searchQuery);
  }, [searchQuery]);

  const fetchNotes = async (query) => {
    try {
      const data = await getNotes(query);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleCreateOrUpdate = async (noteData) => {
    try {
      if (currentNote) {
        await updateNote(currentNote._id, noteData);
      } else {
        await createNote(noteData);
      }
      setIsFormOpen(false);
      setCurrentNote(null);
      fetchNotes(searchQuery); // Refresh list
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        fetchNotes(searchQuery);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const openNewNoteForm = () => {
    setCurrentNote(null);
    setIsFormOpen(true);
  };

  const openEditForm = (note) => {
    setCurrentNote(note);
    setIsFormOpen(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          Notified
        </h1>
        <div style={{ display: 'flex', gap: '1.5rem', flex: 1, justifyContent: 'flex-end', marginLeft: '2rem' }}>
          <SearchBar onSearch={setSearchQuery} />
          <button className="btn btn-primary" onClick={openNewNoteForm}>
            <Plus size={20} />
            <span>New Note</span>
          </button>
        </div>
      </header>

      <main>
        <NoteList 
          notes={notes} 
          onEdit={openEditForm} 
          onDelete={handleDelete} 
        />
      </main>

      {isFormOpen && (
        <NoteForm 
          currentNote={currentNote} 
          onSave={handleCreateOrUpdate} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
