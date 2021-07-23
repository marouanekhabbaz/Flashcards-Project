import React ,{useEffect, useState}from "react";
import {readCard, readDeck} from "../utils/api/index"
import {  useParams , useHistory} from "react-router-dom";
import {  updateCard } from "../utils/api/index"

function EditCard(){
const [card, setCard]= useState({front:"hey", back:"beby"})
console.log(card)
const [deck , setDeck]= useState({name:""})
const history = useHistory()
let {deckId , cardId}= useParams()

useEffect(()=>{
    async function load(){
        const theDeck= await readDeck(deckId);
        setDeck(theDeck);
    }
    load()
},[deckId , cardId])


useEffect(()=>{
    async function load(){
        try{
            const theCard= await readCard(cardId)
            setCard(theCard)
        } catch(error){
            console.log(error)
        }   
    }
    load()
}
,[deck, cardId])


const frontChange =(event)=>{
    setCard({
        ...card,
        front: event.target.value
    })
}
const backChange =(event)=>{
    setCard({
        ...card,
        back: event.target.value
    })
}
const saveHundler= (e)=>{
    updateCard(card)
    history.push(`/decks/${deckId}`)
}
return (
    <> 
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
    <textarea required onChange={frontChange} class="form-control" id="front"name="front"rows="3" value={card.front}></textarea>
  </div>
  <div class="form-group">
    <label htmlFor="back">Back</label> 
    <textarea required  onChange={backChange}   class="form-control" id="back" name="back" rows="3" value={card.back}></textarea>
  </div>
  <button  onClick={saveHundler}  type="button" class="btn btn-primary mr-2">Save</button>
  <a href= {`/decks/${deckId}`} class="btn btn-secondary mr-2"> Cancel </a>
</form>
 </>
)
}


export default  EditCard