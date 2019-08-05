/* eslint-disable */

const state = {
    serverId: '',
    serverCount: 0,
    cpuId: '',
    cpuCount: 0,
    memTarget: 0,
    memoryId: '',
    memoryCount: 0,
    serviceSwitchId: '',
    serviceSwitchCount: 0,
    mgmtSwitchId: '',
    mgmtSwitchCount: 0,
    storageId: '',
    storageCount: 0
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
    serviceSwitchCount ( state, payload )  {
        state.serviceSwitchCount  = payload
    },
    mgmtSwitchCount ( state, payload )  {
        state.mgmtSwitchCount  = payload
    },
    storageCount ( state, payload )  {
        state.storageCount  = payload
    },
    serviceSwitchId ( state, payload )  {
        state.serviceSwitchId  = payload
    },
    mgmtSwitchId ( state, payload )  {
        state.mgmtSwitchId  = payload
    },
    storageId ( state, payload )  {
        state.storageId  = payload
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
