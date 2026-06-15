import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";
import { WHATS_NEW } from "../constants/appVersion";
import { markVersionSeen, shouldShowWhatsNew } from "../utils/whatsNew";

const WHATS_NEW_DELAY_MS = 4500;

export default function useWhatsNewNotification(user) {
  const navigate = useNavigate();
  const showSnackbar = useStore((state) => state.showSnackbar);
  const closeSnackbar = useStore((state) => state.closeSnackbar);
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (!user?.id || scheduledRef.current || !shouldShowWhatsNew()) {
      return;
    }

    scheduledRef.current = true;

    const timer = setTimeout(() => {
      const handleSeen = () => markVersionSeen();

      showSnackbar({
        message: `New in ${WHATS_NEW.shortLabel}: ${WHATS_NEW.headline}`,
        severity: "info",
        duration: 8000,
        onClose: handleSeen,
        action: {
          label: "What's new",
          onClick: () => {
            handleSeen();
            closeSnackbar();
            navigate("/about", { state: { scrollToUpdates: true } });
          },
        },
      });
    }, WHATS_NEW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [user?.id, showSnackbar, closeSnackbar, navigate]);
}
