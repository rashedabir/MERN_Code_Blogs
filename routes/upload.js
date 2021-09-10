const router = require("express").Router();
const uploadCtrl = require("../controller/uploadCtrl");
const auth = require("../middleware/auth");

router.post("/upload", auth, uploadCtrl.uploadFile);
router.post("/destroy", auth, uploadCtrl.deleteFile);

module.exports = router;
