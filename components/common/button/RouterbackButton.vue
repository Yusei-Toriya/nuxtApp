<template>
  <button class="c-btn -back" @click="goBack" type="button">
    <span>戻る</span>
  </button>
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