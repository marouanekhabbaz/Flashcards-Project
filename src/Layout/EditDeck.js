
import React ,{useEffect, useState}from "react";
import {readDeck} from "../utils/api/index"
import {useParams , useHistory} from "react-router-dom";
import {updateDeck} from "../utils/api/index"


function EditDeck(){
 
  let {deckId} = useParams();
  let history = useHistory();
   const [deck , setDeck] = useState({name:"" , description:""});
  //  const [clicked , setClicked]= useState(false)
  console.log(deck)

   useEffect(()=>{
    async function load(){
      const deckToLoad= await readDeck(deckId)
      setDeck(deckToLoad)
  }
  load()
   },[deckId]);

      
const handleNameChange = (event) =>{ setDeck({...deck ,name :event.target.value})};

const hundleDescriptionChange = (event)=>{  setDeck({...deck,description: event.target.value })};

const handleSubmit = (e) => {
    e.preventDefault()
    async function updateId(){
        let  updated= await  updateDeck(deck) 
        setDeck(updated)
        }
      updateId()
    history.push(`/decks/${deckId}`)
};

    return(       
<>
<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="/">Home</a></li>

              <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
        </nav>
  <div className="box">
       
 <form> 
  <div class="form-group ">
    <label htmlFor="name">Name</label>
    <input  required onChange={handleNameChange}  type="text" class="form-control"  id="name" name="name" value={deck.name} />
  </div>
  <div class="form-group">
    <label htmlFor="description">Description</label> 
    <textarea required  onChange={ hundleDescriptionChange }  class="form-control" id="description" name="description" value={deck.description} rows="3"></textarea>
  </div>
  <button onClick={handleSubmit} type="submit" class="btn btn-primary mr-2">Save</button>
  <a href={`/decks/${deckId}`} class="btn btn-secondary mr-2">Cancel</a>
</form>
</div>   
 </>      
    )
}



export default EditDeck