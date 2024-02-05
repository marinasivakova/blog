import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTag } from "../../store/postReducer";

const Tag = () => {
  let ref = useRef(null);
  let dispatch = useDispatch()
  const addTag = () => {
    if (ref.current.value) {
        dispatch(updateTag({tag: ref.current.value}));
        ref.current.value = ''
    }
  };
  const onDelete = () => {
    if (ref.current.value) {
        ref.current.value = ''
    }
  }
  return (
    <div className="tags__tag">
      <input
        ref={ref}
        className="input input--tag"
        name="tag"
        placeholder="Tag"
      />
      <button type="button" className="btn btn--tag" onClick={onDelete}>Delete</button>
      <button type="button" onClick={addTag} className="btn btn--tag btn--tag-blue">
        Add tag
      </button>
    </div>
  );
};
export default Tag;
