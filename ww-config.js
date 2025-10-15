export default {
options: {
displayAllowedValues: ['flex'],
},
inherit: {
type: 'ww-layout',
},
editor: {
label: {
en: 'Form Builder',
},
icon: 'template',
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
tooltip: 'A string that defines the form title displayed in the canvas header',
},
propertyHelp: {
tooltip: 'The main title displayed at the top of the form builder canvas',
},
/* wwEditor:end */
},
formDescription: {
label: { en: 'Form Description' },
type: 'Textarea',
section: 'settings',
bindable: true,
defaultValue: 'Build your custom form by dragging fields from the sidebar',
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A string that provides a description or instructions for the form',
},
propertyHelp: {
tooltip: 'Optional description text displayed below the form title',
},
/* wwEditor:end */
},
initialFields: {
label: { en: 'Initial Fields' },
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
options: {
item: {
type: {
label: 'Field Type',
type: 'TextSelect',
options: {
options: [
{ value: 'text', label: 'Text' },
{ value: 'email', label: 'Email' },
{ value: 'number', label: 'Number' },
{ value: 'textarea', label: 'Textarea' },
{ value: 'select', label: 'Select' },
{ value: 'radio', label: 'Radio' },
{ value: 'checkbox', label: 'Checkbox' },
{ value: 'date', label: 'Date' },
{ value: 'time', label: 'Time' },
{ value: 'phone', label: 'Phone' },
{ value: 'file', label: 'File' },
{ value: 'submit', label: 'Submit' }
]
}
},
label: {
label: 'Label',
type: 'Text',
options: { placeholder: 'Field label' }
},
required: {
label: 'Required',
type: 'OnOff'
}
}
}
}
},
/* wwEditor:start */
bindingValidation: {
type: 'array',
tooltip: 'An array of field objects to pre-populate the form builder on initialization',
},
propertyHelp: {
tooltip: 'Pre-configure form fields that will be loaded when the component initializes. Useful for loading saved forms.',
},
/* wwEditor:end */
},
backgroundColor: {
label: { en: 'Background Color' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#ffffff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A valid CSS color value (hex, rgb, rgba, or color name)',
},
propertyHelp: {
tooltip: 'The background color of the entire form builder container',
},
/* wwEditor:end */
},
sidebarWidth: {
label: { en: 'Sidebar Width' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '250px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 200, max: 400 },
{ value: '%', label: '%', min: 15, max: 30 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A CSS length value (e.g., "250px" or "20%")',
},
propertyHelp: {
tooltip: 'The width of the sidebar containing draggable field types',
},
/* wwEditor:end */
},
sidebarBackgroundColor: {
label: { en: 'Sidebar Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#f9fafb',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A valid CSS color value (hex, rgb, rgba, or color name)',
},
propertyHelp: {
tooltip: 'The background color of the sidebar panel',
},
/* wwEditor:end */
},
canvasBackgroundColor: {
label: { en: 'Canvas Background' },
type: 'Color',
section: 'style',
bindable: true,
defaultValue: '#ffffff',
options: {
nullable: true
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A valid CSS color value (hex, rgb, rgba, or color name)',
},
propertyHelp: {
tooltip: 'The background color of the main canvas area where forms are built',
},
/* wwEditor:end */
},
propertiesWidth: {
label: { en: 'Properties Panel Width' },
type: 'Length',
section: 'style',
bindable: true,
defaultValue: '300px',
options: {
unitChoices: [
{ value: 'px', label: 'px', min: 250, max: 450 },
{ value: '%', label: '%', min: 20, max: 35 }
]
},
/* wwEditor:start */
bindingValidation: {
type: 'string',
tooltip: 'A CSS length value (e.g., "300px" or "25%")',
},
propertyHelp: {
tooltip: 'The width of the properties panel for configuring selected fields',
},
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
tooltip: 'A CSS length value (e.g., "600px" or "80vh")',
},
propertyHelp: {
tooltip: 'The minimum height of the form builder component',
},
/* wwEditor:end */
},
sidebarHeaderElement: {
hidden: true,
defaultValue: {
isWwObject: true,
type: 'ww-flexbox'
}
},
canvasHeaderElement: {
hidden: true,
defaultValue: {
isWwObject: true,
type: 'ww-flexbox'
}
},
propertiesFooterElement: {
hidden: true,
defaultValue: {
isWwObject: true,
type: 'ww-flexbox'
}
}
},
triggerEvents: [
{
name: 'submit',
label: { en: 'On form submit' },
event: {
formData: {},
formConfig: {}
},
default: true
},
{
name: 'fieldChange',
label: { en: 'On field value change' },
event: {
fieldId: '',
value: '',
formData: {}
}
},
{
name: 'validationError',
label: { en: 'On validation error' },
event: {
errors: [],
formData: {}
}
},
{
name: 'export',
label: { en: 'On form export' },
event: {
formConfig: {}
}
},
{
name: 'clear',
label: { en: 'On form clear' },
event: {}
},
{
name: 'reset',
label: { en: 'On form reset' },
event: {}
}
],
actions: [
{
label: 'Import form configuration',
action: 'importForm',
args: [
{
name: 'JSON Configuration',
type: 'string'
}
]
},
{
label: 'Export form configuration',
action: 'exportForm'
},
{
label: 'Reset form values',
action: 'resetForm'
},
{
label: 'Clear all fields',
action: 'clearForm'
},
{
label: 'Get field by ID',
action: 'getFieldById',
args: [
{
name: 'Field ID',
type: 'string'
}
]
},
{
label: 'Set field value',
action: 'setFieldValue',
args: [
{
name: 'Field ID',
type: 'string'
},
{
name: 'Value',
type: 'string'
}
]
},
{
label: 'Validate form',
action: 'validateForm'
},
{
label: 'Toggle preview mode',
action: 'togglePreview'
}
]
};