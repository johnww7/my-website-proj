import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

//------------------------------------------------------------------------
//Top level component which contains AddRecipeForm, EditRecipeForm, and RecipeListItem
//components. Holds the state for event handlers for editing, adding, and deleting recipes.
//Also helps toggle accordion buttons for list of recipes.
//------------------------------------------------------------------------------
class RecipeBox extends React.Component {

  constructor(props) {
    super();
    this.state = {
      recipeBox: [],
      recipeName: '',
      ingredients: '',
      isPanelOpen: [],
      toggleAddForm: false,
      toggleEditForm: false,
      editRecipe: 0,
    };

    this.handlePanel = this.handlePanel.bind(this);
    this.handleAddForm = this.handleAddForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleAddFormInputs = this.handleAddFormInputs.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleEditFormChanges = this.handleEditFormChanges.bind(this);

  }

  componentDidMount() {
    const startUpRecipes = [
      {recipe: 'Spaghetti', ingredients: ['noodles', 'tomato sauce', 'meatballs']},
      {recipe: 'pumpkin pie', ingredients: ['pumpkin puree',
      'sweetened condensed milk','eggs', 'pumpkin pie spice', 'pie crust']},
    ];

    let localStorageRecipes = JSON.parse(localStorage.getItem('_johnww7_recipes'));
    let localStorageIsPanelOpen = [];

    if(localStorageRecipes !== null) {
      for(let index=0; index < localStorageRecipes.length; index++) {
        localStorageIsPanelOpen[index] = false;
      }

      this.setState({
        recipeBox: localStorageRecipes,
        isPanelOpen: localStorageIsPanelOpen,
      });
    }
    else {
      this.setState({
        recipeBox: startUpRecipes,
        isPanelOpen: [false, false],
      });
    }

  }

  handlePanel(index) {
    let panelsState = this.state.isPanelOpen;

    if(this.state.isPanelOpen[index] === true) {
      panelsState[index] = false;
    }
    else {
        panelsState[index] = true;
    }

    panelsState.forEach(function(elem, pos) {
      if(pos !== index) {
        panelsState[pos] = false;
      }
    });

    this.setState({
      isPanelOpen: panelsState
    });
  }

  handleAddForm() {
    this.setState({
      toggleAddForm: true,
    });
  }

  handleCancel() {
    this.setState({
      toggleAddForm: false,
      recipeName: '',
      ingredients: '',
    });
  }

  handleAddSubmit(event) {
    event.preventDefault();
    const {recipeName, ingredients, recipeBox, isPanelOpen} = this.state;
    let listOfIngredients = ingredients.split(/,\s*/g);
    const newRecipe = {
      recipe: recipeName,
      ingredients: listOfIngredients,
    };

    recipeBox.push(newRecipe);
    isPanelOpen.push(false);

    this.setState((prevState, props) => ({
      recipeBox: recipeBox,
      isPanelOpen: isPanelOpen,
      recipeName: "",
      ingredients: "",
    }));

    localStorage.setItem("_johnww7_recipes", JSON.stringify(recipeBox));
  }

  handleAddFormInputs(event) {
    const inputTarget = event.target;
    const name = inputTarget.name;

    if(name === 'recipeName') {
      this.setState({
        recipeName: inputTarget.value,
      });
    }
    else {
      this.setState({
        ingredients: inputTarget.value,
      });
    }

  }


  handleEdit(index) {
    let recipeValue = this.state.recipeBox[index];
    let recipeName = recipeValue.recipe;
    let ingredientValue = recipeValue.ingredients.join(', ');
    this.setState({
      toggleEditForm: true,
      toggleAddForm: false,
      editRecipe: index,
      recipeName: recipeName,
      ingredients: ingredientValue,
    });
  }

  handleDelete(value) {
    let recipeBoxList = this.state.recipeBox;
    let isPanelOpenArray = this.state.isPanelOpen;

    const modifiedRecipeBox = recipeBoxList.filter((element, index) =>
      index !== value
    );

    const modifiedIsPanelOpen = isPanelOpenArray.filter((elem, index) =>
      index !== value
    );

    this.setState({
      recipeBox: modifiedRecipeBox,
      isPanelOpen: modifiedIsPanelOpen,
    });

    localStorage.setItem("_johnww7_recipes", JSON.stringify(modifiedRecipeBox));

  }

  handleEditCancel() {
    this.setState({
      toggleEditForm: false,
      recipeName: '',
      ingredients: '',
    });
  }

  handleEditSubmit(index, event) {
    const {recipeName, ingredients} = this.state;
    let editRecipeBox = this.state.recipeBox;
    let editedIngredients = ingredients.split(/,\s*/g);

    editRecipeBox[index].recipe = recipeName;
    editRecipeBox[index].ingredients = editedIngredients;

    this.setState({
      recipeBox: editRecipeBox,
      recipeName: '',
      ingredients: '',
      toggleEditForm: false,
    });

    localStorage.setItem("_johnww7_recipes", JSON.stringify(editRecipeBox));

    event.preventDefault();
  }

  handleEditFormChanges(event) {
    const input = event.target;
    const nameOfInput = input.name;
    if(nameOfInput === 'recipeName') {
      this.setState({
        recipeName: input.value,
      });
    }
    else {
      this.setState({
        ingredients: input.value,
      });
    }
  }

