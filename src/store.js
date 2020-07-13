import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/firebase.js')

Vue.use(Vuex)
let userFb = null;

// handle page reload
fb.auth.onAuthStateChanged(userFbTemp => {
    if (userFbTemp) {
        userFb = userFbTemp;
        store.commit('setFbUser', userFb)
        store.dispatch('setPublish');
        store.dispatch('setUsers');
        store.dispatch('setChats');
    }else{ 
        userFb = null;
        store.commit('setFbUser', userFb)
        store.dispatch('setPublish');
        store.dispatch('setUsers');
    }
})


function formatTime(timeStamp) {
    var today = new Date();
    var timeTemp = new Date(timeStamp * 1000);
    var diff = today.getTime() - timeTemp.getTime();
    if (diff / (1000 * 60 * 60 * 24 * 30 * 12) >= 1) {
      return "Hace " + Math.round(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + " año(s)";
    } else if (diff / (1000 * 60 * 60 * 24 * 30) >= 1) {
      return "Hace " + Math.round(diff / (1000 * 60 * 60 * 24 * 30)) + " mes(es)";
    } else if (diff / (1000 * 60 * 60 * 24) >= 1) {
      return  "Hace " + Math.round(diff / (1000 * 60 * 60 * 24)) + " dia(s)";
    } else if (diff / (1000 * 60 * 60) >= 1) {
      return  "Hace " + Math.round(diff / (1000 * 60 * 60 * 2)) + " hora(s)";
    } else if (diff / (1000 * 60) >= 1) {
      return  "Hace " + Math.round(diff / (1000 * 60)) + " minuto(s)";
    } else if (diff / 1000 >= 1) {
      return  "Hace " + Math.round(diff / 1000) + " segundo(s)";
    } else {
      return "Hace instantes";
    }
}

function getDate(timeStamp){
    if(timeStamp){
        var temp = new Date(timeStamp * 1000);
        return temp.getUTCDate() + "/" + temp.getUTCMonth() + "/" + temp.getUTCFullYear ()
    }
    return null
}

export const store = new Vuex.Store({
    state: {
        fbUser: null,
        user: null,
        usersList: null,
        publish: null,
        messages: null,
        news: null
    },
    actions: {
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.fbUser.uid).get().then(res => {
                commit('setUser', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        clearData({commit}){
            commit('setNews', null)
            commit('setFbUser', null)
            commit('setUser', null)
            commit('setPublish', null)
            commit('setChats', null)
            commit('setUsersList', null)
        },
        setChats(){
            fb.chatsCollection.onSnapshot(querySnapshot => {
                let chatArray = []
        
                querySnapshot.forEach(doc => {
                    let mesTemp = doc.data().messages.sort((a, b) => b.time - a.time);
                    let chat = {
                        title: doc.data().title?doc.data().title:null,
                        messages: mesTemp,
                        members: doc.data().members,
                        id: doc.data().id?doc.data().id:doc.id,
                        lastMessage: mesTemp[0].time
                    }
                    if(chat.members.indexOf(store.state.user.id)!=-1){
                        chatArray.push(chat)
                    }
                })
        
                store.commit('setChats', chatArray)
            })
        },
        setPublish(){
            // realtime updates from our posts collection
            fb.publishCollection.orderBy('time','desc').onSnapshot(querySnapshot => {
                let publishArray = []
        
                querySnapshot.forEach(doc => {
                    let publish = {
                        message: doc.data().message,
                        img: doc.data().img,
                        author: doc.data().author,
                        time: formatTime(doc.data().time.seconds),
                        id: doc.data().id?doc.data().id:doc.id,
                        comments: doc.data().comments,
                        like: doc.data().like
                    }
                    publishArray.push(publish)
                })
        
                store.commit('setPublish', publishArray)
            })
            fb.publishCollection.doc("admin-pin").get().then(function(data){
                store.commit('setNews', data.data());
            })
        },
        setUsers(){
            // realtime updates from our posts collection
            fb.usersCollection.orderBy('id', 'desc').onSnapshot(querySnapshot => {

                let usersArray = [];

                querySnapshot.forEach(doc => {
                    let user = {
                        // uid: doc.uid,
                        id: doc.data().id?doc.data().id:doc.id,
                        username: doc.data().username,
                        email: doc.data().email,
                        time: getDate(doc.data().time?doc.data().time.seconds:null), 
                        pubCount: doc.data().pubCount,
                        likes: doc.data().likes,
                        follows: doc.data().follows?doc.data().follows:null,
                        followers: doc.data().followers?doc.data().followers:null,
                        avatar: doc.data().avatar,
                        bio: doc.data().bio,
                        role: doc.data().role,
                        color: {
                            all: doc.data().color?doc.data().color : 'bg-light text-dark',
                            bg: doc.data().color?doc.data().color.split(" ")[0] : 'bg-light',
                            text: doc.data().color?doc.data().color.split(" ")[1] : 'text-dark',
                        }
                    };
                    usersArray.push(user)
                    if(userFb && user.email == userFb.email){
                        store.commit('setUser', user)
                    }
                })
                store.commit('setUsersList', usersArray)
            })
        }
    }, 
    mutations: {
        setFbUser(state, val) {
            Vue.set(state, 'fbUser', val )
        },
        setUser(state, val) {
            Vue.set(state, 'user', val )
        },
        setUsersList(state, val){
            Vue.set(state, 'usersList', val )
        },
        setPublish(state, val){
            Vue.set(state, 'publish', val )
        },
        setChats(state, val){
            Vue.set(state, 'messages', val )
        },
        setNews(state, val){
            Vue.set(state, 'news', val )
        },
    },
    filters: {
    }
})