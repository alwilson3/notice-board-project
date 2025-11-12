import { Input, Modal } from 'antd'
import './App.css'
const { TextArea } = Input

function PostitModal({ isModalOpen, setIsModalOpen, currentNote, setCurrentNote, notes, setNotes, isEditing, defaultNote }) {
  const colors = ['#bdd681ff', '#8eb86cff', '#a1cc94ff', '#88ca99ff', '#b6e795ff']
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
    setCurrentNote(defaultNote)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setCurrentNote(defaultNote)

  }

  return (
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
  )
}

export default PostitModal
