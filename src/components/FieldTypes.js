// Field Types Configuration
export const FIELD_TYPES = {
  TEXT: 'text'
};

// Generate unique ID for fields
const generateId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Get field template by type
export const getFieldTemplate = (type) => {
  const baseField = {
    id: generateId(),
    type,
    label: '',
    placeholder: '',
    required: false,
    value: ''
  };

  const templates = {
    [FIELD_TYPES.TEXT]: {
      ...baseField,
      label: 'Text Field',
      placeholder: 'Enter text here...'
    }
  };

  return templates[type] || baseField;
};
