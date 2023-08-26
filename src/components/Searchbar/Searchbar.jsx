import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PropTypes } from 'prop-types';
import './Searchbar.css';

export class Searchbar extends Component {
  state = {
    picture: '',
  };
  static propTypes = {
    onSubmitGetPicture: PropTypes.func.isRequired,
  };
  handleNameChange = event => {
    this.setState({ picture: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.picture.trim() === '') {
      return toast.error('Need write something!');
    }
    this.props.onSubmitGetPicture(this.state.picture);
    this.setState({ picture: '' });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <svg id="Outline" viewBox="0 0 24 24" width="15" height="15">
              <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </svg>
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.picture}
            onChange={this.handleNameChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
