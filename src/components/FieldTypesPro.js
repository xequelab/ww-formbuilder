/**
 * Form Builder Pro - Field Types
 * 25+ Professional Field Types with Advanced Configurations
 */

export const FIELD_TYPES = {
  // ==================== TEXT INPUTS ====================
  TEXT: 'text',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  PASSWORD: 'password',
  URL: 'url',
  PHONE: 'phone',

  // ==================== NUMBERS & DATES ====================
  NUMBER: 'number',
  CURRENCY: 'currency',
  DATE: 'date',
  TIME: 'time',
  DATETIME: 'datetime',
  DATE_RANGE: 'daterange',

  // ==================== SELECTIONS ====================
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  TOGGLE: 'toggle',
  BUTTON_GROUP: 'buttongroup',

  // ==================== ADVANCED INPUTS ====================
  SLIDER: 'slider',
  RATING: 'rating',
  COLOR_PICKER: 'colorpicker',
  FILE_UPLOAD: 'file',
  IMAGE_UPLOAD: 'image',
  SIGNATURE: 'signature',

  // ==================== RICH CONTENT ====================
  RICH_TEXT: 'richtext',
  CODE_EDITOR: 'code',
  MARKDOWN: 'markdown',

  // ==================== LOCATION & MEDIA ====================
  MAP_LOCATION: 'location',
  VIDEO_RECORDER: 'video',
  AUDIO_RECORDER: 'audio',

  // ==================== LAYOUT & CONTENT ====================
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  DIVIDER: 'divider',
  SPACER: 'spacer',
  HTML_BLOCK: 'html',

  // ==================== ACTIONS ====================
  SUBMIT: 'submit',
  RESET: 'reset',
  BUTTON: 'button',
};

export const FIELD_CATEGORIES = {
  text: {
    label: 'Text Inputs',
    icon: '📝',
    fields: [
      FIELD_TYPES.TEXT,
      FIELD_TYPES.TEXTAREA,
      FIELD_TYPES.EMAIL,
      FIELD_TYPES.PASSWORD,
      FIELD_TYPES.URL,
      FIELD_TYPES.PHONE,
    ],
  },
  numbers: {
    label: 'Numbers & Dates',
    icon: '🔢',
    fields: [
      FIELD_TYPES.NUMBER,
      FIELD_TYPES.CURRENCY,
      FIELD_TYPES.DATE,
      FIELD_TYPES.TIME,
      FIELD_TYPES.DATETIME,
      FIELD_TYPES.DATE_RANGE,
    ],
  },
  selections: {
    label: 'Selections',
    icon: '✅',
    fields: [
      FIELD_TYPES.SELECT,
      FIELD_TYPES.MULTISELECT,
      FIELD_TYPES.RADIO,
      FIELD_TYPES.CHECKBOX,
      FIELD_TYPES.TOGGLE,
      FIELD_TYPES.BUTTON_GROUP,
    ],
  },
  advanced: {
    label: 'Advanced',
    icon: '⚡',
    fields: [
      FIELD_TYPES.SLIDER,
      FIELD_TYPES.RATING,
      FIELD_TYPES.COLOR_PICKER,
      FIELD_TYPES.FILE_UPLOAD,
      FIELD_TYPES.IMAGE_UPLOAD,
      FIELD_TYPES.SIGNATURE,
    ],
  },
  rich: {
    label: 'Rich Content',
    icon: '✨',
    fields: [
      FIELD_TYPES.RICH_TEXT,
      FIELD_TYPES.CODE_EDITOR,
      FIELD_TYPES.MARKDOWN,
    ],
  },
  media: {
    label: 'Media & Location',
    icon: '🎬',
    fields: [
      FIELD_TYPES.MAP_LOCATION,
      FIELD_TYPES.VIDEO_RECORDER,
      FIELD_TYPES.AUDIO_RECORDER,
    ],
  },
  layout: {
    label: 'Layout',
    icon: '📐',
    fields: [
      FIELD_TYPES.HEADING,
      FIELD_TYPES.PARAGRAPH,
      FIELD_TYPES.DIVIDER,
      FIELD_TYPES.SPACER,
      FIELD_TYPES.HTML_BLOCK,
    ],
  },
  actions: {
    label: 'Actions',
    icon: '🎯',
    fields: [
      FIELD_TYPES.SUBMIT,
      FIELD_TYPES.RESET,
      FIELD_TYPES.BUTTON,
    ],
  },
};

