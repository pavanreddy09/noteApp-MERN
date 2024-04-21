const Note = require("../models/notesmodel");

const getNotes = async (req, res) => {
  const notes = await Note.find({ email: req.user.email });

  if (notes) {
    res.json(notes);
  } else {
    res.status(400).json("Something went wrong! Please try again later.");
  }
};

const createNote = async (req, res) => {
  const { title, content, category, email } = req.body;

  const note = await Note.create({ title, content, category, email });

  if (note) {
    res.json(note);
  } else {
    res.status(400).json("Something went wrong! Please try again later.");
  }
};

const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const note = await Note.findByIdAndUpdate(id, {
    title: title,
    content: content,
    category: category,
    email: req.user.email,
  });
  if (note) {
    res.json(note);
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  const deletenote = await Note.deleteOne({ _id: id });
  if (deletenote) {
    res.json(deletenote);
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong! Please try again later." });
  }
};

module.exports = { getNotes, createNote, getNote, updateNote, deleteNote };
