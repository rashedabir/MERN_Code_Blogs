import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import CategoryModal from "../components/CategoryModal";
import { GlobalState } from "../context/GlobalState";

function Category() {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");
  let count = 1;

  console.log(state);

  const handleSubmit = async () => {
    if (onEdit) {
      try {
        await axios.put(
          `/api/category/${id}`,
          {
            name: category,
          },
          {
            headers: { Authorization: token },
          }
        );
        setCategory("");
        setCallback(!callback);
        toast.warn("Category Updated");
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      try {
        await axios.post(
          "/api/category",
          {
            name: category,
          },
          {
            headers: { Authorization: token },
          }
        );
        setCategory("");
        setCallback(!callback);
        toast.success("Category Added");
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const editCategory = (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id, name) => {
    if (window.confirm(`Want to delete ${name} Category`)) {
      await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
      toast.error("Category Deleted");
    }
  };

  return (
    <div className="container bg-white p-3 border">
      <div className="d-flex align-items-center justify-content-between my-3">
        <h5 className="text-uppercase title">categories</h5>
        <button
          className="btn custom_button text-uppercase"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          add category
        </button>
        <CategoryModal
          setCategory={setCategory}
          category={category}
          handleSubmit={handleSubmit}
          setOnEdit={setOnEdit}
          onEdit={onEdit}
        />
      </div>
      <div className="table-responsive my-5">
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr>
                  <th scope="row">{count++}</th>
                  <td className="text-capitalize">{category.name}</td>
                  <td className="d-flex py-3 justify-content-center action">
                    <i
                      className="fas fa-edit mx-2 edit_action"
                      onClick={() => {
                        editCategory(category._id, category.name);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    ></i>{" "}
                    <i
                      className="fas fa-minus-circle mx-2 text-danger"
                      onClick={() => {
                        deleteCategory(category._id, category.name);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
