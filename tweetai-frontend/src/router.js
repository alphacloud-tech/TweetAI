import { createRouter, createWebHistory } from 'vue-router';
// import AutobotCount from './components/AutobotCount.vue';
import AutobotList from './components/AutobotList.vue';
import SinglePost from './components/SinglePost.vue';


// const routes = [
//     { path: '/', component: AutobotCount },
//     { path: '/about', component: AutobotList },
// ];


const routes = [
    // { path: '/', component: AutobotCount },  // Route to AutobotCount
    { path: '/', component: AutobotList }, // Route to AutobotList
    { path: '/posts/:id', name: 'SinglePost', component: SinglePost } 
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;