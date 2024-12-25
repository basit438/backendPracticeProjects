import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]); // State to store fetched books

  // Fetch data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/get/books');
        setBooks(response.data); // Update state with the fetched data
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData(); // Call the function
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
