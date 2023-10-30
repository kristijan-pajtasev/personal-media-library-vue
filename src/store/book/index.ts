import { type Module} from 'vuex';

interface BookState {
    books?: Array<{
        id: string
    }>,
    loading?: boolean
}

const BookStore: Module<BookState, {}> = {
    namespaced: true,
    state() {
        return {}
    },
    getters: {
        getAllBooks(store: BookState) {
            return store.books
        },
        isLoading(store) {
            return store.loading
        },
        getBookById: (store: BookState) => (id: string) => {
            if (!store.books) return null;
            return store.books.find(book => book.id === id)
        },
    },
    mutations: {
        setAllBooks(context: BookState, payload) {
            context.books = payload;
        },
        setIsLoadingBooks(context: BookState, payload) {
            context.loading = payload;
        }
    },
    actions: {
        getBooks(context) {
            context.commit("setIsLoadingBooks", true);
            return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book.json`, {
                    method: "get",
                }
            ).then(
                async (res) => {
                    const data: null|{string: {author: string, title: string}} = await res.json();
                    if (data === null) {
                        context.commit("setAllBooks", null)
                    } else {
                        const books = Object.entries(data).map(([key, value]) => {
                            return {
                                author: value.author,
                                title: value.title,
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
            )
        },
        editBook(context, payload) {
            console.log(payload.user)
            return fetch(`${import.meta.env.VITE_FIREBASE_DB_URL}/book/${payload.id}.json?auth=${payload.user.idToken}`, {
                    method: "put",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        title: payload.title,
                        author: payload.author
                    })
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