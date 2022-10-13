const handleException = async (promise: Promise<any>) => {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, error];
  }
};

export { handleException };
