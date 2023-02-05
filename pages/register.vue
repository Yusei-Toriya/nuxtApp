<template>
  <section class="l-sec">
    <div class="l-sec_in">
      <div class="p-memoWrapper">
        <h1>ユーザ登録</h1>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="user.name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="user.email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="user.password">
          </div>
          <button type="submit">登録</button>
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
          user:{
            name:'',
            email:'',
            password:''
          }
        }
      },
      methods:{
        registerUser(){
          this.$axios.post('/auth/register',this.user)
          .then((response: any) => {
            this.$auth.loginWith('local',{
              data: this.user
            })
            this.$nuxt.$router.push('/mypage')
          })
        },
      },
      components: { RouterbackButton }
    });
</script>