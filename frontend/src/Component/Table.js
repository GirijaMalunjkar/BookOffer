// Table.js

import React, { useState, useEffect } from 'react';
import './Table.css';
import axios from "axios";

const Table = ({ data, onEdit, onDelete, editableRowIndex, onSaveEdit }) => {
  const [editedData, setEditedData] = useState({
    book: '',
    author: '',
    genre: '',
    yop: '',
    isbn: '',
  });

  useEffect(() => {
    if (editableRowIndex !== null) {
      const { book, author, genre, yop, isbn } = data[editableRowIndex];
      setEditedData({ book, author, genre, yop, isbn });
    } else {
      setEditedData({
        book: '',
        author: '',
        genre: '',
        yop: '',
        isbn: '',
      });
    }
  }, [editableRowIndex, data]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (index) => {
    try {
      // Make a POST request using Axios
      const response = await axios.post('http://localhost:5000/api/Book/', editedData);
  
      // Check for a successful response (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        console.log('Data submitted successfully:', response.data);
      } else {
        // Log the full response for debugging purposes
        console.error('Unexpected status code:', response.status, response.data);
      }
    } catch (error) {
      // Log the full error object for debugging purposes
      console.error('Error:', error.message, error.response?.data);
    }
  };
  
  const handleDeleteClick = async (index) => {
    try {
      // Make a DELETE request using Axios
      const response = await axios.delete(`http://localhost:5000/api/delete_Book/${data[index].id}`);
  
      // Check for a successful response (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        console.log('Data deleted successfully:', response.data);
        
        // Call the onDelete function if needed
        onDelete(index);
      } else {
        // Log the full response for debugging purposes
        console.error('Unexpected status code:', response.status, response.data);
      }
    } catch (error) {
      // Log the full error object for debugging purposes
      console.error('Error deleting data:', error.message, error.response?.data);
    }
  };
  

  return (
    <table>
      <thead>
        <tr>
          <th>S No</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>year of Publication</th>
          <th>ISBN</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {editableRowIndex === index ? (
                <input
                id='tableinput'
                  type="text"
                  name="book"
                  value={editedData.book}
                  onChange={handleEditChange}
                />
              ) : (
                row.book
              )}
            </td>
            <td>
              {editableRowIndex === index ? (
                <input
                id='tableinput'
                  type="text"
                  name="author"
                  value={editedData.author}
                  onChange={handleEditChange}
                />
              ) : (
                row.author
              )}
            </td>
            <td>
              {editableRowIndex === index ? (
                <input
                id='tableinput'
                  type="text"
                  name="genre"
                  value={editedData.genre}
                  onChange={handleEditChange}
                />
              ) : (
                row.genre
              )}
            </td>
            <td>
              {editableRowIndex === index ? (
                <input 
                id='tableinput'
                  type="text"
                  name="yop"
                  value={editedData.yop}
                  onChange={handleEditChange}
                />
              ) : (
                row.yop
              )}
            </td>
            <td>
              {editableRowIndex === index ? (
                <input
                id='tableinput'
                  type="text"
                  name="isbn"
                  value={editedData.isbn}
                  onChange={handleEditChange}
                />
              ) : (
                row.isbn
              )}
            </td>
            <td>
              {editableRowIndex === index ? (
                <span>
                  <button onClick={() => handleSaveClick(index)}>Save</button>
                </span>
              ) : (
                <span>
                  <button onClick={() => onEdit(index)}>Edit</button>
                  <button onClick={() => handleDeleteClick(index)}>Delete</button>
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
