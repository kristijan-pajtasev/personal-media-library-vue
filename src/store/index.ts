import {createStore, Store} from "vuex";
import BooksStore from './book';
import UserStore from './user';
import VinylStore from './vinyls';

export const store = createStore<Store<{}>>({
    modules: {
        book: BooksStore,
        user: UserStore,
        vinyl: VinylStore
    }
});