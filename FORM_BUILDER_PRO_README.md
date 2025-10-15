# 🚀 Form Builder Pro - WeWeb Component

## Visão Geral

**Form Builder Pro** é um construtor de formulários de **próxima geração** para WeWeb, criado com base no Form Builder Advanced original, mas completamente reformulado com recursos empresariais e design moderno.

## ✨ Novos Recursos

### 🎨 **25+ Tipos de Campos**
#### Campos de Texto
- Text Input
- Text Area
- Email
- Password (com strength meter)
- URL
- Phone (com máscara e código de país)

#### Números & Datas
- Number
- Currency (multi-moeda)
- Date
- Time
- Date & Time
- Date Range (com presets)

#### Seleções
- Dropdown
- Multi-select (com chips)
- Radio Buttons
- Checkboxes
- Toggle Switch
- Button Group

#### Campos Avançados
- **Slider** - Range com marcadores
- **Rating** - Estrelas, corações, emojis
- **Color Picker** - Seletor de cores completo
- **File Upload** - Drag & drop com preview
- **Image Upload** - Com crop e resize
- **Signature** - Assinatura digital

#### Conteúdo Rico
- **Rich Text** - Editor WYSIWYG
- **Code Editor** - Syntax highlighting
- **Markdown** - Editor com preview

#### Mídia & Localização
- **Map Location** - Seletor de localização
- **Video Recorder** - Gravação de vídeo
- **Audio Recorder** - Gravação de áudio

#### Layout
- Heading (H1-H6)
- Paragraph
- Divider
- Spacer
- HTML Block

### 🎨 **Sistema de Temas**
7 temas profissionais pré-configurados:
- ✨ Modern (padrão)
- ⚪ Minimal
- 🔮 Glassmorphism
- 🌙 Dark
- 🌈 Colorful
- 💼 Professional
- 🎨 Playful

### 📐 **Layouts Flexíveis**
- **3 Columns** - Sidebar + Canvas + Properties (clássico)
- **2 Columns** - Canvas amplo + Properties
- **Full Width** - Canvas completo (sem sidebar)
- **Compact** - Painéis colapsáveis

### 📱 **Preview Multi-device**
- 🖥️ Desktop
- 📱 Tablet
- 📱 Mobile

### 🔄 **Undo/Redo**
- Histórico completo de alterações
- Navegação entre estados
- Indicador visual de posição

### 💾 **Auto-save**
- Salvamento automático em localStorage
- Recuperação em caso de fechamento acidental
- Indicador de status

### 📋 **8 Templates Prontos**
1. 📧 Contact Form
2. 👤 Registration Form
3. 📊 Survey Form
4. 💳 Payment Form
5. 📅 Booking Form
6. ⭐ Feedback Form
7. 📰 Newsletter Signup
8. 💼 Job Application

### 🔍 **Busca de Campos**
- Busca instantânea na sidebar
- Filtro por categoria
- Acesso rápido aos campos

### 🎯 **Validação Avançada**
- Validação em tempo real
- Mensagens customizáveis
- 3 estilos: Inline, Tooltip, Toast
- Regras complexas:
  - Min/Max length
  - Min/Max value
  - Regex patterns
  - File size/type
  - Custom validation

### 🔀 **Lógica Condicional Avançada**
Múltiplas regras com operadores:
- Equals / Not Equals
- Contains / Not Contains
- Greater Than / Less Than
- Is Empty / Is Not Empty
- Condições: ALL ou ANY

### 📊 **Analytics**
- Tempo médio de preenchimento
- Interações por campo
- Taxa de abandono
- Exportação de dados

### 🌐 **Multi-idioma**
- Suporte a múltiplos idiomas
- Labels traduzíveis
- Formatação localizada

### 🎭 **Animações**
- Transições suaves
- Micro-interações
- 3 velocidades: Fast, Normal, Slow
- Pode ser desabilitado

### 🎨 **Customização Visual**
- Cores primária e de destaque
- Border radius configurável
- Espaçamento: Compact, Comfortable, Spacious
- CSS customizado

