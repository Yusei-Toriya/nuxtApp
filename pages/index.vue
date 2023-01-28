<template>
  <div class="container">
    <div>
      <h1>Auth認証アプリケーション</h1>
      <p>ログイン状態：{{$auth.loggedIn}}</p>
      <div>
        <nav>
          <nuxt-link to="/login">Login</nuxt-link>
        </nav>
        <nav>
          <nuxt-link to="/register">新規登録</nuxt-link>
        </nav>
        <RouterbackButton />
      </div>
      <div v-if="$auth.loggedIn">
        <div>
          <button @click="$auth.logout()">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

export default Vue.extend({
  components: { RouterbackButton }
});
</script>