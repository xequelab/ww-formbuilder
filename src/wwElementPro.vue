<template>
  <div
    class="form-builder-pro"
    :class="[
      `theme-${content.theme}`,
      `layout-${content.layout}`,
      `spacing-${content.spacing}`,
      { 'animations-enabled': content.enableAnimations }
    ]"
    :style="containerStyle"
  >
    <!-- Toolbar (Top) -->
    <div v-if="!isPreviewMode" class="builder-toolbar">
      <div class="toolbar-left">
        <h1 class="toolbar-title">{{ content.formTitle || 'Form Builder Pro' }}</h1>
        <span class="field-count">{{ formFields.length }} fields</span>
      </div>

      <div class="toolbar-center">
        <wwElement v-bind="content.toolbarElement" />
      </div>

      <div class="toolbar-right">
        <!-- Undo/Redo -->
        <div v-if="content.enableUndoRedo" class="toolbar-group">
          <button
            @click="undo"
            class="toolbar-btn"
            :disabled="!canUndo"
            :title="`Undo (${historyIndex + 1}/${history.length})`"
          >
            <span v-html="icons.undo"></span>
          </button>
          <button
            @click="redo"
            class="toolbar-btn"
            :disabled="!canRedo"
            title="Redo"
          >
            <span v-html="icons.redo"></span>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <!-- Device Preview -->
        <div class="toolbar-group device-selector">
          <button
            v-for="device in devices"
            :key="device.value"
            @click="setPreviewDevice(device.value)"
            class="toolbar-btn"
            :class="{ active: previewDevice === device.value }"
            :title="device.label"
          >
            <span v-html="device.icon"></span>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <!-- Actions -->
        <div class="toolbar-group">
          <button
            @click="togglePreview"
            class="toolbar-btn preview-btn"
            :class="{ active: isPreviewMode }"
            :title="isPreviewMode ? 'Back to Edit' : 'Preview Form'"
          >
            <span v-html="icons.preview"></span>
            {{ isPreviewMode ? 'Edit' : 'Preview' }}
          </button>

          <div class="toolbar-dropdown">
            <button class="toolbar-btn" @click="toggleActionsMenu">
              <span v-html="icons.more"></span>
            </button>
            <div v-if="showActionsMenu" class="dropdown-menu">
              <button @click="saveForm" class="dropdown-item">
                <span v-html="icons.save"></span>
                Save Form
              </button>
              <button @click="exportForm('json')" class="dropdown-item">
                <span v-html="icons.download"></span>
                Export JSON
              </button>
              <button @click="showImportModal = true" class="dropdown-item">
                <span v-html="icons.upload"></span>
                Import JSON
              </button>
              <div class="dropdown-divider"></div>
              <button @click="confirmClear" class="dropdown-item danger">
                <span v-html="icons.trash"></span>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="builder-content" :class="{ 'preview-mode': isPreviewMode }">

      <!-- Sidebar (Left) -->
      <div
        v-if="!isPreviewMode && content.layout !== 'full-width'"
        class="builder-sidebar"
        :style="sidebarStyle"
      >
        <div class="sidebar-header">
          <h3>
            <span v-html="icons.layers"></span>
            Form Fields
          </h3>
          <wwElement v-bind="content.sidebarHeaderElement" />
        </div>

        <!-- Search -->
        <div v-if="content.enableSearch" class="sidebar-search">
          <span class="search-icon" v-html="icons.search"></span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search fields..."
            class="search-input"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="search-clear"
          >
            <span v-html="icons.x"></span>
          </button>
        </div>

        <!-- Categories Tabs -->
        <div class="sidebar-tabs">
          <button
            v-for="(category, key) in fieldCategories"
            :key="key"
            @click="activeCategory = key"
            class="tab-btn"
            :class="{ active: activeCategory === key }"
            :title="category.label"
          >
            {{ category.icon }}
          </button>
        </div>

        <!-- Fields List -->
        <div class="sidebar-content">
          <draggable
            :list="filteredFields"
            :group="{ name: 'fields', pull: 'clone', put: false }"
            :clone="cloneFieldType"
            :sort="false"
            item-key="type"
            class="fields-list"
          >
            <template #item="{ element }">
              <div
                class="field-type-card"
                :title="element.description || element.label"
                @click="addFieldToCanvas(element.type)"
              >
                <div class="field-icon">
                  <span v-html="getFieldIcon(element.type)"></span>
                </div>
                <div class="field-info">
                  <span class="field-label">{{ element.label }}</span>
                  <span v-if="element.badge" class="field-badge">{{ element.badge }}</span>
                </div>
                <button class="field-add-btn" @click.stop="addFieldToCanvas(element.type)">
                  <span v-html="icons.plus"></span>
                </button>
              </div>
            </template>
          </draggable>

          <!-- Templates -->
          <div v-if="content.enableTemplates && activeCategory === 'templates'" class="templates-list">
            <h4>Form Templates</h4>
            <button
              v-for="(template, key) in formTemplates"
              :key="key"
              @click="loadTemplate(key)"
              class="template-card"
            >
              <h5>{{ template.name }}</h5>
              <p>{{ template.description }}</p>
              <span class="template-fields-count">{{ template.fields.length }} fields</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Canvas (Center) -->
      <div class="builder-canvas" :style="canvasStyle">
        <div class="canvas-header" v-if="!isPreviewMode">
          <div class="canvas-title-section">
            <h2>{{ content.formTitle || 'Untitled Form' }}</h2>
            <p v-if="content.formDescription">{{ content.formDescription }}</p>
          </div>
          <wwElement v-bind="content.canvasHeaderElement" />
        </div>

        <div
          class="canvas-content"
          :class="[
            `device-${previewDevice}`,
            { 'empty-canvas': !formFields.length && !isPreviewMode }
          ]"
        >
          <transition-group
            name="field-list"
            tag="div"
            class="form-canvas"
          >
            <draggable
              v-if="!isPreviewMode"
              key="draggable"
              v-model="formFields"
              group="fields"
              item-key="id"
              handle=".field-drag-handle"
              animation="200"
              @change="onFieldsChange"
              class="canvas-drop-zone"
            >
              <template #item="{ element, index }">
                <FormFieldPro
                  :field="element"
                  :index="index"
                  :is-selected="selectedField?.id === element.id"
                  :is-preview-mode="false"
                  :form-values="formValues"
                  :all-fields="formFields"
                  :theme="content.theme"
                  :primary-color="content.primaryColor"
                  :enable-animations="content.enableAnimations"
                  @select="selectField"
                  @delete="deleteField"
                  @duplicate="duplicateField"
                  @update-value="updateFormValue"
                  @submit="handleFormSubmit"
                />
              </template>
            </draggable>

            <div v-else key="preview" class="preview-container">
              <FormFieldPro
                v-for="(field, index) in visibleFields"
                :key="field.id"
                :field="field"
                :index="index"
                :is-selected="false"
                :is-preview-mode="true"
                :form-values="formValues"
                :all-fields="formFields"
                :theme="content.theme"
                :primary-color="content.primaryColor"
                :enable-animations="content.enableAnimations"
                @update-value="updateFormValue"
                @submit="handleFormSubmit"
              />
            </div>
          </transition-group>

          <!-- Empty State -->
          <div v-if="!formFields.length && !isPreviewMode" class="canvas-empty-state">
            <div class="empty-state-content">
              <span class="empty-icon" v-html="icons.inbox"></span>
              <h3>Start Building Your Form</h3>
              <p>Drag and drop fields from the sidebar or click on a field type to add it</p>
              <div class="empty-state-actions" v-if="content.enableTemplates">
                <button @click="activeCategory = 'templates'" class="btn-secondary">
                  <span v-html="icons.layout"></span>
                  Browse Templates
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Footer / Status Bar -->
        <div v-if="!isPreviewMode" class="canvas-footer">
          <div class="footer-stats">
            <span class="stat-item">
              <strong>{{ formFields.length }}</strong> fields
            </span>
            <span class="stat-item">
              <strong>{{ requiredFieldsCount }}</strong> required
            </span>
            <span v-if="content.enableAnalytics" class="stat-item">
              <strong>{{ Math.round(averageCompletionTime) }}s</strong> avg time
            </span>
          </div>
          <div class="footer-actions">
            <span v-if="autoSaveStatus" class="autosave-status">
              <span v-html="icons.check"></span>
              {{ autoSaveStatus }}
            </span>
          </div>
        </div>
      </div>

      <!-- Properties Panel (Right) -->
      <div
        v-if="!isPreviewMode && selectedField"
        class="builder-properties"
        :style="propertiesStyle"
      >
        <PropertiesPanelPro
          :selected-field="selectedField"
          :all-fields="formFields"
          :properties-footer-element="content.propertiesFooterElement"
          :theme="content.theme"
          :primary-color="content.primaryColor"
          @update-field="updateSelectedField"
          @close="selectedField = null"
        />
      </div>
    </div>

    <!-- Modals -->
    <ImportModal
      v-if="showImportModal"
      @import="importForm"
      @close="showImportModal = false"
    />

    <ConfirmModal
      v-if="showConfirmModal"
      :title="confirmModal.title"
      :message="confirmModal.message"
      :type="confirmModal.type"
      @confirm="confirmModal.onConfirm"
      @cancel="showConfirmModal = false"
    />

    <!-- Notifications -->
    <Notifications :notifications="notifications" @dismiss="dismissNotification" />

    <!-- Custom CSS -->
    <style v-if="content.customCSS">
      {{ content.customCSS }}
    </style>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import draggable from 'vuedraggable';
