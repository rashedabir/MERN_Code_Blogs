const Blogs = require("../models/blogModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const { title, description, images, category } = req.body;
      if (!title || !description || !category) {
        return res.status(400).json({ msg: "Inavild Blog Details" });
      }
      if (!images) {
        return res.status(400).json({ msg: "No Image is Selected" });
      }
      const newBlog = new Blogs({
        title,
        description,
        images,
        category,
      });
      await newBlog.save();
      res.json({ msg: "Created a Blog" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getBlogs: async (req, res) => {
    try {
      const features = new APIfeatures(Blogs.find(), req.query).paginating();

      const blogs = await features.query;

      res.json({
        status: "success",
        result: blogs.length,
        blogs: blogs,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateBlogs: async (req, res) => {
    try {
      const { title, description, images, category } = req.body;
      if (!title || !description || !category) {
        return res.status(400).json({ msg: "Inavild Product Details" });
      }
      if (!images) {
        return res.status(400).json({ msg: "No Image is Selected" });
      }
      await Blogs.findOneAndUpdate(
        { _id: req.params.id },
        { title, description, images, category }
      );
      res.json({ msg: "Blog is Updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteBlogs: async (req, res) => {
    try {
      await Blogs.findByIdAndDelete(req.params.id);
      res.json({ msg: "Blog is Deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = blogCtrl;
