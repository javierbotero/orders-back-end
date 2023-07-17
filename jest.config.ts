// /** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testEnvironment: 'node',
  resolver: "jest-ts-webcompat-resolver",
};
