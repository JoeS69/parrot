import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pause, Play } from "lucide-react";
import {
  SpeakingIcon,
  CancelIcon,
} from "../components/icons";
import "./SpeakingOverlay.css";
import { commands } from "@/bindings";
import i18n, { syncLanguageFromSettings } from "@/i18n";
import { getLanguageDirection } from "@/lib/utils/rtl";

type OverlayState = "processing" | "speaking";

const SpeakingOverlay: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState<OverlayState>("processing");
  const [speakingPaused, setSpeakingPaused] = useState(false);
  const [isTogglingPause, setIsTogglingPause] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(true);
  const direction = getLanguageDirection(i18n.language);

  // mic-level listener ref kept for cleanup even though bars are not shown in TTS mode
  const smoothedLevelsRef = useRef<number[]>(Array(16).fill(0));

  useEffect(() => {
    const setupEventListeners = async () => {
      // Listen for show-overlay event from Rust
      const unlistenShow = await listen("show-overlay", async (event) => {
        // Sync language from settings each time overlay is shown
        await syncLanguageFromSettings();
        const settings = await commands.getAppSettings();
        if (settings && settings.status === "ok") {
          setShowCloseButton(settings.data.show_close_button ?? true);
        }

        const overlayState = event.payload as OverlayState;
        setState(overlayState);
        if (overlayState !== "speaking") {
          setSpeakingPaused(false);
          setIsTogglingPause(false);
        }
        setIsVisible(true);
      });

      // Listen for hide-overlay event from Rust
      const unlistenHide = await listen("hide-overlay", () => {
        setIsVisible(false);
      });

      // mic-level events are no longer used in TTS mode but kept so the
      // listener registration doesn't break if the event is ever emitted
      const unlistenLevel = await listen<number[]>("mic-level", (event) => {
        const newLevels = event.payload as number[];
        smoothedLevelsRef.current = smoothedLevelsRef.current.map((prev, i) => {
          const target = newLevels[i] || 0;
          return prev * 0.7 + target * 0.3;
        });
      });

      // Listen for pause state changes triggered by the keyboard shortcut
      const unlistenPauseState = await listen<boolean>("tts-pause-state", (event) => {
        setSpeakingPaused(event.payload);
      });

      return () => {
        unlistenShow();
        unlistenHide();
        unlistenLevel();
        unlistenPauseState();
      };
    };

    setupEventListeners();
  }, []);

  const togglePause = async () => {
    if (isTogglingPause) {
      return;
    }
    setIsTogglingPause(true);
    try {
      const result = await commands.toggleTtsPause();
      if (result.status === "ok") {
        setSpeakingPaused(result.data);
      }
    } finally {
      setIsTogglingPause(false);
    }
  };

  return (
    <div
      dir={direction}
      className={`speaking-overlay ${state}-state ${isVisible ? "fade-in" : ""}`}
    >
      {showCloseButton && (
        <button
          type="button"
          className="mac-close-button"
          onClick={() => commands.cancelOperation()}
          title={t("overlay.close", { defaultValue: "Close" })}
          aria-label="Close"
        />
      )}
      <div className="overlay-left">
        <SpeakingIcon width={state === "speaking" ? 22 : 24} height={state === "speaking" ? 22 : 24} />
      </div>

      <div className="overlay-middle">
        {state === "processing" && (
          <div className="status-text">
            {t("overlay.processing", { defaultValue: "Processing..." })}
          </div>
        )}
        {state === "speaking" && (
          <div className="status-text">
            {t("overlay.playing", { defaultValue: "Playing..." })}
          </div>
        )}
      </div>

      {state === "speaking" && (
        <div className="overlay-right">
          <button
            type="button"
            className="speaking-toggle-button"
            onClick={togglePause}
            disabled={isTogglingPause}
            title={speakingPaused ? "Resume" : "Pause"}
            aria-label={speakingPaused ? "Resume playback" : "Pause playback"}
          >
            {speakingPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeakingOverlay;
