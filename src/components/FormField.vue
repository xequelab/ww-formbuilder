<template>
  <div 
    class="form-field-wrapper"
    :class="{ 
      'field-selected': isSelected,
      'field-hidden': isHidden
    }"
    @click.stop="selectField"
  >
    <div class="field-header" v-if="!isPreviewMode">
      <span class="field-type-badge">{{ field.type }}</span>
      <button 
        class="field-delete-btn" 
        @click.stop="deleteField"
        title="Delete field"
      >
        ×
      </button>
    </div>

    <div class="field-content">
      <!-- Heading -->
      <component 
        v-if="field.type === 'heading'"
        :is="field.level || 'h2'"
        class="form-heading"
        :class="field.customClass"
      >
        {{ field.text || field.label }}
      </component>

      <!-- Description -->
      <p 
        v-else-if="field.type === 'description'"
        class="form-description"
        :class="field.customClass"
      >
        {{ field.text || field.label }}
      </p>

      <!-- Regular Fields -->
      <div v-else class="field-group">
        <label 
          v-if="field.label && field.type !== 'submit'" 
          class="field-label"
          :class="{ 'required': field.required }"
        >
          {{ field.label }}
          <span v-if="field.required" class="required-indicator">*</span>
        </label>

        <!-- Text Input -->
        <input
          v-if="['text', 'email', 'number', 'phone', 'date', 'time'].includes(field.type)"
          :type="field.type === 'phone' ? 'tel' : field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          :class="['field-input', field.customClass]"
          :value="fieldValue"
          @input="updateValue($event.target.value)"
          :min="field.validation?.min"
          :max="field.validation?.max"
          :step="field.validation?.step"
          :pattern="field.validation?.pattern"
          :disabled="!isPreviewMode"
        />

        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :placeholder="field.placeholder"
          :required="field.required"
          :rows="field.rows || 4"
          :class="['field-textarea', field.customClass]"
          :value="fieldValue"
          @input="updateValue($event.target.value)"
          :disabled="!isPreviewMode"
        ></textarea>

        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          :required="field.required"
          :class="['field-select', field.customClass]"
          :value="fieldValue"
          @change="updateValue($event.target.value)"
          :multiple="field.multiple"
          :disabled="!isPreviewMode"
        >
          <option value="" disabled selected>{{ field.placeholder }}</option>
          <option 
            v-for="(option, idx) in field.options" 
            :key="idx"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Radio -->
        <div v-else-if="field.type === 'radio'" class="field-options">
          <label 
            v-for="(option, idx) in field.options" 
            :key="idx"
            class="option-label"
          >
            <input
              type="radio"
              :name="field.id"
              :value="option.value"
              :checked="fieldValue === option.value"
              @change="updateValue(option.value)"
              :required="field.required"
              :disabled="!isPreviewMode"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>

        <!-- Checkbox -->
        <div v-else-if="field.type === 'checkbox'" class="field-options">
          <label 
            v-for="(option, idx) in field.options" 
            :key="idx"
            class="option-label"
          >
            <input
              type="checkbox"
              :value="option.value"
              :checked="isChecked(option.value)"
              @change="toggleCheckbox(option.value)"
              :disabled="!isPreviewMode"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>

        <!-- File Upload -->
        <input
          v-else-if="field.type === 'file'"
          type="file"
          :required="field.required"
          :class="['field-file', field.customClass]"
          @change="handleFileUpload"
          :accept="field.validation?.acceptedTypes"
          :multiple="field.multiple"
          :disabled="!isPreviewMode"
        />

        <!-- Submit Button -->
        <button
          v-else-if="field.type === 'submit'"
          type="submit"
          :class="['field-submit', `btn-${field.buttonStyle}`, field.customClass]"
          @click.prevent="handleSubmit"
        >
          {{ field.buttonText || field.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'FormField',
  props: {
    field: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isPreviewMode: {
      type: Boolean,
      default: false
    },
    formValues: {
      type: Object,
      default: () => ({})
    },
    allFields: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select', 'delete', 'update-value', 'submit'],
  setup(props, { emit }) {
    const fieldValue = computed(() => props.formValues?.[props.field?.id] || '');

    const isHidden = computed(() => {
      if (!props.field?.conditionalLogic?.enabled) return false;
      
      const logic = props.field.conditionalLogic;
      const dependentValue = props.formValues?.[logic.fieldId];
      
      if (!dependentValue) return true;
      
      switch (logic.operator) {
        case 'equals':
          return dependentValue !== logic.value;
        case 'not_equals':
          return dependentValue === logic.value;
        case 'contains':
          return !String(dependentValue).includes(logic.value);
        case 'greater_than':
          return Number(dependentValue) <= Number(logic.value);
        case 'less_than':
          return Number(dependentValue) >= Number(logic.value);
        default:
          return false;
      }
    });

    const selectField = () => {
      if (!props.isPreviewMode) {
        emit('select', props.field);
      }
    };

    const deleteField = () => {
      emit('delete', props.field.id);
    };

    const updateValue = (value) => {
      emit('update-value', { fieldId: props.field.id, value });
    };

    const isChecked = (value) => {
      const currentValue = fieldValue.value;
      if (Array.isArray(currentValue)) {
        return currentValue.includes(value);
      }
      return false;
    };

    const toggleCheckbox = (value) => {
      let currentValue = fieldValue.value;
      if (!Array.isArray(currentValue)) {
        currentValue = [];
      }
      
      const newValue = currentValue.includes(value)
        ? currentValue.filter(v => v !== value)
        : [...currentValue, value];
      
      updateValue(newValue);
    };

    const handleFileUpload = (event) => {
      const files = event.target.files;
      updateValue(files);
    };

    const handleSubmit = () => {
      emit('submit');
    };

    return {
      fieldValue,
      isHidden,
      selectField,
      deleteField,
      updateValue,
      isChecked,
      toggleCheckbox,
      handleFileUpload,
      handleSubmit
    };
  }
};
</script>

<style scoped lang="scss">
.form-field-wrapper {
  position: relative;
  padding: 16px;
  margin-bottom: 12px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }

  &.field-selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &.field-hidden {
    opacity: 0.5;
    pointer-events: none;
  }
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.field-type-badge {
  display: inline-block;
  padding: 4px 8px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.field-delete-btn {
  width: 24px;
  height: 24px;
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

.field-content {
  width: 100%;
}

.form-heading {
  margin: 0 0 8px 0;
  color: #111827;
  font-weight: 700;
}

.form-description {
  margin: 0 0 8px 0;
  color: #6b7280;
  line-height: 1.6;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  display: block;
  font-weight: 600;
  color: #374151;
  font-size: 14px;

  &.required {
    .required-indicator {
      color: #ef4444;
      margin-left: 2px;
    }
  }
}

.field-input,
.field-textarea,
.field-select,
.field-file {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
}

.field-textarea {
  resize: vertical;
  min-height: 80px;
}

.field-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;

  input[type="radio"],
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &:hover {
    color: #111827;
  }
}

.field-submit {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &.btn-primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &.btn-secondary {
    background: #6b7280;
    color: white;

    &:hover {
      background: #4b5563;
    }
  }

  &.btn-success {
    background: #10b981;
    color: white;

    &:hover {
      background: #059669;
    }
  }
}
</style>