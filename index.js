const crypto = require('crypto');

// Get the command line arguments
const operation = process.argv[2];
const num1 = parseFloat(process.argv[3]);
const num2 = parseFloat(process.argv[4]);

// Function to generate a random number of a given length
const generateRandomNumber = (length) => {
  return crypto.randomBytes(length).toString('binary');
};

switch (operation) {
  case 'add':
    if (isNaN(num1) || isNaN(num2)) {
      console.log('Please provide two valid numbers for addition.');
    } else {
      console.log(`Result: ${num1 + num2}`);
    }
    break;

  case 'sub':
    if (isNaN(num1) || isNaN(num2)) {
      console.log('Please provide two valid numbers for subtraction.');
    } else {
      console.log(`Result: ${num1 - num2}`);
    }
    break;

  case 'mult':
    if (isNaN(num1) || isNaN(num2)) {
      console.log('Please provide two valid numbers for multiplication.');
    } else {
      console.log(`Result: ${num1 * num2}`);
    }
    break;

  case 'divide':
    if (isNaN(num1) || isNaN(num2)) {
      console.log('Please provide two valid numbers for division.');
    } else if (num2 === 0) {
      console.log('Division by zero is not allowed.');
    } else {
      console.log(`Result: ${num1 / num2}`);
    }
    break;

  case 'sin':
    if (isNaN(num1)) {
      console.log('Please provide a valid number for sine calculation.');
    } else {
      console.log(`Result: ${Math.sin(num1)}`);
    }
    break;

  case 'cos':
    if (isNaN(num1)) {
      console.log('Please provide a valid number for cosine calculation.');
    } else {
      console.log(`Result: ${Math.cos(num1)}`);
    }
    break;

  case 'tan':
    if (isNaN(num1)) {
      console.log('Please provide a valid number for tangent calculation.');
    } else {
      console.log(`Result: ${Math.tan(num1)}`);
    }
    break;

  case 'random':
    if (isNaN(num1) || num1 <= 0) {
      console.log('Provide length for random number generation.');
    } else {
      console.log(`Random number: ${generateRandomNumber(num1)}`);
    }
    break;

  default:
    console.log('Invalid operation');
}
