<template>
    <div id="toolbar">
        <a @click="createNote">Add</a>
        <a @click="deleteNote">Delete</a>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        methods: {
            ...mapActions([
                'createNote',
                'deleteNote'
            ])
        }
    };
</script>
