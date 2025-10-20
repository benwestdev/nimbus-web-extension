# Nimbus Web Extension

A Chrome extension for Salesforce that allows users to save and load form templates, making it easy to quickly populate forms with predefined data.

## 🌟 Features

- 💾 **Save Form Templates**: Save the current populated input fields as a template
- 📋 **Load Templates**: Quickly populate forms with saved template data
- 🎯 **SObject-Specific**: Templates are automatically filtered by SObject type
- ⚡ **Lightning & Classic**: Works with both Salesforce Lightning Experience and Classic
- 🗂️ **Template Management**: View and delete templates from the popup interface
- 🔄 **Auto-Detection**: Automatically detects SObject type and available form fields
- ✅ **Multiple Field Types**: Supports text, email, number, date, checkbox, select, and textarea fields

## 📦 Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/benwestdev/nimbus-web-extension.git
   cd nimbus-web-extension
   ```

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
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-prod` directory

## 🚀 Usage

### Saving a Template

1. Navigate to any Salesforce form (create or edit a record)
2. Fill in the form fields with your desired values
3. Look for the floating "Form Templates" panel on the right side of the page
4. Click the "💾 Save as Template" button
5. Enter a descriptive name for your template
6. Click OK to save

### Loading a Template

1. Navigate to a Salesforce form of the same SObject type
2. In the "Form Templates" panel, select your saved template from the dropdown
3. Click the "📋 Load Template" button
4. The form will be automatically populated with the saved values

### Managing Templates

1. Click the extension icon in the Chrome toolbar
2. View all your saved templates with their metadata
3. Click "Delete" on any template to remove it

## 💡 Tips

- Templates are specific to each SObject type (Account, Contact, Opportunity, etc.)
- You can save multiple templates for the same SObject type
- Templates persist across browser sessions
- The extension automatically detects when you navigate to different forms

## 🔧 Development

To run the extension in development mode with hot reload:

```bash
npm run dev
```

Then load the `build/chrome-mv3-dev` directory in Chrome.

For detailed development instructions, see [DEVELOPMENT.md](DEVELOPMENT.md).

## 📋 Compatibility

This extension works with:
- ✅ Salesforce Scratch Orgs
- ✅ Developer Orgs
- ✅ Sandbox Environments
- ✅ Production Orgs (use with appropriate caution)

**Supported Salesforce URLs:**
- `*.force.com`
- `*.salesforce.com`
- `*.lightning.force.com`

## 🐛 Troubleshooting

### Extension not appearing on forms

- Ensure you're on a record create/edit page
- Refresh the page after installing the extension
- Check the browser console for error messages

### Fields not saving/loading

- Some custom Lightning components may use non-standard field naming
- The extension logs field detection info in the browser console
- Try refreshing the page and attempting again

### Templates not persisting

- Check that the extension has the "Storage" permission
- Verify the extension is properly loaded in `chrome://extensions/`

## 📄 License

ISC - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and feature requests, please use the GitHub issue tracker.