<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-wrapper">
        <div v-if="$auth.user != null">
          <!-- <div>{{ $auth.user }}</div> -->
          <!-- <div>{{ $data.memo.results }}</div> -->
          <div class="p-wrapper">
            <h1 class="c-title">「{{$auth.user.name}}」さんのメモ一覧</h1>
            <div class="p-memoTable">
              <table>
                <thead>
                  <tr>
                    <th>タイトル</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr v-for="memo in $data.memo.results" :key="memo.memo_id">
                    <td>{{memo.memo_title}}</td>
                    <td>{{memo.memo_detail}}</td>
                    <td class="-delete">
                      <button @click="deleteMemo()">
                        <span></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav>
              <nuxt-link to="/createMemo">新規メモ作成</nuxt-link>
            </nav>
          </div>
          <button @click="$auth.logout()">ログアウト</button>
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
        memo_title: '',
        memo_detail: '',
      }
    }
  },
  methods: {
    createMemo(){
      this.$axios.post('/memo/register', this.memo)
      .then((res: any,) => {
      })
    },
    deleteMemo(){
      alert("削除ボタンをクリックしました");
    },

  },
  async mounted() {
    const { data } = await this.$axios.get('/auth/memo')
    this.memo = data
    },
  components: { RouterbackButton }
});
</script>