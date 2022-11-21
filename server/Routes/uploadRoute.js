import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// const filter = function (req, file, cb) {
//   if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  //   fileFilter: filter,
});

router.post('/', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('file uploaded sucessfully');
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
