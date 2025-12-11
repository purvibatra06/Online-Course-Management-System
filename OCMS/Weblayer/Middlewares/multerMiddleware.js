import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'preview') {
      cb(null, path.join(__dirname, '../../Public/images'));
    } else if (file.fieldname === 'videos') {
      cb(null, path.join(__dirname, '../../Public/videos'));
    } else {
      cb(new Error('Unexpected field name'), null);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });
const uploadLogo = upload.single('preview');
const uploadVideo = upload.single('videos');
export { uploadLogo, uploadVideo };