export const getFieldTemplate = (type) => {
  const baseField = {
    id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: '',
    placeholder: '',
    helpText: '',
    required: false,
    disabled: false,
    hidden: false,
    customClass: '',
    width: '100%',
    conditionalLogic: {
      enabled: false,
      rules: [],
      condition: 'all', // 'all' or 'any'
    },
    validation: {},
    appearance: {
      labelPosition: 'top', // 'top', 'left', 'inside', 'floating'
      size: 'medium', // 'small', 'medium', 'large'
      variant: 'outlined', // 'outlined', 'filled', 'underlined'
    },
    analytics: {
      interactions: 0,
      timeSpent: 0,
      lastInteraction: null,
    },
  };

  const templates = {
    // ==================== TEXT INPUTS ====================
    [FIELD_TYPES.TEXT]: {
      ...baseField,
      label: 'Text Field',
      placeholder: 'Enter text',
      validation: {
        minLength: null,
        maxLength: null,
        pattern: '',
        customValidation: '',
      },
      appearance: {
        ...baseField.appearance,
        icon: '',
        prefix: '',
        suffix: '',
      },
    },

    [FIELD_TYPES.TEXTAREA]: {
      ...baseField,
      label: 'Text Area',
      placeholder: 'Enter detailed text',
      rows: 4,
      autoResize: true,
      maxRows: 10,
      validation: {
        minLength: null,
        maxLength: null,
        wordCount: null,
      },
      appearance: {
        ...baseField.appearance,
        showCharCount: true,
        showWordCount: false,
      },
    },

    [FIELD_TYPES.EMAIL]: {
      ...baseField,
      label: 'Email',
      placeholder: 'email@example.com',
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        verifyDomain: false,
        allowedDomains: [],
      },
      appearance: {
        ...baseField.appearance,
        icon: 'mail',
      },
    },

    [FIELD_TYPES.PASSWORD]: {
      ...baseField,
      label: 'Password',
      placeholder: 'Enter password',
      validation: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        pattern: '',
      },
      appearance: {
        ...baseField.appearance,
        showStrengthMeter: true,
        showToggleVisibility: true,
        strengthLevels: ['weak', 'fair', 'good', 'strong'],
      },
    },

    [FIELD_TYPES.URL]: {
      ...baseField,
      label: 'Website URL',
      placeholder: 'https://example.com',
      validation: {
        pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b',
        requireHttps: false,
      },
      appearance: {
        ...baseField.appearance,
        icon: 'link',
      },
    },

    [FIELD_TYPES.PHONE]: {
      ...baseField,
      label: 'Phone Number',
      placeholder: '(555) 123-4567',
      validation: {
        pattern: '^[\\d\\s\\-\\(\\)\\+]+$',
        format: 'US', // 'US', 'UK', 'BR', 'INTL'
        minLength: 10,
      },
      appearance: {
        ...baseField.appearance,
        icon: 'phone',
        mask: '(999) 999-9999',
        countryCode: true,
      },
    },

    // ==================== NUMBERS & DATES ====================
    [FIELD_TYPES.NUMBER]: {
      ...baseField,
      label: 'Number',
      placeholder: '0',
      validation: {
        min: null,
        max: null,
        step: 1,
        allowDecimals: false,
        decimalPlaces: 2,
      },
      appearance: {
        ...baseField.appearance,
        showStepper: true,
        thousandsSeparator: ',',
      },
    },

    [FIELD_TYPES.CURRENCY]: {
      ...baseField,
      label: 'Currency',
      placeholder: '$0.00',
      validation: {
        min: 0,
        max: null,
        step: 0.01,
        allowNegative: false,
      },
      appearance: {
        ...baseField.appearance,
        currency: 'USD',
        currencySymbol: '$',
        symbolPosition: 'left',
        decimalPlaces: 2,
      },
    },

    [FIELD_TYPES.DATE]: {
      ...baseField,
      label: 'Date',
      placeholder: 'Select date',
      validation: {
        min: null,
        max: null,
        disabledDates: [],
        disabledDaysOfWeek: [],
      },
      appearance: {
        ...baseField.appearance,
        format: 'MM/DD/YYYY',
        showCalendar: true,
        inline: false,
        highlightToday: true,
      },
    },

    [FIELD_TYPES.TIME]: {
      ...baseField,
      label: 'Time',
      placeholder: 'Select time',
      validation: {
        min: null,
        max: null,
        step: 15, // minutes
      },
      appearance: {
        ...baseField.appearance,
        format: '12h', // '12h' or '24h'
        showSeconds: false,
        inline: false,
      },
    },

    [FIELD_TYPES.DATETIME]: {
      ...baseField,
      label: 'Date & Time',
      placeholder: 'Select date and time',
      validation: {
        min: null,
        max: null,
      },
      appearance: {
        ...baseField.appearance,
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        inline: false,
      },
    },

    [FIELD_TYPES.DATE_RANGE]: {
      ...baseField,
      label: 'Date Range',
      placeholder: 'Select date range',
      validation: {
        minDays: null,
        maxDays: null,
      },
      appearance: {
        ...baseField.appearance,
        format: 'MM/DD/YYYY',
        showPresets: true,
        presets: ['Today', 'Last 7 days', 'Last 30 days', 'This month'],
      },
    },

    // ==================== SELECTIONS ====================
    [FIELD_TYPES.SELECT]: {
      ...baseField,
      label: 'Dropdown',
      placeholder: 'Select an option',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      validation: {
        allowEmpty: true,
      },
      appearance: {
        ...baseField.appearance,
        searchable: false,
        clearable: true,
        showIcons: false,
      },
    },

    [FIELD_TYPES.MULTISELECT]: {
      ...baseField,
      label: 'Multi-select',
      placeholder: 'Select multiple options',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      validation: {
        minSelected: null,
        maxSelected: null,
      },
      appearance: {
        ...baseField.appearance,
        searchable: true,
        showSelectAll: true,
        showChips: true,
        chipColor: 'primary',
      },
    },

    [FIELD_TYPES.RADIO]: {
      ...baseField,
      label: 'Radio Buttons',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
      appearance: {
        ...baseField.appearance,
        layout: 'vertical', // 'vertical', 'horizontal', 'grid'
        columns: 2,
        size: 'medium',
      },
    },

    [FIELD_TYPES.CHECKBOX]: {
      ...baseField,
      label: 'Checkboxes',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
      validation: {
        minSelected: null,
        maxSelected: null,
      },
      appearance: {
        ...baseField.appearance,
        layout: 'vertical',
        columns: 2,
        showSelectAll: false,
      },
    },

    [FIELD_TYPES.TOGGLE]: {
      ...baseField,
      label: 'Toggle Switch',
      defaultValue: false,
      appearance: {
        ...baseField.appearance,
        onLabel: 'Yes',
        offLabel: 'No',
        size: 'medium',
        color: 'primary',
      },
    },

    [FIELD_TYPES.BUTTON_GROUP]: {
      ...baseField,
      label: 'Button Group',
      options: [
        { label: 'Option 1', value: 'option1', icon: '' },
        { label: 'Option 2', value: 'option2', icon: '' },
        { label: 'Option 3', value: 'option3', icon: '' },
      ],
      validation: {
        allowMultiple: false,
      },
      appearance: {
        ...baseField.appearance,
        variant: 'contained', // 'contained', 'outlined', 'text'
        size: 'medium',
        fullWidth: false,
      },
    },

    // ==================== ADVANCED INPUTS ====================
    [FIELD_TYPES.SLIDER]: {
      ...baseField,
      label: 'Slider',
      validation: {
        min: 0,
        max: 100,
        step: 1,
      },
      defaultValue: 50,
      appearance: {
        ...baseField.appearance,
        showValue: true,
        showMarks: true,
        marks: [],
        thumbShape: 'circle', // 'circle', 'square'
        trackHeight: 4,
        color: 'primary',
      },
    },

    [FIELD_TYPES.RATING]: {
      ...baseField,
      label: 'Rating',
      validation: {
        max: 5,
        allowHalf: true,
      },
      appearance: {
        ...baseField.appearance,
        icon: 'star', // 'star', 'heart', 'thumb', 'emoji'
        size: 'large',
        color: '#ffc107',
        showLabels: true,
        labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      },
    },

    [FIELD_TYPES.COLOR_PICKER]: {
      ...baseField,
      label: 'Color Picker',
      placeholder: '#000000',
      validation: {
        format: 'hex', // 'hex', 'rgb', 'rgba', 'hsl'
      },
      appearance: {
        ...baseField.appearance,
        showPresets: true,
        presetColors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'],
        showAlpha: false,
        showInput: true,
      },
    },

    [FIELD_TYPES.FILE_UPLOAD]: {
      ...baseField,
      label: 'File Upload',
      placeholder: 'Choose file(s)',
      validation: {
        maxSize: 5242880, // 5MB
        acceptedTypes: '*',
        maxFiles: 1,
        minFiles: null,
      },
      appearance: {
        ...baseField.appearance,
        uploadStyle: 'button', // 'button', 'drag-drop', 'inline'
        showPreview: true,
        showProgress: true,
        allowMultiple: false,
      },
    },

    [FIELD_TYPES.IMAGE_UPLOAD]: {
      ...baseField,
      label: 'Image Upload',
      placeholder: 'Upload image',
      validation: {
        maxSize: 5242880,
        acceptedTypes: 'image/jpeg,image/png,image/gif,image/webp',
        maxFiles: 1,
        maxWidth: null,
        maxHeight: null,
        aspectRatio: null,
      },
      appearance: {
        ...baseField.appearance,
        uploadStyle: 'drag-drop',
        showPreview: true,
        previewSize: 'medium',
        allowCrop: true,
        allowResize: true,
      },
    },

    [FIELD_TYPES.SIGNATURE]: {
      ...baseField,
      label: 'Signature',
      placeholder: 'Sign here',
      validation: {
        required: false,
      },
      appearance: {
        ...baseField.appearance,
        width: '100%',
        height: '200px',
        penColor: '#000000',
        backgroundColor: '#ffffff',
        lineWidth: 2,
        showClearButton: true,
      },
    },

    // ==================== RICH CONTENT ====================
    [FIELD_TYPES.RICH_TEXT]: {
      ...baseField,
      label: 'Rich Text Editor',
      placeholder: 'Enter formatted text',
      validation: {
        minLength: null,
        maxLength: null,
      },
      appearance: {
        ...baseField.appearance,
        toolbar: ['bold', 'italic', 'underline', 'list', 'link', 'image'],
        height: '300px',
        theme: 'snow',
      },
    },

    [FIELD_TYPES.CODE_EDITOR]: {
      ...baseField,
      label: 'Code Editor',
      placeholder: '// Enter code',
      validation: {
        minLength: null,
        maxLength: null,
      },
      appearance: {
        ...baseField.appearance,
        language: 'javascript',
        theme: 'vs-dark',
        lineNumbers: true,
        minimap: false,
        height: '400px',
      },
    },

    [FIELD_TYPES.MARKDOWN]: {
      ...baseField,
      label: 'Markdown Editor',
      placeholder: '# Enter markdown',
      validation: {
        minLength: null,
        maxLength: null,
      },
      appearance: {
        ...baseField.appearance,
        showPreview: true,
        splitView: false,
        height: '400px',
      },
    },

    // ==================== LOCATION & MEDIA ====================
    [FIELD_TYPES.MAP_LOCATION]: {
      ...baseField,
      label: 'Location',
      placeholder: 'Search location',
      validation: {
        required: false,
      },
      appearance: {
        ...baseField.appearance,
        mapType: 'roadmap',
        zoom: 12,
        height: '300px',
        showSearch: true,
        allowMarker: true,
      },
    },

    [FIELD_TYPES.VIDEO_RECORDER]: {
      ...baseField,
      label: 'Video Recording',
      validation: {
        maxDuration: 300, // seconds
        maxSize: 52428800, // 50MB
      },
      appearance: {
        ...baseField.appearance,
        width: '100%',
        height: '300px',
        showTimer: true,
        allowReview: true,
      },
    },

    [FIELD_TYPES.AUDIO_RECORDER]: {
      ...baseField,
      label: 'Audio Recording',
      validation: {
        maxDuration: 300,
        maxSize: 10485760, // 10MB
      },
      appearance: {
        ...baseField.appearance,
        showWaveform: true,
        showTimer: true,
        allowReview: true,
      },
    },

    // ==================== LAYOUT & CONTENT ====================
    [FIELD_TYPES.HEADING]: {
      ...baseField,
      label: 'Heading',
      text: 'Section Title',
      level: 'h2', // 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      appearance: {
        ...baseField.appearance,
        align: 'left', // 'left', 'center', 'right'
        color: '',
        marginTop: '24px',
        marginBottom: '16px',
      },
    },

    [FIELD_TYPES.PARAGRAPH]: {
      ...baseField,
      label: 'Paragraph',
      text: 'Description text goes here',
      appearance: {
        ...baseField.appearance,
        align: 'left',
        color: '',
        fontSize: '14px',
        lineHeight: '1.6',
      },
    },

    [FIELD_TYPES.DIVIDER]: {
      ...baseField,
      label: 'Divider',
      appearance: {
        ...baseField.appearance,
        style: 'solid', // 'solid', 'dashed', 'dotted'
        color: '#e5e7eb',
        thickness: 1,
        spacing: '24px',
      },
    },

    [FIELD_TYPES.SPACER]: {
      ...baseField,
      label: 'Spacer',
      appearance: {
        ...baseField.appearance,
        height: '24px',
      },
    },

    [FIELD_TYPES.HTML_BLOCK]: {
      ...baseField,
      label: 'HTML Block',
      html: '<p>Custom HTML content</p>',
      appearance: {
        ...baseField.appearance,
        allowScripts: false,
      },
    },

    // ==================== ACTIONS ====================
    [FIELD_TYPES.SUBMIT]: {
      ...baseField,
      label: 'Submit',
      buttonText: 'Submit Form',
      appearance: {
        ...baseField.appearance,
        variant: 'contained',
        size: 'large',
        fullWidth: false,
        icon: '',
        iconPosition: 'left',
        loadingText: 'Submitting...',
        successText: 'Submitted!',
      },
    },

    [FIELD_TYPES.RESET]: {
      ...baseField,
      label: 'Reset',
      buttonText: 'Reset Form',
      appearance: {
        ...baseField.appearance,
        variant: 'outlined',
        size: 'medium',
        fullWidth: false,
      },
    },

    [FIELD_TYPES.BUTTON]: {
      ...baseField,
      label: 'Custom Button',
      buttonText: 'Click Me',
      action: 'custom',
      appearance: {
        ...baseField.appearance,
        variant: 'contained',
        size: 'medium',
        fullWidth: false,
        icon: '',
      },
    },
  };

  return templates[type] || baseField;
};

