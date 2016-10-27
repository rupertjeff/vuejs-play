<template>
    <div>
        <p>{{ count }}</p>
        <div>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'count'
            ])
        },
        methods: {
            ...mapActions([
                'increment',
                'decrement'
            ])
        }
    };
</script>
