import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";

interface ShortenFirstChunkProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const ShortenFirstChunk: React.FC<ShortenFirstChunkProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const shortenFirstChunk = getSetting("tts_shorten_first_chunk") ?? true;

    return (
      <ToggleSwitch
        checked={shortenFirstChunk}
        onChange={(enabled) =>
          updateSetting("tts_shorten_first_chunk", enabled)
        }
        isUpdating={isUpdating("tts_shorten_first_chunk")}
        label={t("settings.advanced.shortenFirstChunk.title")}
        description={t("settings.advanced.shortenFirstChunk.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
        tooltipPosition="bottom"
      />
    );
  },
);
