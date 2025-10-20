import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: [
    "https://*.force.com/*",
    "https://*.salesforce.com/*",
    "https://*.lightning.force.com/*"
  ],
  all_frames: false
}

const storage = new Storage()

interface Template {
  name: string
  sobject: string
  fields: Record<string, string>
  createdAt: string
}

// Utility to detect SObject type from URL or page
function detectSObject(): string | null {
  const url = window.location.href
  
  // Try to extract from Lightning URL patterns
  const lightningMatch = url.match(/\/lightning\/[or]\/(\w+)\//)
  if (lightningMatch) {
    return lightningMatch[1]
  }
  
  // Try to extract from classic URL patterns
  const classicMatch = url.match(/\/(\w+)\/e\?/)
  if (classicMatch) {
    return classicMatch[1]
  }
  
  // Try to extract from setup patterns
  const setupMatch = url.match(/\/setup\/ui\/recordtypefields\.jsp\?type=(\w+)/)
  if (setupMatch) {
    return setupMatch[1]
  }
  
  // Try to get from page title or other indicators
  const pageTitle = document.title
  const titleMatch = pageTitle.match(/(\w+): New|Edit (\w+)/)
  if (titleMatch) {
    return titleMatch[1] || titleMatch[2]
  }
  
  return null
}

// Find all input fields in the form
function getFormFields(): Record<string, string> {
  const fields: Record<string, string> = {}
  
  // Get Lightning components and standard HTML inputs
  const allInputs = document.querySelectorAll(
    'lightning-input, lightning-textarea, lightning-combobox, input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="url"], input[type="date"], input[type="datetime-local"], input[type="checkbox"], textarea, select'
  )
  
  allInputs.forEach((input: Element) => {
    const htmlInput = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    
    // Try to get field name from various attributes
    const name = 
      htmlInput.name || 
      htmlInput.getAttribute("data-field-name") || 
      htmlInput.getAttribute("field-name") ||
      htmlInput.getAttribute("data-name") ||
      htmlInput.id
    
    if (!name) return
    
    // Handle different input types
    if (htmlInput.type === "checkbox") {
      fields[name] = (htmlInput as HTMLInputElement).checked ? "true" : "false"
    } else if (htmlInput.value) {
      fields[name] = htmlInput.value
    }
  })
  
  console.log(`[Nimbus] Found ${Object.keys(fields).length} fields to save`)
  return fields
}

// Populate form fields with saved values
function setFormFields(fields: Record<string, string>): void {
  let loadedCount = 0
  
  Object.entries(fields).forEach(([name, value]) => {
    // Try different selectors to find the field
    const selectors = [
      `[name="${name}"]`,
      `[data-field-name="${name}"]`,
      `[field-name="${name}"]`,
      `[data-name="${name}"]`,
      `#${name}`
    ]
    
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element: Element) => {
        const htmlElement = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        if (htmlElement) {
          // Handle checkboxes differently
          if ((element as HTMLInputElement).type === "checkbox") {
            (element as HTMLInputElement).checked = value === "true"
          } else {
            htmlElement.value = value
          }
          
          // Trigger events for Lightning components
          htmlElement.dispatchEvent(new Event("change", { bubbles: true }))
          htmlElement.dispatchEvent(new Event("input", { bubbles: true }))
          htmlElement.dispatchEvent(new Event("blur", { bubbles: true }))
          
          loadedCount++
        }
      })
    }
  })
  
  console.log(`[Nimbus] Loaded ${loadedCount} field values`)
}

// Create the template button UI
function createTemplateButtons(): HTMLDivElement {
  const container = document.createElement("div")
  container.id = "nimbus-template-buttons"
  container.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 10000;
    background: white;
    border: 2px solid #0070d2;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    min-width: 250px;
    font-family: 'Salesforce Sans', Arial, sans-serif;
  `
  
  const title = document.createElement("div")
  title.textContent = "Form Templates"
  title.style.cssText = `
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 14px;
    color: #080707;
  `
  container.appendChild(title)
  
  // Save Template button
  const saveBtn = document.createElement("button")
  saveBtn.textContent = "💾 Save as Template"
  saveBtn.style.cssText = `
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 8px;
    background: #0070d2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
  `
  saveBtn.onmouseover = () => {
    saveBtn.style.background = "#005fb2"
  }
  saveBtn.onmouseout = () => {
    saveBtn.style.background = "#0070d2"
  }
  saveBtn.onclick = () => handleSaveTemplate()
  container.appendChild(saveBtn)
  
  // Load Template dropdown
  const loadContainer = document.createElement("div")
  loadContainer.style.cssText = "margin-top: 8px;"
  
  const loadLabel = document.createElement("label")
  loadLabel.textContent = "Load Template:"
  loadLabel.style.cssText = `
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    color: #3e3e3c;
  `
  loadContainer.appendChild(loadLabel)
  
  const loadSelect = document.createElement("select")
  loadSelect.id = "nimbus-template-select"
  loadSelect.style.cssText = `
    width: 100%;
    padding: 6px;
    border: 1px solid #c9c9c9;
    border-radius: 4px;
    font-size: 13px;
    margin-bottom: 8px;
  `
  loadContainer.appendChild(loadSelect)
  
  const loadBtn = document.createElement("button")
  loadBtn.textContent = "📋 Load Template"
  loadBtn.style.cssText = `
    width: 100%;
    padding: 8px 12px;
    background: #2e844a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
  `
  loadBtn.onmouseover = () => {
    loadBtn.style.background = "#1f6e35"
  }
  loadBtn.onmouseout = () => {
    loadBtn.style.background = "#2e844a"
  }
  loadBtn.onclick = () => handleLoadTemplate()
  loadContainer.appendChild(loadBtn)
  
  container.appendChild(loadContainer)
  
  // Minimize button
  const minimizeBtn = document.createElement("button")
  minimizeBtn.textContent = "−"
  minimizeBtn.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    padding: 0;
    background: #f3f3f3;
    border: 1px solid #c9c9c9;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  `
  minimizeBtn.onclick = () => {
    const contentDiv = container.querySelector("div:nth-child(2)") as HTMLDivElement
    const loadDiv = loadContainer
    const saveButton = saveBtn
    
    if (contentDiv && loadDiv) {
      const isMinimized = contentDiv.style.display === "none"
      contentDiv.style.display = isMinimized ? "block" : "none"
      saveButton.style.display = isMinimized ? "block" : "none"
      loadDiv.style.display = isMinimized ? "block" : "none"
      minimizeBtn.textContent = isMinimized ? "−" : "+"
    }
  }
  container.appendChild(minimizeBtn)
  
  return container
}

