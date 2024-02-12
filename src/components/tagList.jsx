import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from 'components/tag';
import { removeTag } from 'store/postReducer';

function TagList({ tagList }) {
  let jsxTagList = null;
  const dispatch = useDispatch();

  const deleteTag = (tag) => {
    dispatch(removeTag({ tag }));
  };
  if (tagList.length) {
    jsxTagList = tagList.map((tag) => (
      <div className="tags__tag" key={tag}>
        <input className="input input--tag" name="tag" value={tag} disabled />
        <button
          type="button"
          className="btn btn--tag"
          onClick={() => {
            deleteTag(tag);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn--tag btn--tag-blue btn--not-visible"
        >
          Add tag
        </button>
      </div>
    ));
  }
  return (
    <div className="tags">
      {jsxTagList}
      <Tag />
    </div>
  );
}

TagList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tagList: PropTypes.array,
};

TagList.defaultProps = {
  tagList: [],
};

export default TagList;
