import React, { Component } from 'react';
import axios from 'axios';

class BookAdd extends Component {
  constructor() {
    super();
    this.state = { title: '', author: '', img_url: '', Description: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = "Bearer " + localStorage.getItem("jwt")
    axios({ method: 'post', url: 'http://localhost:3000/api/books', headers: {'Authorization': token }, data: this.state})
      .then((response) => {
        this.props.history.push(`/books/${response.data.id}`);
        console.log(response)
        console.log(this.state)

      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push("/books");
  }

  render() {
    return (
      <div>
        <h1>Create Book Post</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input type="text" name="author" value={this.state.author} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="text" name="img_url" value={this.state.img_url} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="content"value={this.state.Description} onChange={this.handleChange} className="form-control" />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Create</button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default BookAdd;