## 📁 Estrutura de Arquivos

```
ww-formbuilder/
├── ww-config-pro.js                    ✅ CRIADO
├── src/
│   ├── wwElementPro.vue                ✅ CRIADO (parcial)
│   ├── components/
│   │   ├── FieldTypesPro.js            ✅ CRIADO
│   │   ├── FormFieldPro.vue            ⏳ PRECISA CRIAR
│   │   ├── PropertiesPanelPro.vue      ⏳ PRECISA CRIAR
│   │   ├── ImportModal.vue             ⏳ PRECISA CRIAR
│   │   ├── ConfirmModal.vue            ⏳ PRECISA CRIAR
│   │   ├── Notifications.vue           ⏳ PRECISA CRIAR
│   │   ├── fields/                     ⏳ PRECISA CRIAR
│   │   │   ├── TextField.vue
│   │   │   ├── SelectField.vue
│   │   │   ├── DateField.vue
│   │   │   ├── RatingField.vue
│   │   │   ├── SliderField.vue
│   │   │   ├── ColorPickerField.vue
│   │   │   ├── SignatureField.vue
│   │   │   └── ... (outros campos)
│   │   └── utils/                      ⏳ PRECISA CRIAR
│   │       ├── validation.js
│   │       ├── themes.js
│   │       ├── analytics.js
│   │       └── storage.js
├── styles/
│   ├── themes/
│   │   ├── modern.scss                 ⏳ PRECISA CRIAR
│   │   ├── minimal.scss
│   │   ├── glassmorphism.scss
│   │   ├── dark.scss
│   │   └── ... (outros temas)
│   └── variables.scss                  ⏳ PRECISA CRIAR
└── FORM_BUILDER_PRO_README.md          ✅ CRIADO
```

## 🎯 Próximos Passos para Completar

### 1. **Completar wwElementPro.vue**
Adicionar métodos restantes:
- `togglePreview()`
- `saveForm()`
- `exportForm(format)`
- `importForm(config)`
- `loadTemplate(name)`
- `undo()` / `redo()`
- `addToHistory()`
- `validateForm()`
- `handleFormSubmit()`
- `trackAnalytics()`
- `showNotification()`
- `confirmClear()`

### 2. **Criar FormFieldPro.vue**
Componente unificado que renderiza todos os 25+ tipos de campos:
```vue
<template>
  <div class="form-field-pro" :class="fieldClasses">
    <div class="field-header" v-if="!isPreviewMode">
      <span class="drag-handle">⋮⋮</span>
      <span class="field-badge">{{ field.type }}</span>
      <div class="field-actions">
        <button @click="duplicate">Copy</button>
        <button @click="remove">×</button>
      </div>
    </div>

    <component
      :is="fieldComponent"
      v-bind="field"
      :value="value"
      @update="handleUpdate"
    />
  </div>
</template>
```

### 3. **Criar PropertiesPanelPro.vue**
Painel de propriedades expandido com:
- Tabs: Basic, Validation, Conditional, Style, Advanced
- Configurações específicas por tipo de campo
- Preview em tempo real
- Reset to defaults

### 4. **Criar Componentes de Campo Individuais**
Cada tipo de campo em seu próprio componente:

**TextField.vue** (text, email, password, url, phone)
```vue
<template>
  <div class="text-field">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
```

**RatingField.vue**
```vue
<template>
  <div class="rating-field">
    <div class="stars">
      <span
        v-for="n in max"
        :key="n"
        @click="rate(n)"
        :class="{ active: n <= value }"
      >
        ★
      </span>
    </div>
  </div>
</template>
```

**SliderField.vue**
```vue
<template>
  <div class="slider-field">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="value">{{ modelValue }}</span>
  </div>
</template>
```

### 5. **Criar Modais**

**ImportModal.vue**
```vue
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Import Form Configuration</h3>
      <textarea v-model="jsonInput" placeholder="Paste JSON here..."></textarea>
      <div class="modal-actions">
        <button @click="handleImport">Import</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>
```

