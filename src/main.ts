import './assets/main.css'

import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import BooksStore from './store/book';

const store = createStore({
    modules: {
        books: BooksStore
    }
});

const app = createApp(App)

app.use(router)
app.use(store);

app.mount('#app')
