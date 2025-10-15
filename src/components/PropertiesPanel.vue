<template>
  <div class="properties-panel">
    <div class="panel-header">
      <h3>Field Properties</h3>
    </div>

    <div v-if="!selectedField" class="panel-empty">
      <p>Select a field to edit its properties</p>
    </div>

    <div v-else class="panel-content">
      <!-- Basic Properties -->
      <div class="property-section">
        <h4>Basic Settings</h4>

        <div class="property-group">
          <label>Field Type</label>
          <input 
            type="text" 
            :value="selectedField.type" 
            disabled 
            class="property-input disabled"
          />
        </div>

        <div class="property-group" v-if="!['heading', 'description'].includes(selectedField.type)">
          <label>Label</label>
          <input 
            type="text" 
            :value="selectedField.label"
            @input="updateField('label', $event.target.value)"
            class="property-input"
            placeholder="Field label"
          />
        </div>

        <div class="property-group" v-if="['heading', 'description'].includes(selectedField.type)">
          <label>Text</label>
          <textarea 
            :value="selectedField.text"
            @input="updateField('text', $event.target.value)"
            class="property-textarea"
            placeholder="Enter text"
            rows="3"
          ></textarea>
        </div>

        <div class="property-group" v-if="selectedField.type === 'heading'">
          <label>Heading Level</label>
          <select 
            :value="selectedField.level"
            @change="updateField('level', $event.target.value)"
            class="property-select"
          >
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
          </select>
        </div>

        <div class="property-group" v-if="selectedField.type === 'submit'">
          <label>Button Text</label>
          <input 
            type="text" 
            :value="selectedField.buttonText"
            @input="updateField('buttonText', $event.target.value)"
            class="property-input"
            placeholder="Submit"
          />
        </div>

        <div class="property-group" v-if="selectedField.type === 'submit'">
          <label>Button Style</label>
          <select 
            :value="selectedField.buttonStyle"
            @change="updateField('buttonStyle', $event.target.value)"
            class="property-select"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
          </select>
        </div>

        <div class="property-group" v-if="!['submit', 'heading', 'description'].includes(selectedField.type)">
          <label>Placeholder</label>
          <input 
            type="text" 
            :value="selectedField.placeholder"
            @input="updateField('placeholder', $event.target.value)"
            class="property-input"
            placeholder="Placeholder text"
          />
        </div>

        <div class="property-group" v-if="!['submit', 'heading', 'description'].includes(selectedField.type)">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              :checked="selectedField.required"
              @change="updateField('required', $event.target.checked)"
            />
            <span>Required Field</span>
          </label>
        </div>

        <div class="property-group">
          <label>Custom CSS Class</label>
          <input 
            type="text" 
            :value="selectedField.customClass"
            @input="updateField('customClass', $event.target.value)"
            class="property-input"
            placeholder="custom-class"
          />
        </div>
      </div>

      <!-- Options for Select/Radio/Checkbox -->
      <div 
        class="property-section" 
        v-if="['select', 'radio', 'checkbox'].includes(selectedField.type)"
      >
        <h4>Options</h4>
        <div class="options-list">
          <div 
            v-for="(option, index) in selectedField.options" 
            :key="index"
            class="option-item"
          >
            <input 
              type="text" 
              :value="option.label"
              @input="updateOption(index, 'label', $event.target.value)"
              class="option-input"
              placeholder="Label"
            />
            <input 
              type="text" 
              :value="option.value"
              @input="updateOption(index, 'value', $event.target.value)"
              class="option-input"
              placeholder="Value"
            />
            <button 
              @click="removeOption(index)"
              class="option-remove-btn"
              title="Remove option"
            >
              ×
            </button>
          </div>
        </div>
        <button @click="addOption" class="add-option-btn">
          + Add Option
        </button>
      </div>

      <!-- Validation Rules -->
      <div 
        class="property-section" 
        v-if="selectedField.validation && !['heading', 'description', 'submit'].includes(selectedField.type)"
      >
        <h4>Validation</h4>

        <div class="property-group" v-if="'minLength' in selectedField.validation">
          <label>Min Length</label>
          <input 
            type="number" 
            :value="selectedField.validation.minLength"
            @input="updateValidation('minLength', $event.target.value)"
            class="property-input"
            placeholder="No minimum"
          />
        </div>

        <div class="property-group" v-if="'maxLength' in selectedField.validation">
          <label>Max Length</label>
          <input 
            type="number" 
            :value="selectedField.validation.maxLength"
            @input="updateValidation('maxLength', $event.target.value)"
            class="property-input"
            placeholder="No maximum"
          />
        </div>

        <div class="property-group" v-if="'min' in selectedField.validation">
          <label>Min Value</label>
          <input 
            type="number" 
            :value="selectedField.validation.min"
            @input="updateValidation('min', $event.target.value)"
            class="property-input"
            placeholder="No minimum"
          />
        </div>

        <div class="property-group" v-if="'max' in selectedField.validation">
          <label>Max Value</label>
          <input 
            type="number" 
            :value="selectedField.validation.max"
            @input="updateValidation('max', $event.target.value)"
            class="property-input"
            placeholder="No maximum"
          />
        </div>

        <div class="property-group" v-if="'pattern' in selectedField.validation">
          <label>Pattern (Regex)</label>
          <input 
            type="text" 
            :value="selectedField.validation.pattern"
            @input="updateValidation('pattern', $event.target.value)"
            class="property-input"
            placeholder="^[a-zA-Z]+$"
          />
        </div>

        <div class="property-group" v-if="selectedField.type === 'file' && 'maxSize' in selectedField.validation">
          <label>Max File Size (bytes)</label>
          <input 
            type="number" 
            :value="selectedField.validation.maxSize"
            @input="updateValidation('maxSize', $event.target.value)"
            class="property-input"
            placeholder="5242880"
          />
        </div>

        <div class="property-group" v-if="selectedField.type === 'file' && 'acceptedTypes' in selectedField.validation">
          <label>Accepted File Types</label>
          <input 
            type="text" 
            :value="selectedField.validation.acceptedTypes"
            @input="updateValidation('acceptedTypes', $event.target.value)"
            class="property-input"
            placeholder=".jpg,.png,.pdf"
          />
        </div>
      </div>

      <!-- Conditional Logic -->
      <div class="property-section" v-if="!['heading', 'description', 'submit'].includes(selectedField.type)">
        <h4>Conditional Logic</h4>

        <div class="property-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              :checked="selectedField.conditionalLogic?.enabled"
              @change="updateConditionalLogic('enabled', $event.target.checked)"
            />
            <span>Enable Conditional Logic</span>
          </label>
        </div>

        <div v-if="selectedField.conditionalLogic?.enabled">
          <div class="property-group">
            <label>Show this field if</label>
            <select 
              :value="selectedField.conditionalLogic.fieldId"
              @change="updateConditionalLogic('fieldId', $event.target.value)"
              class="property-select"
            >
              <option value="">Select field</option>
              <option 
                v-for="field in availableFields" 
                :key="field.id"
                :value="field.id"
              >
                {{ field.label || field.type }}
              </option>
            </select>
          </div>

          <div class="property-group">
            <label>Operator</label>
            <select 
              :value="selectedField.conditionalLogic.operator"
              @change="updateConditionalLogic('operator', $event.target.value)"
              class="property-select"
            >
              <option value="equals">Equals</option>
              <option value="not_equals">Not Equals</option>
              <option value="contains">Contains</option>
              <option value="greater_than">Greater Than</option>
              <option value="less_than">Less Than</option>
            </select>
          </div>

          <div class="property-group">
            <label>Value</label>
            <input 
              type="text" 
              :value="selectedField.conditionalLogic.value"
              @input="updateConditionalLogic('value', $event.target.value)"
              class="property-input"
              placeholder="Comparison value"
            />
          </div>
        </div>
      </div>

      <!-- Footer Dropzone -->
