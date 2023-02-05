<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1>メモ帳アプリ</h1>
        <div>
          <p>アカウントをお持ちの方はこちらからログイン</p>
          <nav>
            <nuxt-link to="/login">Login</nuxt-link>
          </nav>
          <p>新規登録はこちら</p>
          <nav>
            <nuxt-link to="/register">新規登録</nuxt-link>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

export default Vue.extend({
  components: { RouterbackButton }
});
</script>