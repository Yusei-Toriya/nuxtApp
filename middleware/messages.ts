export default function ({ store, app }) {
  app.$axios.onError(error => {
    if (error.response) {
      const message = error.response.data.message || error.response.statusText
      store.commit('setMessage', message)
      
      const isSuccess = error.response.data.isSuccess || error.response.statusText
      store.commit('setIsSuccess', isSuccess)
      
      const isShow = error.response.data.isShow || error.response.statusText
      store.commit('setIsShow', isShow)
    }
    else {
      store.commit('setMessage', '通信エラーが発生しました')
    }
  })

  app.$axios.onRequest(() => {
    setTimeout(() => {
      store.commit('clearMessage')
    }, 3000);
  })
}