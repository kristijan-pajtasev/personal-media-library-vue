import './assets/main.css'

import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import BooksStore from './store/book';
import UserStore from './store/user';

const store = createStore({
    modules: {
        book: BooksStore,
        user: UserStore
    }
});

const app = createApp(App)

app.use(router)
app.use(store);

app.mount('#app')
