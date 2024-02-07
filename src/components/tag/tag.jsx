import { useRef, React } from 'react';
import { useDispatch } from 'react-redux';
import { updateTag } from '../../store/postReducer';

function Tag() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const addTag = () => {
    if (ref.current.value) {
      dispatch(updateTag({ tag: ref.current.value }));
      ref.current.value = '';
    }
  };
  const onDelete = () => {
    if (ref.current.value) {
      ref.current.value = '';
    }
  };
  return (
    <div className="tags__tag">
      <input
        ref={ref}
        className="input input--tag"
        name="tag"
        placeholder="Tag"
      />
      <button type="button" className="btn btn--tag" onClick={onDelete}>
        Delete
      </button>
      <button
        type="button"
        onClick={addTag}
        className="btn btn--tag btn--tag-blue"
      >
        Add tag
      </button>
    </div>
  );
}
export default Tag;
