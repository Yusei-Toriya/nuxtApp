<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-userForm">
        <h1 class="c-title">メモ帳アプリ ログインページ</h1>
        <form @submit.prevent="userLogin">
          <div class="_cnt">
            <label for="email">メールアドレス</label>
            <input class="c-input" v-model="user.email" />
          </div>
          <div class="_cnt">
            <label for="password">パスワード</label>
            <input class="c-input" type="password" v-model="user.password" />
          </div>
          <div class="p-buttonWrapper">
            <div class="c-btn -forward">
              <button type="submit">ログイン</button>
            </div>
          </div>
        </form>
        <div class="c-btnBox">
          <nuxt-link to="/register">
            <button class="c-btn -register">
              <span>新規登録はこちら</span>
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

export default Vue.extend({
  middleware: "messages",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      message: "",
      isSuccess: null,
    };
  },
  methods: {
    userLogin() {
      const email = this.user.email;
      const password = this.user.password;
      if (email && password) {
        this.$auth
          .loginWith("local", {
            data: this.user,
          })
          .then((response: any) => {
            const message = response.data.message;
            this.$store.commit("setMessage", message);
            this.$store.commit("setIsSuccess", true);
            this.$store.commit("setIsShow", true);
            this.$nuxt.$router.push("/mypage");
            setTimeout(() => {
              this.$store.commit("setMessage", "");
              this.$store.commit("setIsShow", false);
              this.$store.commit("setIsSuccess", null);
            }, 3000);
          })
          .catch((error) => {
            const errorStatus = error.response.status;
            const errorMessage = error.response.data.message;
            if (errorStatus === 401) {
              this.$store.commit("setMessage", errorMessage);
              this.$store.commit("setIsSuccess", false);
              this.$store.commit("setIsShow", true);
              setTimeout(() => {
                this.$store.commit("setMessage", "");
                this.$store.commit("setIsSuccess", false);
                this.$store.commit("setIsShow", false);
              }, 3000);
            }
          });
      } else {
        alert("必須項目を入力してください");
      }
    },
  },
  components: { RouterbackButton },
});
</script>
