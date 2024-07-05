import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Switch } from 'react-native';
import { database } from './firebase'; 
import { ref, onValue, push, update, remove, get, set } from 'firebase/database';

export default function App() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from Firebase on component mount
  useEffect(() => {
    const taskRef = ref(database, 'tasks');
    onValue(taskRef, snapshot => {
      const data = snapshot.val() || {};
      const loadedTasks = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      setTasks(loadedTasks);
    });
  }, []);

  // Function to add a new task with default status as 'due'
  const addTask = () => {
    if (title.trim()) {
      const newTaskRef = push(ref(database, 'tasks'));
      set(newTaskRef, {
        title,
        status: false
      }).then(() => {
        setTitle('');
      }).catch(error => {
        console.error('Failed to add task:', error);
      });
    }
  };

  // Function to toggle task status between 'due' & 'done'
  const toggleStatus = (id) => {
    const taskRef = ref(database, `tasks/${id}`);
    get(taskRef).then(snapshot => {
      if (snapshot.exists()) {
        const task = snapshot.val();
        update(taskRef, { status: !task.status }).catch(error => {
          console.error('Failed to toggle status:', error);
        });
      }
    }).catch(error => {
      console.error('Error reading task:', error);
    });
  };

  // Function to delete a task from the list
  const deleteTask = (id) => {
    const taskRef = ref(database, `tasks/${id}`);
    remove(taskRef).catch(error => {
      console.error('Failed to delete task:', error);
    });
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
        disabled={!title.trim()}  
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
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
              color="#ff6347" 
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
