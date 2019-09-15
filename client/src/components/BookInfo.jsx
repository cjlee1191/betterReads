import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BookInfo extends Component {
  constructor() {
    super();
    this.state = { book: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'get', url: `https://better-reads1.herokuapp.com/api/books/${this.props.match.params.id}`, headers: {'Authorization': token }})
      .then((response) => { 
        console.log(response.data)
        this.setState({
          book: response.data
        })
      })
      .catch(error => console.log('error', error));
  }

  handleDelete() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({ method: 'delete', url: `https://better-reads1.herokuapp.com/api/books/${this.props.match.params.id}`, headers: {'Authorization': token}})
      .then(() => {
        this.props.history.push("/books")
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        <h1>{this.state.book.title}</h1>
        <p>{this.state.book.description}</p>
        <h3>{this.state.book.author}</h3>
        <div>{this.state.book.img_url}</div>

        <p>
          <Link to={`/books/${this.state.book.id}/edit`} className="btn btn-outline-dark">Edit</Link> 
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
          <Link to="/books" className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}

export default BookInfo;