import FormFieldPro from './components/FormFieldPro.vue';
import PropertiesPanelPro from './components/PropertiesPanelPro.vue';
import ImportModal from './components/ImportModal.vue';
import ConfirmModal from './components/ConfirmModal.vue';
import Notifications from './components/Notifications.vue';
import {
  FIELD_TYPES,
  FIELD_CATEGORIES,
  FIELD_LABELS,
  FIELD_ICONS,
  getFieldTemplate,
  FORM_TEMPLATES
} from './components/FieldTypesPro.js';

export default {
  name: 'FormBuilderPro',
  components: {
    draggable,
    FormFieldPro,
    PropertiesPanelPro,
    ImportModal,
    ConfirmModal,
    Notifications,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      required: true,
    },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],

  setup(props, { emit }) {
    // ==================== STATE ====================
    const formFields = ref([]);
    const selectedField = ref(null);
    const isPreviewMode = ref(false);
    const formValues = ref({});
    const previewDevice = ref('desktop');
    const searchQuery = ref('');
    const activeCategory = ref('text');
    const showActionsMenu = ref(false);
    const showImportModal = ref(false);
    const showConfirmModal = ref(false);
    const confirmModal = ref({});
    const notifications = ref([]);
    const autoSaveStatus = ref('');

    // Undo/Redo
    const history = ref([]);
    const historyIndex = ref(-1);

    // Analytics
    const fieldAnalytics = ref({});

    // Icons
    const icons = ref({});

    // ==================== EDITOR STATE ====================
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // ==================== COMPONENT VARIABLES ====================
    const { value: formData, setValue: setFormData } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'formData',
      type: 'object',
      defaultValue: {},
    });

    const { value: formConfig, setValue: setFormConfig } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'formConfig',
      type: 'object',
      defaultValue: { fields: [] },
    });

    // ==================== COMPUTED ====================
    const containerStyle = computed(() => ({
      '--primary-color': props.content?.primaryColor || '#6366f1',
      '--accent-color': props.content?.accentColor || '#8b5cf6',
      '--background-color': props.content?.backgroundColor || '#ffffff',
      '--border-radius': props.content?.borderRadius || '12px',
      minHeight: props.content?.minHeight || '700px',
    }));

    const sidebarStyle = computed(() => ({
      width: props.content?.sidebarWidth || '280px',
    }));

    const canvasStyle = computed(() => ({
      flex: 1,
    }));

    const propertiesStyle = computed(() => ({
      width: props.content?.propertiesWidth || '320px',
    }));

    const fieldCategories = computed(() => FIELD_CATEGORIES);

    const formTemplates = computed(() => FORM_TEMPLATES);

    const devices = computed(() => [
      { value: 'desktop', label: 'Desktop', icon: icons.value.monitor },
      { value: 'tablet', label: 'Tablet', icon: icons.value.tablet },
      { value: 'mobile', label: 'Mobile', icon: icons.value.smartphone },
    ]);

    const filteredFields = computed(() => {
      const category = FIELD_CATEGORIES[activeCategory.value];
      if (!category) return [];

      let fields = category.fields.map(type => ({
        type,
        label: FIELD_LABELS[type],
        icon: FIELD_ICONS[type],
      }));

      if (searchQuery.value) {
        fields = fields.filter(f =>
          f.label.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return fields;
    });

    const visibleFields = computed(() => {
      return formFields.value.filter(field => !field.hidden && evaluateConditionalLogic(field));
    });

    const requiredFieldsCount = computed(() => {
      return formFields.value.filter(f => f.required).length;
    });

    const averageCompletionTime = computed(() => {
      const times = Object.values(fieldAnalytics.value)
        .map(a => a.timeSpent)
        .filter(t => t > 0);
      if (times.length === 0) return 0;
      return times.reduce((a, b) => a + b, 0) / times.length;
    });

    const canUndo = computed(() => historyIndex.value > 0);
    const canRedo = computed(() => historyIndex.value < history.value.length - 1);

    // ==================== METHODS ====================

    const loadIcons = async () => {
      const { getIcon } = wwLib.useIcons();
      icons.value = {
        // Toolbar
        undo: await getIcon('rotate-ccw'),
        redo: await getIcon('rotate-cw'),
        monitor: await getIcon('monitor'),
        tablet: await getIcon('tablet'),
        smartphone: await getIcon('smartphone'),
        preview: await getIcon('eye'),
        more: await getIcon('more-vertical'),
        save: await getIcon('save'),
        download: await getIcon('download'),
        upload: await getIcon('upload'),
        trash: await getIcon('trash-2'),

        // Sidebar
        layers: await getIcon('layers'),
        search: await getIcon('search'),
        x: await getIcon('x'),
        plus: await getIcon('plus'),

        // Canvas
        inbox: await getIcon('inbox'),
        layout: await getIcon('layout'),
        check: await getIcon('check'),

        // Fields
        dragHandle: await getIcon('grip-vertical'),
      };
    };

    const getFieldIcon = (type) => {
      const iconName = FIELD_ICONS[type] || 'square';
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#${iconName}"></use></svg>`;
    };

    const cloneFieldType = (fieldType) => {
      return getFieldTemplate(fieldType.type);
    };

    const addFieldToCanvas = (type, position = -1) => {
      const newField = getFieldTemplate(type);
      if (position === -1) {
        formFields.value.push(newField);
      } else {
        formFields.value.splice(position, 0, newField);
      }

      addToHistory();
      updateFormConfig();

      emit('trigger-event', {
        name: 'fieldAdd',
        event: { field: newField, position: position === -1 ? formFields.value.length - 1 : position },
      });

      showNotification('Field added successfully', 'success');
    };

    const selectField = (field) => {
      if (isPreviewMode.value) return;
      selectedField.value = field;
      trackAnalytics(field.id, 'select');
    };

    const deleteField = (fieldId) => {
      const field = formFields.value.find(f => f.id === fieldId);
      formFields.value = formFields.value.filter(f => f.id !== fieldId);

      if (selectedField.value?.id === fieldId) {
        selectedField.value = null;
      }

      addToHistory();
      updateFormConfig();

      emit('trigger-event', {
        name: 'fieldDelete',
        event: { fieldId, fieldLabel: field?.label },
      });

      showNotification('Field deleted', 'info');
    };

    const duplicateField = (fieldId) => {
      const field = formFields.value.find(f => f.id === fieldId);
      if (!field) return;

      const index = formFields.value.findIndex(f => f.id === fieldId);
      const duplicated = {
        ...JSON.parse(JSON.stringify(field)),
        id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        label: `${field.label} (Copy)`,
      };

      formFields.value.splice(index + 1, 0, duplicated);
      addToHistory();
      updateFormConfig();
      showNotification('Field duplicated', 'success');
    };

    const updateSelectedField = (updatedField) => {
      const index = formFields.value.findIndex(f => f.id === updatedField.id);
      if (index !== -1) {
        formFields.value[index] = updatedField;
        selectedField.value = updatedField;
        addToHistory();
        updateFormConfig();
      }
    };

    const onFieldsChange = () => {
      addToHistory();
      updateFormConfig();
    };

    const updateFormConfig = () => {
      setFormConfig({
        fields: formFields.value,
        title: props.content?.formTitle,
        description: props.content?.formDescription,
        theme: props.content?.theme,
      });
    };

    const updateFormValue = ({ fieldId, value, oldValue }) => {
      formValues.value = {
        ...formValues.value,
        [fieldId]: value,
      };
      setFormData(formValues.value);

      trackAnalytics(fieldId, 'change');

      emit('trigger-event', {
        name: 'fieldChange',
        event: { fieldId, value, oldValue, formData: formValues.value },
      });
    };

    const evaluateConditionalLogic = (field) => {
      if (!field.conditionalLogic?.enabled || !field.conditionalLogic?.rules?.length) {
        return true;
      }

      const { rules, condition } = field.conditionalLogic;
      const results = rules.map(rule => {
        const dependentValue = formValues.value[rule.fieldId];

        switch (rule.operator) {
          case 'equals':
            return dependentValue === rule.value;
          case 'not_equals':
            return dependentValue !== rule.value;
          case 'contains':
            return String(dependentValue || '').includes(rule.value);
          case 'not_contains':
            return !String(dependentValue || '').includes(rule.value);
          case 'greater_than':
            return Number(dependentValue) > Number(rule.value);
          case 'less_than':
            return Number(dependentValue) < Number(rule.value);
          case 'is_empty':
            return !dependentValue || dependentValue === '';
          case 'is_not_empty':
            return dependentValue && dependentValue !== '';
          default:
            return true;
        }
      });

      return condition === 'all' ? results.every(r => r) : results.some(r => r);
    };

    // Continue in next part...

    return {
      formFields,
      selectedField,
      isPreviewMode,
      formValues,
      previewDevice,
      searchQuery,
      activeCategory,
      showActionsMenu,
      showImportModal,
      showConfirmModal,
      confirmModal,
      notifications,
      autoSaveStatus,
      history,
      historyIndex,
      icons,
      containerStyle,
      sidebarStyle,
      canvasStyle,
      propertiesStyle,
      fieldCategories,
      formTemplates,
      devices,
      filteredFields,
      visibleFields,
      requiredFieldsCount,
      averageCompletionTime,
      canUndo,
      canRedo,
      getFieldIcon,
      cloneFieldType,
      addFieldToCanvas,
      selectField,
      deleteField,
      duplicateField,
      updateSelectedField,
      onFieldsChange,
      updateFormValue,
      // More methods to be added...
    };
  },
};
</script>

<style scoped lang="scss">
// Styles will be added in the next file
</style>
