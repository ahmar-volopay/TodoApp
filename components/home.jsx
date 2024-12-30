import React, {PureComponent} from 'react';

export default class home extends PureComponent {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.heading}>Enter Task:</Text>
          <TextInput
            onChangeText={setText}
            value={text}
            style={styles.input}
            placeholder="Enter task here"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {/* Delete Modal */}
          <Modal visible={deleteModalVisibility} animationType="fade">
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this task?
              </Text>
              <View style={styles.options}>
                <TouchableOpacity
                  onPress={() => setDeleteModalVisibility(false)}
                  style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteTask(taskToDelete)}
                  style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* Edit Modal */}
          <Modal visible={editModalVisibility} animationType="fade">
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Editing Task...</Text>
              <TextInput
                onChangeText={setText}
                value={text}
                style={styles.input}
                placeholder="Edit task"
              />
              <View style={styles.options}>
                <TouchableOpacity
                  onPress={() => setEditModalVisibility(false)}
                  style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveEditedTask}
                  style={styles.saveButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.tasksContainer}>
            <ScrollView>
              {tasks.map(task => (
                <View key={task.id} style={styles.taskItem}>
                  <Checkbox
                    status={task.completed ? 'checked' : 'unchecked'}
                    onPress={() => toggleTaskCompletion(task.id)}
                  />
                  <Text
                    style={[
                      styles.taskText,
                      task.completed && styles.completedTaskText,
                    ]}>
                    {task.text}
                  </Text>

                  <TouchableOpacity onPress={() => editTask(task.id)}>
                    <Icon name="edit" size={20} color="#000000" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setDeleteModalVisibility(true);
                      setTaskToDelete(task.id);
                    }}
                    style={styles.iconButton}>
                    <Icon name="delete" size={20} color="#d9534f" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
