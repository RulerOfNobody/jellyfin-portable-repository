# Portable Downloads for Jellyfin
Made by AI. Still a work in progress.

Temporary, size-budgeted offline video downloads using Jellyfin's configured encoder and hardware device. Public distribution repository; development is maintained separately.

## Install through Jellyfin

For **Jellyfin 10.11.11**, open **Dashboard → Plugins → Repositories → +** and add:

- Repository name: `Portable Downloads`
- Repository URL:

```text
https://raw.githubusercontent.com/RulerOfNobody/jellyfin-portable-repository/main/manifest.json
```

Save, open the **Catalog**, select **Portable Downloads**, install version **0.1.0.0**, and restart Jellyfin.

This is an **alpha**. The server plugin and real encoding/download workflow were tested on Jellyfin 10.11.11. Actual GPU/driver combinations must be tested on the intended host. Target file sizes are approximate.

Do not add this catalog to 10.10 or assume compatibility with other server releases. Jellyfin's catalog `targetAbi` is a minimum version, not an upper compatibility bound. Recheck compatibility before upgrading your server.

## Configure storage and transcoding

1. In Unraid, mount the scratch SSD and map a dedicated folder into the Jellyfin container read/write, for example `/portable-downloads`. Keep it outside media libraries and healthy appdata.
2. Create `.portable-downloads-volume` inside that folder containing the text `portable-downloads`. Do not place the marker in a fallback directory on an unmounted disk.
3. Open **Dashboard → Plugins → Portable Downloads**, set the scratch path, save, and run **Test saved scratch settings**.
4. Keep your existing GPU passthrough and settings under **Playback → Transcoding**. The plugin inherits Jellyfin's encoder backend and device. Enable HEVC/AV1 there to offer those codecs. There is no silent CPU fallback when hardware encoding is configured.
5. Default server-side retention is 24 hours. Downloaded copies on your phone are not deleted by the plugin.

## Enable the Download options dialog

**Installing the server plugin does not by itself modify client menus.** For server-hosted **Jellyfin Web 10.11.11**, download `jellyfin-web-10.11.11-portable-0.1.0.zip` from [packages/v0.1.0-alpha](packages/v0.1.0-alpha).

Extract it to a persistent host folder and bind-mount that folder read-only over your container's web resources directory. Check the **Web resources path** in the Jellyfin server log; image layouts differ. Restart and clear the browser's Jellyfin cache/service worker if needed.

Then **More options → Download** opens the options dialog with per-item size sliders, codecs, resolution, audio and embedded text subtitles.

Never mount this 10.11.11 web build over another client/server version. Update or remove the mount when upgrading Jellyfin. The web source adapter and build instructions are in the corresponding source archive. Native Moonfin/mobile applications require their own client integration and are not patched by this catalog.

## Experimental Jellyfin 12.1.0 build

This package compiles against 12.1.0 but is **not runtime-certified**. It has its own opt-in catalog:

```text
https://raw.githubusercontent.com/RulerOfNobody/jellyfin-portable-repository/main/manifest-experimental-12.json
```

Use only the catalog matching your server; do not add both. No prebuilt 12.1.0 web client is included.

## Source, license and integrity

- [Complete plugin source snapshot](packages/v0.1.0-alpha/portable-downloads-source-0.1.0.zip), including build scripts, tests and the web source adapter.
- [Matching adapted Jellyfin Web source](packages/v0.1.0-alpha/jellyfin-web-source-10.11.11-portable-0.1.0.zip), including its lockfile and build scripts.
- GPL-3.0 license in this repository and the archives.
- [SHA256SUMS](packages/v0.1.0-alpha/SHA256SUMS) for all distributed ZIPs. The catalogs additionally contain Jellyfin's required MD5 checksum.

The source archive preserves the original release documentation, including manual-install/private-development references. This README is the authoritative guide for the public catalog.

## Rollback

Uninstall Portable Downloads in Jellyfin, remove the custom web bind mount, and restart. Originals are untouched. Inspect the dedicated scratch folder before deleting remaining temporary files. Plugin job state lives in Jellyfin's data directory under `portable-downloads/jobs.json`.
