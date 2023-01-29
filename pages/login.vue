<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-wrapper">
        <h1>ログイン</h1>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="user.email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="user.password">
          </div>
          <button type="submit">ログイン</button>
        </form>
        <div>
          <nuxt-link to="/register">新規登録</nuxt-link>
        </div>
        <RouterbackButton />
      </div>
    </div>
  </section>
</template>
  
  <script lang="ts">
  import Vue from "vue";
  import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

  export default Vue.extend({
    data() {
        return {
            user: {
                email: "",
                password: "",
            }
        };
    },
    methods: {
        loginUser() {
            this.$auth.loginWith("local", {
                data: this.user
            });
        },
    },
    components: { RouterbackButton }
});
  </script>