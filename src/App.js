import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { PageHeader, Panel } from 'react-bootstrap';
import axios from 'axios';

class Form extends Component {

	state = { userName: '' }
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp =>{
      	this.props.onSubmit(resp.data);
        this.setState({ userName: ''})
      })
  }
	render() {
  	return (
    <form onSubmit={this.handleSubmit}>
        <div className="col-2 row">
            <input type="text"
              value={this.state.userName}
              onChange={(event) => this.setState({ userName: event.target.value })}
              placeHolder="Github username" required>
            </input> 
            <button className="btn" type="submit"> Add card </button>
        </div>
    </form>
    );
  }
}

const CardList = (props) => {
	return(  	
      <div className="col-12 row">{props.cards.map(card => <Card key={card.id} {...card} />)}</div>    
  );
};


const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.avatar_url} alt="" />
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25e', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>      
    </div>
  );
};

class App extends Component {
  state = {
    cards: []
  };

  addNewCard = (cardInfo) => {
        this.setState(prevState => ({
        cards: prevState.cards.concat(cardInfo)
    }));	
  };
  render() {
    return(
      <div>
    <PageHeader>
      {this.props.title}
    </PageHeader>
    <Panel>
      <Panel.Heading>
        <Panel.Title componentClass="h3">Type your GitHub User and press enter</Panel.Title>
      </Panel.Heading>      
      <Panel.Body>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards}/>
      </Panel.Body>      
    </Panel>
    </div>
    );
  }
}

export default App;
