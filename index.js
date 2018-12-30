const list = document.querySelector("#notes-list");
const form = document.querySelector("#notes-form");
const title = document.querySelector('#title');
const text = document.querySelector('#text');
let myStore;

// Note Class: represents a note
class Note {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

class UI {
  static displayNotes(notes) {
    notes.forEach((note) => UI.displayNoteInList(note));
  }

  static displayNoteInList(note) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${note.title}</td>
      <td>${note.text}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static clearFields() {
    title.value = '';
    text.value = '';
  }
}

// IndexedDB Store
class Store {
  constructor() {
    this.notes = [
      {
        title: '1st note',
        text: 'blabla'
      },
      {
        title: '2nd note',
        text: 'hello how are you'
      },
    ];
  }

  getNotes() {
    return this.notes;
  }

  addNoteToStore(note) {
    this.notes = [...this.notes, note];
  }
}

function init() {
  myStore = new Store();
  const storedNotes = myStore.getNotes();
  UI.displayNotes(storedNotes);
}

function handleAddNote(e) {
  // Prevent default submit
  e.preventDefault();

  // Get form values
  const titleValue = title.value;
  const textValue = text.value;

  // Create new note and store it into the store
  const note = new Note(titleValue, textValue);
  myStore.addNoteToStore(note);

  // Clean the UI
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // Display notes that are in the updated store
  const storedNotes = myStore.getNotes();
  UI.displayNotes(storedNotes);

  // Clear Form values
  UI.clearFields();
}

// On Load
document.addEventListener('DOMContentLoaded', init);

// On Add
form.addEventListener('submit', (e) => handleAddNote(e));