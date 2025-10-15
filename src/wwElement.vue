<template>
<div class="form-builder" :style="containerStyle">
<!-- Sidebar -->
<div class="sidebar" :style="sidebarStyle">
<div class="sidebar-header">
<h3>Form Fields</h3>
<wwobject v-bind="content.sidebarHeaderElement" />
</div>

<div class="sidebar-content">
<draggable
v-model="fieldTypesList"
:group="{ name: 'fields', pull: 'clone', put: false }"
:clone="cloneFieldType"
:sort="false"
item-key="type"
class="fields-list"
>
<template #item="{ element }">
<div class="field-type-item" :title="element.label">
<div class="field-icon" v-html="getFieldIcon(element.type)"></div>
<span class="field-name">{{ element.label }}</span>
</div>
</template>
</draggable>
</div>
</div>

<!-- Canvas -->
<div class="canvas" :style="canvasStyle">
<div class="canvas-header">
<div class="canvas-title">
<h2>{{ content.formTitle || 'Form Builder' }}</h2>
<p v-if="content.formDescription">{{ content.formDescription }}</p>
</div>
<wwobject v-bind="content.canvasHeaderElement" />
<div class="canvas-actions">
<button 
@click="togglePreview" 
class="action-btn"
:class="{ active: isPreviewMode }"
title="Toggle preview mode"
>
<span v-html="previewIcon"></span>
{{ isPreviewMode ? 'Edit' : 'Preview' }}
</button>
<button 
@click="exportForm" 
class="action-btn"
title="Export form JSON"
>
<span v-html="exportIcon"></span>
Export
</button>
<button 
@click="clearForm" 
class="action-btn danger"
title="Clear all fields"
>
<span v-html="clearIcon"></span>
Clear
</button>
</div>
</div>

<div class="canvas-content">
<draggable
v-model="formFields"
group="fields"
:clone="cloneField"
item-key="id"
class="form-canvas"
:class="{ 'empty': !formFields?.length }"
@change="onFieldsChange"
>
<template #item="{ element }">
<FormField
:field="element"
:is-selected="selectedField?.id === element.id"
:is-preview-mode="isPreviewMode"
:form-values="formValues"
:all-fields="formFields"
@select="selectField"
@delete="deleteField"
@update-value="updateFormValue"
@submit="handleFormSubmit"
/>
</template>
</draggable>

<div v-if="!formFields?.length && !isPreviewMode" class="canvas-placeholder">
<div class="placeholder-content">
<span v-html="dragIcon"></span>
<p>Drag and drop fields here to build your form</p>
</div>
</div>
</div>
</div>

<!-- Properties Panel -->
<div class="properties" :style="propertiesStyle" v-if="!isPreviewMode">
<PropertiesPanel
:selected-field="selectedField"
:all-fields="formFields"
:properties-footer-element="content.propertiesFooterElement"
@update-field="updateSelectedField"
/>
</div>
</div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import draggable from 'vuedraggable';
import FormField from './components/FormField.vue';
import PropertiesPanel from './components/PropertiesPanel.vue';
import { FIELD_TYPES, getFieldTemplate, FIELD_ICONS } from './components/FieldTypes.js';

