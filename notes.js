//jshint esversion:6
'use strict';

const fs = require('fs');

//npm packages
const chalk = require('chalk');

const getNotes = () => {
    return "your notes";
}

const addNotes = (fileName, title, body) => {
    const notes = loadNotes(fileName);
    /*const duplicateSet = new Set(notes);
    const freshNotes = [...duplicateSet];
    //console.log(notes);
    freshNotes.push({
        titleofNote:title,
        bodyofNote:body
    });
    saveNotes(fileName,freshNotes);*/
    debugger
    const duplicateNotes = notes.filter((note) => {
        return note.titleOfNote === title
    });

    if (duplicateNotes.length === 0) {
        debugger
        notes.push({
            titleOfNote: title,
            bodyOfNote: body
        });
        saveNotes(fileName, notes);
        console.log(chalk.bgGreen.whiteBright.bold("Note added"));

    } else {
        console.log(chalk.bgRed.whiteBright.bold("Note title already taken and it is duplicate"));
    }

}

const loadNotes = (fileName) => {
    try {
        const dataBuffer = fs.readFileSync(fileName);
        const bufferString = dataBuffer.toString();
        return JSON.parse(bufferString);
    } catch (e) {
        return [];
    }

}

const saveNotes = (fileName, notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(fileName, dataJSON);
}


const removeNotes = (fileName, title) => {
    const notes = loadNotes(fileName);
    const length = notes.length;
    if (length !== 0) {
        notes.forEach((obj, idx) => {
            if (obj.titleOfNote === title) {
                notes.splice(idx, 1);
                console.log(chalk.bgGreen.whiteBright.bold("Notes deleted"));
            }
        });

        if (notes.length < length) {
            saveNotes(fileName, notes);
        } else {
            console.log(chalk.bgRed.whiteBright.bold("Title Doesn't exist No Notes to remove4"));
        }
    } else {
        console.log(chalk.bgRed.whiteBright.bold("No notes to remove"));
    }

};

const listNotes = (fileName) => {
    const notes = loadNotes(fileName);
    notes.forEach((item) => {
        console.log(chalk.magentaBright.bold(item.titleOfNote));
        console.log(chalk.yellowBright.bold(item.bodyOfNote));
    })
}


const readNote = (fileName, title) => {
    const notes = loadNotes(fileName);
    const length = notes.length;
    if (length !== 0) {
        console.log(notes);
        const note = notes.filter(n => n.titleOfNote === title)
        console.log(note);
        console.log(chalk.magentaBright.bold(note[0].titleOfNote));
        console.log(chalk.yellowBright.bold(note[0].bodyOfNote));
    } else {
        console.log(chalk.bgRed.whiteBright.bold("No notes to read"));
    }
}

module.exports = {
    addNotes,
    getNotes,
    removeNotes,
    listNotes,
    readNote
};