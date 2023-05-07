import React from "react";

function parse<T>(item: string | null, defaultValue: T) {
  try {
    if (item) return JSON.parse(item) as T;
  } catch (_e) {}
  return defaultValue;
}

function useLocalStorage<type>(
  key: string,
  defaultValue: type
): [type, (value: type) => void] {
  const [value, setValue] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    return parse(item, defaultValue);
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
