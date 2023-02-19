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
<!-- <style>
.success, .failed{
  position: fixed;
  z-index: 9999;
  opacity: 0;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  width: 50%;
  padding: 20px 0px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.3s all;
}

.success{
  transition: 0.3s all;
  background-color: #fff;
  color: blue;
}

.failed {
  /* opacity: 1; */
  transition: 0.3s all;
  background-color: #fff;
  color: red;
}

.show{
  opacity: 1;
  top: 20px;
  transition: 0.3s all;
}

.hide{
  opacity: 0;
  top: 0;
  transition: 0.3s all;
}
</style> -->