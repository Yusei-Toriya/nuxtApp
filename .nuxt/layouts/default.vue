<template>
  <div>
    <CommonMessage />
    <Nuxt />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import CommonMessage from "~/components/common/CommonMessage.vue";
  export default Vue.extend({
    components: { CommonMessage }
  })

</script>