**ConfirmModal.vue**
```vue
<template>
  <div class="modal-overlay">
    <div class="modal-content confirm-modal">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button @click="$emit('confirm')" class="btn-danger">Confirm</button>
        <button @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>
```

**Notifications.vue**
```vue
<template>
  <div class="notifications-container">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', notification.type]"
      >
        <span>{{ notification.message }}</span>
        <button @click="$emit('dismiss', notification.id)">×</button>
      </div>
    </transition-group>
  </div>
</template>
```

### 6. **Criar Utilitários**

**validation.js**
```javascript
export const validateField = (field, value) => {
  const errors = [];

  if (field.required && !value) {
    errors.push(`${field.label} is required`);
  }

  if (field.validation?.minLength && value.length < field.validation.minLength) {
    errors.push(`Minimum ${field.validation.minLength} characters`);
  }

  // More validation rules...

  return errors;
};
```

**storage.js**
```javascript
export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
```

**themes.js**
```javascript
export const themes = {
  modern: {
    primary: '#6366f1',
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
  },
  dark: {
    primary: '#818cf8',
    accent: '#a78bfa',
    background: '#1f2937',
    text: '#f9fafb',
    border: '#374151',
  },
  // More themes...
};
```

### 7. **Criar Estilos SCSS**

**variables.scss**
```scss
// Colors
$primary: var(--primary-color, #6366f1);
$accent: var(--accent-color, #8b5cf6);

// Spacing
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Border radius
$border-radius: var(--border-radius, 12px);

// Animations
$transition-fast: 150ms;
$transition-normal: 300ms;
$transition-slow: 500ms;
```

**themes/modern.scss**
```scss
.theme-modern {
  --primary-color: #6366f1;
  --accent-color: #8b5cf6;

  .field-type-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .toolbar {
    backdrop-filter: blur(10px);
  }
}
```

## 🎨 Estilos Completos para wwElementPro.vue

