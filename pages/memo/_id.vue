<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1 class="c-title">メモ編集</h1>
        <form @submit.prevent="editMemo">
          <div class="p-memoForm">
            <input type="hidden" v-model="memo.memo_id" />
            <dl>
              <dt>
                <label for="memo_title">メモタイトル</label>
              </dt>
              <dd>
                <input
                  class="c-input"
                  type="text"
                  v-model="memo.memo_title"
                  required
                />
              </dd>
            </dl>
            <dl>
              <dt>
                <label for="memo_detail">メモ詳細</label>
              </dt>
              <dd>
                <textarea
                  class="c-textarea"
                  type="text"
                  v-model="memo.memo_detail"
                  required
                ></textarea>
              </dd>
            </dl>
            <div class="c-btnBox -multi">
              <RouterbackButton />
              <button class="c-btn -forward" type="submit">
                <span>メモ更新</span>
              </button>
            </div>
            <button
              class="c-btn -delete"
              @click="deleteMemo(memo.memo_id)"
              type="button"
            >
              <span>削除する</span>
            </button>
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
  // ログイン後にのみ、このページに入れるようにする
  middleware: "auth",
  data() {
    return {
      memo: {
        memo_id: 0,
        memo_title: "",
        memo_detail: "",
      },
    };
  },

  async mounted() {
    const id: string = this.$route.params.id;
    try {
      const { data } = await this.$axios.get(`/memo/${id}`);
      this.memo = data.results[0];
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async editMemo() {
      this.$axios.post("/memo/editMemo", this.memo).then((response: any) => {
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
    },
    async deleteMemo(memoId: number) {
      if (confirm("選択したメモを削除します")) {
        try {
          this.$axios
            .post("/memo/deleteMemo", { memoId })
            .then((response: any) => {
              const message = response.data.message;
              this.$store.commit("setMessage", message);
              this.$store.commit("setIsSuccess", true);
              this.$store.commit("setIsShow", true);
              setTimeout(() => {
                this.$store.commit("setMessage", "");
                this.$store.commit("setIsShow", false);
                this.$store.commit("setIsSuccess", null);
              }, 3000);
              this.$nuxt.$router.push("/mypage");
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  components: { RouterbackButton },
});
</script>
