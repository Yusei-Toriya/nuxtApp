<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-userForm">
        <h1 class="c-title">ユーザ登録</h1>
        <form @submit.prevent="registerUser">
          <div class="_cnt">
            <label  class="c-required" for="name">
              <span>名前</span>
              <input class="c-input" v-model="user.name" />
            </label>
          </div>
          <div class="_cnt">
            <label class="c-required" for="email">
              <span>メールアドレス</span>
              <input class="c-input" v-model="user.email" />
            </label>
          </div>
          <div class="_cnt">
            <label class="c-required" for="password">
              <span>パスワード</span>
              <input class="c-input" type="password" v-model="user.password" />
            </label>
          </div>
          <div class="c-btnBox -multi">
            <RouterbackButton />
            <div class="c-btn -forward">
              <button type="submit">登録</button>
            </div>
          </div>
        </form>
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
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    registerUser() {
      const name = this.user.name;
      const email = this.user.email;
      const password = this.user.password;
      if (name && email && password) {
          this.$axios.post("/auth/register", this.user).then((response: any) => {
            this.$auth.loginWith("local", {data: this.user,});
            this.$store.commit("setMessage", "ログインしました");
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
            if (errorStatus === 401 || errorStatus === 400) {
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
      }
      else {
        alert("必須項目を入力してください");
      }
    },
  },
  components: { RouterbackButton },
});
</script>