export const FIELD_ICONS = {
  [FIELD_TYPES.TEXT]: 'text',
  [FIELD_TYPES.TEXTAREA]: 'file-text',
  [FIELD_TYPES.EMAIL]: 'mail',
  [FIELD_TYPES.PASSWORD]: 'lock',
  [FIELD_TYPES.URL]: 'link',
  [FIELD_TYPES.PHONE]: 'phone',
  [FIELD_TYPES.NUMBER]: 'hash',
  [FIELD_TYPES.CURRENCY]: 'dollar-sign',
  [FIELD_TYPES.DATE]: 'calendar',
  [FIELD_TYPES.TIME]: 'clock',
  [FIELD_TYPES.DATETIME]: 'calendar',
  [FIELD_TYPES.DATE_RANGE]: 'calendar',
  [FIELD_TYPES.SELECT]: 'chevron-down',
  [FIELD_TYPES.MULTISELECT]: 'list',
  [FIELD_TYPES.RADIO]: 'circle',
  [FIELD_TYPES.CHECKBOX]: 'check-square',
  [FIELD_TYPES.TOGGLE]: 'toggle-right',
  [FIELD_TYPES.BUTTON_GROUP]: 'grid',
  [FIELD_TYPES.SLIDER]: 'sliders',
  [FIELD_TYPES.RATING]: 'star',
  [FIELD_TYPES.COLOR_PICKER]: 'droplet',
  [FIELD_TYPES.FILE_UPLOAD]: 'upload',
  [FIELD_TYPES.IMAGE_UPLOAD]: 'image',
  [FIELD_TYPES.SIGNATURE]: 'edit-3',
  [FIELD_TYPES.RICH_TEXT]: 'type',
  [FIELD_TYPES.CODE_EDITOR]: 'code',
  [FIELD_TYPES.MARKDOWN]: 'file-text',
  [FIELD_TYPES.MAP_LOCATION]: 'map-pin',
  [FIELD_TYPES.VIDEO_RECORDER]: 'video',
  [FIELD_TYPES.AUDIO_RECORDER]: 'mic',
  [FIELD_TYPES.HEADING]: 'type',
  [FIELD_TYPES.PARAGRAPH]: 'align-left',
  [FIELD_TYPES.DIVIDER]: 'minus',
  [FIELD_TYPES.SPACER]: 'move-vertical',
  [FIELD_TYPES.HTML_BLOCK]: 'code',
  [FIELD_TYPES.SUBMIT]: 'send',
  [FIELD_TYPES.RESET]: 'rotate-ccw',
  [FIELD_TYPES.BUTTON]: 'square',
};

