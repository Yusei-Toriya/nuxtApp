<template>
  <div class="l-wrapper">
    <section class="l-sec">
      <div class="l-sec_in">
        <div class="p-memoForm">
          <h1 class="c-title">新規メモ作成</h1>
          <form @submit.prevent="createMemo">
            <div class="_cnt">
              <label class="c-required" for="memo_title">
                <span>メモタイトル</span>
                <input class="c-input" type="text" v-model="memo.memo_title"/>
              </label>
            </div>
            <div class="_cnt">
              <label class="c-required" for="memo_detail">
                <span>メモ詳細</span>
                <textarea type="textField" class="c-textarea" v-model="memo.memo_detail"></textarea>
              </label>
            </div>
            <div class="c-btnBox -multi">
              <RouterbackButton />
              <button class="c-btn -forward" type="submit">
                <span>メモ登録</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RouterbackButton from "~/components/common/button/RouterbackButton.vue";
export default Vue.extend({
  data() {
    return {
      memo: {
        memo_title: "",
        memo_detail: "",
      },
    };
  },
  methods: {
    createMemo(){
      const memo_title: string = this.memo.memo_title;
      const memo_detail: string = this.memo.memo_detail;
      if (memo_title && memo_detail) {
        this.$axios.post("/memo/createMemo", this.memo)
        .then((response) => {
          const message: string = response.data.message;
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
      }
      else {
        alert("必須項目を入力してください");
      }
    }
  },
  components: { RouterbackButton },
});
</script>
