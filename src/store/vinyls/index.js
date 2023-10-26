const VinylStore = {
  namespaced: true,
  state() {
    return {}
  },
  getters: {
    getAllVinyls(store) {
      return store.vinyls
    },
    isLoading(store) {
      return store.loading
    },
  },
  mutations: {
    setAllVinyls(context, payload) {
      context.vinyls = payload;
    },
    setIsLoadingVinyls(context, payload) {
      context.loading = payload;
    }
  },
  actions: {
    getVinyls(context) {
      context.commit("setIsLoadingVinyls", true);
      fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/vinyl.json`, {
          method: "get",
        }
      ).then(
        async (res) => {
          const data = await res.json();
          if (data === null) {
            context.commit("setAllVinyls", null)
          } else {
            const vinyls = Object.entries(data).map(([key, value]) => {
              return {
                ...value,
                id: key
              }
            })
            context.commit("setAllVinyls", vinyls)
          }
          context.commit("setIsLoadingVinyls", false);
        }
      )
    },
    addVinyl(context, payload) {
      console.log(payload.user)
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/vinyl.json?auth=${payload.user.idToken}`, {
          method: "post",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            album: payload.album,
            artist: payload.artist
          })
        }
      )
    },
    deleteVinyl(context, payload) {
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/vinyl/${payload.vinylId}.json?auth=${payload.user.idToken}`, {
          method: "delete",
          headers: {
            "Content-Type": 'application/json'
          }
        }
      ).then(
        async (res) => {
          console.log("vinyl deleted response")
          // const data = await res.json();
          // if (data === null) {
          //   context.commit("setAllVinyls", null)
          // } else {
          //   const vinyls = Object.entries(data).map(([key, value]) => {
          //     return {
          //       ...value,
          //       id: key
          //     }
          //   })
          //   context.commit("setAllVinyls", vinyls)
          // }
          // context.commit("setIsLoadingVinyls", false);
        }
      )
    }
  }
}

export default VinylStore
