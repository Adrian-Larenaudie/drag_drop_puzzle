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
      //Is the form filled out correctly
      isFormComplete: false,
      //Is image is upload
      isChargedImg: false,
      //Image source
      chargedImgSrc: '',
      //Number of puzzle pieces
      puzzlePiecesNumber: 60,
      //Image orientation
      imageOrientation: '',
      //Aspect ratio
      aspectRatio: '',
    };
    //This binding of the setters which are sent in the subcomponents
    this.setFormComplete = this.setFormComplete.bind(this);
    this.setIsChargedImg = this.setIsChargedImg.bind(this);
    this.setChargedImg = this.setChargedImg.bind(this);
    this.setImageOrientation = this.setImageOrientation.bind(this);
    this.setAspectRatio = this.setAspectRatio.bind(this);
  };

  /* Setter part */

  /* Setter to change the bool value wich indicate if an image was uploaded or not */
  setFormComplete() {
    const { isFormComplete, imageOrientation, aspectRatio, chargedImgSrc } = this.state;
    if(imageOrientation != '' && aspectRatio != '' && chargedImgSrc != '') {
      this.setState({
        isFormComplete: !isFormComplete,
      });
    }
    else {
      alert('Il faut remplir tous les champ')
    }
  };

  /* Reset all form values to manage next submit properly */
  unsetAllFormValues() {
    const { isFormComplete, isChargedImg } = this.state;
    this.setState({
      isFormComplete: !isFormComplete,
      isChargedImg: !isChargedImg,
      imageOrientation: '',
      aspectRatio: '',
      chargedImgSrc: '',
    });
  };

  /* Setter to change the bool value wich indicate if an image was uploaded or not */
  setIsChargedImg() {
    const { isChargedImg } = this.state;
    this.setState({
      isChargedImg: !isChargedImg,
    });
  }

  /* Setter to change the state chargedImg */
  setChargedImg(image) {
    this.setState({
      chargedImgSrc: image,
    });
  };

  /* Setter to change the image orientation state */
  setImageOrientation(string) {
    this.setState({
      imageOrientation: string,
    });
  };

  /* Setter to change the aspect ratio state */
  setAspectRatio(string) {
    this.setState({
      aspectRatio: string,
    });
  };

  /* --------- */

  /* Render state and setter to the subcomponents */
  render() {
    //Destructuring state
    const { isFormComplete, isChargedImg, chargedImgSrc, puzzlePiecesNumber, imageOrientation, aspectRatio } = this.state;
     /* Returned JSX */
    return (
      <div className="app">
        <AddPicture
          isChargedImg={isChargedImg}
          setFormComplete={this.setFormComplete}
          setIsChargedImg={this.setIsChargedImg}
          setChargedImg={this.setChargedImg}
          setImageOrientation={this.setImageOrientation}
          setAspectRatio={this.setAspectRatio}
        />
        {isFormComplete && <Game
          chargedImgSrc={chargedImgSrc} 
          puzzlePiecesNumber={puzzlePiecesNumber}
          aspectRatio={aspectRatio}
          imageOrientation={imageOrientation}
        />}
      </div>
    )
  }
}

/* Export */
export default App;
