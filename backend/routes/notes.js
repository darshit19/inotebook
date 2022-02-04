const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");//import fetchuser from middleware folder
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Get all the Notes using : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})



//ROUTE 2 : Add a new note using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        //If there are errors,return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})



//ROUTE 3 : Update an existing note using : PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Create a new note
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);//params id is the id which is passed in the url
        if (!note) { return res.status(404).send("Not Found") };

        //this validation is for if userid of the note and userid of the loggedin user will not match then we won't allow to update note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");

    }



})



//ROUTE 4 : Delete an existing note using : DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);//params id is the id which is passed in the url
        if (!note) { return res.status(404).send("Not Found") };

        //this validation is for if userid of the note and userid of the loggedin user will not match then we won't allow to delete note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }


    //Find the note to be deleted and delete it


})
module.exports = router;