const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updated: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "secound note",
    body: "some dummy text secound",
    updated: "2021-10-31T15:03:23.556Z",
  },

  {
    id: 3,
    title: "third note",
    body: "some dummy text third",
    updated: "2021-11-01T10:47:26.889Z",
  },
];

export default class NotesAPI {
  // get all note:
  static getAllNotes() {
    const sevedNotes = JSON.parse(localStorage.getItem("note-app")) || [];
    return sevedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  // save new note or edit old note
  static saveNotes(noteToSave) {
    // 1.existed or 2. not
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((n) => n.id === noteToSave.id);
    if (existedNote) {
      existedNote.updated = new Date().toISOString();
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("note-app", JSON.stringify(notes));
  }
  // delete note
  static deleteNotes(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNote = notes.filter((n) => n.id !== Number(id));
    localStorage.setItem("note-app", JSON.stringify(filteredNote));
  }
}
