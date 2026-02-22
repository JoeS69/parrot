# Changelog

## [2026.2.1] - 2026-02-22

### Added

- **Kokoro-82M TTS engine**: Neural text-to-speech running entirely on-device, no cloud required
- **54 voices across 9 languages**: English (US & UK), Spanish, French, Hindi, Italian, Japanese, Portuguese (Brazilian), Chinese (Mandarin)
- **Streaming playback**: Audio starts playing before the full text is synthesized
- **Floating overlay**: Lightweight speaking indicator with pause and cancel controls
- **Pause & resume**: Stop and continue playback mid-sentence via keyboard shortcut
- **History**: Every utterance saved with audio for replay or copy
- **Customizable shortcuts**: All keyboard shortcuts configurable in Settings
- **Audio feedback**: Optional start/stop sounds with volume control and theme selection
- **Output device selection**: Route audio to any connected output device
- **Model unload timeout**: Automatically free memory after a period of inactivity
- **Hold-to-speak mode**: Push-to-talk style activation
- **Auto-updater**: In-app update notifications and one-click installation
- **CLI flags**: `--toggle-transcription`, `--cancel`, `--start-hidden`, `--no-tray`, `--debug`
- **Unix signal control**: `SIGUSR1`/`SIGUSR2` for hotkey daemon integration on Linux
- Cross-platform: macOS, Windows, Linux (x86 and ARM)
