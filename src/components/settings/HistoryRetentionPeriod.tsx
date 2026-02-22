import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import { HistoryRetentionPeriod } from "@/bindings";

interface HistoryRetentionPeriodProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const HistoryRetentionPeriodSelector: React.FC<HistoryRetentionPeriodProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const selectedRetentionPeriod =
      getSetting("history_retention_period") || "never";
    const historyLimit = getSetting("history_limit") || 5;

    const handleRetentionPeriodSelect = async (period: string) => {
      await updateSetting(
        "history_retention_period",
        period as HistoryRetentionPeriod,
      );
    };

    const retentionOptions = [
      { value: "never", label: t("settings.debug.historyRetention.never") },
      {
        value: "preserve_limit",
        label: t("settings.debug.historyRetention.preserveLimit", {
          count: Number(historyLimit),
        }),
      },
      { value: "days3", label: t("settings.debug.historyRetention.days3") },
      { value: "weeks2", label: t("settings.debug.historyRetention.weeks2") },
      {
        value: "months3",
        label: t("settings.debug.historyRetention.months3"),
      },
    ];

    return (
      <SettingContainer
        title={t("settings.debug.historyRetention.title")}
        description={t("settings.debug.historyRetention.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <Dropdown
          options={retentionOptions}
          selectedValue={selectedRetentionPeriod}
          onSelect={handleRetentionPeriodSelect}
          placeholder={t("settings.debug.historyRetention.placeholder")}
          disabled={isUpdating("history_retention_period")}
        />
      </SettingContainer>
    );
  });

HistoryRetentionPeriodSelector.displayName = "HistoryRetentionPeriodSelector";
