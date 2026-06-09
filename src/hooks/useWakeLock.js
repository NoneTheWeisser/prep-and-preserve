import { useEffect, useRef, useState } from "react";

export function useWakeLock(enabled) {
  const wakeLockRef = useRef(null);
  const [isSupported] = useState(
    () => typeof navigator !== "undefined" && "wakeLock" in navigator
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !isSupported) {
      setError(null);
      return undefined;
    }

    let cancelled = false;

    const releaseLock = async () => {
      if (!wakeLockRef.current) return;
      try {
        await wakeLockRef.current.release();
      } catch {
        // already released
      }
      wakeLockRef.current = null;
    };

    const requestLock = async () => {
      if (cancelled || document.visibilityState !== "visible") return;

      try {
        await releaseLock();
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release();
          return;
        }
        wakeLockRef.current = sentinel;
        setError(null);
      } catch (err) {
        setError(err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestLock();
      }
    };

    requestLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      releaseLock();
    };
  }, [enabled, isSupported]);

  return { isSupported, error };
}
