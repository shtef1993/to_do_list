import React, { Component, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import TaskItemFunction from './Funkcija';

class TodoAppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    };
  }

  componentDidMount() {
    const storedTasks = localStorage.getItem('myTasks');
    if (storedTasks) {
      this.setState({ tasks: JSON.parse(storedTasks) });
    }
  }

  addTask = () => {
    const { tasks, newTask } = this.state;
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      this.setState({ tasks: updatedTasks, newTask: '' });
      localStorage.setItem('myTasks', JSON.stringify(updatedTasks));
    }
  };

  toggleTask = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.setState({ tasks: updatedTasks });
    localStorage.setItem('myTasks', JSON.stringify(updatedTasks));
  };

  deleteTask = (taskId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: updatedTasks });
    localStorage.setItem('myTasks', JSON.stringify(updatedTasks));
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <div className="text-center m-4">
        <h1 className="text-primary">TODO App</h1>
        <Form className="mb-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Dodaj novi zadatak"
              value={newTask}
              onChange={(e) => this.setState({ newTask: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.addTask}>
            Dodaj zadatak
          </Button>
        </Form>
        <ListGroup className="mx-auto" style={{ maxWidth: '400px' }}>
          {tasks.map((task) => (
            <TaskItemFunction key={task.id} task={task} onToggle={this.toggleTask} onDelete={this.deleteTask} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default TodoAppClass;
