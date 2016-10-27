// LocalStorage JS plugin
import {STORAGE_KEY} from '../modules/notes';

export const hasLocalStorage = () => {
    const test = 'test';

    try {
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);

        return true;
    } catch (e) {
    }

    return false;
};

const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes.notes));
    });
};

export default hasLocalStorage() ?
    [localStoragePlugin] :
    [];
