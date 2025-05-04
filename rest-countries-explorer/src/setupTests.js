// Mock window and localStorage for Jest tests
if (typeof window === 'undefined') {
  global.window = {};
}

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Add any other global mocks or setup needed for tests