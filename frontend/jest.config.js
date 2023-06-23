const myModule = {
  preset: "babel-jest",
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "@fontsource/roboto": "identity-obj-proxy",
    "\\.(css|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "@components(.*)$": "<rootDir>/src/components/$1",
    "@constants(.*)$": "<rootDir>/src/constants/$1",
    "@api(.*)$": "<rootDir>/src/api/$1",
    "@images(.*)$": "<rootDir>/src/assets/images/$1",
    "@context(.*)$": "<rootDir>/src/context/$1",
    "@pages(.*)$": "<rootDir>/src/pages/$1",
    "@hooks(.*)$": "<rootDir>/src/hooks/$1",
    "@interfaces(.*)$": "<rootDir>/src/interfaces/$1",
    "@utils(.*)$": "<rootDir>/src/utils/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  globals: {
    "babel-jest": {
      isolatedModules: true,
    },
  },
};

export default myModule;
