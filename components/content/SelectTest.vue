<template>
  <div
    v-whppt-select="value"
    data-property="result"
    :items="JSON.stringify(items)"
    label-prop="name"
    value-prop="testvalue"
  >
    {{ value || 'Select an item' }}
  </div>
</template>
<script>
export default {
  name: 'SelectTest',
  props: ['value'],
  data() {
    return {
      items: [{ name: 'MY ITEM', testvalue: 'item1' }],
    };
  },
};
</script>
