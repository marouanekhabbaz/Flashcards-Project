import { getElementError } from "@testing-library/react";
import React ,{useEffect, useState}from "react";

import { Route, Switch , Router } from "react-router-dom";

import { listDecks , listCards, deleteDeck} from "../utils/api/index"

function Home (){

 const [decks , setDecks] = useState([]);
 const [isDelete ,setIsDelete]= useState(false)

 async function load(){
  try{
  const decksList= await listDecks(); 
  setDecks(decksList)}
  catch(error){
      console.log(error)
 }
}

  useEffect(() => {
    load()
  }, [isDelete]);
const deleteHundler =(event)=>{
let message= "Are you sure you want delete this deck?"

let x = event.target.id;

let result = window.confirm(message)


let deckToDelete = decks.find((deck)=> deck.id == parseInt(x,10) );

result && deleteDeck(deckToDelete.id) && setIsDelete(!isDelete)
}
 let list=  decks.map((deck, index)=>{
    return ( 
  <div key={index} id= {index} class="card mb-2" >
  <div class="card-header">
  {deck.cards.length} cards
  </div>
  <div class="card-body">
    <h5 class="card-title"> {deck.name} </h5>
    <p class="card-text"> {deck.description} </p>
    <div class="btn-group mr-2" role="group" aria-label="first group">
    <a  href= {`/decks/${deck.id}`} class="btn btn-primary"> view  </a>
    </div>

    <div class="btn-group mr-2" role="group" aria-label="Second group">
    <a href={`/decks/${deck.id}/study`} type="button" class="btn btn-info"> Study </a>
  </div>
  <div class="btn-group mr-2" role="group" aria-label="Third group">
    <button id={deck.id} onClick={deleteHundler} type="button" class="btn btn-danger  ">delete</button>
  </div>
  </div>
</div>
 )
})
   return (
    <>
  <div class="col px-md-5">
  <a href="/decks/new" class="btn btn-primary"> Create Deck  </a>
    </div>
  <div class="col px-md-5"> <div class="p-3 border bg-light"> 
  {list}
  </div> </div>

    </>
  )
}


export default Home