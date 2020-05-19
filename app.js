//npm packages
const chalk = require('chalk');
const yargs = require('yargs');

//import other js files
const notes = require('./notes');

//command Line Arguments
//console.log(process.argv);

//command Line Arguments to get the string which we enterd
//console.log(process.argv[process.argv.length-1])

/*
const command = process.argv[2];

if(command ==='add'){
    console.log(success);
    console.log("Adding Your Notes: "+ chalk.greenBright.bold(command)); 
    console.log("Your Notes is:"+ process.argv[3]);
}else if(command ==='remove'){
    console.log(success);
    console.log("Removing Your Notes:"+ chalk.greenBright.bold(command));
}else{
    console.log(error);
}
*/

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        fileName: {
            describe: "Name of the JSON file",
            demandOption: true,
            type: "string"
        },
        title: {
            describe: "Notes title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Notes Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(success + chalk.cyanBright.bold(' Adding a new note! '));
        console.log("File Name: " + chalk.redBright.bold(argv.fileName));
        console.log("Title: " + chalk.redBright.bold(argv.title));
        console.log("Body: " + chalk.redBright.bold(argv.body));
        notes.addNotes(argv.fileName, argv.title, argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        fileName: {
            describe: "Name of the JSON file",
            demandOption: true,
            type: "string"
        },
        title: {
            describe: "Notes title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log(success + chalk.redBright.bold(' Removing a new note!'));
        console.log("Title to Remove:" + chalk.redBright.bold(argv.title));
        notes.removeNotes(argv.fileName, argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    builder: {
        fileName: {
            describe: "Name of the JSON file",
            demandOption: true,
            type: "string"
        }

    },
    handler: (argv) => {
        console.log(success + chalk.yellowBright.bold(' Listing notes!'));
        notes.listNotes(argv.fileName);
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        fileName: {
            describe: "Name of the JSON file",
            demandOption: true,
            type: "string"
        },
        title: {
            describe: "Notes title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log(success + chalk.blueBright.bold('Reading a note!'));
        notes.readNote(argv.fileName,argv.title);
    }
})



yargs.parse()
//console.log(yargs.argv);