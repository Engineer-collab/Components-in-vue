
import { createRouter ,createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
    history:createWebHistory(),
    routes : [
        // {path:'/',redirect:'/teams'},
        {name:'team',path:'/teams',components:{default:TeamsList,footer:TeamsFooter},alias:'/',children:[
       
            {name : 'team-members' ,path:':apniTeam',component:TeamMembers,props:true},
        ]},
        {path:'/users',components:{default:UsersList,footer:UsersFooter}},
        
        {path:'/:notFound(.*)',component:NotFound},
        
    ],
    linkActiveClass:"active",
    scrollBehavior(_to,_from,savedPosition){
        // console.log(to,from,savedPosition)
        if(savedPosition){
            return savedPosition;
        }
        return { left:0,top:0}
    }
})
router.beforeEach(function(to,from,next) {
    console.log(to,from)
    next()  ;  
})


const app = createApp(App)
app.use(router);
app.mount('#app');
