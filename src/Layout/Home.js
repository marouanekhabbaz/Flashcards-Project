
import React ,{useEffect, useState}from "react";

import { listDecks , deleteDeck} from "../utils/api/index"
import './Layout.css'


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


const deleteHundler =  async (event)=>{
  let message= "Are you sure you want delete this deck?"

  let x = event.target.id;

  let result = window.confirm(message)

  let deckToDelete = decks.find((deck)=> deck.id === parseInt(x,10) );

  result && await deleteDeck(deckToDelete.id) && setIsDelete(!isDelete)
}

 let list=  decks.map((deck, index)=>{
    return ( 

<div key={index} id= {index}  class="card" >
  <div class="card-body   l-bg-orange-dark  l-bg-cherry">


 
    <h5 class="card-title"> {deck.name}  </h5>
    <h6 class="card-subtitle mb-2 text-muted"> {deck.cards.length} {(deck.cards.length>1)? "Cards": "Card" } </h6>
    <p class="card-text">{deck.description}</p>

    </div>

    <div class="card-footer l-bg-orange-dark  ">

       <a  href= {`/decks/${deck.id}`} class="card-link"> View  </a>
  

 
        <a href={`/decks/${deck.id}/study`} type="button" class="card-link ml-2 "> Study </a>
    
        <button id={deck.id} onClick={deleteHundler} type="button" class="btn  ml-2 remove ">Delete</button>
 
     

    </div>
</div>


  

 )
})
   return (
    <>
  <h1 className="display-4 card-list"> List of card decks</h1>

    <div class="container ">

  <div class= " d-flex justify-content-center m-4 ">

    <a href="/decks/new"  class="btn l-bg-orange-dark  btn-lg">  Create Deck <i class="bi bi-plus">+</i>  </a>
  
  </div>
  
 

  
  <div class="card-columns mb-5">

  {list}
  </div>

  </div>
 

  

    </>
  )
}


export default Home

