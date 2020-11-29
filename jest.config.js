module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|js)?$': 'ts-jest'
    },
    testMatch: ['**/test/**/*.test.(ts|js)'],
    testEnvironment: 'node'
}
