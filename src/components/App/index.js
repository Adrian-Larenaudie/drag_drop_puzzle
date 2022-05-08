/* Imports */
import './appStyle.scss';
import AddPicture from '../AddPicture/index';
import Game from '../Game/index';
import React from 'react';

/* Componant main class */
class App extends React.Component {
  /* Constructor */
  constructor(props) {
    super(props);
    //State properties
    this.state = {
      isChargedImg: false,
      chargedImg: '',
      puzzlePiecesNumber: 60,
    };
    //This binding of the setters which are sent in the subcomponents
    this.uploadChargedImgState = this.uploadChargedImgState.bind(this);
    this.setChargedImg = this.setChargedImg.bind(this);
    this.setChargedImg = this.setChargedImg.bind(this);
  };

  /* Setter part */

  /* Setter to change the bool value wich indicate if an image was uploaded or not */
  uploadChargedImgState() {
    const { isChargedImg } = this.state;
    this.setState({
      isChargedImg: !isChargedImg,
    });
  };

  /* Setter to change the state chargedImg */
  setChargedImg(image) {
    this.setState({
      chargedImg: image,
    });
  };

  /* --------- */

  /* Render state and setter to the subcomponents */
  render() {
    //Destructuring state
    const { isChargedImg, chargedImg, puzzlePiecesNumber } = this.state;
     /* Returned JSX */
    return (
      <div className="app">
        <AddPicture
          isChargedImg={isChargedImg}
          uploadChargedImgState={this.uploadChargedImgState}
          setChargedImg={this.setChargedImg}
        />
        {chargedImg != '' && <Game
          chargedImg={chargedImg} 
          puzzlePiecesNumber={puzzlePiecesNumber}
        />}
      </div>
    )
  }
}

/* Export */
export default App;
