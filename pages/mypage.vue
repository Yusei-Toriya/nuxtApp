<template v-if="$data">
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <div v-if="$auth.user != null">
          <h1 class="c-title">{{$auth.user.name}}さんのメモ一覧</h1>
          <div class="p-memoList">
            <div class="p-error" v-if="memo.memo_count == null">
            </div>
            <div class="p-error" v-if="memo.memo_count == 0">
              <p class="c-error">メモがありません</p>
            </div>
            <ul class="_itemList">
              <li v-for="memo in $data.memo.results" :key="memo.memo_id" class="_item">
                <article class="_cnt">
                  <div class="_memoDeleteBtn">
                    <button class="c-btn -deleteIcon" @click="deleteMemo(memo.memo_id)">
                      <span></span>
                    </button>
                  </div>
                  <h2 class="_memoTitle">{{memo.memo_title}}</h2>
                  <p class="_memoDetail">{{memo.memo_detail}}</p>
                  <div class="_memoEditBtn">
                    <router-link :to="'/memo/' + memo.memo_id" type="button">
                      <button class="c-btn -viewIcon">
                        <span></span>
                      </button>
                    </router-link>
                  </div>
                </article>
              </li>
            </ul>
            <!-- <table v-if="memo.memo_count > 0">
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
            </table> -->
            <div class="c-btnBox">
              <nav>
                <nuxt-link class="c-btn -forward" to="/createMemo">
                  <span>新規メモ作成</span>
                </nuxt-link>
              </nav>
            </div>
            <button class="c-btn -logout" @click="userLogout()">
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";


export default Vue.extend({
  // ログイン後にのみ、このページに入れるようにする
  middleware: "auth",
  
  data () {
    return {
      memo: {
        memo_id: '',
        memo_title: '',
        memo_detail: '',
        memo_count: null,
      }
    }
  },
  methods: {
    async deleteMemo(memoId: number){
      if (confirm('選択したメモを削除します')) {
        try{
          this.$axios.post('/memo/deleteMemo', {memoId})
          .then((res: any) => {
            this.$store.commit('setMessage', 'メモを削除しました')
            this.$store.commit('setIsSuccess', true)
            this.$store.commit('setIsShow', true)
            setTimeout(() => {
              this.$store.commit('setMessage', '')
              this.$store.commit('setIsShow', false)
              this.$store.commit('setIsSuccess', null)
              location.reload();
            }, 3000);
          })
        }
        catch(error) {
          console.log(error)
        }
      }
    },
    editMemo(memo_id: number){
      this.$router.push(`/memo/${memo_id}`)
    },
    userLogout(){
      this.$auth.logout()
      .then(()=>{
        this.$store.commit('setMessage', 'ログアウトしました')
        this.$store.commit('setIsSuccess', true)
        this.$store.commit('setIsShow', true)
        setTimeout(() => {
          this.$store.commit('setMessage', '')
          this.$store.commit('setIsShow', false)
          this.$store.commit('setIsSuccess', null)
        }, 3000);
      })
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('/memo/getAllMemos')
    console.log(data);
    this.memo = data
  },
});
</script>