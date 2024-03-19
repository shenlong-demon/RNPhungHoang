export  const useBaseFacade = <R>(hook: () => R): R =>{
    const hookResult: R = hook();

    return hookResult;
};