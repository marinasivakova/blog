import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./newArticle.css";
import TagList from "../../components/tagList/tagList";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/postReducer";
import { useEffect } from "react";
import connectToAPI from "../../client/client";
import { updateUser } from "../../store/userReducer";
import { ErrorMessage } from "@hookform/error-message";

const NewArticle = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const postSelector = useSelector((s) => s.post);
  const dispatch = useDispatch();
  useEffect(() => {
    connectToAPI("user").then((user) => {
      dispatch(updateUser(user));
    });
    if (slug) {
      connectToAPI("article", slug)
        .then((response) => {
          dispatch(updatePost(response));
        })
    } else {
      dispatch(updatePost({tagList: [], description: null, body: null, title: null}));
    }
  }, [dispatch, slug]);
  const { handleSubmit, register, formState: { errors }, } = useForm();
  if (!document.cookie) {
    return <Navigate to="/sign-in" replace />;
  }
  const onSubmit = (data) => {
    dispatch(updatePost({ ...data, tagList: [...postSelector.tagList] }));
    if (slug) {
      connectToAPI("update-article", { ...data, tagList: [...postSelector.tagList] , slug: slug});
    }
    connectToAPI("new-article", { ...data, tagList: [...postSelector.tagList] });
    navigate('/');
  };
  return (
    <div className="form-wrapper">
      <form className="form form--wide" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">
          {slug ? "Edit article" : "Create new article"}
        </h2>
        <label htmlFor="title">Title</label>
        <input
          placeholder="Title"
          defaultValue={slug ? postSelector.title : null}
          type="text"
          name="title"
          id="title"
          className={errors?.title?.message ? "input input--error" : "input input--no-error"}
          {...register("title", {
            required: "This is required.",
            validate: (value) => !!value.trim() || "This is required.",
          })}
        />
        <ErrorMessage errors={errors} name="title" />
        <label htmlFor="description">Short description</label>
        <input
          placeholder="Short description"
          defaultValue={slug ? postSelector.description : null}
          type="text"
          name="description"
          id="description"
          className={errors?.description?.message ? "input input--error" : "input input--no-error"}
          {...register("description", {
            required: "This is required.",
            validate: (value) => !!value.trim() || "This is required.",
          })}
        />
        <ErrorMessage errors={errors} name="description" />
        <label htmlFor="body">Text</label>
        <textarea
          placeholder="Text"
          defaultValue={slug ? postSelector.body : null}
          name="body"
          id="body"
          className={errors?.body?.message ? "input--text input input--error" : "input--text input input--no-error"}
          {...register("body", {
            required: "This is required.",
            validate: (value) => !!value.trim() || "This is required.",
          })}
        />
        <ErrorMessage errors={errors} name="body" />
        <label>Tags</label>
        <TagList tagList={postSelector.tagList}/>
        <input
          type="submit"
          value="Send"
          className="input submit-btn submit-btn--half"
        />
      </form>
    </div>
  );
};
export default NewArticle;