// Handle saving template
async function handleSaveTemplate() {
  try {
    const sobject = detectSObject()
    if (!sobject) {
      alert("Could not detect SObject type. Please make sure you're on a Salesforce form.")
      return
    }
    
    const fields = getFormFields()
    if (Object.keys(fields).length === 0) {
      alert("No form fields found to save. Please fill in some fields first.")
      return
    }
    
    const name = prompt(`Enter a name for this ${sobject} template:`)
    if (!name || name.trim() === "") return
    
    const template: Template = {
      name: name.trim(),
      sobject,
      fields,
      createdAt: new Date().toISOString()
    }
    
    const templates = await storage.get<Template[]>("templates") || []
    templates.push(template)
    await storage.set("templates", templates)
    
    console.log("[Nimbus] Template saved:", template)
    alert(`✅ Template "${name}" saved successfully with ${Object.keys(fields).length} fields!`)
    await updateTemplateDropdown()
  } catch (error) {
    console.error("[Nimbus] Error saving template:", error)
    alert("❌ Failed to save template. Please try again.")
  }
}

// Handle loading template
async function handleLoadTemplate() {
  try {
    const select = document.getElementById("nimbus-template-select") as HTMLSelectElement
    const templateIndex = parseInt(select.value)
    
    if (isNaN(templateIndex)) {
      alert("Please select a template to load.")
      return
    }
    
    const templates = await storage.get<Template[]>("templates") || []
    const template = templates[templateIndex]
    
    if (!template) {
      alert("❌ Template not found.")
      return
    }
    
    console.log("[Nimbus] Loading template:", template)
    setFormFields(template.fields)
    alert(`✅ Template "${template.name}" loaded successfully with ${Object.keys(template.fields).length} fields!`)
  } catch (error) {
    console.error("[Nimbus] Error loading template:", error)
    alert("❌ Failed to load template. Please try again.")
  }
}

// Update the template dropdown
async function updateTemplateDropdown() {
  const select = document.getElementById("nimbus-template-select") as HTMLSelectElement
  if (!select) return
  
  const sobject = detectSObject()
  const templates = await storage.get<Template[]>("templates") || []
  
  // Filter templates for current SObject
  const relevantTemplates = templates.filter(t => t.sobject === sobject)
  
  select.innerHTML = '<option value="">Select a template...</option>'
  relevantTemplates.forEach((template, index) => {
    const option = document.createElement("option")
    option.value = templates.indexOf(template).toString()
    option.textContent = `${template.name} (${Object.keys(template.fields).length} fields)`
    select.appendChild(option)
  })
}

// Initialize the extension
function init() {
  console.log("[Nimbus] Initializing on page:", window.location.href)
  
  // Remove existing buttons if any
  const existing = document.getElementById("nimbus-template-buttons")
  if (existing) {
    existing.remove()
  }
  
  // Check if we're on a form page (edit/new)
  const url = window.location.href
  const isFormPage = url.includes("/e?") || url.includes("/lightning/r/") || url.includes("/lightning/o/")
  
  if (isFormPage) {
    console.log("[Nimbus] Detected form page, injecting template buttons")
    const sobject = detectSObject()
    if (sobject) {
      console.log("[Nimbus] Detected SObject type:", sobject)
    }
    
    const buttons = createTemplateButtons()
    document.body.appendChild(buttons)
    updateTemplateDropdown()
  } else {
    console.log("[Nimbus] Not a form page, skipping injection")
  }
}

console.log("[Nimbus] Salesforce Form Template Extension loaded")

// Wait for page to load and initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}

// Re-initialize on navigation (for Lightning Experience)
let lastUrl = window.location.href
setInterval(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href
    console.log("[Nimbus] URL changed, re-initializing")
    setTimeout(init, 1000) // Wait for page to load
  }
}, 1000)

export {}
