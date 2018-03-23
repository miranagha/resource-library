import React from 'react';
import Form from './Form';
import Resources from './Resources';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      resources: [],
      isFetched: false,
      isLoading: false,
      error: null
    };

    this.getResourceItem = this.getResourceItem.bind(this);
  }

  componentDidMount() {
    fetch('/api/resources')
      .then(res => {
        if(res.status >= 200 && res.status < 300) {
          return res;
        } else {
          throw new Error('HTTP error');
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          resources: data
        });
      })
      .catch(err => {
        this.setState({
          error: err.toString()
        });
      });
  }

  getResourceItem(resourceItem) {
    // console.log(resourceItem)
    // console.log(this.state.resources)
    const allResources = this.state.resources;
    resourceItem.concat(allResources)
    this.setState({
      resources: allResources
    });
  }

///////////////////////////////////
  // TODO
  // FETCH DATA HERE
  // TODO

  //COMPONENTDIDMOUNT
//////////////////////////////////
  render() {
    // console.log(this.state.resources)
    return (
      <div>
        <h1>Resource Library</h1>
        
        <Form 
          receiver={this.getResourceItem}
        />  
        <Resources resources={this.state.resources}/>
      </div>
      
    );
  };
};

export default App;
