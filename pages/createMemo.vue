<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-wrapper">
        <h1>新規メモ作成</h1>
        <form @submit.prevent="createMemo">
          <div class="form-group">
            <label for="memo_title">メモタイトル</label>
            <input v-model="memo.memo_title">
          </div>
          <div class="form-group">
            <label for="memo_title">メモ詳細</label>
            <input v-model="memo.memo_detail">
          </div>
          <button type="submit">メモ登録</button>
        </form>
        <RouterbackButton />
      </div>
    </div>
  </section>
</template>
  
<script lang="ts">
  import Vue from "vue";
  import RouterbackButton from "~/components/common/button/RouterbackButton.vue";
    export default Vue.extend({
      data(){
        return {
          memo: {
            memo_title: '',
            memo_detail: '',
          }
        }
      },
      methods: {
        createMemo(){
          this.$axios.post('/memo/register', this.memo)
          .then((res: any) => {
            this.$nuxt.$router.push('/mypage')
          })
        },
      },
      components: { RouterbackButton }
    });
</script>