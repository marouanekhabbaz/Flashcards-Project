import React ,{useEffect, useState}from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home"
import Study from "./Study"
import { Route, Switch , Router , useHistory} from "react-router-dom";

import { listDecks  , createDeck, listCards} from "../utils/api/index"
import NewDeck from "./NewDeck";
import Deck from "./Deck"
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";



function Layout() {

  const [id , setId]= useState(20)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newDeck , setNewDeck]= useState({});
  const history = useHistory();

  const handleNameChange = (event) =>{
      setName(event.target.value)
      setNewDeck({...newDeck ,name :event.target.value})};

  const hundleDescriptionChange = (event)=>{ 
      setDescription(event.target.value)
      setNewDeck({...newDeck,description: event.target.value })}
  const handleSubmit = (event) => {
    event.preventDefault();
    
    async function updateId(){
      let ids = await createDeck(newDeck) ;
      console.log(ids.id)
      history.push(`/decks/${ids.id}`)
    }
updateId()
  };

const editHundler =(event)=>{
  event.preventDefault();
  console.log("hey")
}

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>   
        <Route exact path="/" >
        <Home /> 
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/new">
          <NewDeck id={id} handleSubmit={handleSubmit}
           hundleDescriptionChange={hundleDescriptionChange}
           handleNameChange={handleNameChange} 
           name={name} description={description} />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck />
        </Route>
        <Route  path="/decks/:deckId/edit"> 
          <EditDeck editHundler={editHundler}  />
        </Route>
        <Route path="/decks/:deckId/cards/new">
           <AddCard />
         </Route>
         <Route path="/decks/:deckId/cards/:cardId/edit">
           <EditCard />
         </Route>
       <Route> 
       <NotFound />
       </Route>
       </Switch>
      </div>
    </>
  );
}

export default Layout;