  render() {

    let recipeBox = this.state.recipeBox;
    let recipeBoxList;
    let formAreaDisplay ='';

    if(this.state.toggleAddForm === true) {
      formAreaDisplay = <AddRecipeForm onSubmit={this.handleAddSubmit}
        recipeValue={this.state.recipeName}
        ingredientsValue={this.state.ingredients}
        onChange = {this.handleAddFormInputs}
        onClick={this.handleCancel}/>;
    }
    else if (this.state.toggleEditForm === true) {
      formAreaDisplay = <EditRecipeForm onClick={this.handleEditCancel}
        onSubmit={this.handleEditSubmit.bind(this, this.state.editRecipe)}
        recipeValue={this.state.recipeName}
        ingredientsValue={this.state.ingredients}
        onChange={this.handleEditFormChanges} />;
    }
    else {
      formAreaDisplay = <button className="btn btn-outline-success"
        onClick={this.handleAddForm}>
        Add Recipe</button>;
    }

    if(typeof(this.state.recipeBox) !== 'object') {
      recipeBoxList = JSON.parse(localStorage.getItem('_johnww7_recipes'));
    }
    else {
      recipeBoxList = this.state.recipeBox;
    }

    let recipeArray = recipeBoxList.map((item, index) =>
      <RecipeListItem key={index} details={item}
        panelOpen={this.state.isPanelOpen[index]}
        onClick={this.handlePanel.bind(this, index)}
        onEdit={this.handleEdit.bind(this, index)}
        onDelete={this.handleDelete.bind(this, index)}/>
    );

    return (
      <div className="container">
        <div className='row justify-content-center'>
          <div className='col-md-8 recipe-list-container'>
            <ul className='ingredients-list-display'>
              {recipeArray}
            </ul>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8 input-recipe-container'>
            {formAreaDisplay}
          </div>
        </div>
      </div>
    );
  }
}

//----------------------------------------------------------------------------
//Component creats a collapsible div which contains the ingredients for the recipe in
//list. Contains an edit and delete button for editing the ingredients and name for
//current ingredient or to delete it.
//----------------------------------------------------------------------------
class RecipeListItem extends React.Component {

  panelCollapsible(state) {
    let className = ' ';
    if(state) {
      className = 'recipe-content-opened';
    }
    else {
      className = 'recipe-content-closed'
    }
    return className;
  }

  render() {
    const recipeDetails = this.props.details;
    let panelClass = this.panelCollapsible(this.props.panelOpen);
    let ingredients = recipeDetails.ingredients.map((item, index) =>
      <RecipeIngredient key={index} item={item} />
    );

    return(
      <li>
        <button className='collapsible-accordion' onClick={this.props.onClick}>
          {recipeDetails.recipe}
        </button>
        <div className={panelClass}>
          <div className="recipe-detail-display">
            <div className="recipe-ingredients-header">Ingredients</div>
            <ul className="list-group recipe-list-group">
              {ingredients}
            </ul>
            <div className='recipe-detail-btn-display'>
              <button  className="btn btn-outline-secondary" onClick={this.props.onEdit}>
                Edit
              </button>
              <button className="btn btn-outline-danger" onClick={this.props.onDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

//---------------------------------------------------------------------------
//A simple view component which returns a list item to any component that uses it.
//-----------------------------------------------------------------------------
const RecipeIngredient= (props) => {
    return (
      <li className="list-group-item recipe-group-ingredient">{props.item}</li>
    );
}

//------------------------------------------------------------------------
//Component contains a form which can add recipes based on whats in the input
//and textarea elements for recipe name and ingredients.
//------------------------------------------------------------------------
class AddRecipeForm extends React.Component {
  render() {
    return(
        <form onSubmit={this.props.onSubmit}>
          <div className="form-header-display">
            <h4 className='text-center'>Add Recipe</h4>
          </div>
          <div className="form-group form-input-display">
            <label>
              Recipe:
              <br />
              <input type="text" value={this.props.recipeValue}
                name="recipeName"
                placeholder="Recipe Name"
                onChange={this.props.onChange}
                />
            </label>
          </div>
          <div className="form-group form-input-display">
            <label>
              Ingredients:
              <br />
              <textarea name="addIngredients"
                placeholder="Enter in ingredients, seperated, by commas"
                rows='3' cols='40' value={this.props.ingredientsValue}
                onChange={this.props.onChange}
                />
            </label>
          </div>
          <div className="form-btn-display-footer">
            <input className="btn btn-outline-success" type="submit" value="Add Recipe" />
            <button className="btn btn-outline-info" onClick={this.props.onClick}>Cancel</button>
          </div>
        </form>

    );
  }
}

//------------------------------------------------------------------------
//Component contains a form which can edit recipes which populates input and textarea
//elements based on what recipe your editing.
//------------------------------------------------------------------------
class EditRecipeForm extends React.Component {
  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <div className="form-header-display">
          <h4 className='text-center'>Edit Recipe</h4>
        </div>
        <div className="form-group form-input-display">
          <label>
            Recipe:
            <br />
            <input type="text" name="recipeName" value={this.props.recipeValue}
            onChange={this.props.onChange}/>
          </label>
        </div>
        <div className="form-group form-input-display">
          <label>
            Ingredients:
            <br />
            <textarea name="addIngredients" value={this.props.ingredientsValue}
              onChange={this.props.onChange}
              rows='3' cols='40'/>
          </label>
        </div>
        <div className="form-btn-display-footer">
          <input className="btn btn-outline-success" type="submit" value="Edit Recipe" />
          <button className="btn btn-outline-info" onClick={this.props.onClick}>Cancel</button>
        </div>
      </form>
    );
  }
}



const root = document.getElementById('root');
ReactDOM.render(
  <RecipeBox />,
  root
);