export const FIELD_LABELS = {
  [FIELD_TYPES.TEXT]: 'Text Input',
  [FIELD_TYPES.TEXTAREA]: 'Text Area',
  [FIELD_TYPES.EMAIL]: 'Email',
  [FIELD_TYPES.PASSWORD]: 'Password',
  [FIELD_TYPES.URL]: 'URL',
  [FIELD_TYPES.PHONE]: 'Phone',
  [FIELD_TYPES.NUMBER]: 'Number',
  [FIELD_TYPES.CURRENCY]: 'Currency',
  [FIELD_TYPES.DATE]: 'Date',
  [FIELD_TYPES.TIME]: 'Time',
  [FIELD_TYPES.DATETIME]: 'Date & Time',
  [FIELD_TYPES.DATE_RANGE]: 'Date Range',
  [FIELD_TYPES.SELECT]: 'Dropdown',
  [FIELD_TYPES.MULTISELECT]: 'Multi-select',
  [FIELD_TYPES.RADIO]: 'Radio Buttons',
  [FIELD_TYPES.CHECKBOX]: 'Checkboxes',
  [FIELD_TYPES.TOGGLE]: 'Toggle',
  [FIELD_TYPES.BUTTON_GROUP]: 'Button Group',
  [FIELD_TYPES.SLIDER]: 'Slider',
  [FIELD_TYPES.RATING]: 'Rating',
  [FIELD_TYPES.COLOR_PICKER]: 'Color Picker',
  [FIELD_TYPES.FILE_UPLOAD]: 'File Upload',
  [FIELD_TYPES.IMAGE_UPLOAD]: 'Image Upload',
  [FIELD_TYPES.SIGNATURE]: 'Signature',
  [FIELD_TYPES.RICH_TEXT]: 'Rich Text',
  [FIELD_TYPES.CODE_EDITOR]: 'Code Editor',
  [FIELD_TYPES.MARKDOWN]: 'Markdown',
  [FIELD_TYPES.MAP_LOCATION]: 'Location',
  [FIELD_TYPES.VIDEO_RECORDER]: 'Video Recorder',
  [FIELD_TYPES.AUDIO_RECORDER]: 'Audio Recorder',
  [FIELD_TYPES.HEADING]: 'Heading',
  [FIELD_TYPES.PARAGRAPH]: 'Paragraph',
  [FIELD_TYPES.DIVIDER]: 'Divider',
  [FIELD_TYPES.SPACER]: 'Spacer',
  [FIELD_TYPES.HTML_BLOCK]: 'HTML Block',
  [FIELD_TYPES.SUBMIT]: 'Submit Button',
  [FIELD_TYPES.RESET]: 'Reset Button',
  [FIELD_TYPES.BUTTON]: 'Custom Button',
};

