<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1>新規メモ作成</h1>
        <form @submit.prevent="createMemo">
          <div class="p-memoForm">
            <dl>
              <dt>
                <label for="memo_title">メモタイトル</label>
              </dt>
              <dd>
                <input type="text" v-model="memo.memo_title"/>
              </dd>
            </dl>
            <dl>
              <dt>
                <label for="memo_title">メモ詳細</label>
              </dt>
              <dd>
                <input type="text" v-model="memo.memo_detail"/>
              </dd>
            </dl>
            <button type="submit">メモ登録</button>
          </div>
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
          this.$axios.post('/memo/create', this.memo)
          .then((res: any) => {
            this.$nuxt.$router.push('/mypage')
          })
        },
      },
      components: { RouterbackButton }
    });
</script>