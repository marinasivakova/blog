import { useDispatch } from "react-redux";
import Tag from "../tag/tag";
import { removeTag } from "../../store/postReducer";

const TagList = ({ tagList }) => {
  let jsxTagList = null;
  let dispatch = useDispatch();

  const deleteTag = (tag) => {
    dispatch(removeTag({ tag: tag }));
  };
  if (tagList.length) {
    jsxTagList = tagList.map((tag) => {
      return (
        <div className="tags__tag" key={tag}>
          <input className="input input--tag" name="tag" value={tag} disabled />
          <button
            type="button"
            className="btn btn--tag"
            onClick={(e) => {
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
      );
    });
  }
  return (
    <div className="tags">
      {jsxTagList}
      <Tag />
    </div>
  );
};
export default TagList;
