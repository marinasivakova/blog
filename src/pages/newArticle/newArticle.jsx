/* eslint-disable react/jsx-props-no-spreading */
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './newArticle.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, React } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import TagList from '../../components/tagList/tagList';
import { updatePost } from '../../store/postReducer';
import connectToAPI from '../../client/client';
import { updateUser } from '../../store/userReducer';

function NewArticle() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const postSelector = useSelector((s) => s.post);
  const dispatch = useDispatch();
  useEffect(() => {
    connectToAPI('user').then((user) => {
      dispatch(updateUser(user));
    });
    if (slug) {
      connectToAPI('article', slug).then((response) => {
        dispatch(updatePost(response));
      });
    } else {
      dispatch(
        updatePost({
          tagList: [],
          description: null,
          body: null,
          title: null,
        }),
      );
    }
  }, [dispatch, slug]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  if (!document.cookie) {
    return <Navigate to="/sign-in" replace />;
  }
  const onSubmit = (data) => {
    const tagList = [...postSelector.tagList];
    if (postSelector.singularTag !== '') {
      tagList.push(postSelector.singularTag);
    }
    dispatch(updatePost({ ...data, tagList }));
    if (slug) {
      return connectToAPI('update-article', {
        ...data,
        tagList,
        slug,
      }).then(() => navigate('/'));
    }
    return connectToAPI('new-article', {
      ...data,
      tagList,
    }).then(() => navigate('/'));
  };
  return (
    <div className="form-wrapper">
      <form className="form form--wide" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">
          {slug ? 'Edit article' : 'Create new article'}
        </h2>
        <label htmlFor="title">
          Title
          <input
            placeholder="Title"
            defaultValue={slug ? postSelector.title : null}
            type="text"
            name="title"
            id="title"
            className={
              errors?.title?.message
                ? 'input input--error'
                : 'input input--no-error'
            }
            {...register('title', {
              required: 'This is required.',
              validate: (value) => !!value.trim() || 'This is required.',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="title" />
        <label htmlFor="description">
          Short description
          <input
            placeholder="Short description"
            defaultValue={slug ? postSelector.description : null}
            type="text"
            name="description"
            id="description"
            className={
              errors?.description?.message
                ? 'input input--error'
                : 'input input--no-error'
            }
            {...register('description', {
              required: 'This is required.',
              validate: (value) => !!value.trim() || 'This is required.',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="description" />
        <label htmlFor="body">
          Text
          <textarea
            placeholder="Text"
            defaultValue={slug ? postSelector.body : null}
            name="body"
            id="body"
            className={
              errors?.body?.message
                ? 'input--text input input--error'
                : 'input--text input input--no-error'
            }
            {...register('body', {
              required: 'This is required.',
              validate: (value) => !!value.trim() || 'This is required.',
            })}
          />
        </label>
        <ErrorMessage className="error-message" as="span" errors={errors} name="body" />
        <span>Tags</span>
        <TagList tagList={postSelector.tagList} />
        <input
          type="submit"
          value="Send"
          className="input submit-btn submit-btn--half"
        />
      </form>
    </div>
  );
}
export default NewArticle;
