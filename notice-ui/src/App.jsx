import { useState } from 'react'
import { Button, Input, Modal, Card, Row, Col } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './App.css'
const { TextArea } = Input

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
  const colors = ['#FFE66E', '#ab0e89ff', '#67EFF4', '#00ff40ff', '#935bfcff']

  const showModal = (note = null) => {
    if (note) {
      setCurrentNote(note)
      setIsEditing(true)
    }
    else {
      setCurrentNote({ id: null, content: "", color: '#FFE66D' })
      setIsEditing(false)
    }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (currentNote.content.trim()) {
      if (isEditing) {
        setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note))

      }
      else {
        setNotes([...notes, { ...currentNote, id: Date.now() }])
      }
    }
    setIsModalOpen(false)
    setCurrentNote({ id: null, content: "", color: '#FFE66D' })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setCurrentNote({ id: null, content: "", color: '#FFE66D' })
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
      <Modal
        title={isEditing ? 'Edit Note' : 'Add New Note'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditing ? 'Update' : 'Add'}
      >
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Content:
          </label>
          <TextArea
            rows={4}
            value={currentNote.content}
            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
            placeholder='Enter your note here...'
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>
            Colour:
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {colors.map(color => (
              <div
                key={color}
                onClick={() => setCurrentNote({ ...currentNote, color })}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  border: currentNote.color === color ? '3px solid #333' : '1px solid #ccc',
                  borderRadius: 4,
                  cursor: 'pointer'
                }} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
