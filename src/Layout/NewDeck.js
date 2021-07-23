
import React from "react";

function NewDeck({id, handleSubmit,handleNameChange, hundleDescriptionChange , name , description } ){
    return(       
<>
<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item"><a href="/">Home</a></li>

              <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
        </nav>
 <form onSubmit={handleSubmit}> 
  <div class="form-group">
    <label htmlFor="name">Name</label>
    <input  required onChange={handleNameChange} type="text" class="form-control" value={name}  id="name" name="name"  />
  </div>
  <div class="form-group">
    <label htmlFor="description">Description</label> 
    <textarea required onChange={hundleDescriptionChange} class="form-control" id="description" name="description" value={description} rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-primary mr-2">Save</button>
  <a href="/" class="btn btn-secondary mr-2">Cancel</a>
</form>
 </>      
    )
}






export default NewDeck