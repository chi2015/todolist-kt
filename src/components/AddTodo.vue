<template>
    <div class="add-todo">
        <div class="input-block">
            <input type="text" placeholder="Введите название" :value="currentTitle" ref="todoTitle" @input="updateTitle()"/>
            <button class="icon-btn done" v-if="current && !current.getDone" @click="setDone"></button>
            <button class="icon-btn delete" v-if="current" @click="del"></button>
        </div>
        
        <div class="btns-block">
            <button class="btn save" @click="save">{{current ? 'Сохранить' : 'Добавить'}}</button>
            <button class="btn cancel" v-if="current" @click="cancel">Отмена</button>
        </div>
       
        
    </div>
</template>

<script>
import db from '../db'

export default {
    name: 'AddTodo',
    data() {
        return {
           title: ''
        }
    },
    props: ['value'],
    
    computed: {
        current() {
            this.$store.dispatch("setCurrentId", this.$route.params.id)
            return this.$store.getters.CURRENT_TODO
        },
        currentTitle() {
            const todo = this.$store.getters.CURRENT_TODO
            return todo ? todo.getTitle : ''
        }
    },
    methods: {
        updateTitle() {
            this.title = this.$refs.todoTitle.value
        },
        save() {
            if (this.current) {
                db.collection("todos").doc(this.current.getDocId).set({
                    title: this.title,
                    done: this.current.getDone
                })
                .then(() => {
                     this.$store.dispatch("editTodo", {id: this.current.getId, title: this.title})
                     this.$router.push("/" + this.$store.getters.PAGE)
                     this.reset()
                })
            } else {
                db.collection("todos").add({
                    title: this.title,
                    done: false
                })
                .then((doc) => {
                    this.$store.dispatch("addTodo", { title: this.title, done: false, doc_id: doc.id})
                    this.$store.dispatch("setItems", this.$store.getters.TODOS.length)
                    this.reset()
                })                
                if (this.$store.getters.PAGE !== 1) this.$router.push("/1")
            }
            
        },
        setDone() {
            db.collection("todos").doc(this.current.getDocId).set({
                    title: this.current.getTitle,
                    done: true
                })
                .then(() => {
                     this.$store.dispatch("setDone", this.current.getId)
                })
        },
        del() {
                db.collection("todos").doc(this.current.getDocId).delete().then(() => {
                this.$store.dispatch("deleteTodo", this.current.getId)
                this.$store.dispatch("setItems", this.$store.getters.TODOS.length)
                this.$router.push("/1")
            })
        },
        reset() {
            
            this.$store.dispatch("setCurrentId", 0)
            this.$refs.todoTitle.value = ''
        },
        cancel() {
           this.$router.push("/" + this.$store.getters.PAGE)
        }
    }
}
</script>

<style scoped>
  .add-todo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 80%;
  }
  .add-todo input {
      height: 25px;
      font-size: 18px;
      border-radius: 3px;
  }
  .input-block {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;
  }
  .btn {
      color: white;
      border-radius: 2px;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
  }
  .btn:focus {
        outline:0;
   }
  .save {
      background-color:#8ea885;
  }
  .cancel {
      background-color: #8e3724;
  }
</style>