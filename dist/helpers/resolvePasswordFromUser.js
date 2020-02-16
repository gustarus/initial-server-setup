"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
async function resolvePasswordFromUser(initial) {
    if (initial === undefined) {
        return undefined;
    }
    if (initial === true) {
        // ask for typing password if not presented in the options
        const answers = await inquirer_1.default.prompt([{
                type: 'password',
                name: 'password',
                message: `Type password for ${user}@${host}`,
                validate: 
            }]);
        if (!answers.password) {
            throw new Error();
        }
        password = answers.password;
    }
}
exports.default = resolvePasswordFromUser;
