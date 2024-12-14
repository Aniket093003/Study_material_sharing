import Book from "../models/material.model.js";

const uploadMaterial = async (req, res) => {
    try {
        // Fields from req.body (except pdf file)
        const { title, category, isPublic, bookTitle, bookAvatar } = req.body;
        const userId = req.user.id; // Get the user ID from JWT
    
        if (!title || !category || !bookTitle || !bookAvatar || !req.file) {
            return res.status(400).json({ error: "All fields are required." });
        }
    
        // Upload the PDF file to Cloudinary
        const pdfUpload = await cloudinaryV2.uploader.upload_stream(
          { resource_type: "auto" }, // cloudinary upload type
          (error, result) => {
            if (error) {
                console.error("Error uploading PDF:", error);
                return res.status(500).json({ error: "Error uploading PDF." });
            }
    
            // Create a new material document
            const newBook = new Book({
                title,
                category,
                book: [
                    {
                        title: bookTitle,
                        avatar: bookAvatar, // Can be a URL or uploaded file
                        pdf: result.secure_url, // Cloudinary URL for PDF
                    },
                ],
                uploadedBy: userId,
                isPublic,
            });
    
            // Save to database
            newBook.save()
                .then((savedMaterial) => {
                    res.status(200).json(savedMaterial);
                })
                .catch((err) => {
                    console.error("Error saving to DB:", err);
                    res.status(500).json({ error: "Error saving to database." });
                });
          }
        );
    
        req.file.stream.pipe(pdfUpload); // Pipe the file stream to Cloudinary
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Server error. Please try again." });
    }
};
const getMaterial = async (req, res) => {
    try {
        const materials = await Book.find({ isPublic: true }).populate('uploadedBy', 'name email');
        res.json(materials);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch materials' });
      }
};
const MyLibrary = async (req, res) => {
    try {
        const materials = await Book.find({ uploadedBy: req.user.id }).populate('uploadedBy', 'name email');
        res.json(materials);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user materials' });
      }
}


export { uploadMaterial, getMaterial, MyLibrary};