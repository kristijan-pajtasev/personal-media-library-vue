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
    getBookById: (store) => (id) => {
      return store.books.find(book => book.id === id)
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
      console.log(payload.user)
      return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book.json?auth=${payload.user.idToken}`, {
          method: "post",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            title: payload.title,
            author: payload.author
          })
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
    deleteBook(context, payload) {
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