How to use this script:

1. Download all icons in svg-format from: https://www.experience-hub.ch/document/2584/collection/60
2. Unzip all icons to a new folder called "icons".
2. Run iconGenerator.ps1
3. Copy the content from the generated txt-File to the appropriate place in src/variables/_icons.scss. (Currently located at the end of the file.)
4. MANUALLY CHECK EACH ICON - the Generator is not infallible; often you'll need to check the icons again.
5. With git-diff: 
    a. Check which Icons are new. Move those to Notepad++
    b. Check if any Icons got removed. Write down the icon numbers.
    c. Revert chages to src/variables/_icons.scss
    d. Move removed icons up to the appropriate location in the file.
    d. Add the new icons in the appropriate slot.