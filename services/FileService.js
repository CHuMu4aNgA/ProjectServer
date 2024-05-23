class FileService {
    uploadImage(filename) {
        return {
            url: `uploads/${filename}`,
        }
    }

    uploadImages(thumb, gallery) {
        const thumbUrl = `uploads/${thumb.filename}`
        const galleryUrl = gallery.map((img) => `uploads/${img.filename}`)
        return {
            thumbUrl,
            galleryUrl
        }
    }
}

export const fileService = new FileService()