<template v-if="$data">
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <div v-if="$auth.user != null">
          <h1 class="c-title">{{$auth.user.name}}さんのメモ一覧</h1>
          <div class="p-memoTable">
            <div class="p-error" v-if="memo.memo_count == 0">
              <p>メモがありません</p>
            </div>
            <table v-if="memo.memo_count > 0">
              <thead>
                <tr>
                  <th>タイトル</th>
                  <th>詳細</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="memo in $data.memo.results" :key="memo.memo_id">
                  <td>{{memo.memo_title}}</td>
                  <td>{{memo.memo_detail}}</td>
                  <td class="-edit">
                    <input type="hidden" v-model="memo.memo_id">
                    <button @click="editMemo(memo.memo_id)">
                      <span>編集</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="p-buttonWrapper">
              <nav>
                <nuxt-link class="c-btn" to="/createMemo">
                  <span>新規メモ作成</span>
                </nuxt-link>
                <button class="c-btn -logout" @click="$auth.logout()">
                  <span>ログアウト</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import axios from 'axios'

import RouterbackButton from "~/components/common/button/RouterbackButton.vue";

export default Vue.extend({
  // ログイン後にのみ、このページに入れるようにする
  middleware: "auth",
  
  data () {
    return {
      memo: {
        memo_id: '',
        memo_title: '',
        memo_detail: '',
        memo_count: 0,
      }
    }
  },
  methods: {
    // async deleteMemo(memoId: number){
    //   if (confirm('選択したメモを削除します')) {
    //     try{
    //       this.$axios.post('/memo/deleteMemo', {memoId})
    //       const { data } = await this.$axios.get('/auth/getAllMemos')
    //         this.memo = data
    //       // location.reload();
    //     }
    //     catch(error) {
    //       console.log(error)
    //     }
    //   }
    // },
    editMemo(memo_id: number){
      this.$router.push(`/memo/${memo_id}`)
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('/memo/getAllMemos')
    this.memo = data
    // console.log(data.memo_count)
  },
  components: { RouterbackButton }
});
</script>