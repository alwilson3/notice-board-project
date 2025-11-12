import { useState } from 'react'
import { Button, Card, Row, Col } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import PostitModal from './PostitModal'
import './App.css'

function App() {
  const defaultNote = { id: null, content: "", color: '#97c584ff' }
  const [notes, setNotes] = useState([
    { id: 1, content: "write here", color: '#86a845ff' },
    { id: 2, content: "important notes", color: '#628356ff' }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState(defaultNote)
  const [isEditing, setIsEditing] = useState(false)

  const showModal = (note = null) => {
    if (note) {
      setCurrentNote(note)
      setIsEditing(true)
    }
    else {
      setCurrentNote(defaultNote)
      setIsEditing(false)
    }
    setIsModalOpen(true)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))

  }

  return (
    <div className='app-container'>
      <div className='header'>
        <h1>Anna & Harry's Board</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="add-button"
          onClick={() => showModal()}>
          Add Note...
        </Button>

      </div>
      <Row className='notes-container' gutter={[16, 16]}>
        {notes.map((note) => (
          <Col key={note.id}>
            <Card className='post-it-note' style={{ backgroundColor: note.color }} actions={[
              <EditOutlined key='edit' onClick={() => showModal(note)} />,
              <DeleteOutlined key='delete' onClick={() => deleteNote(note.id)} />
            ]}>
              <div className='note-content'>
                {note.content}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <PostitModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        notes={notes}
        setNotes={setNotes}
        isEditing={isEditing}
        defaultNote={defaultNote}
      />

    </div>
  )
}

export default App
