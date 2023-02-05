<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1 class="c-title">新規メモ作成</h1>
        <form @submit.prevent="createMemo">
          <div class="p-memoForm">
            <dl>
              <dt>
                メモタイトル
              </dt>
              <dd>
                <input class="c-input" type="text" v-model="memo.memo_title"/>
              </dd>
            </dl>
            <dl>
              <dt>
                メモ詳細
              </dt>
              <dd>
                <textarea class="c-input" type="text" v-model="memo.memo_detail"></textarea>
              </dd>
            </dl>
            <button class="c-btn" type="submit">メモ登録</button>
            <button class="c-btn" @click="cancel()">キャンセル</button>
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
          const memo_title = this.memo.memo_title
          const memo_detail = this.memo.memo_title
          if (memo_title && memo_detail) {
            this.$axios.post('/memo/createMemo', this.memo)
            .then((res: any) => {
              this.$nuxt.$router.push('/mypage')
            })
          }
          else {
            alert('必須項目を入力してください')
          }
        },
        cancel(){
          this.$nuxt.$router.push('/mypage')
        },
      },
      components: { RouterbackButton }
    });
</script>