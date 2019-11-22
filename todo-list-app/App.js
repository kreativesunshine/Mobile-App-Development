import React from 'react';
import { Platform, StyleSheet, AsyncStorage, View, FlatList } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';

export default class App extends React.Component {
  constructor () {
    super();

    this.state = {
      todoInput: '',
      todos: [
        { id: 0, title: 'Take out the trash', done: false },
        { id: 1, title: 'Cook dinner', done: false }
      ]
    }
  }

  saveData(){
    AsyncStorage.setItem("todoList", JSON.stringify(this.state.todos));
  }

  async getData(){
    try {
      let todoListString = await AsyncStorage.getItem("todoList"); 
      let todoList = JSON.parse(todoListString);
      this.setState({todos: todoList})
    } 
    catch {
      alert(error);
    }
  }

  addNewTodo () {
    let todos = this.state.todos;

    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos: todos,
      todoInput: ''
    });

    this.saveData()
  }

  toggleDone (item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }

      return todo;
    })

    this.setState({todos: todos});

    this.saveData()
  }

  removeTodo (item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

    this.setState({todos: todos});

    this.saveData()
  }

  async componentDidMount(){
    await this.getData()
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

    return (
      <View style={styles.container}>
        {statusbar}

        <Header title="My Todo List App" />

        <InputBar
          addNewTodo={() => this.addNewTodo()}
          textChange={todoInput => this.setState({ todoInput })}
          todoInput={this.state.todoInput}
        />

        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem todoItem={item} toggleDone={() => this.toggleDone(item)} removeTodo={() => this.removeTodo(item)} />
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    backgroundColor: '#FFCE00',
    height: 20
  }
});