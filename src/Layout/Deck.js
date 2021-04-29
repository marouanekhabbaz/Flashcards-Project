import { getElementError } from "@testing-library/react";
import React ,{useEffect, useState}from "react";
import {readDeck} from "../utils/api/index"
import { Route, Switch , Router , useParams , useHistory} from "react-router-dom";
import {deleteDeck} from "../utils/api/index"
import { listDecks , listCards, deleteCard } from "../utils/api/index"

function Deck () {

    let {deckId} = useParams()
    const [deck, setDeck]= useState([])
    const [del, setDel]= useState(false)
   const history= useHistory()

   async  function load(){ 
    try{    
        const theDeck = await readDeck(deckId)
        setDeck(theDeck)
    }
    catch(error){
        console.log(error)
    }}

    useEffect(()=>{
        load()
    }, [del])

    const deleteHandler =()=>{
        let message= "Are you sure you want delete this deck?"
        let result = window.confirm(message) 
         result && deleteDeck(deckId) && history.push("/")
         
       
    }

const deleteCardHundler= (e)=>{
    let message= "Are you sure you want delete this card?"
    let result = window.confirm(message)
    result && deleteCard(e.target.id)  && setDel(!del)
}

    let cards = (deck.cards)? deck.cards: [];
    let cardsList= cards.map((card, index)=>{
        return(
            <div key={index} class="card mb-2">
             <div class="card-header ">
             Card {index+1}
             </div>
                 <div class="card-body">
                    <blockquote class="blockquote mb-0">
                         <p>{card.front}</p>
                         <p>{card.back}</p>
                         <button id={card.id} onClick={deleteCardHundler} type="button" class="btn btn-danger mr-2">delete</button>
                        <a href={`/decks/${deckId}/cards/${card.id}/edit`} class="btn btn-info mr-2">Edit</a>
                     </blockquote>
                </div>
          </div>
        )
    })

   if (!deck){
       return(
        <>
       <h1> Not Found</h1>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="/">Home</a></li>
        </ol>
        </nav>
       </>
       )
   }
return (
    <>
<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="/">Home</a></li>

              <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
 </nav>
 <div class="card">
     <div class="card-header"> {deck.name} </div>
  <div class="card-body">
    <h5 class="card-title">{deck.name}</h5>
    <p class="card-text">{deck.description}</p>
    <a href={`/decks/${deck.id}/edit`}  class="btn btn-info mr-2">Edit</a>
    <a href={`/decks/${deckId}/study`} class="btn btn-primary mr-2">study</a>
    <a href={`/decks/${deckId}/cards/new`} class="btn btn-secondary mr-2">Add Cards</a>
    <button onClick={deleteHandler} type="button" class="btn btn-danger mr-2">delete</button>
  </div> 
  </div>
  <h1> cards </h1>
  {cardsList}
</>
)
}
export default Deck 