// Form Templates
export const FORM_TEMPLATES = {
  contact: {
    name: 'Contact Form',
    description: 'Simple contact form with name, email, and message',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Contact Us', level: 'h2' },
      { type: FIELD_TYPES.PARAGRAPH, text: 'Fill out the form below and we\'ll get back to you soon.' },
      { type: FIELD_TYPES.TEXT, label: 'Full Name', placeholder: 'John Doe', required: true },
      { type: FIELD_TYPES.EMAIL, label: 'Email Address', placeholder: 'john@example.com', required: true },
      { type: FIELD_TYPES.PHONE, label: 'Phone Number', placeholder: '(555) 123-4567' },
      { type: FIELD_TYPES.TEXTAREA, label: 'Message', placeholder: 'Tell us how we can help...', required: true, rows: 6 },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Send Message' },
    ],
  },
  registration: {
    name: 'Registration Form',
    description: 'User registration with personal information',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Create Account', level: 'h2' },
      { type: FIELD_TYPES.TEXT, label: 'First Name', required: true },
      { type: FIELD_TYPES.TEXT, label: 'Last Name', required: true },
      { type: FIELD_TYPES.EMAIL, label: 'Email', required: true },
      { type: FIELD_TYPES.PASSWORD, label: 'Password', required: true },
      { type: FIELD_TYPES.PASSWORD, label: 'Confirm Password', required: true },
      { type: FIELD_TYPES.PHONE, label: 'Phone Number' },
      { type: FIELD_TYPES.DATE, label: 'Date of Birth' },
      { type: FIELD_TYPES.CHECKBOX, label: 'Terms', options: [{ label: 'I agree to the terms and conditions', value: 'agree' }], required: true },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Register' },
    ],
  },
  survey: {
    name: 'Survey Form',
    description: 'Customer satisfaction survey',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Customer Satisfaction Survey', level: 'h2' },
      { type: FIELD_TYPES.RATING, label: 'How satisfied are you with our service?', required: true },
      { type: FIELD_TYPES.RADIO, label: 'Would you recommend us?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Maybe', value: 'maybe' }], required: true },
      { type: FIELD_TYPES.MULTISELECT, label: 'What features do you use most?', options: [{ label: 'Feature A', value: 'a' }, { label: 'Feature B', value: 'b' }, { label: 'Feature C', value: 'c' }] },
      { type: FIELD_TYPES.TEXTAREA, label: 'Additional Comments', rows: 4 },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Submit Survey' },
    ],
  },
  payment: {
    name: 'Payment Form',
    description: 'Payment information collection',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Payment Information', level: 'h2' },
      { type: FIELD_TYPES.TEXT, label: 'Cardholder Name', required: true },
      { type: FIELD_TYPES.TEXT, label: 'Card Number', required: true },
      { type: FIELD_TYPES.DATE, label: 'Expiration Date', required: true },
      { type: FIELD_TYPES.NUMBER, label: 'CVV', required: true },
      { type: FIELD_TYPES.CURRENCY, label: 'Amount', required: true },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Process Payment' },
    ],
  },
  booking: {
    name: 'Booking Form',
    description: 'Appointment or reservation booking',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Book an Appointment', level: 'h2' },
      { type: FIELD_TYPES.TEXT, label: 'Full Name', required: true },
      { type: FIELD_TYPES.EMAIL, label: 'Email', required: true },
      { type: FIELD_TYPES.PHONE, label: 'Phone', required: true },
      { type: FIELD_TYPES.DATE, label: 'Preferred Date', required: true },
      { type: FIELD_TYPES.TIME, label: 'Preferred Time', required: true },
      { type: FIELD_TYPES.SELECT, label: 'Service Type', options: [{ label: 'Consultation', value: 'consultation' }, { label: 'Follow-up', value: 'followup' }], required: true },
      { type: FIELD_TYPES.TEXTAREA, label: 'Additional Notes', rows: 3 },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Book Now' },
    ],
  },
  feedback: {
    name: 'Feedback Form',
    description: 'Collect user feedback and suggestions',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'We Value Your Feedback', level: 'h2' },
      { type: FIELD_TYPES.TEXT, label: 'Your Name' },
      { type: FIELD_TYPES.EMAIL, label: 'Email (optional)' },
      { type: FIELD_TYPES.RATING, label: 'Overall Experience', required: true },
      { type: FIELD_TYPES.SLIDER, label: 'Likelihood to Recommend (0-10)', validation: { min: 0, max: 10 } },
      { type: FIELD_TYPES.TEXTAREA, label: 'What did you like?', rows: 3 },
      { type: FIELD_TYPES.TEXTAREA, label: 'What could be improved?', rows: 3 },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Submit Feedback' },
    ],
  },
  newsletter: {
    name: 'Newsletter Signup',
    description: 'Simple newsletter subscription form',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Subscribe to Our Newsletter', level: 'h2' },
      { type: FIELD_TYPES.PARAGRAPH, text: 'Get the latest updates and offers delivered to your inbox.' },
      { type: FIELD_TYPES.TEXT, label: 'First Name', required: true },
      { type: FIELD_TYPES.EMAIL, label: 'Email Address', required: true },
      { type: FIELD_TYPES.CHECKBOX, label: 'Preferences', options: [{ label: 'Weekly digest', value: 'weekly' }, { label: 'Product updates', value: 'products' }] },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Subscribe' },
    ],
  },
  'job-application': {
    name: 'Job Application',
    description: 'Comprehensive job application form',
    fields: [
      { type: FIELD_TYPES.HEADING, text: 'Job Application', level: 'h2' },
      { type: FIELD_TYPES.TEXT, label: 'Full Name', required: true },
      { type: FIELD_TYPES.EMAIL, label: 'Email', required: true },
      { type: FIELD_TYPES.PHONE, label: 'Phone', required: true },
      { type: FIELD_TYPES.SELECT, label: 'Position', options: [{ label: 'Developer', value: 'dev' }, { label: 'Designer', value: 'design' }], required: true },
      { type: FIELD_TYPES.FILE_UPLOAD, label: 'Resume (PDF)', validation: { acceptedTypes: '.pdf', maxSize: 5242880 }, required: true },
      { type: FIELD_TYPES.FILE_UPLOAD, label: 'Cover Letter (PDF)', validation: { acceptedTypes: '.pdf', maxSize: 5242880 } },
      { type: FIELD_TYPES.URL, label: 'Portfolio URL' },
      { type: FIELD_TYPES.URL, label: 'LinkedIn Profile' },
      { type: FIELD_TYPES.TEXTAREA, label: 'Why do you want to work with us?', rows: 5, required: true },
      { type: FIELD_TYPES.SUBMIT, buttonText: 'Submit Application' },
    ],
  },
};
