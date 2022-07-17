<template>
  <stuff-list />
</template>

<script lang="ts">
import Vue from 'vue';
import StuffList from '@/components/StuffList.vue';

export default Vue.extend({
  name: 'HomeView',

  components: {
    StuffList,
  },
});
</script>
