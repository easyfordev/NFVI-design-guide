import Vue from 'vue'
import Router from 'vue-router'
import TInputMain from '../components/InputPage/TInputMain'
import TResultMain from '../components/ResultPage/TResultMain'
import TResultSection2 from '../components/ResultPage/TResultSection2'
import TResultSection3 from '../components/ResultPage/TResultSection3'
import TResultSection4 from '../components/ResultPage/TResultSection4'
import TAdminMain from '../components/AdminPage/TAdminMain'
import HistoryMain from '../components/HistoryPage/HistoryMain'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: TInputMain,
            name: 'TInputMain'
        },
        {
            path: '/result/amf0011',
            component: TResultMain,
            name: 'TResultMain',
            props: true,
            children: [
                {
                    path: 'estimation',
                    name: 'TResultSection2',
                    component: TResultSection2,
                    props: true
                },
                {
                    path: 'power',
                    name: 'TResultSection3',
                    component: TResultSection3,
                    props: true
                },
                {
                    path: 'network',
                    name: 'TResultSection4',
                    component: TResultSection4,
                    props: true
                }
            ]
        },
        {
            path: '/admin',
            component: TAdminMain,
            name: 'TAdminMain',
            props: true
        },
        {
            path: '/history',
            component: HistoryMain,
            name: 'HistoryMain'
        }
    ]
})
