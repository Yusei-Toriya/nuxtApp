<template>
  <div class="l-wrapper">
    <section class="l-sec">
      <div class="l-sec_in">
        <div class="p-memoWrapper">
          <h1 class="c-title">新規メモ作成</h1>
          <form @submit.prevent="createMemo">
            <div class="p-memoForm">
              <dl>
                <dt>メモタイトル</dt>
                <dd>
                  <input
                    class="c-input"
                    type="text"
                    v-model="memo.memo_title"
                  />
                </dd>
              </dl>
              <dl>
                <dt>メモ詳細</dt>
                <dd>
                  <textarea
                    type="textField"
                    class="c-textarea"
                    v-model="memo.memo_detail"
                  ></textarea>
                </dd>
              </dl>
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
    createMemo() {
      const memo_title = this.memo.memo_title;
      const memo_detail = this.memo.memo_detail;
      if (memo_title && memo_detail) {
        this.$axios
          .post("/memo/createMemo", this.memo)
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
          });
      } else {
        alert("必須項目を入力してください");
      }
    },
  },
  components: { RouterbackButton },
});
</script>