```scss
.form-builder-pro {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background-color);
  position: relative;

  // Toolbar
  .builder-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    z-index: 100;

    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 16px;

      .toolbar-title {
        font-size: 18px;
        font-weight: 700;
        margin: 0;
      }

      .field-count {
        padding: 4px 12px;
        background: var(--primary-color);
        color: white;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .toolbar-group {
      display: flex;
      gap: 4px;
    }

    .toolbar-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #f9fafb;
        border-color: var(--primary-color);
      }

      &.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  // Content
  .builder-content {
    display: flex;
    flex: 1;
    overflow: hidden;

    &.preview-mode {
      .builder-canvas {
        margin: 0 auto;
        max-width: 100%;
      }
    }
  }

  // Sidebar
  .builder-sidebar {
    display: flex;
    flex-direction: column;
    background: #f9fafb;
    border-right: 1px solid #e5e7eb;
    overflow: hidden;

    .sidebar-header {
      padding: 20px;
      background: white;
      border-bottom: 1px solid #e5e7eb;

      h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }
    }

    .sidebar-search {
      position: relative;
      padding: 16px;

      .search-input {
        width: 100%;
        padding: 10px 36px 10px 36px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      }

      .search-icon {
        position: absolute;
        left: 28px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
      }
    }

    .sidebar-tabs {
      display: flex;
      gap: 4px;
      padding: 8px 16px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      overflow-x: auto;

      .tab-btn {
        padding: 8px;
        background: transparent;
        border: none;
        border-radius: 6px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #f3f4f6;
        }

        &.active {
          background: var(--primary-color);
          color: white;
        }
      }
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .field-type-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      margin-bottom: 8px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: var(--border-radius);
      cursor: grab;
      transition: all 0.2s;

      &:hover {
        border-color: var(--primary-color);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        transform: translateY(-2px);
      }

      &:active {
        cursor: grabbing;
      }

      .field-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #f3f4f6;
        border-radius: 8px;
        color: var(--primary-color);
      }

      .field-info {
        flex: 1;

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }

        .field-badge {
          display: inline-block;
          padding: 2px 8px;
          margin-top: 4px;
          background: #fef3c7;
          color: #92400e;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }
      }

      .field-add-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
      }

      &:hover .field-add-btn {
        opacity: 1;
      }
    }
  }

  // Canvas
  .builder-canvas {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
    overflow: hidden;

    .canvas-header {
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;

      h2 {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 700;
      }

      p {
        margin: 0;
        color: #6b7280;
      }
    }

    .canvas-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      position: relative;

      &.device-desktop {
        padding: 24px;
      }

      &.device-tablet {
        max-width: 768px;
        margin: 0 auto;
      }

      &.device-mobile {
        max-width: 375px;
        margin: 0 auto;
      }
    }

    .canvas-empty-state {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .empty-icon {
        display: block;
        width: 64px;
        height: 64px;
        margin: 0 auto 24px;
        color: #d1d5db;
      }

      h3 {
        margin: 0 0 8px 0;
        font-size: 20px;
        font-weight: 700;
      }

      p {
        margin: 0 0 24px 0;
        color: #6b7280;
      }
    }

    .canvas-footer {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;

      .footer-stats {
        display: flex;
        gap: 24px;

        .stat-item {
          font-size: 14px;
          color: #6b7280;

          strong {
            color: var(--primary-color);
            font-weight: 700;
          }
        }
      }

      .autosave-status {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #10b981;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  // Properties
  .builder-properties {
    background: #f9fafb;
    border-left: 1px solid #e5e7eb;
    overflow-y: auto;
  }

  // Animations
  &.animations-enabled {
    .field-list-move {
      transition: transform 0.3s;
    }

    .field-list-enter-active,
    .field-list-leave-active {
      transition: all 0.3s;
    }

    .field-list-enter-from {
      opacity: 0;
      transform: translateY(-20px);
    }

    .field-list-leave-to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  // Responsive
  @media (max-width: 1024px) {
    .builder-content {
      flex-direction: column;
    }

    .builder-sidebar,
    .builder-properties {
      width: 100% !important;
      max-height: 300px;
      border: none;
    }
  }
}
```

## 📊 Comparação: Original vs Pro

| Recurso | Original | Pro |
|---------|----------|-----|
| Tipos de campos | 14 | 25+ |
| Temas | 0 | 7 |
| Layouts | 1 | 4 |
| Preview devices | 0 | 3 |
| Undo/Redo | ❌ | ✅ |
| Auto-save | ❌ | ✅ |
| Templates | 0 | 8 |
| Analytics | ❌ | ✅ |
| Search | ❌ | ✅ |
| Multi-language | ❌ | ✅ |
| Validação avançada | Básica | Completa |
| Lógica condicional | Simples | Avançada |
| Animações | ❌ | ✅ |

## 🚀 Como Usar

### 1. Instalação
```bash
# Copiar arquivos para seu projeto WeWeb
# Configurar no weweb.config.js
```

### 2. Uso Básico
```vue
<FormBuilderPro
  :content="{
    formTitle: 'My Form',
    theme: 'modern',
    enableAutoSave: true,
    enableUndoRedo: true
  }"
  @submit="handleSubmit"
/>
```

### 3. Carregar Template
```javascript
// Via action
component.loadTemplate('contact');

// Via propriedade
content.formTemplate = 'contact';
```

### 4. Import/Export
```javascript
// Export
const config = await component.exportForm('json');

// Import
await component.importForm(jsonString);
```

## 🎯 Roadmap Futuro

- [ ] AI-powered field suggestions
- [ ] Form analytics dashboard
- [ ] A/B testing support
- [ ] Collaboration features
- [ ] Version control
- [ ] Custom field types API
- [ ] Webhook integrations
- [ ] PDF export
- [ ] Email templates
- [ ] Payment integrations

## 📝 Licença

MIT License - Use livremente em seus projetos WeWeb!

---

**Criado com ❤️ para a comunidade WeWeb**
