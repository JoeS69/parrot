# Build Instructions

This guide covers how to set up the development environment and build Parrot from source.

## Prerequisites

### All Platforms

- [Rust](https://rustup.rs/) (latest stable)
- [Bun](https://bun.sh/) package manager
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/)

### Platform-Specific Requirements

#### macOS

- Xcode Command Line Tools: `xcode-select --install`

#### Windows

- Microsoft C++ Build Tools or Visual Studio 2019/2022 with C++ development tools

#### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install build-essential libasound2-dev pkg-config libssl-dev libvulkan-dev \
  vulkan-tools libgtk-3-dev libwebkit2gtk-4.1-dev libayatana-appindicator3-dev \
  librsvg2-dev libgtk-layer-shell0 libgtk-layer-shell-dev patchelf cmake

# Fedora/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install alsa-lib-devel pkgconf openssl-devel vulkan-devel \
  gtk3-devel webkit2gtk4.1-devel libappindicator-gtk3-devel librsvg2-devel \
  gtk-layer-shell gtk-layer-shell-devel cmake

# Arch Linux
sudo pacman -S base-devel alsa-lib pkgconf openssl vulkan-devel \
  gtk3 webkit2gtk-4.1 libappindicator-gtk3 librsvg gtk-layer-shell cmake
```

## Setup and Development

```bash
# Clone the repository
git clone https://github.com/rishiskhare/parrot.git
cd parrot

# Install frontend dependencies
bun install

# Run in development mode
bun run tauri dev

# On macOS, if you hit a CMake error:
CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri dev

# Build a release binary
bun run tauri build
```

No model download is required for development. On first launch, Parrot prompts the user to download the TTS model (~115 MB) automatically.

## Linting and Formatting

```bash
bun run lint          # ESLint
bun run lint:fix      # ESLint with auto-fix
bun run format        # Prettier + cargo fmt
bun run format:check  # Check formatting without changes
```

Run these before submitting a pull request.
