import { JestConfigWithTsJest } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  preset: 'ts-jest',
  testEnvironment: 'node'
}

export default jestConfig
