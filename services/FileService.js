class FileService {

    uploadMultiImg(files) {
        const filesUrl = files 
            ? files.map((img) => `uploads/${img.filename}`)
            : []
            return filesUrl
    }

    uploadImage(filename) {
        return {
            url: `uploads/${filename}`,
        }
    }

    uploadImages(thumb, gallery) {
        const thumbUrl = thumb ? `uploads/${thumb.filename}` : ''
        const galleryUrl = gallery ? gallery.map(
            (img) => `uploads/${img.filename}`
            ) : []
        return { 
            thumbUrl,
            galleryUrl
        }
    }
}

export const fileService = new FileService()