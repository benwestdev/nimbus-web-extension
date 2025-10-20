import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

interface Template {
  name: string
  sobject: string
  fields: Record<string, string>
  createdAt: string
}

function IndexPopup() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const savedTemplates = await storage.get<Template[]>("templates") || []
      setTemplates(savedTemplates)
    } catch (error) {
      console.error("Error loading templates:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTemplate = async (index: number) => {
    const template = templates[index]
    if (!confirm(`Delete template "${template.name}"?`)) {
      return
    }
    
    try {
      const updatedTemplates = templates.filter((_, i) => i !== index)
      await storage.set("templates", updatedTemplates)
      setTemplates(updatedTemplates)
    } catch (error) {
      console.error("Error deleting template:", error)
      alert("Failed to delete template. Please try again.")
    }
  }

  return (
    <div
      style={{
        padding: "16px",
        minWidth: "300px",
        fontFamily: "Arial, sans-serif"
      }}>
      <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
        Salesforce Form Templates
      </h2>

      {loading ? (
        <p>Loading templates...</p>
      ) : templates.length === 0 ? (
        <p style={{ color: "#666" }}>
          No templates saved yet. Visit a Salesforce form to save a template.
        </p>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
            }}>
            <p style={{ margin: 0 }}>Saved Templates: {templates.length}</p>
            <button
              onClick={async () => {
                if (
                  confirm(
                    `Delete all ${templates.length} templates? This cannot be undone.`
                  )
                ) {
                  await storage.set("templates", [])
                  setTemplates([])
                }
              }}
              style={{
                backgroundColor: "#c23934",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: "11px"
              }}>
              Clear All
            </button>
          </div>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {templates.map((template, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "12px",
                  marginBottom: "8px",
                  backgroundColor: "#f9f9f9"
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px"
                  }}>
                  <strong>{template.name}</strong>
                  <button
                    onClick={() => deleteTemplate(index)}
                    style={{
                      backgroundColor: "#ff4444",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}>
                    Delete
                  </button>
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  <div>SObject: {template.sobject}</div>
                  <div>Fields: {Object.keys(template.fields).length}</div>
                  <div>
                    Created: {new Date(template.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
