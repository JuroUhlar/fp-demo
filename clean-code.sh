#!/bin/bash

echo "Cleaning up VS Code and Cursor..."

# Close VS Code and Cursor if they're running
killall "Code" 2>/dev/null
killall "Cursor" 2>/dev/null

# Remove the applications
rm -rf "/Applications/Visual Studio Code.app"
rm -rf "/Applications/Cursor.app"

# Remove VS Code user data
rm -rf ~/Library/Application\ Support/Code
rm -rf ~/Library/Saved\ Application\ State/com.microsoft.VSCode.savedState
rm -rf ~/.vscode
rm -rf ~/Library/Caches/com.microsoft.VSCode
rm -rf ~/Library/Preferences/com.microsoft.VSCode.plist

# Remove Cursor user data
rm -rf ~/Library/Application\ Support/Cursor
rm -rf ~/Library/Saved\ Application\ State/com.cursor.Cursor.savedState
rm -rf ~/.cursor
rm -rf ~/Library/Caches/com.cursor.Cursor
rm -rf ~/Library/Preferences/com.cursor.Cursor.plist

echo "Cleanup complete! VS Code and Cursor have been fully removed."