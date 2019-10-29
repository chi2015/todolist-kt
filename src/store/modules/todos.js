class Todo {
    constructor(id, title, done, doc_id) {
        this.id = id
        this.title = title
        this.done = done,
        this.doc_id = doc_id
    }

    get getId() {
        return this.id
    }

    get getDocId() {
        return this.doc_id
    }

    get getTitle() {
        return this.title
    }

    get getDone() {
        return this.done
    }

    setDone() {
        this.done = true
    }

    setTitle(title) {
        this.title = title
    }

}

const state = {
    todos: [],
    MAX_ID: 0,
    CURRENT_ID: 0,
    DB_LOADED: false
}

const getters = {
    TODOS: state => {
        return state.todos
    },
    CURRENT_TODO: state => {
        return state.CURRENT_ID > 0 && state.todos.find(todo => todo.getId == state.CURRENT_ID)
    },
    DB_LOADED: state => {
        return state.DB_LOADED
    }
}

const mutations = {
    ADD_TODO: (state, params) => {
        state.MAX_ID++
        const title = params.title || 'Задача ' + state.MAX_ID
        const done = params.done || false
        const doc_id = params.doc_id
        state.todos.push(new Todo(state.MAX_ID, title, done, doc_id))
    },
    EDIT_TODO: (state, params) => {
        let todo = state.todos.find(todo => todo.getId == params.id)
        if (todo) todo.setTitle(params.title)
    },
    SET_DONE: (state, id)  => {
        let todo = state.todos.find(todo => todo.getId == id)
        if (todo) todo.setDone()
    },
    DELETE_TODO: (state, id)  => {
        state.todos.splice(state.todos.findIndex(todo => todo.getId == id), 1)
    },
    SET_CURRENT_ID: (state, id) => {
        state.CURRENT_ID = id
    },
    DB_LOADED: (state) => {
        state.DB_LOADED = true
    }
}

const actions = {
    init({commit}) {
        for (let i=0; i<30; i++)
            commit('ADD_TODO', 'Задача ' + (i + 1));
    },
    addTodo({commit}, title) {
        commit('ADD_TODO', title)
    },
    editTodo({commit}, params) {
        commit('EDIT_TODO', params)
    },
    setDone({commit}, id) {
        commit('SET_DONE', id);
    },
    deleteTodo({commit}, id) {
        commit('DELETE_TODO', id)
    },
    setCurrentId({commit}, id) {
        commit("SET_CURRENT_ID", id)
    },
    dbLoaded({commit}) {
        commit('DB_LOADED')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}