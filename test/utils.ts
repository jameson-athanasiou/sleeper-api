/* eslint-disable @typescript-eslint/ban-ts-comment */
import inquirer from 'inquirer'
import * as userApi from '../src/apis/user'
import * as leagueApi from '../src/apis/league'
import * as avatarApi from '../src/apis/avatar'

type AnswersType = {
  api: string
  endpoint: string
  data: string
}

const getEndpoints = (api: string) => {
  if (api === 'User') return Object.keys(userApi)
  if (api === 'League') return Object.keys(leagueApi)
  if (api === 'Avatar') return Object.keys(avatarApi)

  throw new Error('API not found')
}

const executeEndpoint = async (answers: AnswersType) => {
  if (answers.api === 'User') {
    // @ts-ignore
    return userApi[answers.endpoint](answers.data)
  }

  if (answers.api === 'League') {
    // @ts-ignore
    return leagueApi[answers.endpoint](answers.data)
  }

  throw new Error('Endpoint not found')
}

export const executePrompt = async () => {
  const questions = [
    {
      choices: ['User', 'League'],
      message: 'Which API do you want to test?',
      name: 'api',
      type: 'list',
    },
    {
      choices: (answers: AnswersType) => getEndpoints(answers.api),
      message: 'Which endpoint do you want to test?',
      name: 'endpoint',
      type: 'list',
    },
    {
      message: 'What do you want to pass?',
      name: 'data',
    },
  ]

  const answers = await inquirer.prompt(questions)

  console.log(answers)

  const result = await executeEndpoint(answers)

  console.log(result)

  return result
}
