import React ,{useEffect, useState}from "react";
import {readDeck} from "../utils/api/index"
import { useParams , useHistory} from "react-router-dom";
import {deleteDeck} from "../utils/api/index"
import { deleteCard } from "../utils/api/index"
import './Layout.css'

function Deck () {

    let {deckId} = useParams()
    const [deck, setDeck]= useState([])
    const [del, setDel]= useState(false)
   const history= useHistory()

  

    useEffect(()=>{

        async  function load(){ 
            try{    
                const theDeck = await readDeck(deckId)
                setDeck(theDeck)
            }
            catch(error){
                console.log(error)
            }}

        load()
    }, [ del, deckId ])

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

                <div key={index} id= {index}  class="card border-primary mb-3"  >
                 <div class="card-body  l-bg-cherry">

                 <h5 class="card-title  "> Card {index+1}  </h5>
                 {/* <h6 class="card-subtitle mb-2  "> </h6> */}
                         <p class="card-text" >Front: {card.front}</p>
                         <p class="card-text">Back: {card.back}</p>
                 </div>
                         <div class="card-footer ">

                         <a href={`/decks/${deckId}/cards/${card.id}/edit`} class="card-link mr-2">Edit</a>
            
                         <button id={card.id} onClick={deleteCardHundler} type="button" class="remove ml-2">delete</button>
                     
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
{/* <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
        List of Card decks 
 </nav> */}
 <div className="container mt-4">
 <div class="card text-center">
  <div class="card-header l-bg-orange-dark " >
  <ul class="nav nav-pills card-header-pills">

     <li class="nav-item">
        <a class="nav-link disabled" href={`/decks/${deckId}/study`} >{deck.name}</a>
      </li>

      <li class="nav-item">
      <a class="nav-link " href="/">Home</a>
      </li>

      <li class="nav-item">
        <a class="nav-link " href={`/decks/${deck.id}/edit`} >Edit</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href={`/decks/${deckId}/study`}>Study</a>
      </li>
      <li class="nav-item">
        <a class="nav-link " href={`/decks/${deckId}/cards/new`}>Add Cards</a>
      </li>
    </ul>
  </div>
  <div class="card-body l-bg-orange-dark ">
    <h5 class="card-title"> {deck.name} </h5>
    <p class="card-text">{deck.description}</p>
    <button onClick={deleteHandler} type="button" class="btn btn-danger mr-2">Delete</button>
  </div>
</div>

</div>
<div  className="card-list">

   <h1 className="display-4"> List of cards </h1>

  <div class="card-columns mb-5">
  {cardsList}
  </div>
  </div> 
</>
)
}
export default Deck 