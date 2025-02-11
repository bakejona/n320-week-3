const readline = require('readline');
const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(__dirname, 'notes.json');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function loadNotes() {
    return fs.existsSync(NOTES_FILE) ? JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8')) : [];
}

function saveNotes(notes) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

function addNote() {
    rl.question('Enter note: ', (note) => {
        const notes = loadNotes();
        notes.push(note);
        saveNotes(notes);
        console.log('Note added');
        rl.close();
    });
}

function listNotes() {
    const notes = loadNotes();
    console.log('Notes:', notes.length ? notes.join('\n') : 'No notes found.');
    rl.close();
}

rl.question('Choose: (1) Add Note (2) List Notes: ', (choice) => {
    choice === '1' ? addNote() : listNotes();
});