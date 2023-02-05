<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1 class="c-title">メモ編集</h1>
        <!-- <h1 class="c-title">「{{$auth.user.name}}」さんのメモ一覧</h1>
        <h1 class="c-title">「{{$auth.user.id}}」さんのメモ一覧</h1> -->
        <!-- <form @submit.prevent="createMemo"> -->
        <form @submit.prevent="editMemo">
          <div class="p-memoForm">
            <input type="hidden" v-model="memo.memo_id">
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
                <label for="memo_detail">メモ詳細</label>
              </dt>
              <dd>
                <input type="text" v-model="memo.memo_detail"/>
              </dd>
            </dl>
            <button type="submit">メモ更新</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import axios from 'axios'

export default Vue.extend({
  // ログイン後にのみ、このページに入れるようにする
  middleware: "auth",
  data () {
    return {
      memo: {
        memo_id: '',
        memo_title: '',
        memo_detail: '',
      },
    }
  },
  // async asyncData ({ params }) {
  //   console.log('params.id')
  //   console.log(params.id)
  //   try{
  //     const { data } = await axios.get(`http://localhost:5000/memo/${params.id}`, {
  //       headers: {
  //         authorization: 'Bearer ' + this.$auth.getToken()
  //         // authorization: 'Bearer ' + this.$auth
  //       }
  //     })
  //     console.log(data[0])
  //     return {
  //       memo: data[0]
  //     }
  //   }
  //   catch(error){
  //     console.error(error)
  //   }
  // },
  
  async mounted() {
    const id: any = this.$route.params.id;
    // const { data } = await this.$axios.get('/memo/getOneMemo${params.id}', id)
    // const { data } = await this.$axios.get(`/memo/${id}`)
    // const { data } = await this.$axios.post('/memo/getOneMemo', {id})
    // this.memo = data
    // return{
    //   memo: data[0]
    // }
    try {
      const { data } = await this.$axios.get(`/memo/${id}`)
      this.memo = data.results[0]
    } 
    catch (error) {
      console.error(error)
    }
  },
  methods: {
    editMemo(){
      console.log(this.memo)
      this.$axios.post('/memo/editMemo', this.memo)
      .then((res: any) => {
        this.$nuxt.$router.push('/mypage')
      })
    },
  },
});
</script>