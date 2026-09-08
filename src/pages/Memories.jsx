import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../components/AuthProt'
import {
  getGameAPI,
  getGameMemoriesAPI,
  saveMemoryAPI,
  deleteMemoryAPI,
} from '../services/apiService'

function Memories() {
  const { gameId } = useParams()
  const { user } = useAuth()

  const [game, setGame] = useState(null)
  const [memories, setMemories] = useState([])

  const [note, setNote] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const fetchGame = useCallback(async () => {
    try {
      const res = await getGameAPI(gameId)
      if (res.status === 200) setGame(res.data)
    } catch {
      toast.error('Failed to fetch game details.')
    }
  }, [gameId])

  const fetchMemories = useCallback(async () => {
    try {
      const res = await getGameMemoriesAPI(gameId)
      if (res.status === 200) {
        const userMemories = res.data.filter(
          (m) =>
            String(m.userId) === String(user?.id) &&
            String(m.gameId) === String(gameId)
        )
        setMemories(userMemories)
      }
    } catch {
      toast.error('Failed to load memories.')
    }
  }, [gameId, user?.id])

  useEffect(() => {
    if (gameId && user?.id) {
      fetchGame()
      fetchMemories()
    }
  }, [gameId, user?.id, fetchGame, fetchMemories])

  const handleAddMemory = async (e) => {
    e.preventDefault()

    if (!note.trim() && !imageFile) {
      toast.warning('Please enter a note or select an image file!')
      return
    }

    try {
      let imageUrl = ''

      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', 'gamercave')
        const result = await fetch(
          'https://api.cloudinary.com/v1_1/mxtkpjgb/image/upload',
          { method: 'POST', body: formData }
        )
        const serverData = await result.json()
        imageUrl = serverData.secure_url
      }

      const newMemory = {
        userId: user.id,
        gameId: gameId,
        note: note.trim(),
        imageUrl: imageUrl,
        createdAt: new Date().toLocaleDateString(),
      }

      const res = await saveMemoryAPI(newMemory)

      if (res.status === 201 || res.status === 200) {
        toast.success('Memory saved!')
        setNote('')
        setImageFile(null)
        e.target.reset()
        fetchMemories()
      }
    } catch {
      toast.error('Failed to save memory.')
    }
  }

  const handleDeleteMemory = async (id) => {
    if (!window.confirm('Delete this memory?')) return
    try {
      const res = await deleteMemoryAPI(id)
      if (res.status === 200 || res.status === 204) {
        toast.info('Memory deleted!')
        fetchMemories()
      }
    } catch {
      toast.error('Failed to delete memory.')
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
        <div>
          <h2 className="text-white mb-0">{game ? game.gameTitle : 'Game'} Memories</h2>
          <small className="text-light opacity-75">
            Save your screenshots, achievements, and notes
          </small>
        </div>
        <Link to="/library" className="btn btn-outline-light">
          &larr; Back to Library
        </Link>
      </div>

      <div className="card bg-dark text-white border-secondary mb-5 p-3">
        <h4 className="card-title text-warning mb-3">Add New Memory</h4>
        <form onSubmit={handleAddMemory}>
          <div className="mb-3">
            <label className="form-label text-light">Note / Review / Moment</label>
            <textarea
              className="form-control bg-secondary text-white border-0"
              rows="3"
              placeholder="What made this moment special?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="form-control bg-secondary text-white border-0"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
            />
          </div>
          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: '#802D1A' }}
          >
            Save Memory
          </button>
        </form>
      </div>

      <h3 className="text-white mb-3">Saved Memories ({memories.length})</h3>

      {memories.length === 0 ? (
        <div className="text-center text-light my-5">
          <p>No memories logged for this game yet. Create one above!</p>
        </div>
      ) : (
        <div className="row g-4">
          {memories.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div className="card bg-dark text-white border-secondary h-100">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.note ? `Memory: ${item.note.slice(0, 40)}` : 'Memory screenshot'}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    {item.note && <p className="card-text fs-5">{item.note}</p>}
                    <small className="text-light opacity-75 d-block mt-2">
                      Added on: {item.createdAt || 'N/A'}
                    </small>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm mt-3 align-self-end"
                    onClick={() => handleDeleteMemory(item.id)}
                  >
                    Delete Memory
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Memories