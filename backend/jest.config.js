/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  // This is generally a good practice for isolated tests.
  clearMocks: true,

  // Set the test environment to 'node' since you are testing a backend application.
  // This gives you access to Node.js global variables.
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files.
  // This configuration will specifically look inside your 'test' folder (test/**/)
  // and for files anywhere ending with .spec.js or .test.js.
  // Note: I've updated the pattern to be simpler and target your current structure.
  testMatch: [
    "**/test/**/*.test.js",  // Only run files ending in .test.js
    "**/test/**/*.spec.js"   // Or .spec.js
  ],

  // An array of regexp pattern strings that are matched against all test paths,
  // matched tests are skipped. We keep the default to ignore node_modules.
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // Automatically restore mock state and implementation before every test.
  // Useful when using jest.spyOn.
  restoreMocks: true,

  // ...
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  // ...

  // Set up files for global configurations, like loading environment variables.
  // This is essential if you use a common test setup script to initialize the database
  // connection or mock the Prisma client before all tests run.
  // Example: setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
};

module.exports = config;