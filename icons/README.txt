ICON FILES NEEDED
=================

Replace these placeholder files with real icon files before building:

icon.icns  — Mac app icon
  Create from icon.png: 
  On Mac, run: sips -s format icns icon.png --out icon.icns
  Or use: https://cloudconvert.com/png-to-icns

icon.ico   — Windows app icon
  Create from icon.png:
  Use: https://convertio.co/png-ico/
  Or:  https://cloudconvert.com/png-to-ico

icon.png   — Source image (already provided, 512x512 placeholder)
  Replace with your own 512x512 or 1024x1024 PNG for best results.

If you skip this step and build without real .icns/.ico files,
electron-builder will use its default Electron icon instead.
