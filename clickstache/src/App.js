import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./friends.json";
import "./App.css";

// class App extends Component {
//   // Setting this.state.friends to the friends json array
//   state = {
//     friends
//   };

  function shuffleFriends(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  class App extends Component {
    // Set this.state
    state = {
      friends,
      currentScore: 0,
      topScore: 0,
      rightWrong: "",
      clicked: [],
    };
  
    handleClick = id => {
      if (this.state.clicked.indexOf(id) === -1) {
        this.handleIncrement();
        this.setState({ clicked: this.state.clicked.concat(id) });
      } else {
        this.handleReset();
      }
    };
  
    handleIncrement = () => {
      const newScore = this.state.currentScore + 1;
      this.setState({
        currentScore: newScore,
        rightWrong: ""
      });
      if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore });
      }
      else if (newScore === 5) {
        this.setState({ rightWrong: "Grab a cup of organic free trade microclimate heirloom coffee, and call it meh!" });
      }
      this.handleShuffle();
    };
  
    handleReset = () => {
      this.setState({
        currentScore: 0,
        topScore: this.state.topScore,
        rightWrong: "You are so pedestrian...try again, or not, whatever",
        clicked: []
      });
      this.handleShuffle();
    };
  
    handleShuffle = () => {
      let shuffledFriends = shuffleFriends(friends);
      this.setState({ friends: shuffledFriends });
    };
  

  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  // };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Nav
          title="Click 'Stache"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Test Your Hipster Observance Skills and Select a Mustache as Unique as You!
        </Title>

        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-4">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
