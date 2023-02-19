<template>
  <!-- <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1 class="c-title">メモ帳アプリ</h1>
        <div>
          <p>アカウントをお持ちの方はこちらからログイン</p>
          <nav>
            <div class="p-buttonWrapper">
              <div class="c-btn">
                <nuxt-link class="c-nav" to="/login">
                  ログイン
                </nuxt-link>
              </div>
            </div>
          </nav>
          <p>新規登録はこちら</p>
          <nuxt-link to="/register">
            <button class="c-btn">
              <span>新規登録</span>
            </button>
          </nuxt-link>
          <nav>
            <nuxt-link class="c-nav" to="/register">新規登録</nuxt-link>
          </nav>
        </div>
      </div>
    </div>
  </section> -->
</template>

<script lang="ts">
import Vue from "vue";
import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

export default Vue.extend({
  async mounted() {
    this.$router.push("/login")
  },
});
</script>