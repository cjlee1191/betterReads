import React from 'react';
import '../stylesheets/Home.css'


class Home extends React.Component{
  constructor(){
    super()
  }
 
  render(){
  return (
    <div className="jumbotron">
      <h1>Discover new books and discuss your favorites....</h1>
      <br/>
      <h1>“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” – George R.R. Martin</h1>
    </div>
  );
}
}

export default Home;