module.exports = {
    'name': 'react',
    'roots': [
        '<rootDir>'
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    'transform': {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    'moduleNameMapper': {
        '\\.(css|jpg|png|scss)$': '<rootDir>/../util/_empty.js'
    }
};