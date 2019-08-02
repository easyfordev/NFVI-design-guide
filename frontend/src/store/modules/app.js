/* eslint-disable */

const state = {
    hid: 'hello',
    serverId: '',
    serverCount: 0,
    cpuId: '',
    cpuCount: 0,
};

const getters  = {
    __end () {
    }
};

const mutations = {
    serverId ( state, payload )  {
        state.serverId  = payload
    },
    serverCount ( state, payload )  {
        state.serverCount  = payload
    },
    cpuId ( state, payload )  {
        state.cpuId  = payload
    },
    cpuCount ( state, payload )  {
        state.cpuCount  = payload
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
