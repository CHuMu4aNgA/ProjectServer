import fs from 'fs'
import multer from 'multer'
import getExtFile from './getExtFile.js'
import { v4 as uuidv4 } from 'uuid'


const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    callback(null, `${uuidv4()}.${getExtFile(file.originalname)}`)
  },
})

export const upload = multer({ storage })