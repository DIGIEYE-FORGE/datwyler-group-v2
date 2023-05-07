import React from "react";

function parse<T>(value: string | null, defaultValue: T): T {
  if (value === null) return defaultValue;
  try {
    return JSON.parse(value);
  } catch (error) {
    return defaultValue;
  }
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
