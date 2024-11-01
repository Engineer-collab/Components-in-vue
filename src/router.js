
import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path:'/',redirect:'/teams'},
        {
            name: 'team', path: '/teams', 
            meta:{needsAuth:true},
            components: { default: TeamsList, footer: TeamsFooter }, alias: '/', children: [

                { name: 'team-members', path: ':apniTeam', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users', components: { default: UsersList, footer: UsersFooter },
            beforeEnter(to, from, next) {
                console.log('User before enter')
                console.log(to, from)
                next()
            }
        },


        { path: '/:notFound(.*)', component: NotFound },

    ],
    linkActiveClass: "active",
    scrollBehavior(_to, _from, savedPosition) {
        // console.log(to,from,savedPosition)
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }
    }
})
router.beforeEach(function (to, from, next) {
    console.log('before Each Guard at main.js')
    console.log(to, from)
    if(to.meta.needsAuth){
        next()
    }else{
        next()
    }
    
})
router.afterEach(function (to, from) {
    console.log('after each guard at main.js')
    console.log(to, from)
})

export default router;