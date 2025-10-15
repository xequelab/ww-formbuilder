export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  NUMBER: 'number',
  PHONE: 'phone',
  DATE: 'date',
  TIME: 'time',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  FILE: 'file',
  SUBMIT: 'submit',
  HEADING: 'heading',
  DESCRIPTION: 'description'
};

export const getFieldTemplate = (type) => {
  const baseField = {
    id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: '',
    placeholder: '',
    required: false,
    customClass: '',
    conditionalLogic: {
      enabled: false,
      fieldId: null,
      operator: 'equals',
      value: ''
    }
  };

  const templates = {
    [FIELD_TYPES.TEXT]: {
      ...baseField,
      label: 'Text Field',
      placeholder: 'Enter text',
      validation: {
        minLength: null,
        maxLength: null,
        pattern: ''
      }
    },
    [FIELD_TYPES.TEXTAREA]: {
      ...baseField,
      label: 'Text Area',
      placeholder: 'Enter detailed text',
      rows: 4,
      validation: {
        minLength: null,
        maxLength: null
      }
    },
    [FIELD_TYPES.EMAIL]: {
      ...baseField,
      label: 'Email',
      placeholder: 'email@example.com',
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
      }
    },
    [FIELD_TYPES.NUMBER]: {
      ...baseField,
      label: 'Number',
      placeholder: '0',
      validation: {
        min: null,
        max: null,
        step: 1
      }
    },
    [FIELD_TYPES.PHONE]: {
      ...baseField,
      label: 'Phone',
      placeholder: '(555) 555-5555',
      validation: {
        pattern: '^[\\d\\s\\-\\(\\)\\+]+$'
      }
    },
    [FIELD_TYPES.DATE]: {
      ...baseField,
      label: 'Date',
      placeholder: '',
      validation: {
        min: null,
        max: null
      }
    },
    [FIELD_TYPES.TIME]: {
      ...baseField,
      label: 'Time',
      placeholder: '',
      validation: {}
    },
    [FIELD_TYPES.SELECT]: {
      ...baseField,
      label: 'Dropdown',
      placeholder: 'Select an option',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ],
      multiple: false
    },
    [FIELD_TYPES.RADIO]: {
      ...baseField,
      label: 'Radio Buttons',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ]
    },
    [FIELD_TYPES.CHECKBOX]: {
      ...baseField,
      label: 'Checkboxes',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ]
    },
    [FIELD_TYPES.FILE]: {
      ...baseField,
      label: 'File Upload',
      placeholder: 'Choose file',
      validation: {
        maxSize: 5242880,
        acceptedTypes: '*'
      },
      multiple: false
    },
    [FIELD_TYPES.SUBMIT]: {
      ...baseField,
      label: 'Submit',
      buttonText: 'Submit Form',
      buttonStyle: 'primary'
    },
    [FIELD_TYPES.HEADING]: {
      ...baseField,
      label: 'Form Heading',
      text: 'Form Title',
      level: 'h2'
    },
    [FIELD_TYPES.DESCRIPTION]: {
      ...baseField,
      label: 'Description',
      text: 'Form description text'
    }
  };

  return templates[type] || baseField;
};

export const FIELD_ICONS = {
  [FIELD_TYPES.TEXT]: 'text',
  [FIELD_TYPES.TEXTAREA]: 'text',
  [FIELD_TYPES.EMAIL]: 'mail',
  [FIELD_TYPES.NUMBER]: 'calculator',
  [FIELD_TYPES.PHONE]: 'phone',
  [FIELD_TYPES.DATE]: 'calendar',
  [FIELD_TYPES.TIME]: 'clock',
  [FIELD_TYPES.SELECT]: 'select',
  [FIELD_TYPES.RADIO]: 'bullet-list',
  [FIELD_TYPES.CHECKBOX]: 'check',
  [FIELD_TYPES.FILE]: 'upload',
  [FIELD_TYPES.SUBMIT]: 'play',
  [FIELD_TYPES.HEADING]: 'h1',
  [FIELD_TYPES.DESCRIPTION]: 'text'
};