<template>
  <div>
    <button @click="goBack">前のページへ</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    goBack() {
      this.$nuxt.$router.go(-1);
    },
  },
});
</script>