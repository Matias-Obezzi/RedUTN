import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/firebase.js')

Vue.use(Vuex)
let userFb = null;

// handle page reload
fb.auth.onAuthStateChanged(userFbTemp => {
    if (userFbTemp) {
        userFb = userFbTemp;
    }else{ 
        userFb = null;
    }
    store.commit('setFbUser', userFb)
    store.dispatch('setPublish');
    store.dispatch('setUsers');
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
        hiddenPublish: null,
        appInfo: null
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
            commit('setFbUser', null)
            commit('setUser', null)
            commit('setPublish', null)
            commit('setUsersList', null)
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
                        // id: doc.id
                        id: doc.data().id,
                        comments: doc.data().comments,
                        like: doc.data().like
                    }
                    publishArray.push(publish)
                })
        
                store.commit('setPublish', publishArray)
            })
        },
        setUsers(){
            // realtime updates from our posts collection
                fb.usersCollection.orderBy('id', 'desc').onSnapshot(querySnapshot => {

                    let usersArray = [];

                    querySnapshot.forEach(doc => {
                        let user = {
                            // uid: doc.uid,
                            id: doc.data().id,
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
                                all: doc.data().color,
                                bg: doc.data().color.split(" ")[0],
                                text: doc.data().color.split(" ")[1],
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
            state.fbUser = val
        },
        setUser(state, val) {
            state.user = val
        },
        setPublish(state, val){
            state.publish = val;
        },
        setHiddenPublish(state, val){
            if(val && state.hiddenPublish && !state.hiddenPublish.some(x => x.id === val.id)){
                state.hiddenPublish.unshift(val)
            }
        },
        setUsersList(state, val){
           state.usersList = val
        },
        setAppInfo(state, val){
            state.appInfo = val;
        }
    },
    filters: {
    }
})