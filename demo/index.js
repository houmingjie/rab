import 'babel-polyfill';

import React from 'react';
import rab, { connect,createModel, put, call} from '../index.js';
import { Router, Route } from '../router';
function stop(time) {
    return new Promise((res,rej)=>{
        setTimeout(function() {res();},2000);
    });
}
const app = rab();
// 2. Model
let count = createModel({
    namespace: 'count',
    state: {
        num:0,
        loading:false
    },
    reducers: {
        add(state) { return Object.assign({},state,{num:state.num + 1}) },
        minus(state) { return Object.assign({},state,{num:state.num - 1})  },
        asyncAdd(state,action) { return Object.assign({},state,{num:state.num + action.payload})  },
        asyncMinus(state,action) { return Object.assign({},state,{num:state.num + action.payload})  },
        asyncNewApi:{
            start(state,action){
                console.log('run start')
                return Object.assign({},state,{loading:true});
            },
            next(state,action){
                return Object.assign({},state,{num:state.num + action.payload})
            },
            throw(state,action){
                return Object.assign({},state,{num:state.num + action.payload})
            },
            finish(state,action){
                console.log('run finish')
                return Object.assign({},state,{loading:false});
            }
        }
    },
    actions:{
        async asyncAdd() {
            await stop();
            return 100;
        },
        async asyncMinus() {
            await stop();
            return -100;
        },
        async asyncNewApi() {
            await stop();
            return -100;
        }
    },
    subscriptions:{
        init({history, dispatch}){
            console.log('history')
            history.listen((location) => {
                console.log('init------------>',location)
            })
        }
    }
})
console.log(count,'count'.repeat(10));
app.addModel(count);

// 3. View
const App = connect(({ count }) => ({
    count
}))((props) => {
    console.log('render',props.count.loading,put)
    return (
        <div>
            <h2>{ props.count.num }</h2>
            <h2>{ !props.count.loading?'finish':'loading' }</h2>
            <button key="add" onClick={() => { props.dispatch({type: 'count.add' }); }}>+</button>
            <button key="minus" onClick={() => { props.dispatch({type: 'count.minus' }); }}>-</button>
            <button key="asyncadd" onClick={() => { props.dispatch(count.actions.asyncAdd()); }}>ASYNC ADD</button>
            <button key="asyncminus" onClick={() => { put({type: 'count.asyncMinus' }); }}>ASYNC Minus</button>
            <button key="asyncNewApi" onClick={() => {put({type: 'count.asyncNewApi' }); }}>asyncNewApi</button>
        </div>
    );
});

// 4. Router
app.router(({ history }) => {
    return (
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    );
});

// 5. Start
app.start('#demo_container');
