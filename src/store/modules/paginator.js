const state = {
    items: 0,
    perPage: 10,
    page: 1
}

const getters = {
    PAGE: state => {
        return state.page
    },
    PER_PAGE: state => {
        return state.perPage
    },
    PAGES_COUNT: state => {
        return Math.ceil(state.items / state.perPage)
    }
}

const mutations = {
    SET_ITEMS: (state, items) => {
        state.items = items
    },
    SET_PAGE: (state, page) => {
        state.page = page
    }
}

const actions = {
    setItems({commit}, items) {
        commit('SET_ITEMS', items)
    },
    setPage({commit}, page) {
        commit('SET_PAGE', page)
    },
    firstPage({commit}) {
        commit('SET_PAGE', 1)
    },
    lastPage({commit}) {
        commit('SET_PAGE', getters.PAGES_COUNT(state))
    },
    nextPage({commit}) {
        commit('SET_PAGE', state.page + 1)
    },
    prevPage({commit}) {
        commit('SET_PAGE', state.page - 1)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

