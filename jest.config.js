module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,vue}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.scss$": "identity-obj-proxy",
  },
};
