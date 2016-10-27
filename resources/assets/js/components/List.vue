<template>
    <ul id="note-list">
        <li v-for="note in notes" @click="openNote(note)">{{ note.title.trim() }}</li>
    </ul>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'notes'
            ])
        },
        methods: {
            ...mapActions([
                'openNote'
            ])
        }
    };
</script>
