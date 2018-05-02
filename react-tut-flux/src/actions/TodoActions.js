import dispatcher from "../dispatcher";

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text,
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id,
  });
}

export function reloadTodos() {
//  axios("http://someurl.com/somedataendpoint").then(() => {
//    console.log("got the data!", data);
//  });

  dispatcher.dispatch({type: "FETCH_TODOS" });
//let timed = setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
      {
        id: 83438234324,
        text: "Go Shopping Again",
        complete: false
      },
      {
        id: 6747839243243,
        text: "Hug Wife",
        complete: true
      }
    ]});

//  }, 1000);
}
