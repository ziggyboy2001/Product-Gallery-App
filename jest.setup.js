// Mock Animated
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mock expo-image
jest.mock("expo-image", () => ({
  Image: "Image",
}));

// Mock ProductCardSkeleton
jest.mock("./src/components/ProductCardSkeleton", () => ({
  ProductCardSkeleton: "ProductCardSkeleton",
}));

// Mock Settings
jest.mock("react-native/Libraries/Settings/Settings", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

// Silence the warning: act(...) is not supported in production builds of React
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
