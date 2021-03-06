import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore, combineReducers } from "redux";

/////////////////////////////////////////
//
// reducer
//

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";

function todoReducer(state = [], action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}

function applyAddTodo(state, action) {
  const todo = Object.assign({}, action.todo, { completed: false });
  return state.concat(todo);
}

function applyToggleTodo(state, action) {
  return state.map(
    todo =>
      todo.id === action.todo.id
        ? Object.assign({}, todo, { completed: !todo.completed })
        : todo
  );
}

////////////////////

const FILTER_SET = "FILTER_SET";

function filterReducer(state = "SHOW_ALL", action) {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
}

function applySetFilter(state, action) {
  return action.filter;
}

////////////////////

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
});

/////////////////////////////////////////

const store = createStore(rootReducer);

console.log("initial state:");
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("store update, current state:");
  console.log(store.getState());
});

/////////////////////////////////////////
//
// dispatch actions using action creators
//

//actions creators
function doAddTodo(id, name) {
  return { type: TODO_ADD, todo: { id, name } };
}

function doToggleTodo(id) {
  return { type: TODO_TOGGLE, todo: { id } };
}

////////////////////

function doSetFilter(filter) {
  return { type: FILTER_SET, filter };
}

store.dispatch(doAddTodo("0", "learn redux"));
store.dispatch(doAddTodo("1", "learn mobx"));
store.dispatch(doAddTodo("2", "finish final project"));
store.dispatch(doToggleTodo("0"));
store.dispatch(doToggleTodo("1"));
store.dispatch(doSetFilter("COMPLETED"));
store.dispatch(doSetFilter("DONE"));
store.dispatch(doSetFilter("PENDING"));
store.dispatch(doSetFilter("SHOW_ALL"));

/////////////////////////////////////////

unsubscribe();

ReactDOM.render(<App />, document.getElementById("root"));
