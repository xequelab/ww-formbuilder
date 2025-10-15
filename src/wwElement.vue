<template>
  <div class="form-builder" :style="containerStyle">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="header-content">
          <div class="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
          <div>
            <h3>Form Fields</h3>
            <p>Drag to add</p>
          </div>
        </div>
      </div>

      <div class="sidebar-content">
        <draggable
          :list="fieldTypes"
          :group="{ name: 'fields', pull: 'clone', put: false }"
          :clone="cloneFieldType"
          :sort="false"
          item-key="type"
          class="field-types-list"
        >
          <template #item="{ element }">
            <div class="field-type-card">
              <div class="field-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 7h16M4 12h16M4 17h10"/>
                </svg>
              </div>
              <div class="field-info">
                <span class="field-name">{{ element.label }}</span>
                <span class="field-desc">Input field</span>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <!-- Canvas -->
    <div class="canvas">
      <div class="canvas-header">
        <div class="canvas-title">
          <h2>{{ content.formTitle || 'Untitled Form' }}</h2>
          <p v-if="content.formDescription">{{ content.formDescription }}</p>
        </div>

        <div class="canvas-actions">
          <button
            @click="togglePreview"
            class="btn"
            :class="{ 'btn-active': isPreviewMode }"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {{ isPreviewMode ? 'Edit Mode' : 'Preview' }}
          </button>

          <button @click="clearAllFields" class="btn btn-danger">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
            </svg>
            Clear All
          </button>
        </div>
      </div>

      <div class="canvas-content">
        <draggable
          v-model="formFields"
          group="fields"
          item-key="id"
          class="form-canvas"
          :class="{ 'has-fields': formFields.length > 0 }"
          @change="handleFieldsChange"
        >
          <template #item="{ element }">
            <FormField
              :field="element"
              :is-selected="selectedField?.id === element.id"
              :is-preview="isPreviewMode"
              :model-value="formValues[element.id]"
              @select="selectField(element)"
              @delete="deleteField(element.id)"
              @update:model-value="updateFieldValue(element.id, $event)"
            />
          </template>
        </draggable>

        <!-- Empty State -->
        <div v-if="formFields.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>
          <h3>Start Building Your Form</h3>
          <p>Drag a field from the sidebar to get started</p>
        </div>
      </div>
    </div>

    <!-- Properties Panel -->
    <div v-if="selectedField && !isPreviewMode" class="properties">
      <div class="properties-header">
        <h3>Field Properties</h3>
        <button @click="selectedField = null" class="close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="properties-content">
        <div class="property-group">
          <label class="property-label">Label</label>
          <input
            v-model="selectedField.label"
            type="text"
            class="property-input"
            placeholder="Field label"
            @input="updateFieldProperty"
          />
        </div>

        <div class="property-group">
          <label class="property-label">Placeholder</label>
          <input
            v-model="selectedField.placeholder"
            type="text"
            class="property-input"
            placeholder="Placeholder text"
            @input="updateFieldProperty"
          />
        </div>

        <div class="property-group">
          <label class="property-checkbox">
            <input
              v-model="selectedField.required"
              type="checkbox"
              @change="updateFieldProperty"
            />
            <span>Required field</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import draggable from 'vuedraggable';
import FormField from './components/FormField.vue';
import { FIELD_TYPES, getFieldTemplate } from './components/FieldTypes.js';