export default {
name: 'FormBuilder',
components: {
draggable,
FormField,
PropertiesPanel
},
props: {
content: {
type: Object,
required: true
},
uid: {
type: String,
required: true
},
/* wwEditor:start */
wwEditorState: {
type: Object,
required: true
},
/* wwEditor:end */
},
emits: ['trigger-event'],
setup(props, { emit }) {
const isEditing = computed(() => {
/* wwEditor:start */
return props.wwEditorState.isEditing;
/* wwEditor:end */
// eslint-disable-next-line no-unreachable
return false;
});

const formFields = ref([]);
const selectedField = ref(null);
const isPreviewMode = ref(false);
const formValues = ref({});

const { value: formData, setValue: setFormData } = wwLib.wwVariable.useComponentVariable({
uid: props.uid,
name: 'formData',
type: 'object',
defaultValue: {}
});

const { value: formConfig, setValue: setFormConfig } = wwLib.wwVariable.useComponentVariable({
uid: props.uid,
name: 'formConfig',
type: 'object',
defaultValue: { fields: [] }
});

const fieldTypesList = ref([
{ type: FIELD_TYPES.TEXT, label: 'Text Input' },
{ type: FIELD_TYPES.TEXTAREA, label: 'Text Area' },
{ type: FIELD_TYPES.EMAIL, label: 'Email' },
{ type: FIELD_TYPES.NUMBER, label: 'Number' },
{ type: FIELD_TYPES.PHONE, label: 'Phone' },
{ type: FIELD_TYPES.DATE, label: 'Date' },
{ type: FIELD_TYPES.TIME, label: 'Time' },
{ type: FIELD_TYPES.SELECT, label: 'Dropdown' },
{ type: FIELD_TYPES.RADIO, label: 'Radio Buttons' },
{ type: FIELD_TYPES.CHECKBOX, label: 'Checkboxes' },
{ type: FIELD_TYPES.FILE, label: 'File Upload' },
{ type: FIELD_TYPES.HEADING, label: 'Heading' },
{ type: FIELD_TYPES.DESCRIPTION, label: 'Description' },
{ type: FIELD_TYPES.SUBMIT, label: 'Submit Button' }
]);

const containerStyle = computed(() => ({
backgroundColor: props.content?.backgroundColor || '#ffffff',
minHeight: props.content?.minHeight || '600px'
}));

const sidebarStyle = computed(() => ({
width: props.content?.sidebarWidth || '250px',
backgroundColor: props.content?.sidebarBackgroundColor || '#f9fafb'
}));

const canvasStyle = computed(() => ({
backgroundColor: props.content?.canvasBackgroundColor || '#ffffff'
}));

const propertiesStyle = computed(() => ({
width: props.content?.propertiesWidth || '300px'
}));

const { getIcon } = wwLib.useIcons();
const previewIcon = ref('');
const exportIcon = ref('');
const clearIcon = ref('');
const dragIcon = ref('');
const fieldIcons = ref({});

const loadIcons = async () => {
previewIcon.value = await getIcon('eye');
exportIcon.value = await getIcon('download');
clearIcon.value = await getIcon('trash');
dragIcon.value = await getIcon('cursor');

// Load field type icons
for (const [fieldType, iconName] of Object.entries(FIELD_ICONS)) {
try {
fieldIcons.value[fieldType] = await getIcon(iconName);
} catch (error) {
fieldIcons.value[fieldType] = `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="3"/></svg>`;
}
}
};

loadIcons();

const getFieldIcon = (type) => {
return fieldIcons.value[type] || `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="3"/></svg>`;
};

const cloneField = (field) => {
return {
...field,
id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
label: field.label || field.type,
placeholder: field.placeholder || '',
required: false,
validation: { ...field.validation },
options: field.options ? [...field.options] : [],
conditionalLogic: null
};
};

const cloneFieldType = (fieldType) => {
return getFieldTemplate(fieldType.type);
};

const selectField = (field) => {
if (isPreviewMode.value) return;
selectedField.value = field;
};

const deleteField = (fieldId) => {
formFields.value = formFields.value.filter(f => f.id !== fieldId);
if (selectedField.value?.id === fieldId) {
selectedField.value = null;
}
updateFormConfig();
};

const updateSelectedField = (updatedField) => {
const index = formFields.value.findIndex(f => f.id === updatedField.id);
if (index !== -1) {
formFields.value[index] = updatedField;
selectedField.value = updatedField;
updateFormConfig();
}
};

const onFieldsChange = () => {
updateFormConfig();
};

const updateFormConfig = () => {
setFormConfig({
fields: formFields.value,
title: props.content?.formTitle,
description: props.content?.formDescription
});
};

const updateFormValue = ({ fieldId, value }) => {
formValues.value = {
...formValues.value,
[fieldId]: value
};
setFormData(formValues.value);

emit('trigger-event', {
name: 'fieldChange',
event: { fieldId, value, formData: formValues.value }
});
};

const togglePreview = () => {
isPreviewMode.value = !isPreviewMode.value;
if (isPreviewMode.value) {
selectedField.value = null;
}
};

const exportForm = () => {
const formJSON = {
title: props.content?.formTitle || 'Untitled Form',
description: props.content?.formDescription || '',
fields: formFields.value,
createdAt: new Date().toISOString()
};

const dataStr = JSON.stringify(formJSON, null, 2);
const dataBlob = new Blob([dataStr], { type: 'application/json' });
const url = URL.createObjectURL(dataBlob);
const link = wwLib.getFrontDocument().createElement('a');
link.href = url;
link.download = `form-${Date.now()}.json`;
link.click();
URL.revokeObjectURL(url);

emit('trigger-event', {
name: 'export',
event: { formConfig: formJSON }
});
};

const clearForm = () => {
if (wwLib.getFrontWindow().confirm('Are you sure you want to clear all fields?')) {
formFields.value = [];
selectedField.value = null;
formValues.value = {};
setFormData({});
updateFormConfig();

emit('trigger-event', {
name: 'clear',
event: {}
});
}
};

const validateForm = () => {
const errors = [];

for (const field of formFields.value) {
if (['heading', 'description'].includes(field.type)) continue;

const value = formValues.value?.[field.id];

if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
errors.push({
fieldId: field.id,
fieldLabel: field.label,
message: `${field.label} is required`
});
continue;
}

if (value && field.validation) {
const validation = field.validation;

if (validation.minLength && String(value).length < validation.minLength) {
errors.push({
fieldId: field.id,
fieldLabel: field.label,
message: `${field.label} must be at least ${validation.minLength} characters`
});
}

if (validation.maxLength && String(value).length > validation.maxLength) {
errors.push({
fieldId: field.id,
fieldLabel: field.label,
message: `${field.label} must be no more than ${validation.maxLength} characters`
});
}

if (validation.min !== null && Number(value) < validation.min) {
errors.push({
fieldId: field.id,
fieldLabel: field.label,
message: `${field.label} must be at least ${validation.min}`
});
}

if (validation.max !== null && Number(value) > validation.max) {
errors.push({
fieldId: field.id,
fieldLabel: field.label,
message: `${field.label} must be no more than ${validation.max}`
});
}

if (validation.pattern && !new RegExp(validation.pattern).test(String(value))) {
errors.push({
fieldId: field.id,
fieldLabel: field.label,
message: `${field.label} format is invalid`
});
}
}
}

return errors;
};

const handleFormSubmit = () => {
if (isEditing.value) return;

const errors = validateForm();

if (errors.length > 0) {
emit('trigger-event', {
name: 'validationError',
event: { errors, formData: formValues.value }
});
return;
}

emit('trigger-event', {
name: 'submit',
event: { formData: formValues.value, formConfig: formConfig.value }
});
};

const importForm = (jsonConfig) => {
try {
const config = typeof jsonConfig === 'string' ? JSON.parse(jsonConfig) : jsonConfig;
if (config.fields && Array.isArray(config.fields)) {
formFields.value = config.fields;
formValues.value = {};
selectedField.value = null;
updateFormConfig();
return true;
}
return false;
} catch (error) {
console.error('Failed to import form:', error);
return false;
}
};

const resetForm = () => {
formValues.value = {};
setFormData({});
emit('trigger-event', {
name: 'reset',
event: {}
});
};

const getFieldById = (fieldId) => {
return formFields.value.find(f => f.id === fieldId);
};

const setFieldValue = (fieldId, value) => {
updateFormValue({ fieldId, value });
};

watch(() => props.content?.initialFields, (newFields) => {
if (newFields && Array.isArray(newFields) && formFields.value.length === 0) {
formFields.value = newFields;
updateFormConfig();
}
}, { immediate: true });

// Expose methods for WeWeb actions
wwLib.useComponentActions({
uid: props.uid,
actions: {
importForm,
exportForm,
resetForm,
clearForm,
getFieldById,
setFieldValue,
validateForm,
togglePreview
}
});

return {
formFields,
selectedField,
isPreviewMode,
formValues,
formData,
formConfig,
fieldTypesList,
containerStyle,
sidebarStyle,
canvasStyle,
propertiesStyle,
previewIcon,
exportIcon,
clearIcon,
dragIcon,
fieldIcons,
getFieldIcon,
cloneFieldType,
cloneField,
selectField,
deleteField,
updateSelectedField,
onFieldsChange,
updateFormValue,
togglePreview,
exportForm,
clearForm,
handleFormSubmit,
importForm,
resetForm,
getFieldById,
setFieldValue,
validateForm
};
}
};
</script>

