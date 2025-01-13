jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      timing: () => ({
        start: (callback?: () => void) => callback?.(),
        reset: () => {},
        stop: () => {},
      }),
      loop: () => ({
        start: (callback?: () => void) => callback?.(),
        reset: () => {},
        stop: () => {},
      }),
    },
  };
}); 