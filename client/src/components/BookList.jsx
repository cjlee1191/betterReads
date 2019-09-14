import React, { Component } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import '../stylesheets/BookList.css';

class BookList extends Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'get', url: 'http://localhost:3000/api/books', headers: {'Authorization': token }})
      .then(response => {
          console.log(response.data)
          console.log(token)
        this.setState({ books: response.data })
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        {this.state.books.map((book) => {
          return(
            <div key={book.id} className="book-container">
              <h2 className="title"><Link to={`/books/${book.id}`}>{book.title}</Link></h2>
              <h6 className="author">{book.author}</h6>
              <img src={book.img_url} alt="book-cover" className="image"></img>
              <p>{book.description}</p>
              <hr/>
            </div>
          )     
        })}
        <Link to="/books/new" className="btn btn-outline-primary">Add New Book</Link>  
      </div>
    )
  }
}

export default BookList;