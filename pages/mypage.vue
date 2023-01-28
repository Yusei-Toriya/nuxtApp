<template>
  <div class="container">
    <div>
      <h1>ダッシュボード</h1>
      <p>ログイン状態：{{$auth.loggedIn}}</p>
      <p>ユーザー名：{{$auth.user.name}}</p>
      <p>メールアドレス：{{$auth.user.email}}</p>
      <div class="component">
        <p>TEST</p>
      </div>
      <div v-if="$auth.loggedIn">
        <button @click="$auth.logout()">ログアウト</button>
      </div>
      <RouterbackButton />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

export default Vue.extend({
  // ログイン後にのみ、このページに入れるようにする
  middleware: "auth",
  data () {
    return {}
  },
  components: { RouterbackButton }
});
</script>
