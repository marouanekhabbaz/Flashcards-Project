import React ,{useEffect, useState}from "react";
import {  useParams , useHistory, Link} from "react-router-dom";
import { readDeck } from "../utils/api/index"
import './Layout.css'

function Study(){
    const {deckId} = useParams();
    let history = useHistory();

    const initial ={fliped : false, index: 0}

    const [deck , setDeck] = useState({})
    const [card , setCard]= useState(initial);
    const [click, setClick]=useState(0)

  useEffect( ()=>{
    async function load(){
      let dec = await  readDeck(deckId) 
      setDeck(dec)
      // let x = dec.card
      
      setCard(dec.cards[click])
      
            }
    load()
  }, [click , deckId] )

const fliphundler = ()=>{
setCard({
    ...card,
    fliped : !card.fliped
})
}
const nextHunler =()=>{
    if(click+1< deck.cards.length){
    setClick((x)=> x+1)
    setCard(deck.cards[click])
} 
else{
let message= "do you want to restart this deck?"
let result = window.confirm(message)
result ? setClick(0) : history.push("/") }
}



function Content () {

  let cardHeader= (deck.cards && deck.cards.length < 3)?
    "Not enough cards.":`card ${click+1} of ${(deck.cards) && deck.cards.length } `;

  let paragraph = (deck.cards && deck.cards.length < 3)? 
    `You need at least 3 cards to study. There are ${ deck.cards.length} ${(deck.cards.length<2)?'card':'cards'} in this deck.`:
    (card.fliped)? card.back : card.front;

 let style = (card && card.fliped )? 'back-side': "l-bg-orange-dark"   

 /*
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

*/

       return (
         <div class={`card ${style} study mb-3`}>

        <div class={`card-body `}>
           <h5 class="card-title"> {cardHeader}  </h5>
            <h6 class="card-subtitle mb-2 text-muted">   { (card && card.fliped) ?"Back" : "Front"  }  </h6>   
            <p class="card-text"> {paragraph} </p>
         </div>      
              {
                (deck.cards && deck.cards.length >= 3) &&
                <div class={`card-footer `}>
                  <button type="button" class=" mr-2" onClick={fliphundler}> 
                      {/* {card.fliped? "Front" : "Back"}  */}
                      Flip
                 </button>
                  {card.fliped && 
                  <button type="button" class=" mr-2 " onClick={nextHunler}> 
                   Next
                  </button>}  
                </div>
              }
             
           
          </div>
        )

}

let content = Content()

return(
 
      <div >
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><Link to="/">Home</Link></li>
             <li class="breadcrumb-item "><Link href=$`/decks/${deckId}`> {deck.name} </Link>  </li>
              <li class="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
        </nav>





        <h2 className="display-4 card-list "> Study : {deck.name} </h2>
 <div className="container">
    <div class="d-flex justify-content-center ">
    {content}
    </div>
</div>

</div>




)
}

export default Study 
