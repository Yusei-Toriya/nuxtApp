<template>
    <div :class="[isSuccess ? 'c-message -success' : 'c-message -failed', isShow ? 'c-message -show' : 'c-message -hide']">
        {{ message }}
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    message() {
      return this.$store.state.message;
    },
    isSuccess(){
      return this.$store.state.isSuccess;
    },
    isShow(){
      return this.$store.state.isShow;
    },
  },
});
</script>