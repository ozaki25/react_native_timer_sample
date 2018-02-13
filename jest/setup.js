jest.mock('AppState', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));
