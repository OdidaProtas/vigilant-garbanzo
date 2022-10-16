const handleException = async (promise: Promise<any>) => {
  try {
    const res = await promise;
    const results = res?.data?.results;
    if (results) {
      return [results, null];
    }
    return [res, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export { handleException };
