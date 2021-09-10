import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "../context/GlobalState";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDreaft from "html-to-draftjs";
import { useHistory, useParams } from "react-router-dom";

function CreatePost() {
  const state1 = useContext(GlobalState);
  const [token] = state1.token;
  const [categories] = state1.categoryAPI.categories;
  const [blogs] = state1.blogAPI.blogs;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [callback, setCallback] = state1.blogAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");
  const state = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(state);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      blogs.forEach((blog) => {
        if (blog._id === params.id) {
          setOnEdit(true);
          setId(blog._id);
          setTitle(blog.title);
          setDescription(blog.description);
          setImage(blog.images);
          setCategory(blog.category);

          const contentBlock = htmlToDreaft(blog.description);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const _editorState = EditorState.createWithContent(contentState);
          setEditorState(_editorState);
        }
      });
    } else {
      setOnEdit(false);
      setId("");
      setTitle("");
      setDescription("");
      setImage(false);
      setCategory("");
    }
  }, [params.id, blogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(
          `/api/blogs/${id}`,
          {
            title: title,
            category: category,
            images: image,
            description: description,
          },
          { headers: { Authorization: token } }
        );
        setCallback(!callback);
        history.push("/");
        toast.warn("Post Updated");
      } else {
        await axios.post(
          "/api/blogs",
          {
            title: title,
            category: category,
            images: image,
            description: description,
          },
          { headers: { Authorization: token } }
        );
        setCallback(!callback);
        history.push("/");
        toast.success("Blog Posted");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
    <div className="container bg-white p-3 border">
      <h5 className="text-uppercase title py-3">create blog post</h5>
      <div className="upload rounded my-3">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          "Uploading..."
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label for="floatingInput">Title</label>
      </div>
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        >
          <option selected>select category</option>
          {categories &&
            categories.map((cat) => (
              <option value={cat.name}>{cat.name}</option>
            ))}
        </select>
        <label for="floatingSelect">Category</label>
      </div>
      <div className="mb-3">
        <Editor
          editorState={editorState}
          wrapperClassName="card"
          editorClassName="card-body"
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            setDescription(
              draftToHtml(convertToRaw(newState.getCurrentContent()))
            );
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="custom_button btn text-uppercase my-3 w-100"
      >
        {onEdit ? "update" : "post"}
      </button>
    </div>
  );
}

export default CreatePost;
