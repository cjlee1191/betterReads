import React from 'react';

class Home extends React.Component{
  constructor(){
    super()
  }
 
  render(){
  return (
    <div className="jumbotron">
      <h1>Explore popular books</h1>
      <h3>“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” – George R.R. Martin</h3>
    </div>
  );
}
}

export default Home;