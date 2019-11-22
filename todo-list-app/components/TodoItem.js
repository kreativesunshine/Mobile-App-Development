import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

function TodoItem (props) {

    const todoItem = props.todoItem;

    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => props.toggleDone()}
      >
        <Text style={(todoItem.done) ? { color: '#AAAAAA' } : { color: '#313131' }}>
          { todoItem.title }
        </Text>

        <Button
          title="Remove"
          color={(todoItem.done) ? 'rgba(200, 0, 0, 0.5)' : 'rgba(255, 0, 0, 1)' }
          onPress={() => props.removeTodo()}
        />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 40,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  }
})

export default TodoItem;