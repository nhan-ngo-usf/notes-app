const chalk = require('chalk')
const { notStrictEqual } = require('node:assert')
const { string } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')
// Create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Notes title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Notes body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  },
})
//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title)
  },
})
//Create a list command
yargs.command({
  command: 'list',
  describe: 'List all existing notes',
  handler() {
    notes.listNotes()
  },
})
//Create a read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler(argv) {
    notes.readNote(argv.title)
  },
})
yargs.parse()
