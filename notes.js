const fs = require('fs')
const { readFileSync } = require('node:fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  debugger

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Title is taken'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const newNotes = notes.filter((note) => {
    return note.title !== title
  })

  saveNotes(newNotes)
  if (newNotes.length === notes.length) {
    console.log(chalk.bgRed('No note found!!!'))
  } else {
    console.log(chalk.green.inverse('Note removed'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue('Your notes: '))
  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = loadNotes()
  const targetNote = notes.find((note) => note.title === title)

  if (!targetNote) {
    console.log(chalk.red.inverse('No notes found?'))
  } else {
    console.log(chalk.magenta.bold.inverse(targetNote.title))
    console.log(targetNote.body)
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    const data = JSON.parse(dataJSON)
    return data
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  getNote: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
}