<div class="panel-footer">
<wwobject v-bind="propertiesFooterElement" />
</div>
</div>
</div>
</template>

<script>
import { computed } from 'vue';

export default {
name: 'PropertiesPanel',
props: {
selectedField: {
type: Object,
default: null
},
allFields: {
type: Array,
default: () => []
},
propertiesFooterElement: {
type: Object,
required: true
}
},
emits: ['update-field'],
setup(props, { emit }) {
const availableFields = computed(() => {
return (props.allFields || []).filter(
field => field.id !== props.selectedField?.id && 
!['heading', 'description', 'submit'].includes(field.type)
);
});

const updateField = (key, value) => {
if (!props.selectedField) return;
emit('update-field', {
...props.selectedField,
[key]: value
});
};

const updateValidation = (key, value) => {
if (!props.selectedField?.validation) return;
emit('update-field', {
...props.selectedField,
validation: {
...props.selectedField.validation,
[key]: value === '' ? null : value
}
});
};

const updateOption = (index, key, value) => {
if (!props.selectedField?.options) return;
const newOptions = [...props.selectedField.options];
newOptions[index] = {
...newOptions[index],
[key]: value
};
emit('update-field', {
...props.selectedField,
options: newOptions
});
};

const addOption = () => {
if (!props.selectedField?.options) return;
const newOptions = [
...props.selectedField.options,
{ label: `Option ${props.selectedField.options.length + 1}`, value: `option${props.selectedField.options.length + 1}` }
];
emit('update-field', {
...props.selectedField,
options: newOptions
});
};

const removeOption = (index) => {
if (!props.selectedField?.options) return;
const newOptions = props.selectedField.options.filter((_, i) => i !== index);
emit('update-field', {
...props.selectedField,
options: newOptions
});
};

const updateConditionalLogic = (key, value) => {
if (!props.selectedField) return;
emit('update-field', {
...props.selectedField,
conditionalLogic: {
...props.selectedField.conditionalLogic,
[key]: value
}
});
};

return {
availableFields,
updateField,
updateValidation,
updateOption,
addOption,
removeOption,
updateConditionalLogic
};
}
};
</script>

