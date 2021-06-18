import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import NoteCard from '../components/NoteCard';
import {Container} from '@material-ui/core';
import Masonry from 'react-masonry-css';

export default function Notes() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, []);

  const handleDelete = (noteId) => {
    fetch(`http://localhost:8000/notes/${noteId}`, {
      method: 'DELETE',
      header: {
        "Content-type": "application/json"
      }
    }).then(res => res.json()).then(data => {
      setNotes(notes.filter(n => n.id !== noteId));
    })
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(note => (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete}/>
            </div>
          ))}
        </Masonry>
      
    </Container>
  )
}
