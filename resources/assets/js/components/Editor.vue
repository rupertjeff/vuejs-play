<template>
    <div class="editor">
        <label for="title" class="sr-only">Title</label>
        <input
            type="text"
            id="title"
            name="title"
            class="form-control"
            placeholder="Title"
            :value="activeNoteTitle"
            @input="editNoteTitle"
        />
        <label for="content" class="sr-only">Content</label>
        <textarea
            id="content"
            name="content"
            class="form-control"
            placeholder="Content"
            :value="activeNoteContent"
            @input="editNoteContent"
        ></textarea>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'activeNote'
            ]),
            activeNoteTitle () {
                return this.activeNote.title;
            },
            activeNoteContent () {
                return this.activeNote.content;
            }
        },
        methods: {
            ...mapActions([
                'editNoteTitle',
                'editNoteContent'
            ])
        }
    };
</script>
