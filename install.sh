#!/bin/bash

if ! command -v rustc &> /dev/null; then
  echo "Rust is not installed. Installing..."
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
fi

if ! command -v node &> /dev/null; then
  echo "Node is not installed. Installing..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  # This command installs nvm. You might need to restart your terminal after this.
  nvm install 18
fi

if ! command -v yarn &> /dev/null; then
  echo "Yarn is not installed. Installing..."
  npm install -g yarn
fi

echo "Installing dependencies with yarn..."
yarn install

yarn tauri build

yarn tauri run