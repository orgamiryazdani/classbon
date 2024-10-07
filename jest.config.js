const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
})

/** @type {import('jest'.Config)} */
const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    modulePathIgnorePatterns: ['node_modules,jest-test-results.json']
}

module.exports = createJestConfig(config)