<template>
  <div
    class="form-field"
    :class="{
      'is-selected': isSelected,
      'is-preview': isPreview
    }"
    @click.stop="$emit('select')"
  >
    <!-- Field Header (Edit Mode Only) -->
    <div v-if="!isPreview" class="field-header">
      <span class="field-type-badge">{{ field.type }}</span>
      <button
        class="field-delete"
        @click.stop="$emit('delete')"
        title="Delete field"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Field Content -->
    <div class="field-content">
      <label v-if="field.label" class="field-label">
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </label>

      <input
        v-model="localValue"
        type="text"
        :placeholder="field.placeholder"
        :required="field.required"
        :disabled="!isPreview"
        class="field-input"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

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
    isPreview: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['select', 'delete', 'update:modelValue'],
  setup(props, { emit }) {
    const localValue = ref(props.modelValue || '');

    watch(() => props.modelValue, (newVal) => {
      localValue.value = newVal || '';
    });

    const handleInput = () => {
      emit('update:modelValue', localValue.value);
    };

    return {
      localValue,
      handleInput
    };
  }
};
</script>

<style scoped>
.form-field {
  position: relative;
  padding: 16px;
  margin-bottom: 12px;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.form-field:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
  transform: translateY(-1px);
}

.form-field.is-selected {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-field.is-preview {
  cursor: default;
  border-color: #e5e7eb;
}

.form-field.is-preview:hover {
  transform: none;
  box-shadow: none;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.field-type-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 6px;
}

.field-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: #fee;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.field-delete:hover {
  background: #dc2626;
  color: white;
  transform: scale(1.1);
}

.field-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.required {
  color: #dc2626;
  margin-left: 2px;
}

.field-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: #1f2937;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  transition: all 0.2s ease;
  outline: none;
}

.field-input:focus {
  background: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.field-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.6;
}

.field-input::placeholder {
  color: #9ca3af;
}
</style>
