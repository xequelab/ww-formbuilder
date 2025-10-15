<template>
  <draggable
    v-model="localFields"
    group="fields"
    :clone="cloneFieldItem"
    item-key="id"
    @change="handleChange"
  >
    <!-- other template code -->
  </draggable>
</template>

<script>
export default {
  setup() {
    const localFields = ref([]);
    
    const cloneFieldItem = (item) => {
      return {
        ...item,
        id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    };

    return {
      localFields,
      cloneFieldItem,
      // ... rest of returns
    };
  },
  // ... other script code
};
</script>