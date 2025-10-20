# Testing Guide

This document outlines how to test the Nimbus Web Extension in a Salesforce environment.

## Prerequisites

- Chrome browser with the extension installed
- Access to a Salesforce org (scratch org, developer org, or sandbox recommended)
- Basic understanding of Salesforce objects and forms

## Test Environment Setup

1. Build and load the extension (see README.md)
2. Log in to your Salesforce org
3. Open the browser console (F12) to see debug logs prefixed with `[Nimbus]`

## Manual Test Cases

### Test Case 1: Save a Simple Template

**Objective**: Verify basic template saving functionality

**Steps**:
1. Navigate to a standard object (e.g., Account) and click "New"
2. Fill in at least 3-4 fields (Account Name, Phone, Website, etc.)
3. Verify the floating "Form Templates" panel appears on the right side
4. Click "💾 Save as Template"
5. Enter a template name (e.g., "Test Account Template")
6. Click OK

**Expected Results**:
- Success alert appears showing the number of saved fields
- Template name is visible in the dropdown
- Console shows `[Nimbus] Template saved` message
- Extension popup shows the saved template

**Pass/Fail**: ☐

---

### Test Case 2: Load a Saved Template

**Objective**: Verify template loading functionality

**Steps**:
1. Navigate to the same object (Account) and click "New" again
2. Verify the form is empty
3. In the "Form Templates" panel, select your saved template from dropdown
4. Click "📋 Load Template"

**Expected Results**:
- Success alert appears
- All form fields are populated with saved values
- Console shows `[Nimbus] Loading template` message
- Field count in alert matches saved field count

**Pass/Fail**: ☐

---

### Test Case 3: SObject Filtering

**Objective**: Verify templates are filtered by SObject type

**Steps**:
1. Save a template on an Account form (name it "Account Template")
2. Navigate to a different object (e.g., Contact) and click "New"
3. Open the template dropdown

**Expected Results**:
- The Account template should NOT appear in the Contact form dropdown
- Dropdown should show "Select a template..." if no Contact templates exist
- Console shows correct SObject detection

**Pass/Fail**: ☐

---

### Test Case 4: Multiple Field Types

**Objective**: Verify support for various field types

**Steps**:
1. Navigate to an object with diverse field types (Contact is good)
2. Fill in:
   - Text fields (Name, Email)
   - Phone number
   - Date field (Birthdate)
   - Checkbox field (Email Opt Out)
   - Select/Picklist (Lead Source)
3. Save as template
4. Refresh or create new record
5. Load the template

**Expected Results**:
- All field types are saved correctly
- All field types are loaded correctly
- Checkboxes maintain their checked/unchecked state
- Dates are properly formatted

**Pass/Fail**: ☐

---

### Test Case 5: Template Management

**Objective**: Verify popup template management

**Steps**:
1. Save 2-3 templates on different objects
2. Click the extension icon in Chrome toolbar
3. Verify all templates are listed with:
   - Template name
   - SObject type
   - Field count
   - Created date
4. Click "Delete" on one template
5. Confirm deletion

**Expected Results**:
- All templates appear in popup
- Metadata is correct for each template
- Deleted template disappears immediately
- Deleted template no longer appears in form dropdown

**Pass/Fail**: ☐

---

### Test Case 6: Lightning vs Classic

**Objective**: Verify extension works in both Salesforce interfaces

**Steps**:
1. Test in Lightning Experience:
   - Save template on Account form
   - Load template on new Account form
2. Switch to Salesforce Classic (if available):
   - Navigate to Account edit/new page
   - Verify extension loads
   - Test save/load functionality

**Expected Results**:
- Extension works in both interfaces
- Template panel appears in both
- All functionality works the same way

**Pass/Fail**: ☐

---

### Test Case 7: Navigation Detection

**Objective**: Verify extension detects navigation in Lightning

**Steps**:
1. Start on Salesforce home page
2. Verify extension panel is NOT visible
3. Navigate to Account new form
4. Verify panel appears
5. Navigate to Opportunity new form
6. Verify panel updates with Opportunity templates

**Expected Results**:
- Panel only appears on form pages
- Panel updates when navigating between different object forms
- Console shows `[Nimbus] URL changed, re-initializing`

**Pass/Fail**: ☐

---

### Test Case 8: Error Handling

**Objective**: Verify proper error handling

**Steps**:
1. Navigate to a form page
2. Without filling any fields, click "💾 Save as Template"
3. Try to load a template without selecting one
4. Create and test edge cases:
   - Very long template names
   - Special characters in template names
   - Empty template name

**Expected Results**:
- Clear error messages for each scenario
- No form fields: "No form fields found to save"
- No selection: "Please select a template to load"
- Empty name: Template not saved
- Extension remains functional after errors

**Pass/Fail**: ☐

---

### Test Case 9: Storage Persistence

**Objective**: Verify templates persist across sessions

**Steps**:
1. Save 2-3 templates
2. Close Chrome completely
3. Reopen Chrome and navigate to extension
4. Click extension icon
5. Navigate to Salesforce form

**Expected Results**:
- All saved templates appear in popup
- Templates appear in form dropdown
- No data loss

**Pass/Fail**: ☐

---

### Test Case 10: Multiple Salesforce Orgs

**Objective**: Verify extension works across multiple orgs

**Steps**:
1. Save templates in Org A (e.g., sandbox)
2. Log out and log into Org B (e.g., production)
3. Check if templates appear
4. Save new templates in Org B
5. Switch back to Org A

**Expected Results**:
- Templates are shared across orgs (stored locally)
- User is aware templates work across orgs
- No conflicts or errors when switching

**Pass/Fail**: ☐

---

## Performance Testing

### Load Time
- Extension should load within 1 second on form pages
- No noticeable performance impact on Salesforce

### Large Templates
- Test with forms having 20+ fields
- Verify save/load completes in reasonable time (< 3 seconds)

### Many Templates
- Save 20+ templates
- Verify dropdown remains responsive
- Verify popup displays all templates

## Browser Console Checks

Look for these log messages during testing:

```
[Nimbus] Salesforce Form Template Extension loaded
[Nimbus] Initializing on page: [URL]
[Nimbus] Detected form page, injecting template buttons
[Nimbus] Detected SObject type: [Object]
[Nimbus] Found X fields to save
[Nimbus] Template saved: [Object]
[Nimbus] Loading template: [Object]
[Nimbus] Loaded X field values
[Nimbus] URL changed, re-initializing
```

## Known Limitations

Document any discovered limitations here:

1. Custom Lightning components may not be detected
2. Some field types (e.g., rich text, lookup fields) may not work
3. Related list fields are not supported
4. File uploads are not saved in templates

## Bug Reporting

When reporting bugs, include:
- Salesforce org type (scratch, dev, sandbox, production)
- Lightning or Classic
- Browser version
- Extension version
- Console error messages
- Steps to reproduce
- Expected vs actual behavior

## Security Testing

- Verify no sensitive data is logged to console
- Confirm storage is local to browser
- Test that templates work only in Salesforce domains
- Verify extension doesn't interfere with Salesforce functionality
