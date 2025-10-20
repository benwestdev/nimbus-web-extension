# Quick Start Guide

Get started with the Nimbus Salesforce Form Template Extension in 5 minutes!

## 📦 Installation (2 minutes)

### Step 1: Build the Extension

```bash
# Clone the repository (if not already done)
git clone https://github.com/benwestdev/nimbus-web-extension.git
cd nimbus-web-extension

# Install dependencies
npm install

# Build the extension
npm run build
```

### Step 2: Load in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked**
5. Navigate to and select: `build/chrome-mv3-prod/`
6. The extension icon should appear in your toolbar!

## 🚀 First Use (3 minutes)

### Save Your First Template

1. **Log into Salesforce**
   - Go to your Salesforce org (scratch org, dev, or sandbox)

2. **Navigate to a Form**
   - Click on any object (e.g., Accounts)
   - Click **New** to create a new record

3. **Fill in Some Fields**
   - Enter values in a few fields (e.g., Account Name, Phone, Website)

4. **Save as Template**
   - Look for the floating **"Form Templates"** panel on the right side
   - Click **💾 Save as Template**
   - Enter a name (e.g., "Test Account")
   - Click OK

5. **Success!**
   - You'll see a success message with the number of fields saved
   - Your template is now saved

### Load Your Template

1. **Navigate to Another Form**
   - Click **New** again on the same object type

2. **Load Template**
   - In the "Form Templates" panel, select your template from the dropdown
   - Click **📋 Load Template**

3. **Done!**
   - All your saved field values are now populated
   - Just click Save to create the record

## 💡 Pro Tips

### View All Templates
- Click the extension icon in Chrome toolbar
- See all your saved templates
- Delete templates you no longer need

### Minimize the Panel
- Click the **−** button to minimize the panel
- Click **+** to expand it again

### Multiple Templates
- Save multiple templates for the same object type
- Give them descriptive names (e.g., "Default Account", "Test Data", "Demo Setup")

### Different Object Types
- Templates are filtered by object type
- Account templates only appear on Account forms
- Contact templates only appear on Contact forms

## 🔧 Troubleshooting

### Panel Not Appearing?
- ✅ Make sure you're on a new/edit form page
- ✅ Refresh the page after installing
- ✅ Check console (F12) for any errors

### Fields Not Saving?
- ✅ Make sure fields have values
- ✅ Some custom components may not be supported
- ✅ Check console for debug messages (look for `[Nimbus]`)

### Templates Not Loading?
- ✅ Make sure you selected a template from dropdown
- ✅ Verify you're on the same object type
- ✅ Try refreshing the page

## 📚 Learn More

- **Full Documentation**: See [README.md](README.md)
- **Development Guide**: See [DEVELOPMENT.md](DEVELOPMENT.md)
- **Test Cases**: See [TESTING.md](TESTING.md)

## 🎯 Common Use Cases

### 1. Testing Data
Save templates with test data to quickly create test records.

### 2. Demo Setups
Create templates for demo scenarios with pre-filled data.

### 3. Standard Configurations
Save templates for records that always have the same base configuration.

### 4. Training
Use templates to help train new users with example data.

## ⚡ Keyboard Workflow

1. Navigate to form: `Ctrl+K` (Salesforce quick search)
2. Fill fields: `Tab` to move between fields
3. Save template: Click button in panel
4. Load template: Select and click load

## 🔒 Privacy & Security

- ✅ All templates stored locally on your computer
- ✅ No data sent to external servers
- ✅ Only works on Salesforce domains
- ✅ Open source - you can review the code

## 🤝 Get Help

- **Issues**: Open an issue on GitHub
- **Questions**: Check the documentation
- **Bugs**: See console for error messages

---

**Ready to save time with templates?** Follow the steps above and start using templates in your Salesforce org today! 🎉
