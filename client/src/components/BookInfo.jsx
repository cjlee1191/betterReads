import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../stylesheets/BookInfo.css'

class BookInfo extends Component {
  constructor() {
    super();
    this.state = {
      book: {},
      comments: [],
      body: '',
      user_name: '',
      }
      this.handleDelete = this.handleDelete.bind(this);
      this.addComment = this.addComment.bind(this);
      this.handleChange = this.handleChange.bind(this);
    };
    
    async componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");

    await axios({ method: 'get', url: `https://better-reads1.herokuapp.com/api/books/${this.props.match.params.id}`, headers: { 'Authorization': token } })

      .then((response) => {
        this.setState({
          book: response.data
        })
      })
   await axios({ method: 'get', url: `https://better-reads1.herokuapp.com/comments` })
      .then((response) => {
        this.setState({
          comments: response.data
        })
      })

      .catch(error => console.log('error', error));
  }


  async handleDelete() {
    let token = "Bearer " + localStorage.getItem("jwt");
  await  axios({ method: 'delete', url: `https://better-reads1.herokuapp.com/api/books/${this.props.match.params.id}`, headers: { 'Authorization': token } })
      .then(() => {
        this.props.history.push("/books")
      })
      .catch(error => console.log('error', error));
  }

 async addComment(event) { 
   
    event.preventDefault();
   const user_name = this.state.user_name
   const body = this.state.body
   let book_id = this.props.match.params.id
   let data = {user_name, body, book_id}
    await axios({ method: 'post', url: 'https://better-reads1.herokuapp.com/comments', data: data })
      .then((response) => {
        console.log(response)
        console.log(this.state.data)
       
    })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  renderComments() {
    if(this.state.book.id == this.props.match.params.id) {
      return <ul className="comments">
          { 
           this.state.comments.map(comment => (
            <div>
            <br/>
            <p className="poster">{comment.user_name}</p>
            <p className="comment">{comment.body}</p>
            <hr/>
            </div>
            )
        )
          }
        </ul>
    }
    }
render() {
    return (
      <div className="book-info">
        <h1>{this.state.book.title}</h1>
        <p>{this.state.book.description}</p>
        <h3>{this.state.book.author}</h3>
        <img src={this.state.book.img_url} alt="book-cover"></img>

        <p>
          <Link to={`/books/${this.state.book.id}/edit`} className="btn btn-outline-dark">Edit</Link>
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button>
          <Link to="/books" className="btn btn-outline-dark">Close</Link>
        </p>
        <hr />
        <div>Add Comment</div>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="user_name" value={this.state.user_name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Comment</label>
            <input type="text" name="body" value={this.state.body} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Submit</button>
          </div>
          </form>

          {this.renderComments()}
  

      </div>
    )
  }
}

export default BookInfo;