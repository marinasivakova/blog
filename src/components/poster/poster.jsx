/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import './poster.css';

function Poster({ author, date }) {
  const updateDate = format(date, 'MMMM,d,y');
  return (
    <div className="poster">
      <div>
        <div className="poster__name">{author.username}</div>
        <div className="poster__date">{updateDate}</div>
      </div>
      <img
        className="poster__img"
        alt="Poster's set profile"
        src={author.image}
      />
    </div>
  );
}

Poster.propTypes = {
  author: PropTypes.object,
  date: PropTypes.string,
};

Poster.defaultProps = {
  author: { username: 'name', image: 'url' },
  date: 'date',
};

export default Poster;
