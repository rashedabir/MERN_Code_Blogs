import React from "react";

function CategoryModal({
  category,
  setCategory,
  handleSubmit,
  setOnEdit,
  onEdit,
}) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              ADD CATEGORY
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setOnEdit(false);
                setCategory("");
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
              <label for="floatingInput">Category Name</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn custom_button w-100 text-uppercase"
              onClick={() => {
                handleSubmit();
              }}
            >
              {onEdit ? "update" : "save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
