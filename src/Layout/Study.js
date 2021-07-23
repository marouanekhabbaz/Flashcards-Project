import React ,{useEffect, useState}from "react";
import {  useParams , useHistory, Link} from "react-router-dom";
import { readDeck } from "../utils/api/index"

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
    if (deck.cards && deck.cards.length < 3){
        return (
            <div class="card">
            <div class="card-header">
           Not enough cards.
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
              <p> You need at least 3 cards to study. There are 2 cards in this deck.</p>
            
              <Link to={`/decks/${deckId}/cards/new`}  class="btn btn-outline-primary mr-2" >  Add Cards </Link>

              </blockquote>
            </div>
          </div>
        )
    } else{
       return (
         <div class="card">
        <div class="card-header"> card {click+1} of {(deck.cards) && deck.cards.length } </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
              <p> {(card.fliped)? card.back : card.front}</p> 
              <button type="button" class="btn btn-outline-primary mr-2" onClick={fliphundler}> {card.fliped? " Flip to the front" : "Flip to the Back"} </button>
                   {card.fliped && <button type="button" class="btn btn-outline-primary mr-2 " onClick={nextHunler}>  Next </button>}
              </blockquote>
            </div>
          </div>
        )
    }
}
let content = Content()

return(
 <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><Link to="/">Home</Link></li>
             <li class="breadcrumb-item"><Link href="#"> {deck.name} </Link>  </li>
              <li class="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
        </nav>

    <h3> Study : {deck.name} </h3>
    {content}
</div>
)
}

export default Study 