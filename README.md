# Nimbus Web Extension

A Chrome extension for Salesforce that allows users to save and load form templates.

## Features

- 💾 **Save Form Templates**: Save the current populated input fields as a template
- 📋 **Load Templates**: Quickly populate forms with saved template data
- 🎯 **SObject-Specific**: Templates are filtered by SObject type
- ⚡ **Lightning & Classic**: Works with both Salesforce Lightning Experience and Classic

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-prod` directory

## Development

To run the extension in development mode with hot reload:

```bash
npm run dev
```

Then load the `build/chrome-mv3-dev` directory in Chrome.

## Usage

1. Navigate to any Salesforce form (new or edit record)
2. Fill in the form fields with your desired values
3. Click the "💾 Save as Template" button in the floating panel
4. Give your template a name
5. Later, when visiting the same form type, select your template from the dropdown
6. Click "📋 Load Template" to populate the form

## Compatibility

This extension works with:
- Salesforce Scratch Orgs
- Developer Orgs
- Sandbox Environments
- Production Orgs (use with caution)

## License

ISC