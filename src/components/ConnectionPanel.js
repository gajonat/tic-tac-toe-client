
import { useState } from 'react'

const ConnectionPanel = ({ onConnect }) => {
  const [name, setName] = useState('')
  const [size, setSize] = useState(3)
  const [level, setLevel] = useState(4)
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please enter your name')
      return
    }

    onConnect(name, size, level)

  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Name</label>
        <input
          type='text'
          placeholder='...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Grid Size</label>
        <select
          type='text'
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className='form-control'>
        <label>Game Level</label>
        <select
          type='text'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <input type='submit' value='Connect' className='btn btn-block' />
    </form>
  )
}

export default ConnectionPanel
