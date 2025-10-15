---
name: Form Builder Advanced
description: A comprehensive drag-and-drop form builder component that enables visual form creation with extensive field configuration, conditional logic, validation rules, and real-time preview capabilities.
keywords: form builder, drag and drop, form creator, dynamic forms, form validation, conditional logic, vuedraggable, form fields, custom forms, form configuration
---

#### Form Builder Advanced

***Purpose:***
This component provides a complete visual form building experience, allowing users to create custom forms by dragging and dropping field types from a sidebar onto a canvas. It includes comprehensive field configuration options, validation rules, conditional logic, and form submission handling.

***Features:***
- **Drag-and-Drop Interface**: Intuitive field placement and reordering using vuedraggable
- **14 Field Types**: Text, textarea, email, number, phone, date, time, select, radio, checkbox, file upload, submit button, heading, and description
- **Real-Time Preview**: Toggle between edit and preview modes to test form behavior
- **Field Configuration**: Comprehensive properties panel for customizing labels, placeholders, validation rules, and styling
- **Conditional Logic**: Show/hide fields based on other field values with multiple operators (equals, not equals, contains, greater than, less than)
- **Validation System**: Built-in validation for required fields, min/max length, patterns, and custom rules
- **Form Persistence**: Export/import form configurations as JSON for saving and loading
- **Responsive Design**: Adapts to different screen sizes with collapsible panels
- **Custom Styling**: Support for custom CSS classes on individual fields

***Properties:***
- `formTitle`: string - The main title displayed at the top of the form builder
- `formDescription`: string - Optional description text shown below the title
- `initialFields`: array - Pre-configured fields to load on initialization. Format: `[{ type: 'text', label: 'Name', required: true }]`
- `backgroundColor`: string - Background color of the entire component
- `sidebarWidth`: string - Width of the sidebar panel (e.g., "250px" or "20%")
- `sidebarBackgroundColor`: string - Background color of the sidebar
- `canvasBackgroundColor`: string - Background color of the canvas area
- `propertiesWidth`: string - Width of the properties panel (e.g., "300px" or "25%")
- `minHeight`: string - Minimum height of the component (e.g., "600px" or "80vh")

***Slots:***
- `sidebarHeaderElement`: (element) ww-flexbox - Dropzone for custom content in the sidebar header
- `canvasHeaderElement`: (element) ww-flexbox - Dropzone for custom content in the canvas header area
- `propertiesFooterElement`: (element) ww-flexbox - Dropzone for custom actions or content in the properties panel footer

***Events:***
- `submit`: Triggered when the form is submitted with valid data. Payload: `{ formData: {}, formConfig: {} }`
- `fieldChange`: Triggered when any field value changes. Payload: `{ fieldId: 'field_123', value: 'new value', formData: {} }`
- `validationError`: Triggered when form validation fails. Payload: `{ errors: [{ fieldId, fieldLabel, message }], formData: {} }`
- `export`: Triggered when the form configuration is exported. Payload: `{ formConfig: {} }`
- `clear`: Triggered when all fields are cleared. No payload
- `reset`: Triggered when form values are reset. No payload

***Exposed Actions:***
- `importForm`: Import a form configuration from JSON. Args: jsonConfig (string or object)
- `exportForm`: Export the current form configuration as a downloadable JSON file
- `resetForm`: Clear all form values while keeping the field structure
- `clearForm`: Remove all fields from the canvas
- `getFieldById`: Retrieve a field object by its ID. Args: fieldId (string)
- `setFieldValue`: Programmatically set a field's value. Args: fieldId (string), value (any)
- `validateForm`: Manually trigger form validation and return errors array
- `togglePreview`: Switch between edit and preview modes

***Exposed Variables:***
- `formData`: Current form values as an object with field IDs as keys. (path: variables['uid-formData'])
- `formConfig`: Complete form configuration including all fields and settings. (path: variables['uid-formConfig'])

***Field Types Available:***
1. **Text Input**: Single-line text field with min/max length validation
2. **Text Area**: Multi-line text field with configurable rows
3. **Email**: Email input with built-in format validation
4. **Number**: Numeric input with min/max value and step controls
5. **Phone**: Phone number input with pattern validation
6. **Date**: Date picker with min/max date constraints
7. **Time**: Time picker input
8. **Dropdown/Select**: Single or multiple selection dropdown with custom options
9. **Radio Buttons**: Single selection from multiple options
10. **Checkboxes**: Multiple selection from options
11. **File Upload**: File input with type and size restrictions
12. **Submit Button**: Customizable submit button with style options
13. **Heading**: Text heading with configurable level (H1-H4)
14. **Description**: Static text for form instructions

***Validation Rules:***
- **Required**: Mark fields as mandatory
- **Min/Max Length**: Character limits for text fields
- **Min/Max Value**: Numeric range constraints
- **Pattern**: Custom regex validation
- **File Size**: Maximum file size for uploads
- **File Types**: Accepted file extensions

***Conditional Logic:***
Fields can be shown or hidden based on other field values using:
- **Equals**: Show when field equals specific value
- **Not Equals**: Show when field doesn't equal value
- **Contains**: Show when field contains substring
- **Greater Than**: Show when numeric field exceeds value
- **Less Than**: Show when numeric field is below value

***Usage Example:***
1. Drag field types from the sidebar to the canvas
2. Click a field to select it and view its properties
3. Configure field settings in the properties panel
4. Add validation rules and conditional logic as needed
5. Toggle preview mode to test the form
6. Export the configuration to save your form
7. Use the submit event to handle form submissions

***Notes:***
- The component uses vuedraggable for drag-and-drop functionality
- Form data is automatically stored in component variables for external access
- Validation occurs before form submission and triggers appropriate events
- Conditional logic is evaluated in real-time as field values change
- The component is fully responsive and adapts to mobile screens
- Custom CSS classes can be added to individual fields for advanced styling
- File uploads return File objects that need to be handled separately
- The component prevents interactions in edit mode for better UX