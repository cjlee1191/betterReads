import React, { Component } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';

class BookList extends Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    console.log(token)
    axios({method: 'get', url: 'http://localhost:3000/api/books', headers: {'Authorization': token }})
      .then(response => {
          console.log(response.data)
        this.setState({ books: response.data })
      })
    // axios.get('http://localhost:3000/api/books', )
    // .then((response) => {   
    //         this.setState({
    //     books: response.data,
    //   })
     
    // })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        {this.state.books.map((book) => {
          return(
            <div key={book.id}>
              <h2><Link to={`/books/${book.id}`}>{book.title}</Link></h2>
              {book.description}
              <h3>{book.author}</h3>
              <div>{book.img_url}</div>
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