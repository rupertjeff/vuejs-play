<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <div class="col-md-1">
                <action-bar></action-bar>
            </div>
            <div class="col-md-4">
                <list></list>
            </div>
            <div class="col-md-7">
                <editor></editor>
            </div>
        </div>
    </div>
</template>

<script>
    import ActionBar from './ActionBar.vue';
    import List from './List.vue';
    import Editor from './Editor.vue';

    export default {
        components: {
            ActionBar,
            List,
            Editor
        }
    }
</script>
