import { useEffect, useState, useRef } from "react";

export function useAwait<T>(
  promiseFactory: () => Promise<T>,
  dependencies: unknown[],
  shouldRun?: () => boolean,
):
  | {
      isLoading: true;
      data: null;
    }
  | {
      isLoading: false;
      data: T | null;
    } {
  const [isLoading, setIsLoading] = useState(shouldRun ? shouldRun() : true);
  const [data, setData] = useState<T | null>(null);

  const prevDepsRef = useRef(dependencies);
  const depsChanged = dependencies.some(
    (dep, i) => Object.is(dep, prevDepsRef.current[i]) === false,
  );

  let currentIsLoading = isLoading;
  let currentData = data;

  if (depsChanged) {
    const isNowShouldRun = shouldRun ? shouldRun() : true;

    if (isNowShouldRun) {
      currentIsLoading = true;
      currentData = null;
    } else currentIsLoading = false;
  }

  useEffect(() => {
    prevDepsRef.current = dependencies;

    if (shouldRun && !shouldRun()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    let isMounted = true;

    promiseFactory().then((data) => {
      if (!isMounted) return;

      setData(data);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  if (currentIsLoading) return { isLoading: true, data: null };

  return { isLoading: false, data: currentData };
}
