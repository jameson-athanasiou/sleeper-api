import inquirer from 'inquirer'

export const executePrompt = async () => {
  const questions = {
    choices: ['User'],
  }
  const result = await inquirer.prompt(questions)

  return result
}
