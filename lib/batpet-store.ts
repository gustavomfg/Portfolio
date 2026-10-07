"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "batpet:hidden";
const listeners = new Set<() => void>();
let hidden: boolean | null = null;

function readStoredPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    hidden = event.newValue === "1";
    emit();
  };

  listeners.add(listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot() {
  hidden ??= readStoredPreference();
  return hidden;
}

export function setBatPetHidden(value: boolean) {
  hidden = value;

  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, "1");
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the preference then lasts for this visit.
  }

  emit();
}

export function useBatPetHidden() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
