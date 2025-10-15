export default {
  options: {
    displayAllowedValues: ['flex'],
  },
  inherit: {
    type: 'ww-layout',
  },
  editor: {
    label: {
      en: 'Form Builder Pro',
      pt: 'Construtor de Formulários Pro',
    },
    icon: 'sparkles',
    deprecated: false,
    customStylePropertiesOrder: [
      'theme',
      'primaryColor',
      'accentColor',
      'borderRadius',
      'spacing',
    ],
  },
  properties: {
    // ==================== GENERAL SETTINGS ====================
    formTitle: {
      label: { en: 'Form Title', pt: 'Título do Formulário' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Professional Form Builder',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The main title of your form',
      },
      /* wwEditor:end */
    },
    formDescription: {
      label: { en: 'Form Description', pt: 'Descrição' },
      type: 'Textarea',
      section: 'settings',
      bindable: true,
      defaultValue: 'Create beautiful, responsive forms with advanced features',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Optional description or instructions',
      },
      /* wwEditor:end */
    },
    formId: {
      label: { en: 'Form ID', pt: 'ID do Formulário' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Unique identifier for this form',
      },
      /* wwEditor:end */
    },

    // ==================== INITIAL DATA ====================
    initialFields: {
      label: { en: 'Initial Fields', pt: 'Campos Iniciais' },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(_, index) {
          return `Field ${index + 1}`;
        },
        item: {
          type: 'Object',
          defaultValue: {},
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Pre-configured fields to load on initialization',
      },
      /* wwEditor:end */
    },
    formTemplate: {
      label: { en: 'Load Template', pt: 'Carregar Template' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: '', label: 'None - Start Empty' },
          { value: 'contact', label: '📧 Contact Form' },
          { value: 'registration', label: '👤 Registration Form' },
          { value: 'survey', label: '📊 Survey Form' },
          { value: 'payment', label: '💳 Payment Form' },
          { value: 'booking', label: '📅 Booking Form' },
          { value: 'feedback', label: '⭐ Feedback Form' },
          { value: 'newsletter', label: '📰 Newsletter Signup' },
          { value: 'job-application', label: '💼 Job Application' },
        ],
      },
      defaultValue: '',
    },

    // ==================== FEATURES ====================
    enableAutoSave: {
      label: { en: 'Enable Auto-Save', pt: 'Auto-salvamento' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    enableUndoRedo: {
      label: { en: 'Enable Undo/Redo', pt: 'Desfazer/Refazer' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    enableTemplates: {
      label: { en: 'Show Templates', pt: 'Mostrar Templates' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    enableSearch: {
      label: { en: 'Enable Field Search', pt: 'Busca de Campos' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    enableAnalytics: {
      label: { en: 'Enable Analytics', pt: 'Habilitar Analytics' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
    },
    enableMultiLanguage: {
      label: { en: 'Multi-language Support', pt: 'Suporte Multi-idioma' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
    },
    enableRealTimeValidation: {
      label: { en: 'Real-time Validation', pt: 'Validação em Tempo Real' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },

    // ==================== THEME & DESIGN ====================
    theme: {
      label: { en: 'Theme', pt: 'Tema' },
      type: 'TextSelect',
      section: 'style',
      defaultValue: 'modern',
      options: {
        options: [
          { value: 'modern', label: '✨ Modern' },
          { value: 'minimal', label: '⚪ Minimal' },
          { value: 'glassmorphism', label: '🔮 Glassmorphism' },
          { value: 'dark', label: '🌙 Dark' },
          { value: 'colorful', label: '🌈 Colorful' },
          { value: 'professional', label: '💼 Professional' },
          { value: 'playful', label: '🎨 Playful' },
        ],
      },
    },
    primaryColor: {
      label: { en: 'Primary Color', pt: 'Cor Primária' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#6366f1',
      options: { nullable: true },
    },
    accentColor: {
      label: { en: 'Accent Color', pt: 'Cor de Destaque' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#8b5cf6',
      options: { nullable: true },
    },
    backgroundColor: {
      label: { en: 'Background Color', pt: 'Cor de Fundo' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
      options: { nullable: true },
    },

    // ==================== LAYOUT ====================
    layout: {
      label: { en: 'Layout Mode', pt: 'Modo de Layout' },
      type: 'TextSelect',
      section: 'style',
      defaultValue: 'three-column',
      options: {
        options: [
          { value: 'three-column', label: '3 Columns (Classic)' },
          { value: 'two-column', label: '2 Columns (Wide Canvas)' },
          { value: 'full-width', label: 'Full Width (No Sidebar)' },
          { value: 'compact', label: 'Compact (Collapsible Panels)' },
        ],
      },
    },
    sidebarWidth: {
      label: { en: 'Sidebar Width', pt: 'Largura Sidebar' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '280px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 200, max: 450 },
          { value: '%', label: '%', min: 15, max: 35 },
        ],
      },
    },
    propertiesWidth: {
      label: { en: 'Properties Width', pt: 'Largura Propriedades' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '320px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 250, max: 500 },
          { value: '%', label: '%', min: 20, max: 40 },
        ],
      },
    },
    minHeight: {
      label: { en: 'Minimum Height', pt: 'Altura Mínima' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '700px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 500, max: 1200 },
          { value: 'vh', label: 'vh', min: 60, max: 100 },
        ],
      },
    },
    borderRadius: {
      label: { en: 'Border Radius', pt: 'Arredondamento' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '12px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 30 },
        ],
      },
    },
    spacing: {
      label: { en: 'Spacing', pt: 'Espaçamento' },
      type: 'TextSelect',
      section: 'style',
      defaultValue: 'comfortable',
      options: {
        options: [
          { value: 'compact', label: 'Compact' },
          { value: 'comfortable', label: 'Comfortable' },
          { value: 'spacious', label: 'Spacious' },
        ],
      },
    },

    // ==================== PREVIEW SETTINGS ====================
    previewDevice: {
      label: { en: 'Preview Device', pt: 'Dispositivo Preview' },
      type: 'TextSelect',
      section: 'settings',
      defaultValue: 'desktop',
      options: {
        options: [
          { value: 'desktop', label: '🖥️ Desktop' },
          { value: 'tablet', label: '📱 Tablet' },
          { value: 'mobile', label: '📱 Mobile' },
        ],
      },
    },

    // ==================== VALIDATION ====================
    showValidationMessages: {
      label: { en: 'Show Validation Messages', pt: 'Mostrar Mensagens de Validação' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
    },
    validationStyle: {
      label: { en: 'Validation Style', pt: 'Estilo de Validação' },
      type: 'TextSelect',
      section: 'style',
      defaultValue: 'inline',
      options: {
        options: [
          { value: 'inline', label: 'Inline (Below field)' },
          { value: 'tooltip', label: 'Tooltip' },
          { value: 'toast', label: 'Toast Notification' },
        ],
      },
    },

    // ==================== ADVANCED ====================
    customCSS: {
      label: { en: 'Custom CSS', pt: 'CSS Customizado' },
      type: 'Textarea',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      options: {
        placeholder: '.custom-field { /* your styles */ }',
      },
    },
    enableAnimations: {
      label: { en: 'Enable Animations', pt: 'Habilitar Animações' },
      type: 'OnOff',
      section: 'style',
      defaultValue: true,
    },
    animationSpeed: {
      label: { en: 'Animation Speed', pt: 'Velocidade Animações' },
      type: 'TextSelect',
      section: 'style',
      defaultValue: 'normal',
      options: {
        options: [
          { value: 'fast', label: 'Fast (150ms)' },
          { value: 'normal', label: 'Normal (300ms)' },
          { value: 'slow', label: 'Slow (500ms)' },
        ],
      },
    },

    // ==================== SLOTS ====================
    sidebarHeaderElement: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Sidebar Header',
      },
    },
    canvasHeaderElement: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Canvas Header',
      },
    },
    propertiesFooterElement: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Properties Footer',
      },
    },
    toolbarElement: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: 'ww-flexbox',
        name: 'Custom Toolbar',
      },
    },
  },

  // ==================== EVENTS ====================
  triggerEvents: [
    {
      name: 'submit',
      label: { en: 'On form submit', pt: 'Ao enviar formulário' },
      event: {
        formData: {},
        formConfig: {},
        timestamp: '',
      },
      default: true,
    },
    {
      name: 'fieldChange',
      label: { en: 'On field value change', pt: 'Ao mudar valor do campo' },
      event: {
        fieldId: '',
        fieldLabel: '',
        value: '',
        oldValue: '',
        formData: {},
      },
    },
    {
      name: 'fieldAdd',
      label: { en: 'On field added', pt: 'Ao adicionar campo' },
      event: {
        field: {},
        position: 0,
      },
    },
    {
      name: 'fieldDelete',
      label: { en: 'On field deleted', pt: 'Ao deletar campo' },
      event: {
        fieldId: '',
        fieldLabel: '',
      },
    },
    {
      name: 'validationError',
      label: { en: 'On validation error', pt: 'Erro de validação' },
      event: {
        errors: [],
        formData: {},
      },
    },
    {
      name: 'validationSuccess',
      label: { en: 'On validation success', pt: 'Validação com sucesso' },
      event: {
        formData: {},
      },
    },
    {
      name: 'export',
      label: { en: 'On form export', pt: 'Ao exportar' },
      event: {
        formConfig: {},
        format: '',
      },
    },
    {
      name: 'import',
      label: { en: 'On form import', pt: 'Ao importar' },
      event: {
        formConfig: {},
        fieldsCount: 0,
      },
    },
    {
      name: 'clear',
      label: { en: 'On form clear', pt: 'Ao limpar' },
      event: {},
    },
    {
      name: 'reset',
      label: { en: 'On form reset', pt: 'Ao resetar' },
      event: {},
    },
    {
      name: 'save',
      label: { en: 'On form save', pt: 'Ao salvar' },
      event: {
        formConfig: {},
        saveType: 'manual',
      },
    },
    {
      name: 'templateLoad',
      label: { en: 'On template loaded', pt: 'Ao carregar template' },
      event: {
        templateName: '',
        fieldsCount: 0,
      },
    },
    {
      name: 'previewToggle',
      label: { en: 'On preview mode toggle', pt: 'Ao alternar preview' },
      event: {
        isPreview: false,
      },
    },
  ],

  // ==================== ACTIONS ====================
  actions: [
    {
      label: 'Import form configuration',
      action: 'importForm',
      args: [
        {
          name: 'JSON Configuration',
          type: 'string',
        },
      ],
    },
    {
      label: 'Export form configuration',
      action: 'exportForm',
      args: [
        {
          name: 'Format',
          type: 'string',
          default: 'json',
        },
      ],
    },
    {
      label: 'Load template',
      action: 'loadTemplate',
      args: [
        {
          name: 'Template Name',
          type: 'string',
        },
      ],
    },
    {
      label: 'Reset form values',
      action: 'resetForm',
    },
    {
      label: 'Clear all fields',
      action: 'clearForm',
    },
    {
      label: 'Add field',
      action: 'addField',
      args: [
        {
          name: 'Field Type',
          type: 'string',
        },
        {
          name: 'Position',
          type: 'number',
          default: -1,
        },
      ],
    },
    {
      label: 'Remove field',
      action: 'removeField',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
      ],
    },
    {
      label: 'Get field by ID',
      action: 'getFieldById',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
      ],
    },
    {
      label: 'Update field',
      action: 'updateField',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
        {
          name: 'Field Data',
          type: 'object',
        },
      ],
    },
    {
      label: 'Set field value',
      action: 'setFieldValue',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
        {
          name: 'Value',
          type: 'string',
        },
      ],
    },
    {
      label: 'Get field value',
      action: 'getFieldValue',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
      ],
    },
    {
      label: 'Validate form',
      action: 'validateForm',
    },
    {
      label: 'Validate field',
      action: 'validateField',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
      ],
    },
    {
      label: 'Toggle preview mode',
      action: 'togglePreview',
    },
    {
      label: 'Set preview device',
      action: 'setPreviewDevice',
      args: [
        {
          name: 'Device',
          type: 'string',
        },
      ],
    },
    {
      label: 'Undo last action',
      action: 'undo',
    },
    {
      label: 'Redo last action',
      action: 'redo',
    },
    {
      label: 'Save form',
      action: 'saveForm',
    },
    {
      label: 'Duplicate field',
      action: 'duplicateField',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
      ],
    },
    {
      label: 'Move field',
      action: 'moveField',
      args: [
        {
          name: 'Field ID',
          type: 'string',
        },
        {
          name: 'New Position',
          type: 'number',
        },
      ],
    },
    {
      label: 'Get form analytics',
      action: 'getAnalytics',
    },
    {
      label: 'Clear analytics',
      action: 'clearAnalytics',
    },
  ],
};
