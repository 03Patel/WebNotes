const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');


const Note = require('../models/Note');


// Create note
router.post(
  "/",
  [auth, body("title").notEmpty(), body("content").notEmpty()],
  async (req, res) => {
    console.log("BODY:", req.body)

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, content, tags } = req.body;
    console.log("CONTENT:", content);

    try {
      const note = new Note({ user: req.user.id, title, content, tags });
      await note.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);



// Read all (with optional search via query ?q=)
router.get('/', auth, async (req, res) => {
try {
const q = req.query.q;
const filter = { user: req.user.id };
if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { body: { $regex: q, $options: 'i' } }];
const notes = await Note.find(filter).sort({ createdAt: -1 });
const result = notes.map(n => ({
      _id: n._id,
      title: n.title,
      content: n.content, 
      tags: n.tags,
      createdAt: n.createdAt
    }));
res.json(result);
} catch (err) { res.status(500).send('Server error'); }
});


// Update
router.put('/:id', auth, async (req, res) => {
try {
const updated = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
if (!updated) return res.status(404).json({ message: 'Not found' });
res.json(updated);
} catch (err) { res.status(500).send('Server error'); }
});


// Delete
router.delete('/:id', auth, async (req, res) => {
try {
const removed = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
if (!removed) return res.status(404).json({ message: 'Not found' });
res.json({ message: 'Deleted' });
} catch (err) { res.status(500).send('Server error'); }
});


module.exports = router;