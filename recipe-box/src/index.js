import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class RecipeBox extends React.Component {

  constructor() {
    super();
    this.state = {
      recipeList: [],
      isPanelOpen: [false, false],
    };

    this.handlePanel = this.handlePanel.bind(this);
  }

  handlePanel(index) {
    console.log('Clicked: ' + index);
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

  render() {
    console.log(this.props.recipes);
    let recipeListIndex = this.props.recipes;
    let recipeArray = recipeListIndex.map((item, index) =>
      <RecipeListItem key={index} details={item} panelOpen={this.state.isPanelOpen[index]}
        onClick={this.handlePanel.bind(this, index)} />
    );

    return (
      <div className="container">
        <div className='row'>
          <div className='col-lg-10'>
            <ul>
              {recipeArray}
            </ul>
          </div>
        </div>
        <div className='row'>
          <AddRecipeArea />
          <EditRecipeForm />
        </div>
      </div>
    );
  }
}


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
    console.log(this.props);
    const recipeDetails = this.props.details;
    let panelClass = this.panelCollapsible(this.props.panelOpen);
    const ingredients = recipeDetails.ingredients.map((item, index) =>
      <RecipeIngredient key={index+1} item={item} />
    );
    return(
      <li>
        <button className='collapsible-accordion' onClick={this.props.onClick}>
          {recipeDetails.recipe}
        </button>
        <div className={panelClass}>
          <div className="recipe-detail-display">
            <h5>Ingredients</h5>
            <ul className="list-group">
              {ingredients}
            </ul>
            <div className='recipe-detail-btn-display'>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
const RecipeIngredient= (props) => {
    return (
      <li className="list-group-item">{props.item}</li>
    );
}

class AddRecipeArea extends React.Component {

  render() {

    return(
      <div className='col-lg-10'>
        <button>Add Recipe</button>
        <AddRecipeForm />
      </div>
    );
  }
}

class AddRecipeForm extends React.Component {

  render() {
    return(
        <form>
          <div><h4 className='text-center'>Add Recipe</h4></div>
          <div className="form-group form-input-display">
            <label>
              Recipe:
              <br />
              <input type="text" id="recipeName" defaultValue="recipe name"/>
            </label>
          </div>
          <div className="form-group form-input-display">
            <label>
              Ingredients:
              <br />
              <textarea id="addIngredients"
                rows='3' cols='40' defaultValue="Add ingredients, seperated by commas"/>
            </label>
          </div>
          <div className="form-btn-display-footer">
            <input type="submit" value="Add Recipe" />
            <button>Cancel</button>
          </div>
        </form>

    );
  }
}

class EditRecipeForm extends React.Component {

  render() {
    return(
      <form>
        <div><h4 className='text-center'>Edit Recipe</h4></div>
        <div className="form-group">
          <label>
            Recipe:
            <br />
            <input type="text" id="recipeName" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Ingredients:
            <textarea id="addIngredients" className="w-100"
              rows='3' cols='40'/>
          </label>
        </div>
        <div className="form-btn-display-footer">
          <input type="submit" value="Edit Recipe" />
          <button>Cancel</button>
        </div>
      </form>
    );
  }
}

class RecipeIndexList extends React.Component {


  render() {
    console.log(this.props.recipes);
    console.log(typeof this.props.recipes);
    let recipeListIndex = this.props.recipes;
    let recipeArray = recipeListIndex.map((item, index) =>
      <RecipeListItem key={index} details={item}  />
    );

    return(
      <div className='col-lg-10'>
        <ul>
          {recipeArray}
        </ul>
      </div>
    );
  }
}

const recipeList = [
  {recipe: 'Spaghetti', ingredients: ['noodles', 'tomato sauce', 'meatballs']},
  {recipe: 'pumpkin pie', ingredients: ['pumpkin puree', 'sweetened condensed milk',
  'eggs', 'pumpkin pie spice', 'pie crust']},
];

const root = document.getElementById('root');
ReactDOM.render(
  <RecipeBox recipes={recipeList}/>,
  root
);
