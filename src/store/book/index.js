const BookStore = {
  namespaced: true,
  state() {
    return {}
  },
  getters: {
    getAllBooks(store) {
      return store.books
    },
    isLoading(store) {
      return store.loading
    },
  },
  mutations: {
    setAllBooks(context, payload) {
      context.books = payload;
    },
    setIsLoadingBooks(context, payload) {
      context.loading = payload;
    }
  },
  actions: {
    getBooks(context) {
      context.commit("setIsLoadingBooks", true);
      fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book.json`, {
          method: "get",
        }
      ).then(
        async (res) => {
          const data = await res.json();
          if (data === null) {
            context.commit("setAllBooks", null)
          } else {
            const books = Object.entries(data).map(([key, value]) => {
              return {
                ...value,
                id: key
              }
            })
            context.commit("setAllBooks", books)
          }
          context.commit("setIsLoadingBooks", false);
        }
      )
    },
    addBook(context, payload) {
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book.json`, {
          method: "post",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(payload)
        }
      ).then(
        async (res) => {
          const data = await res.json();
          if (data === null) {
            context.commit("setAllBooks", null)
          } else {
            const books = Object.entries(data).map(([key, value]) => {
              return {
                ...value,
                id: key
              }
            })
            context.commit("setAllBooks", books)
          }
          context.commit("setIsLoadingBooks", false);
        }
      )
    },
    deleteBook(context, bookId) {
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book/${bookId}.json`, {
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
          //   context.commit("setAllBooks", null)
          // } else {
          //   const books = Object.entries(data).map(([key, value]) => {
          //     return {
          //       ...value,
          //       id: key
          //     }
          //   })
          //   context.commit("setAllBooks", books)
          // }
          // context.commit("setIsLoadingBooks", false);
        }
      )
    }
  }
}

export default BookStore