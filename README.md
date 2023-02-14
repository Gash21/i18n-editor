# i18n-editor

A simple i18n Editor for translating from one language to another

<p align="center">
<img src="https://img.shields.io/github/package-json/v/gash21/i18n-editor?color=green" alt="version"/>
<img src="https://img.shields.io/github/license/gash21/i18n-editor?color=blue" alt="license" />
</p>

## Milestone

- [x] Create basic UI
- [x] Implement open folder and read specific files with name id*.json or en*.json
- [x] Implement save to folder
- [ ] Implement nested folder reading (e.g. locale/pages/dashboard, locale/pages/transaction)
- [ ] Implement builder for translation JS/TS for i18next
- [ ] Implement export to _.xlsx or _.csv
- [ ] Implement another language

## Download

## Project Setup

### Install

```bash
$ yarn install
```

### Development

```bash
$ yarn tauri dev
```

### Production
1. Download latest release here https://github.com/Gash21/i18n-editor/releases zip/tar.gz files
2. After download finished, extract zip file
3. Open directory using terminal
```bash
$ cd ~/Downloads/<folder release> # I assume you are using MacOS & downloaded on default Downloads folder
$ bash install.sh # Wait for it to open the dmg file
```

If you encounter error
`Error failed to bundle project: error running bundle_dmg.sh`
Please run the command once again
