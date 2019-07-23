import Vue from 'vue'
import Router from 'vue-router'
import TInputMain from '../components/InputPage/TInputMain'
import TResultMain from '../components/ResultPage/TResultMain'
import TResultSection2 from '../components/ResultPage/TResultSection2'

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
            name: 'TResultMain',
            children: [
                {
                    path: 'rack',
                    name: 'TResultSection2',
                    component: TResultSection2,
                    props: true
                }
            ]
        }
    ]
})
