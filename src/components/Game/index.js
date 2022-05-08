/* Imports */
import './game.scss';
import PropTypes from 'prop-types';

/* Componant main function */
function Game({ chargedImg, puzzlePiecesNumber }) {
  /* Function that return a random integer */
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /* Variable to store the current dragged piece id */
  let currentDragPieceId;

  /* Function that return an array of index equal to puzzle pieces number */
  const getAnArrayOfPieces = () => {
    const array = [];
    for(let i = 0; i < puzzlePiecesNumber; i++) {
      array.push(i);
    }
    return array;
  };

  /* Function that return an array of objects */
  const generatePiecesWithRandomDispatching = () => {
    //Variables to determine position coordonates
    let currentCol = 0 //Current column
    let currentRow = 0 //Current row
    let col = ((350 * 16) / 9) / 10; //Column size (expressed in pixels later)
    let row = 350 / 6; //Row size (expressed in pixels later)
    const arrayOfObject = []; //Object array initialization
    //Loop on the number of pieces
    for(let i = 0; i < getAnArrayOfPieces().length; i++) {
      //For a more even distribution of pieces 
      if(currentCol == 10){
        currentRow++;
        currentCol = 0;
        }
      //Push an object to the arrayOfObject
      arrayOfObject.push({
        //Store a vertical axis position
        y: Math.floor((row *currentRow) * -1),
        //Store an horizontal axis
        x: Math.floor((col * currentCol)* -1),
        //Store an id
        id: i,
      })
      currentCol++;
    }
    //Return an array OfObject
    return arrayOfObject;
  };

  /* This part contain 6 handlers function to manage each drag and drop events on every concerned elements */

  /* Handler on drop elements */
  const handleOnDrop = (event) => {
    //Target is no more loses its hovered class 
    event.target.classList.toggle('hovered');
    //Condition to check if the target match with dragged piece
    if(event.target.textContent === currentDragPieceId){
      //Store current dragged piece in a constant 
      const currentPiece = document.getElementById(currentDragPieceId);
      //Apply new style to this piece
      currentPiece.classList.add('fit-content')
      //Remove the textContant in the drop area
      event.target.textContent = '';
      //Inserting the dragged part into the target
      event.target.append(currentPiece);
      //Current dragged piece is no more draggable
      currentPiece.draggable = false;
      }
  };

  /* Handler on drag over event */
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /* Handler on drag enter event */
  const handleOnDragEnter = (event) => {
    event.preventDefault();
    //To inform the user wich area is droppable
    event.target.classList.toggle('hovered');
  };

  /* Handler on drag leave event */
  const handleOnDragLeave = (event) => {
    //Remove hovered class
    event.target.classList.toggle('hovered');
  };

  /* Hazndler on drag start event */
  const handleOnDragStart = (event)=> {
    //Use the previously declared variable to store the target id
    currentDragPieceId = event.target.id;
    //Use of a timer to hide the piece that will be dragged only to its starting positionroom
    setTimeout(() => {
      event.target.style.visibility = 'hidden';
    })
  };

  /* Handler on drag end event */
  const handleOnDragEnd = (event) => {
    //Make visible again of the dragged piece if it was not dropped on the correct position
    event.target.style.visibility = 'visible';
  };

  /* -------------------------------------------------------------------------------------------------------- */

  /* Returned JSX by the component (two main elements: puzzle pieces drop area and puzzle pieces area) */
  return (
    <div className="game">
      <div className="main-container">

        <div className="puzzle">
            {chargedImg != '' ? <img src={chargedImg}/> : ''}
            {getAnArrayOfPieces().map((piece) => (
              <div 
                className="puzzle__piece-space" 
                key={piece}
                onDragEnter={handleOnDragEnter}
                onDragLeave={handleOnDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                >{piece}  
              </div>
            ))}
        </div>

        <div className="pieces-container">
          {generatePiecesWithRandomDispatching().map((obj) => (
            <div 
              className="pieces-container__piece" 
              key={obj.id}
              id={obj.id}
              style={{
                backgroundImage: `url(${chargedImg})`,
                top: `${getRandomInt(0, (350 - 50.4))}px`,
                left: `${getRandomInt(0, (622 - 61.80))}px`,
                backgroundPosition: `${obj.x}px ${obj.y}px`,
                zIndex: `${obj.id}`
              }}
              draggable
              onDragStart={handleOnDragStart}
              onDragEnd={handleOnDragEnd}
              >{obj.id}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

/* Properties types */
Game.propTypes = {
  chargedImg: PropTypes.string.isRequired,
  puzzlePiecesNumber: PropTypes.number.isRequired,
};
/* -------------- */

/* Export */
export default Game;
