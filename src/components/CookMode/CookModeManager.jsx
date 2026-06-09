import { useEffect, useRef } from "react";
import useStore from "../../zustand/store";
import { useWakeLock } from "../../hooks/useWakeLock";

export default function CookModeManager() {
  const cookModeEnabled = useStore((state) => state.cookModeEnabled);
  const showSnackbar = useStore((state) => state.showSnackbar);
  const { isSupported, error } = useWakeLock(cookModeEnabled);
  const lastErrorRef = useRef(null);

  useEffect(() => {
    if (!cookModeEnabled || !error || error === lastErrorRef.current) return;

    lastErrorRef.current = error;

    if (!isSupported) {
      showSnackbar({
        message:
          "Cook Mode can't keep the screen awake on this device or browser.",
        severity: "warning",
      });
      return;
    }

    showSnackbar({
      message:
        "Couldn't keep the screen awake. Check that Low Power Mode is off and the page is visible.",
      severity: "warning",
    });
  }, [cookModeEnabled, error, isSupported, showSnackbar]);

  useEffect(() => {
    if (!cookModeEnabled) {
      lastErrorRef.current = null;
    }
  }, [cookModeEnabled]);

  return null;
}
