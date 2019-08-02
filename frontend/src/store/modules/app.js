/* eslint-disable */

const state = {
    hid: 'hello',
    serverId: '',
    serverCount: 0,
    cpuId: '',
    cpuCount: 0,
    memTarget: 0,
    memoryId: '',
    memoryCount: 0
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
    memTarget ( state, payload )  {
        state.memTarget  = payload
    },
    memoryId ( state, payload )  {
        state.memoryId  = payload
    },
    memoryCount ( state, payload )  {
        state.memoryCount  = payload
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
