"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess?: () => void) {
  const [keys, setKeys] = useState<string[]>([]);
  const [isTriggered, setIsTriggered] = useState(false);

  const reset = useCallback(() => {
    setIsTriggered(false);
    setKeys([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[keys.length];

      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        const nextKeys = [...keys, key];
        setKeys(nextKeys);

        if (nextKeys.length === KONAMI_CODE.length) {
          setIsTriggered(true);
          onSuccess?.();
          setKeys([]);
        }
      } else {
        // Reset or restart if the key matches the first key
        if (key.toLowerCase() === KONAMI_CODE[0].toLowerCase()) {
          setKeys([key]);
        } else {
          setKeys([]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, onSuccess]);

  return { isTriggered, reset, progress: keys.length / KONAMI_CODE.length };
}
