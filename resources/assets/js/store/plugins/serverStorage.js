// Server API based storage

import Vue from 'vue';
import store from '../../store';
import * as types from '../types/notes';
import {hasLocalStorage} from './localStorage';

// API-based solution
export const syncChangesToServer = () => {
    // If a server response fails due to the server being down
    // save mutation info (name and payload) in localStorage.
    // When server is back up (polling?), re-run mutations
    // so that the transactions get back to the server as
    // needed.
};

export const loadNotesFromServer = () => {
    Vue.http.get(window.Laravel.routes.notes).then(
        (response) => {
            store.dispatch('loadNotes', response.body.data);
        },
        (response) => {}
    );
};

const serverApiPlugin = store => {
    store.subscribe((mutation, state) => {
        switch (mutation.type) {
            case types.CLEAR:
                break;

            case types.CREATE:
                Vue.http.post(window.Laravel.routes.notes, state.notes.activeNote).then(
                    (response) => {
                        console.log(response);
                    },
                    (response) => {
                        console.log(response);
                    }
                );
                break;

            case types.EDIT_TITLE:
                Vue.http.put(window.Laravel.routes.notes, state.notes.activeNote).then(
                    (response) => {},
                    (response) => {}
                );
                break;

            case types.EDIT_CONTENT:
                console.log(mutation);
                break;

            case types.DELETE:
                console.log(mutation);
                break;
        }
    });
};

// WebSocket-based solution

export default [serverApiPlugin];
