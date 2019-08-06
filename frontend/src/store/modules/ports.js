/* eslint-disable */

const state = {
    servicePorts: 10,
};

const getters  = {
    __end () {
    }
};

const mutations = {
    servicePorts ( state, payload )  {
        state.servicePorts  = payload
    },
    end () {}
};

const actions = {
    end () {}
};

export default {
    namespaced : true,
    state,
    getters,
    actions,
    mutations
}
