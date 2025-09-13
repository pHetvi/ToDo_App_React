import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from './features/todo/todoSlice';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [name, setName] = useState('');
  const todos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch(addTodo({ id: uuidv4(), name: name.trim(), completed: false }));
    setName('');
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">To-Do App</h2>

          {/* Add Todo Form */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter todo name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="primary">
              Add To-Do
            </Button>
          </Form>

          {/* Todo List */}
          <ListGroup className="mt-4">
            {todos.map(todo => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex justify-content-between align-items-center"
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'gray' : 'black',
                }}
              >
                <div style={{ flex: 1 }}>{todo.name}</div>

                <div className="d-flex gap-2">
                  {/* Status Button shows current status */}
                  <Button
                    size="sm"
                    variant={todo.completed ? 'success' : 'warning'}
                    onClick={() => handleToggle(todo.id)}
                  >
                    {todo.completed ? 'Completed' : 'Pending'}
                  </Button>

                  {/* Remove Button */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(todo.id)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