export default {
  name: 'FormBuilder',
  components: {
    draggable,
    FormField
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
      default: () => ({})
    }
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // State
    const formFields = ref([]);
    const selectedField = ref(null);
    const isPreviewMode = ref(false);
    const formValues = ref({});

    // Field types available
    const fieldTypes = ref([
      { type: FIELD_TYPES.TEXT, label: 'Text Input' }
    ]);

    // WeWeb variables
    const { value: formData, setValue: setFormData } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'formData',
      type: 'object',
      defaultValue: {}
    });

    // Styles
    const containerStyle = computed(() => ({
      backgroundColor: props.content?.backgroundColor || '#f8fafc',
      minHeight: props.content?.minHeight || '600px'
    }));

    // Methods
    const cloneFieldType = (fieldType) => {
      const newField = getFieldTemplate(fieldType.type);
      console.log('[FormBuilder] Created new field:', newField);
      return newField;
    };

    const selectField = (field) => {
      if (!isPreviewMode.value) {
        selectedField.value = field;
      }
    };

    const deleteField = (fieldId) => {
      formFields.value = formFields.value.filter(f => f.id !== fieldId);
      if (selectedField.value?.id === fieldId) {
        selectedField.value = null;
      }
      delete formValues.value[fieldId];
      setFormData(formValues.value);
    };

    const updateFieldProperty = () => {
      const index = formFields.value.findIndex(f => f.id === selectedField.value.id);
      if (index !== -1) {
        formFields.value[index] = { ...selectedField.value };
      }
    };

    const updateFieldValue = (fieldId, value) => {
      formValues.value[fieldId] = value;
      setFormData(formValues.value);

      emit('trigger-event', {
        name: 'fieldChange',
        event: { fieldId, value, formData: formValues.value }
      });
    };

    const handleFieldsChange = () => {
      console.log('[FormBuilder] Fields changed:', formFields.value);
    };

    const togglePreview = () => {
      isPreviewMode.value = !isPreviewMode.value;
      if (isPreviewMode.value) {
        selectedField.value = null;
      }
    };

    const clearAllFields = () => {
      if (confirm('Are you sure you want to clear all fields?')) {
        formFields.value = [];
        selectedField.value = null;
        formValues.value = {};
        setFormData({});
      }
    };

    // Watch form values
    watch(formValues, (newValues) => {
      setFormData(newValues);
    }, { deep: true });

    // Expose actions for WeWeb
    wwLib.useComponentActions({
      uid: props.uid,
      actions: {
        clearForm: clearAllFields,
        togglePreview
      }
    });

    onMounted(() => {
      console.log('[FormBuilder] Component mounted successfully');
    });

    return {
      formFields,
      selectedField,
      isPreviewMode,
      formValues,
      fieldTypes,
      containerStyle,
      cloneFieldType,
      selectField,
      deleteField,
      updateFieldProperty,
      updateFieldValue,
      handleFieldsChange,
      togglePreview,
      clearAllFields
    };
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.form-builder {
  display: flex;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  overflow: hidden;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  border-right: 1px solid #e5e7eb;
}

.sidebar-header {
  padding: 24px 20px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.sidebar-header p {
  margin: 2px 0 0 0;
  font-size: 13px;
  color: #6b7280;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.field-types-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-type-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: grab;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.field-type-card:hover {
  border-color: #6366f1;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}

.field-type-card:active {
  cursor: grabbing;
  transform: scale(0.98);
}

.field-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 10px;
  color: #6366f1;
}

.field-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.field-desc {
  font-size: 12px;
  color: #9ca3af;
}

/* ===== CANVAS ===== */
.canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.canvas-header {
  padding: 24px 32px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.canvas-title h2 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
}

.canvas-title p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.canvas-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: #f5f3ff;
}

.btn-active {
  border-color: #6366f1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-active:hover {
  background: linear-gradient(135deg, #5568d3 0%, #63408a 100%);
  color: white;
}

.btn-danger {
  color: #dc2626;
  border-color: #fecaca;
}

.btn-danger:hover {
  background: #fee;
  border-color: #dc2626;
  color: #dc2626;
}

.canvas-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  position: relative;
}

.form-canvas {
  min-height: 200px;
}

.form-canvas.has-fields {
  min-height: auto;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
  border: 3px dashed #e5e7eb;
  border-radius: 24px;
  color: #d1d5db;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
  color: #9ca3af;
}

.empty-state p {
  margin: 0;
  font-size: 15px;
  color: #d1d5db;
}

/* ===== PROPERTIES PANEL ===== */
.properties {
  width: 320px;
  display: flex;
  flex-direction: column;
  background: white;
  border-left: 1px solid #e5e7eb;
}

.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.properties-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #fee;
  color: #dc2626;
}

.properties-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
}

.property-group {
  margin-bottom: 20px;
}

.property-label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.property-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  color: #1f2937;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  outline: none;
}

.property-input:focus {
  background: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.property-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.property-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6366f1;
}

/* ===== SCROLLBARS ===== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .form-builder {
    flex-direction: column;
  }

  .sidebar,
  .properties {
    width: 100% !important;
    max-height: 300px;
  }
}
</style>
