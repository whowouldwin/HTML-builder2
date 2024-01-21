const readline = require('readline');
const fs = require('fs');
const path = require("path");

// a write stream for the output file (flag a - append)
const fileStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), { flags: 'a', encoding: "utf-8" });

// a command-line interface for reading input from the console
const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// a welcome message
console.log('Enter text. Type "exit" to quit or press Ctrl+C');

// Handle user input
cli.on('line', (input) => {
  // If the user enters "exit", terminate the process
  if (input === 'exit') {
    console.log('Exiting');
    process.exit(0);
  }

  // Write the input text to the output file
  fileStream.write(`${input}\n`);

  // Wait for further input
  cli.prompt();
});

// Handle process termination
cli.on('SIGINT', () => {
  console.log('Exiting');
  process.exit(0);
});

// Display a message when the application is stopped
process.on('exit', () => {
  console.log('Application stopped');
});