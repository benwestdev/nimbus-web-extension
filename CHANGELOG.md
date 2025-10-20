# Changelog

All notable changes to the Nimbus Web Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-20

### Added
- Initial release of Salesforce Form Template Extension
- Save form fields as templates
- Load templates to populate forms
- SObject-specific template filtering
- Support for multiple field types:
  - Text inputs (text, email, tel, number, url)
  - Date and datetime inputs
  - Checkboxes
  - Textareas
  - Select dropdowns
- Floating UI panel on Salesforce forms
- Extension popup for template management
- Delete individual templates
- Clear all templates feature
- Automatic SObject detection from URLs
- Support for Salesforce Lightning Experience
- Support for Salesforce Classic
- Chrome storage for template persistence
- Console logging for debugging
- Comprehensive documentation:
  - README.md with usage instructions
  - DEVELOPMENT.md with development guide
  - TESTING.md with test cases
  - LICENSE file (ISC)

### Technical Details
- Built with Plasmo framework v0.90.5
- React 18 for UI components
- TypeScript for type safety
- Chrome Manifest V3
- @plasmohq/storage for storage abstraction

### Browser Compatibility
- Chrome (tested)
- Edge (should work, untested)
- Other Chromium-based browsers (should work, untested)

### Known Limitations
- Custom Lightning components may not be fully supported
- Lookup fields and related lists are not saved
- File uploads are not included in templates
- Rich text editor content may not be saved correctly
- Templates are stored locally and not synced across browsers

## [Unreleased]

### Planned Features
- Template import/export functionality
- Template categories/folders
- Partial template application (select specific fields)
- Template sharing between users
- Support for more complex field types
- Firefox support
- Template search and filtering in popup
- Template duplication feature
- Keyboard shortcuts
- Customizable panel position
