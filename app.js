const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const empArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of this employee?',
            choices: ['Manager', 'Engineer', 'Intern'],
            default: 'Manager'
        }
    ]).then(answers => {
        if(answers.role === 'Manager') {
            inquirer.prompt([
                {
                    name: 'name',
                    message: 'What is the name of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'id',
                    message: 'What is the id # of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'email',
                    message: 'What is the email address of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'officeNumber',
                    message: 'What is the office number of this manager?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    type: 'list',
                    name: 'addNew',
                    message: 'Would you like to add another employee?',
                    choices: ['Yes', 'No'],
                    default: 'Yes'
                }
            ]).then(answers => {
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                empArr.push(manager);
    
                if(answers.addNew === 'Yes') {
                    init();
                } else {
                    const results = render(empArr);
                    if (!fs.existsSync(OUTPUT_DIR)) {
                        fs.mkdirSync(OUTPUT_DIR);
                    }
                    fs.writeFile(outputPath, results, function (err) {
                        if (err) throw err;
                    });
                }
            })
        } else if(answers.role === 'Engineer') {
            inquirer.prompt([
                {
                    name: 'name',
                    message: 'What is the name of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'id',
                    message: 'What is the id # of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'email',
                    message: 'What is the email address of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'github',
                    message: 'What is the GitHub username of this engineer?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    type: 'list',
                    name: 'addNew',
                    message: 'Would you like to add another employee?',
                    choices: ['Yes', 'No'],
                    default: 'Yes'
                }
            ]).then(answers => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                empArr.push(engineer);
    
                if(answers.addNew === 'Yes') {
                    init();
                } else {
                    const results = render(empArr);
                    if (!fs.existsSync(OUTPUT_DIR)) {
                        fs.mkdirSync(OUTPUT_DIR);
                    }
                    fs.writeFile(outputPath, results, function (err) {
                        if (err) throw err;
                    });
                }
            })
        } else if(answers.role === 'Intern') {
            inquirer.prompt([
                {
                    name: 'name',
                    message: 'What is the name of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'id',
                    message: 'What is the id # of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'email',
                    message: 'What is the email address of your employee?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    name: 'school',
                    message: 'What is the school that this intern attends?',
                    validate: function validate(name){
                        return name !== '';
                    }
                },
                {
                    type: 'list',
                    name: 'addNew',
                    message: 'Would you like to add another employee?',
                    choices: ['Yes', 'No'],
                    default: 'Yes'
                }
            ]).then(answers => {
                const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                empArr.push(intern);
    
                if(answers.addNew === 'Yes') {
                    init();
                } else {
                    const results = render(empArr);
                    if (!fs.existsSync(OUTPUT_DIR)) {
                        fs.mkdirSync(OUTPUT_DIR);
                    }
                    fs.writeFile(outputPath, results, function (err) {
                        if (err) throw err;
                    });
                }
            })
        }
    })
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

init();
