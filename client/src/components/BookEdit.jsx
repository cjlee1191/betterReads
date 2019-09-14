import React from 'react';
import axios from 'axios';

class BookEdit extends React.Component {
  constructor() {
    super();
    this.state = { id: '', title: '', author: '', img_url: '', Description: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({method: 'get', url: `http://localhost:3000/api/books/${this.props.match.params.id}`, headers: {'Authorization': token }})
      .then((response) => { 
        console.log(response)
        this.setState(response.data)
        console.log(` this is the edit response ${response.data}`)
      })
      .catch(error => console.log('error', error));
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = "Bearer " + localStorage.getItem("jwt")
    axios({ method: 'patch', url: `http://localhost:3000/api/books/${this.state.id}`, headers: {'Authorization': token }, data: this.state})
      .then(() => {
        this.props.history.push(`/books/${this.state.id}`);
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push(`/books/${this.state.id}`);
  }

  render() {
    return (
        <div>
        <h1>Edit Book Post</h1>
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
            <input name="content" value={this.state.Description} onChange={this.handleChange} className="form-control" />
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

export default BookEdit;