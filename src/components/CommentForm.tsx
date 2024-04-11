import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function CommentForm() {
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const { featureId } = useParams();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("body", body);
    fetch(`http://localhost:8000/api/features/${featureId}/comments/`, { method: "POST", body: formData })
      .then((response: Response) => response.json())
      .then((r => setMessage("Comentario creado con exito en la feature de id: " + featureId)))
      .catch(error => {
        console.error('Error creating comment:', error);
      });
  };

  return (
    <>
        
        <h2>Create command</h2>
        <form onSubmit={handleSubmit}>
        <textarea value={body} onChange={(event) => setBody(event.target.value)} />
        <button type="submit">Submit</button>
        {
            message &&
            <p>{message}</p>
        }
        </form>
    </>
  );
}

export default CommentForm;
