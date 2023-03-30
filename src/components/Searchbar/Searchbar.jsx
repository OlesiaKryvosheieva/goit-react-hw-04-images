import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { GrSearch } from 'react-icons/gr';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleInputChange(event) {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  }

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <GrSearch />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
