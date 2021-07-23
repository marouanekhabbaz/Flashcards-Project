
import React ,{useEffect, useState}from "react";
import {   useParams } from "react-router-dom";
import { createCard , readDeck  } from "../utils/api/index"



    

function AddCard (){

    const {deckId}= useParams();
    const [deck , setDeck] = useState({})
    const [card , setCard] = useState({front:"", back:""})

    useEffect(()=>{
        async function load (){
            const theDeck = await readDeck(deckId)
            setDeck(theDeck)
        }
        load()
    },[deckId] )

    const frontChange = (e) => {
        setCard({
            ...card,
            front: e.target.value
        })
    }

  const backChange = (e) => {
        setCard({
            ...card,
            back: e.target.value
        })
    }
    
    const submitHundler =()=>{
    createCard(deckId, card) ;
    setCard({front:'', back:"" })
    }

return  (<> 
<h1>add card </h1>
    <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="/">Home</a></li>
             <li class="breadcrumb-item active" aria-current="page"> {deck.name}</li>
              <li class="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
 </nav> 
 <form> 
  <div class="form-group">
    <label htmlFor="front">Front </label>
    <textarea required  onChange={frontChange}  class="form-control" id="front"name="front"rows="3" value={card.front}></textarea>
  </div>
  <div class="form-group">
    <label htmlFor="back">Back</label> 
    <textarea required  onChange={backChange}  class="form-control" id="back" name="back" rows="3" value={card.back}></textarea>
  </div>
  <button  onClick={submitHundler} type="button" class="btn btn-primary mr-2">Save</button>
  <a href= {`/decks/${deckId}`} class="btn btn-secondary mr-2"> Done </a>
</form>
 </>
 )
}

export default AddCard