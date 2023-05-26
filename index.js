const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes');

function writeToFile(fileName, promptAnswers) {

    let svgString = '';

    svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += '<g>';
    svgString += `${promptAnswers.shape}`;

    let chosenShape;

    if (promptAnswers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${promptAnswers.color}"/>`;
    } else if (promptAnswers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${promptAnswers.color}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${promptAnswers.color}"/>`;
    }

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${promptAnswers.textColor}">${promptAnswers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    });

}

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'color',
            message: 'What color would you like your logo?'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'What shape would you like your logo?',
            choices: ['Triangle', 'Square', 'Circle']
        },
        {
            type: 'input',
            name: 'text',
            message: 'What text would you like in your logo? (Max 3 characters)'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'What color would you like the text in your logo?'
        }
    ]).then(answers => {
        if (answers.text.length > 3) {
            console.log('Please enter 3 characters or less.');
            promptUser();
        } else {
            writeToFile('./examples/logo.svg', answers);
        }
    })
}

promptUser();