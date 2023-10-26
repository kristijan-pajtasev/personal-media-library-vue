const UserStore = {
  namespaced: true,
  state() {
    return {
      user: {}
    }
  },
  getters: {
    getUserData: (store) => () => {
      return store.user
    }
  },
  mutations: {
    setUserData(context, payload) {
      context.user = payload;
    }
  },
  actions: {
    logIn(context, payload) {
      console.log("signUp action", payload)
      return fetch(`${import.meta.env.VITE_FIREBASE_LOG_IN_AUTH_URL}${import.meta.env.VITE_FIREBASE_API_KEY}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }).then(
        async res => {
          const data = await res.json();
          console.log(data)
          window.sessionStorage.setItem("UserData", JSON.stringify(data));
          context.commit("setUserData", data)
          return data;
        }
      )
    },
    setUserData(context, payload) {
      context.commit("setUserData", payload);
    }
  }
}

export default UserStore