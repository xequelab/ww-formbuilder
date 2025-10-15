export default {
  editor: {
    label: {
      en: 'Form Builder'
    },
    icon: 'fontawesome/solid/list-check'
  },
  properties: {
    formTitle: {
      label: { en: 'Form Title' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Contact Form',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Title displayed at the top of the form'
      }
      /* wwEditor:end */
    },
    formDescription: {
      label: { en: 'Form Description' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Fill out the form below',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Optional description text below the title'
      }
      /* wwEditor:end */
    },
    backgroundColor: {
      label: { en: 'Background Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#f8fafc',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Background color of the form builder'
      }
      /* wwEditor:end */
    },
    minHeight: {
      label: { en: 'Minimum Height' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '600px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 400, max: 1200 },
          { value: 'vh', label: 'vh', min: 50, max: 100 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Minimum height of the form builder'
      }
      /* wwEditor:end */
    }
  },
  triggerEvents: [
    {
      name: 'fieldChange',
      label: { en: 'On field value change' },
      event: {
        fieldId: '',
        value: '',
        formData: {}
      }
    }
  ],
  actions: [
    {
      label: 'Clear form',
      action: 'clearForm'
    },
    {
      label: 'Toggle preview mode',
      action: 'togglePreview'
    }
  ]
};
