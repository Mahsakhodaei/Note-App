import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    //set notes :
    this._setNotes(notes);
    // set active note
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNoteList(note);
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }
  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note ...",
          body: "Take some note ...",
        };
        NotesAPI.saveNotes(newNote);
        this._refreshNotes();
      },

      onNoteEdite: (newTitle, newBody) => {
        NotesAPI.saveNotes({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },

      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find(
          (note) => note.id === Number(noteId)
        );
        //select => 1. selected class add , 2. title and body => preview update
        // this.activeNote = selectedNote;
        // this.view.updateActiveNoteList(selectedNote);
        this._setActiveNote(selectedNote);
      },

      onNoteDelete: (noteId) => {
        console.log(noteId);
        NotesAPI.deleteNotes(noteId);
        this._refreshNotes();
      },
    };
  }
}