<style scoped lang="scss">
.properties-panel {
height: 100%;
display: flex;
flex-direction: column;
background: #f9fafb;
border-left: 1px solid #e5e7eb;
}

.panel-header {
padding: 20px;
background: white;
border-bottom: 1px solid #e5e7eb;

h3 {
margin: 0;
font-size: 16px;
font-weight: 700;
color: #111827;
}
}

.panel-empty {
flex: 1;
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
text-align: center;

p {
color: #6b7280;
font-size: 14px;
}
}

.panel-content {
flex: 1;
overflow-y: auto;
padding: 20px;
}

.property-section {
margin-bottom: 24px;
padding-bottom: 24px;
border-bottom: 1px solid #e5e7eb;

&:last-child {
border-bottom: none;
}

h4 {
margin: 0 0 16px 0;
font-size: 14px;
font-weight: 700;
color: #111827;
text-transform: uppercase;
letter-spacing: 0.5px;
}
}

.property-group {
margin-bottom: 16px;

label {
display: block;
margin-bottom: 6px;
font-size: 13px;
font-weight: 600;
color: #374151;
}
}

.property-input,
.property-textarea,
.property-select {
width: 100%;
padding: 8px 12px;
border: 1px solid #d1d5db;
border-radius: 6px;
font-size: 13px;
color: #111827;
background: white;
transition: all 0.2s ease;

&:focus {
outline: none;
border-color: #3b82f6;
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

&.disabled {
background: #f3f4f6;
color: #9ca3af;
cursor: not-allowed;
}
}

.property-textarea {
resize: vertical;
min-height: 60px;
font-family: inherit;
}

.checkbox-label {
display: flex;
align-items: center;
gap: 8px;
cursor: pointer;
font-weight: 500;

input[type="checkbox"] {
width: 16px;
height: 16px;
cursor: pointer;
}
}

.options-list {
display: flex;
flex-direction: column;
gap: 8px;
margin-bottom: 12px;
}

.option-item {
display: flex;
gap: 8px;
align-items: center;
}

.option-input {
flex: 1;
padding: 8px 12px;
border: 1px solid #d1d5db;
border-radius: 6px;
font-size: 13px;
color: #111827;
background: white;

&:focus {
outline: none;
border-color: #3b82f6;
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
}

.option-remove-btn {
width: 28px;
height: 28px;
display: flex;
align-items: center;
justify-content: center;
background: #ef4444;
color: white;
border: none;
border-radius: 4px;
font-size: 18px;
line-height: 1;
cursor: pointer;
transition: background 0.2s ease;

&:hover {
background: #dc2626;
}
}

.add-option-btn {
width: 100%;
padding: 8px 12px;
background: #f3f4f6;
color: #374151;
border: 1px dashed #d1d5db;
border-radius: 6px;
font-size: 13px;
font-weight: 600;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
background: #e5e7eb;
border-color: #9ca3af;
}
}

.panel-footer {
margin-top: 24px;
padding-top: 24px;
border-top: 1px solid #e5e7eb;
}
</style>