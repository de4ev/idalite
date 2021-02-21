export const state = () => ({
    isPanelOpen: false,
    cart: [],
    sortingOptions: [
        {name: 'цене', value: 'price'},
        {name: 'популярности', value: 'rating'},
    ],
    sortBy: {name: 'цене', value: 'price'}
  })
export const getters = {
    cartCount: (state) => state.cart.length,
    cartItemsIds: (state) => state.cart.map(item => item.id),
}
export const mutations = {
    initCart: (state, cartItems) => {state.cart = cartItems},
    togglePanel: (state, value) => {state.isPanelOpen = value},
    addToCart: (state, product) => {state.cart.push(product)},
    removeFromCart: (state, index) => {state.cart.splice(index, 1)},
    sendOrder: (state) => {state.cart = []},
    changeSortingParameter: (state, parameter) => {state.sortBy = parameter},
}
export const actions = {
    initCart( {commit}, cartItems) {
        if (cartItems) {
            commit('initCart', cartItems)
        }
    },
    togglePanel( {commit}, value ) {
        document.body.classList.toggle('panel-open')
        commit('togglePanel', value)
    },
    changeSortingParameter({ commit }, parameter) {
        commit('changeSortingParameter', parameter)
    },
    toggleBuying( { commit, state }, product) {
        const index = state.cart.map(item => item.id).indexOf(product.id)
        if (index >= 0) {
            commit('removeFromCart', index)
        } else {
            commit('addToCart', product)
        }
    },
    sendOrder( { commit }, order) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
                commit('sendOrder', order)
            }, 3000);
        });
    },
}