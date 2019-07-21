import Vue from 'vue'
import Router from 'vue-router'
import TInputMain from '../components/InputPage/TInputMain'
import TResultMain from '../components/ResultPage/TResultMain'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: TInputMain,
            name: 'TInputMain'
        },
        {
            path: '/result',
            component: TResultMain,
            name: 'TResultMain'
        }
    ]
})
