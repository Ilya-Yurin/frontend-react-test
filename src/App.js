import React, { Component } from 'react';
import SuperChart from './modules/superChart/components';
import { fetchPolygon } from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
        polygon: [],
        isLoaded: false,
        width: 600,
        height: 400,
        scaled: false
    };

    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  componentDidMount() {
    fetchPolygon().then(data => {
      this.setState({
        polygon: data,
        isLoaded: true
      });
    });
  }

  handleEnterPress(event) {
    event.preventDefault();
    if (event.charCode === 13) {
        this.setState({
            width: this.state.scaled ? this.state.width/1.6 : this.state.width*1.6,
            height: this.state.scaled ? this.state.height/1.6 : this.state.height*1.6,
            scaled: !this.state.scaled
        });
    }
  }

  render() {
    return (
      <div className="App"  tabIndex="0" onKeyPress={this.handleEnterPress}>
        <SuperChart width={this.state.width}
                    height={this.state.height}
                    polygon={this.state.polygon}
                    isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default App;
