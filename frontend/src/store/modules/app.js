/* eslint-disable */

const state = {
    hid: 'hello',
    server: {
        vid: '',
        pid: '',
        count: 0
    },
    cpu: {
        vid: '',
        pid: '',
        count: 0
    },
    memory: {
        id: '',
        count: 0
    },
    disk: {
        id: '',
        count: 0
    },
    nic: {
        id: '',
        count: 0
    },
};

const getters  = {
    __end () {
    }
};

const mutations = {
    hid ( state, payload )  {
        state.hid  = payload
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
