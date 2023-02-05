<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <div v-if="$auth.user != null">
          <h1 class="c-title">「{{$auth.user.name}}」さんのメモ一覧</h1>
          <div class="p-memoTable">
            <table>
              <thead>
                <tr>
                  <th>メモID</th>
                  <th>タイトル</th>
                  <th>詳細</th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="memo in $data.memo.results" :key="memo.memo_id">
                  <td>{{memo.memo_id}}</td>
                  <td>{{memo.memo_title}}</td>
                  <td>{{memo.memo_detail}}</td>
                  <td class="">
                    <input type="hidden" v-model="memo.memo_id">
                    <button @click="editMemo(memo.memo_id)">
                      <span>編集</span>
                    </button>
                  </td>
                  <td class="">
                    <button @click="deleteMemo(memo.memo_id)">
                      <span>削除</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="cnt1">
              <nav>
                <nuxt-link to="/createMemo">新規メモ作成</nuxt-link>
              </nav>
              <button @click="$auth.logout()">ログアウト</button>
            </div>
          </div>
          <RouterbackButton />
        </div>
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
  
  data () {
    return {
      memo: {
        memo_id: '',
        memo_title: '',
        memo_detail: '',
      }
    }
  },
  methods: {
    async deleteMemo(memoId: number){
      if (confirm('選択したメモを削除します')) {
        try{
          this.$axios.post('/memo/deleteMemo', {memoId})
          const { data } = await this.$axios.get('/auth/getAllMemos')
            this.memo = data
          }
          catch(error) {
            console.log(error)
          }
          location.reload();
        }
      },
    editMemo(memo_id: number){
      this.$router.push(`/memo/${memo_id}`)
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('/memo/getAllMemos')
    this.memo = data
  },
  components: { RouterbackButton }
});
</script>