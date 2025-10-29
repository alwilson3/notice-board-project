import { useState } from 'react'
import { Button, Input, Modal, Card, Row, Col } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './App.css'

function App() {
  const [notes, setNotes] = useState([
    { id: 1, content: "write here", color: '#FFE66D' },
    { id: 2, content: "important notes", color: '#A8E6CF' }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState({
    id: null, content: "", color: '#FFE66D'
  })
  const [isEditing, setIsEditing] = useState(false)
  const colors = ['#FFE66E', '#AB600E', '#67EFF4']

  return (
    <div className='app-container'>
      <div className='header'>
        <h1>Anna & Harry's Board</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="add-button">
          Add Note...
        </Button>

      </div>
      <Row className='notes-container' gutter={[16, 16]}>
        {notes.map((note) => (
          <Col key={note.id}>
            <Card className='post-it-note' style={{ backgroundColor: note.color }}>
              <div className='note-content'>
                {note.content}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default App
