import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class RecipeBox extends React.Component {

  render() {

    return (
      <div className="container">
        <div className='row'>
          <RecipeIndexList />
        </div>
        <div className='row'>
          <div className='col-lg-10'>

          </div>
        </div>
      </div>
    );
  }
}

class RecipeIndexList extends React.Component {

  render() {
    return(
      <div className='col-lg-10'>
        <ul>
          <RecipeListItem />
          <RecipeListItem />
        </ul>
      </div>
    );
  }
}

class AddRecipeArea extends React.Component {

  render() {

    return(
      "hi"
    );
  }
}

class RecipeListItem extends React.Component {

  render() {

    return(
      <li>
        <button className='collapsible-accordion'>Recipe 1</button>
        <div className="recipe-content">
          <div className="recipe-detail-display">
            <h5>Ingredients</h5>
            <RecipeDetailList />

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

class RecipeDetailList extends React.Component {

  render() {
    const itemArray = ['item 1', 'item 2', 'item 3'];
    const listItems = itemArray.map((value, index) =>
      <li id={index} className="list-group-tem">{value}</li>
    );

    return(

        <ul className="list-group">
          {listItems}
        </ul>

    );
  }
}

class AddRecipeForm extends React.Component {

  render() {
    return(
      "hi"
    );
  }
}

class EditRecipeForm extends React.Component {

  render() {
    return(
      "hi"
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(
  <RecipeBox />,
  root
);
