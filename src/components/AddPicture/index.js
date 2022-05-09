/* Imports */
import './addPicture.scss';
import PropTypes from 'prop-types';

/* Componant main function */
function AddPicture({ 
  isChargedImg,
  setFormComplete,
  setIsChargedImg,
  setChargedImg,
  setImageOrientation,
  setAspectRatio
}) {
  /* Handler on submit event */
  const handleOnSubmit = (event) => {
    event.preventDefault();
    //Check values on form submit by the user
    setFormComplete();
  };

  /* Function that use another function to set in the state the file image src upload by the user */
  const getImage = (event) => {
    //Store user image in a constant
    const imageToProcess = event.target.files[0];
    //Check if image was upload
    if(imageToProcess != undefined) {
       //Create a new image element by giving it a width and a height 
      let newImg = new Image(imageToProcess.width, imageToProcess.height);
      //Giving a source to this new element
      newImg.src = URL.createObjectURL(imageToProcess);
      //Set this src to the state
      setChargedImg(newImg.src);
    }  
    //Changed the state to indicate that an image has been uploaded
    setIsChargedImg();
    
  };

  const getAspectRatio = (event) => {
    setAspectRatio(event.target.value);
  }; 

  const getOrientation = (event) => {
    setImageOrientation(event.target.value);
  }; 

   /* Returned JSX (a form to upload an image with some informations about its aspect ratio) */
  return (
    <div className="addPicture">
       <form onSubmit={handleOnSubmit} method="" className="addPicture__form">

          <legend className="addPicture__title">Choix d'image</legend>

            <label className="addPicture__file" htmlFor="fileInput">
                Chargez une image
                <input onChange={getImage} type="file" id="fileInput" placeholder="Image" accept="image/png, image/jpeg" />
            </label>

            <p className="addPicture__info">{isChargedImg ? 'Image chargée' : 'Aucune image'}</p>

            <label className="addPicture__format-type" htmlFor="formatType">
                Le format de l'image
                <br></br>
                <select onChange={getAspectRatio} id="formatType"> 
                    <option value="">--Type de format</option>
                    <option value="16/9">16/9</option>
                    <option value="4/3">4/3</option>
                    <option value="3/2">3/2</option>
                    <option value="1/1">1/1</option>
                </select>
            </label>  

            <label className="addPicture__picture-orientation" htmlFor="orientation">
                L'orientation de l'image
                <br></br>
                <select onChange={getOrientation} id="orientation">
                    <option value="">--Orientation--</option>
                    <option value="landscape">Paysage</option>
                    <option value="portrait">Portrait</option>
                </select>
            </label>

            <button className="addPicture__submit">Commencer</button>
        </form>
    </div>
  )
}

/* Properties types */
AddPicture.propTypes = {
  isChargedImg: PropTypes.bool.isRequired,
  setFormComplete: PropTypes.func.isRequired,
  setIsChargedImg: PropTypes.func.isRequired,
  setChargedImg: PropTypes.func.isRequired,
  setImageOrientation: PropTypes.func.isRequired,
  setAspectRatio: PropTypes.func.isRequired,
};
/* -------------- */

/* Export */
export default AddPicture;
