# Development Guide

## Prerequisites

- Node.js 18+ and npm
- Chrome browser
- Access to a Salesforce org (scratch org, developer org, or sandbox)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/benwestdev/nimbus-web-extension.git
   cd nimbus-web-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Running in Development Mode

Development mode provides hot-reload functionality:

```bash
npm run dev
```

This will create a build in `build/chrome-mv3-dev/`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will create a build in `build/chrome-mv3-prod/`.

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top-right corner)
3. Click "Load unpacked"
4. Select the build directory:
   - For development: `build/chrome-mv3-dev/`
   - For production: `build/chrome-mv3-prod/`

## Testing

### Manual Testing in Salesforce

1. Load the extension in Chrome (see above)
2. Navigate to your Salesforce org
3. Create or edit a record (e.g., Account, Contact, Opportunity)
4. Fill in some form fields
5. Look for the floating "Form Templates" panel on the right side
6. Click "💾 Save as Template" and give it a name
7. Refresh or navigate to another new/edit form of the same object type
8. Select your saved template from the dropdown
9. Click "📋 Load Template" to populate the form

### Verifying Template Storage

1. After saving a template, click the extension icon in Chrome toolbar
2. The popup will show all saved templates
3. You can delete templates from the popup

## Project Structure

```
nimbus-web-extension/
├── assets/              # Extension icons
│   ├── icon.svg         # Source SVG icon
│   └── icon-*.png       # Generated PNG icons
├── build/               # Built extension (gitignored)
├── content.ts           # Content script injected into Salesforce pages
├── popup.tsx            # Extension popup UI
├── package.json         # Project dependencies and configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # User documentation
```

## Key Technologies

- **Plasmo**: Browser extension framework
- **React**: UI framework for popup
- **TypeScript**: Type-safe JavaScript
- **@plasmohq/storage**: Extension storage abstraction

## Architecture

### Content Script (`content.ts`)

The content script runs on Salesforce pages and:
- Detects the current SObject type from the URL
- Finds all input fields on the form
- Injects a floating UI panel with save/load buttons
- Handles saving form data to Chrome storage
- Handles loading saved templates back into forms

### Popup (`popup.tsx`)

The popup provides a management interface to:
- View all saved templates
- See metadata (SObject type, field count, date)
- Delete unwanted templates

### Storage Schema

Templates are stored as an array with this structure:

```typescript
interface Template {
  name: string              // User-provided name
  sobject: string           // SObject type (e.g., "Account")
  fields: Record<string, string>  // Field name -> value map
  createdAt: string         // ISO timestamp
}
```

## Common Issues

### Extension not appearing on Salesforce pages

- Verify you're on a new/edit record page
- Check that the URL matches one of the patterns in `content.ts`
- Open DevTools console to check for errors

### Fields not saving/loading correctly

- Some Lightning Web Components use custom field names
- The extension tries multiple selectors to find fields
- Check the browser console for debugging information

### Production build fails

- Ensure `"type": "module"` is in `package.json`
- Clear the `.plasmo` cache directory and rebuild

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly in a Salesforce environment
4. Submit a pull request

## Debugging

To debug the content script:
1. Open Chrome DevTools on the Salesforce page
2. Check the Console tab for any errors
3. Use `console.log()` statements in `content.ts`

To debug the popup:
1. Right-click the extension icon
2. Select "Inspect popup"
3. DevTools will open for the popup

## Future Enhancements

- [ ] Support for more field types (checkbox, picklist, date, etc.)
- [ ] Import/export templates
- [ ] Template categories/folders
- [ ] Partial template application (select which fields to load)
- [ ] Template sharing between users
- [ ] Support for related object fields
