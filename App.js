
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Switch, Alert } from 'react-native';

export default function App() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  // Function to add a new task with default status as 'due' (false)
  const addTask = () => {
    if (title.trim()) {
      setTasks([...tasks, { id: Date.now(), title, status: false }]);
      setTitle('');
    }
  };

  // Function to toggle task status between 'due' (false) and 'done' (true)
  const toggleStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, status: !task.status} : task
    ));
  };

  // Function to delete a task from the list
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter Task Title"
      />
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={!title.trim()}  // Disable button if title is empty
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={{ textDecorationLine: item.status ? 'line-through' : 'none', flex: 1 }}>
              {item.title}
            </Text>
            <Switch
              onValueChange={() => toggleStatus(item.id)}
              value={item.status}
            />
            <Button
              title="Delete"
              onPress={() => deleteTask(item.id)}
              color="#ff6347" // Tomato color for delete button
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});
