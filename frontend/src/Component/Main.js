// App.js

import React, { useState } from 'react';
import Form from './Form';
import Table from './Table'
import './Main.css';;
// import Signup from './Component/Signup';


const Main = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    bookTitle: '',
    author: '',
    genre: '',
    year: '',
    isbn: '',
  });

  const [tableData, setTableData] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const handleFormSubmit = () => {
    setTableData([
      ...tableData,
      {
        sno: tableData.length + 1,
        bookTitle: formData.bookTitle,
        author: formData.author,
        genre: formData.genre,
        year: formData.year,
        isbn: formData.isbn,
      },
    ]);

    // Clear book details in the form data
    setFormData({
      ...formData,
      bookTitle: '',
      author: '',
      genre: '',
      year: '',
      isbn: '',
    });
  };

  const handleEdit = (index) => {
    setEditableRowIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const handleSaveEdit = (index, editedData) => {
    const updatedTableData = [...tableData];
    updatedTableData[index] = {
      sno: index + 1,
      bookTitle: editedData.bookTitle,
      author: editedData.author,
      genre: editedData.genre,
      year: editedData.year,
      isbn: editedData.isbn,
    };
    setTableData(updatedTableData);
    setEditableRowIndex(null);
  };

  const dumpStateToJson = () => {
    const stateToDump = {
      name: formData.name,
      phone: formData.phoneNumber,
      email: formData.email,
      books: tableData.map((book) => ({
        sno: book.sno,
        bookTitle: book.bookTitle,
        author: book.author,
        genre: book.genre,
        year: book.year,
        isbn: book.isbn,
      })),
    };
    console.log(JSON.stringify(stateToDump, null, 2));
  };

  return (
    
        <div className="main-container">
          <Form
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
          />
          <Table
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editableRowIndex={editableRowIndex}
            onSaveEdit={handleSaveEdit}
          />
          <button onClick={dumpStateToJson}>Dump State to JSON</button>
        </div>
    
       
      
      );
    };
export default Main;