document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('add-note');
    const deleteAllBtn = document.getElementById('delete-all');
    const undoBtn = document.getElementById('undo');
    const noteText = document.getElementById('note-text');
    const noteColor = document.getElementById('note-color');
    const notesContainer = document.getElementById('notes-container');
    let undoStack = [];
    loadNotes();

    addNoteBtn.addEventListener('click', () => {
        if (noteText.value.trim() !== '') {
            createNote(noteText.value, noteColor.value);
            noteText.value = '';
            saveNotes();
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        if (notesContainer.children.length > 0) {
            const currentState = Array.from(notesContainer.children).map(note => ({
                text: note.querySelector('textarea').value,
                color: note.style.backgroundColor
            }));
            undoStack.push(currentState);
            undoBtn.disabled = false;
            Array.from(notesContainer.children).forEach(note => {
                note.classList.add('deleting');
            });
            setTimeout(() => {
                notesContainer.innerHTML = '';
                saveNotes();
            }, 300);
        }
    });

    undoBtn.addEventListener('click', () => {
        if (undoStack.length > 0) {
            const previousState = undoStack.pop();
            notesContainer.innerHTML = '';
            previousState.forEach(note => {
                createNote(note.text, note.color);
            });
            
            saveNotes();

            if (undoStack.length === 0) {
                undoBtn.disabled = true;
            }
        }
    });

    function createNote(text, color) {
        const note = document.createElement('div');
        note.className = 'note';
        note.style.backgroundColor = color;
        note.draggable = true;

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.addEventListener('input', saveNotes);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            const currentState = Array.from(notesContainer.children).map(note => ({
                text: note.querySelector('textarea').value,
                color: note.style.backgroundColor
            }));
            undoStack.push(currentState);
            undoBtn.disabled = false;

            note.classList.add('deleting');
            setTimeout(() => {
                note.remove();
                saveNotes();
            }, 300);
        });

        note.appendChild(textarea);
        note.appendChild(deleteBtn);
        notesContainer.appendChild(note);
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note').forEach(note => {
            notes.push({
                text: note.querySelector('textarea').value,
                color: note.style.backgroundColor
            });
        });
        localStorage.setItem('sticky-notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem('sticky-notes');
        if (savedNotes) {
            JSON.parse(savedNotes).forEach(note => {
                createNote(note.text, note.color);
            });
        }
    }

    noteText.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            addNoteBtn.click();
        }
    });

    let draggedNote = null;

    notesContainer.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('note')) {
            draggedNote = e.target;
            e.target.style.opacity = '0.5';
        }
    });

    notesContainer.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('note')) {
            e.target.style.opacity = '1';
        }
    });

    notesContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(notesContainer, e.clientY);
        const note = draggedNote;
        if (afterElement == null) {
            notesContainer.appendChild(note);
        } else {
            notesContainer.insertBefore(note, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.note:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});