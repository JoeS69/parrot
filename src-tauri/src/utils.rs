use crate::managers::tts::TTSManager;
use crate::shortcut;
use crate::ActionCoordinator;
use log::info;
use std::sync::Arc;
use tauri::{AppHandle, Manager};

// Re-export all utility modules for easy access
// pub use crate::audio_feedback::*;
pub use crate::overlay::*;
pub use crate::tray::*;

/// Centralized cancellation function that can be called from anywhere in the app.
/// Handles cancelling TTS playback and updates UI state.
pub fn cancel_current_operation(app: &AppHandle) {
    info!("Initiating operation cancellation...");

    // Unregister dynamically-managed shortcuts
    shortcut::unregister_cancel_shortcut(app);
    shortcut::unregister_play_pause_shortcut(app);

    // Stop any active TTS playback and maybe unload the model
    if let Some(speech_manager) = app.try_state::<Arc<TTSManager>>() {
        speech_manager.stop();
        speech_manager.maybe_unload_immediately("cancellation");
    }

    // Update tray icon and hide overlay
    change_tray_icon(app);
    hide_speaking_overlay(app);

    // Notify coordinator so it can keep lifecycle state coherent.
    if let Some(coordinator) = app.try_state::<ActionCoordinator>() {
        coordinator.notify_cancel(false);
    }

    info!("Operation cancellation completed - returned to idle state");
}

/// Check if using the Wayland display server protocol
#[cfg(target_os = "linux")]
pub fn is_wayland() -> bool {
    std::env::var("WAYLAND_DISPLAY").is_ok()
        || std::env::var("XDG_SESSION_TYPE")
            .map(|v| v.to_lowercase() == "wayland")
            .unwrap_or(false)
}

/// Check if running on KDE Plasma desktop environment
#[cfg(target_os = "linux")]
pub fn is_kde_plasma() -> bool {
    std::env::var("XDG_CURRENT_DESKTOP")
        .map(|v| v.to_uppercase().contains("KDE"))
        .unwrap_or(false)
        || std::env::var("KDE_SESSION_VERSION").is_ok()
}

/// Check if running on KDE Plasma with Wayland
#[cfg(target_os = "linux")]
pub fn is_kde_wayland() -> bool {
    is_wayland() && is_kde_plasma()
}
