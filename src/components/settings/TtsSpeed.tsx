import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";

interface TtsSpeedProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const TtsSpeed: React.FC<TtsSpeedProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const ttsSpeed = getSetting("tts_speed") ?? 1.0;

    const options = [
      { value: "0.5", label: "0.5x" },
      { value: "0.75", label: "0.75x" },
      { value: "1", label: "1.0x" },
      { value: "1.25", label: "1.25x" },
      { value: "1.5", label: "1.5x" },
      { value: "2", label: "2.0x" },
    ];

    return (
      <SettingContainer
        title={t("settings.advanced.ttsSpeed.title")}
        description={t("settings.advanced.ttsSpeed.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
        tooltipPosition="bottom"
      >
        <Dropdown
          options={options}
          selectedValue={String(ttsSpeed)}
          onSelect={(value) => updateSetting("tts_speed", Number(value))}
          disabled={isUpdating("tts_speed")}
        />
      </SettingContainer>
    );
  },
);
