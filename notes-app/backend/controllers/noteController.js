const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /notes
// @access  Public
const getNotes = async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (tag) {
      query.tags = tag;
    }
    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get note by ID
// @route   GET /notes/:id
// @access  Public
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a note
// @route   POST /notes
// @access  Public
const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a note
// @route   PUT /notes/:id
// @access  Public
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /notes/:id
// @access  Public
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.deleteOne();
    res.status(200).json({ message: 'Note removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