<style scoped lang="scss">
.form-builder {
display: flex;
width: 100%;
height: 100%;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.sidebar {
display: flex;
flex-direction: column;
border-right: 1px solid #e5e7eb;
overflow: hidden;
}

.sidebar-header {
padding: 20px;
background: white;
border-bottom: 1px solid #e5e7eb;

h3 {
margin: 0 0 12px 0;
font-size: 16px;
font-weight: 700;
color: #111827;
}
}

.sidebar-content {
flex: 1;
overflow-y: auto;
padding: 16px;
}

.field-types-list {
display: flex;
flex-direction: column;
gap: 8px;
}

.field-type-item {
display: flex;
align-items: center;
gap: 12px;
padding: 12px;
background: white;
border: 2px solid #e5e7eb;
border-radius: 8px;
cursor: grab;
transition: all 0.2s ease;

&:hover {
border-color: #3b82f6;
box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
transform: translateY(-2px);
}

&:active {
cursor: grabbing;
}
}

.field-icon {
display: flex;
align-items: center;
justify-content: center;
width: 32px;
height: 32px;
background: #f3f4f6;
border-radius: 6px;
color: #6b7280;
}

.field-name {
flex: 1;
font-size: 14px;
font-weight: 600;
color: #374151;
}

.canvas {
flex: 1;
display: flex;
flex-direction: column;
overflow: hidden;
}

.canvas-header {
padding: 20px;
background: white;
border-bottom: 1px solid #e5e7eb;
}

.canvas-title {
margin-bottom: 16px;

h2 {
margin: 0 0 4px 0;
font-size: 24px;
font-weight: 700;
color: #111827;
}

p {
margin: 0;
color: #6b7280;
font-size: 14px;
}
}

.canvas-actions {
display: flex;
gap: 8px;
flex-wrap: wrap;
}

.action-btn {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 16px;
background: white;
color: #374151;
border: 1px solid #d1d5db;
border-radius: 6px;
font-size: 14px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s ease;

span {
display: flex;
align-items: center;
width: 16px;
height: 16px;
}

&:hover {
background: #f9fafb;
border-color: #9ca3af;
}

&.active {
background: #3b82f6;
color: white;
border-color: #3b82f6;
}

&.danger {
color: #ef4444;
border-color: #fecaca;

&:hover {
background: #fef2f2;
border-color: #ef4444;
}
}
}

.canvas-content {
flex: 1;
overflow-y: auto;
padding: 20px;
position: relative;
}

.form-canvas {
min-height: 200px;

&.empty {
min-height: 400px;
}

&.preview-mode {
.form-field-wrapper {
cursor: default;

&:hover {
border-color: #e5e7eb;
box-shadow: none;
}
}
}
}

.canvas-placeholder {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
pointer-events: none;
}

.placeholder-content {
display: flex;
flex-direction: column;
align-items: center;
gap: 16px;
color: #9ca3af;

span {
display: flex;
width: 48px;
height: 48px;
opacity: 0.5;
}

p {
margin: 0;
font-size: 16px;
font-weight: 500;
}
}

.properties {
display: flex;
flex-direction: column;
overflow: hidden;
}

@media (max-width: 1024px) {
.form-builder {
flex-direction: column;
}

.sidebar {
width: 100% !important;
max-height: 200px;
border-right: none;
border-bottom: 1px solid #e5e7eb;
}

.properties {
width: 100% !important;
max-height: 300px;
border-left: none;
border-top: 1px solid #e5e7eb;
}
}
</style>