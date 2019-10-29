<template>
    <div v-bind:class="{ is_done: todoItem.getDone, todo: true }" >
        <div class="title">{{ index }}) {{ todoItem.getTitle }}</div>
        <div class="button-group">
            <button class="icon-btn done" v-if="!todoItem.getDone" @click="setDone"></button>
            <button class="icon-btn edit" @click="edit"></button>
            <button class="icon-btn delete" @click="del"></button>
        </div>
    </div>
</template>

<script>
import db from '../db'

export default {
    name: 'Todo',
    props: ['todoItem', 'index'],
    methods: {
        edit() {
            this.$router.push("/edit/" + this.todoItem.getId)
        },
        setDone() {
            db.collection("todos").doc(this.todoItem.getDocId).set({
                    title: this.todoItem.getTitle,
                    done: true
                })
                .then(() => {
                     this.$store.dispatch("setDone", this.todoItem.getId)
                })
        },
        del() {
            db.collection("todos").doc(this.todoItem.getDocId).delete().then(() => {
                this.$store.dispatch("deleteTodo", this.todoItem.getId)
                this.$store.dispatch("setItems", this.$store.getters.TODOS.length)
            })
        }
    }
}
</script>

<style scoped>
    .todo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        font-size: 16px;
        text-align: left;
        border-radius: 2px;
        height: 25px;
        line-height: 25px; 
        margin: 5px;
        padding-left: 7px;
        width: 100%;
    }
    .todo .title {
        width: 160px;
        overflow-x: hidden;
        white-space: nowrap;
    }
    .todo .button-group {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-right: 7px;
    }
    .todo.is_done {
        background-color: greenyellow;
    }
</style>