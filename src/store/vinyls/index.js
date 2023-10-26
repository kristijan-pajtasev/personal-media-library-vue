const VinylStore = {
  namespaced: true,
  state() {
    return {}
  },
  getters: {
    getAllVinyls(store) {
      return store.books
    },
    isLoading(store) {
      return store.loading
    },
  },
  mutations: {
    setAllVinyls(context, payload) {
      context.books = payload;
    },
    setIsLoadingVinyls(context, payload) {
      context.loading = payload;
    }
  },
  actions: {
    getVinyls(context) {
      context.commit("setIsLoadingVinyls", true);
      fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book.json`, {
          method: "get",
        }
      ).then(
        async (res) => {
          const data = await res.json();
          if (data === null) {
            context.commit("setAllVinyls", null)
          } else {
            const books = Object.entries(data).map(([key, value]) => {
              return {
                ...value,
                id: key
              }
            })
            context.commit("setAllVinyls", books)
          }
          context.commit("setIsLoadingVinyls", false);
        }
      )
    },
    addVinyl(context, payload) {
      console.log(payload.user)
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book.json?auth=${payload.user.idToken}`, {
          method: "post",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            album: payload.album,
            artist: payload.artist
          })
        }
      ).then(
        async (res) => {
          const data = await res.json();
          if (data === null) {
            context.commit("setAllVinyls", null)
          } else {
            const books = Object.entries(data).map(([key, value]) => {
              return {
                ...value,
                id: key
              }
            })
            context.commit("setAllVinyls", books)
          }
          context.commit("setIsLoadingVinyls", false);
        }
      )
    },
    deleteVinyl(context, payload) {
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book/${payload.bookId}.json?auth=${payload.user.idToken}`, {
          method: "delete",
          headers: {
            "Content-Type": 'application/json'
          }
        }
      ).then(
        async (res) => {
          console.log("book deleted response")
          // const data = await res.json();
          // if (data === null) {
          //   context.commit("setAllVinyls", null)
          // } else {
          //   const books = Object.entries(data).map(([key, value]) => {
          //     return {
          //       ...value,
          //       id: key
          //     }
          //   })
          //   context.commit("setAllVinyls", books)
          // }
          // context.commit("setIsLoadingVinyls", false);
        }
      )
    }
  }
}

export default VinylStore
