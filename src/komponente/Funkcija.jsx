import React from 'react';
import { Button, ListGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TaskItemFunction = ({ task, onToggle, onDelete }) => (
  <ListGroup.Item className={`d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`}>
    <Form.Check
      type="checkbox"
      label={task.text}
      checked={task.completed}
      onChange={() => onToggle(task.id)}
    />
    <Button variant="danger" onClick={() => onDelete(task.id)}>
      Obriši
    </Button>
  </ListGroup.Item>
);

TaskItemFunction.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItemFunction;
