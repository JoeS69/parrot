import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";

interface TtsWorkersProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const TtsWorkers: React.FC<TtsWorkersProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const ttsWorkers = getSetting("tts_workers") ?? 0;

    const options = [
      {
        value: "0",
        label: t("settings.advanced.ttsWorkers.auto"),
      },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
    ];

    return (
      <SettingContainer
        title={t("settings.advanced.ttsWorkers.title")}
        description={t("settings.advanced.ttsWorkers.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
        tooltipPosition="bottom"
      >
        <Dropdown
          options={options}
          selectedValue={String(ttsWorkers)}
          onSelect={(value) => updateSetting("tts_workers", Number(value))}
          disabled={isUpdating("tts_workers")}
        />
      </SettingContainer>
    );
  },
);
