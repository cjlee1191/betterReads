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
    axios({method: 'get', url: 'https://better-reads1.herokuapp.com/api/books', headers: {'Authorization': token }})
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="books">
        {this.state.books.map((book) => {
          return(
            <div key={book.id} className="book-container">
              <h2 className="title"><Link to={`/books/${book.id}`}style={{color: '#382110',textDecoration: 'none'}}>{book.title}</Link></h2>
              <h6 className="author">{book.author}</h6>
              <img src={book.img_url} alt="book-cover" className="image"></img>
              <p>{book.description}</p>
            </div>
          )     
        })}
         
      </div>
    )
  }
}

export default BookList;