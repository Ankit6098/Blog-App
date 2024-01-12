const Blog = require('../models/blog');
// set up multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports.blog = async function(req, res){
    if (req.isAuthenticated()){
        const blogs = await Blog.find({}).populate('user');
        return res.render('blog', {
            title: 'Blog',
            blogs: blogs,
        });
    } else {
        return res.redirect('/authentication');
    }
}

// post a blog
// module.exports.postBlog = async function(req, res){
//     try {
//         console.log(req.file, 'file');
//         let newBlog = await Blog.create({
//             image: req.file.buffer,
//             contentType: req.file.mimetype,
//             title: req.body.title,
//             content: req.body.content,
//             // user: req.user._id,
//         });
//         if (newBlog){
//             console.log("Blog Posted Successfully");
//             req.flash('success', 'Blog Posted Successfully');
//             return res.redirect('back');
//         } else {
//             console.log("Error in posting blog");
//             req.flash('error', 'Error in posting blog');
//             return res.redirect('back');
//         }
//     } catch(err) {
//         req.flash('error', err);
//         return res.redirect('back');
//     }
// }

module.exports.postBlog = async function(req, res) {
    try {
        // Using upload.single('image') middleware for file upload
        upload.single('image')(req, res, async function(err) {
            if (err) {
                console.error('Error uploading file:', err);
                req.flash('error', 'Error uploading file');
                return res.redirect('back');
            }

            console.log(req.file, 'file');

            // Assuming you have a Blog model
            let newBlog = await Blog.create({
                image: req.file.buffer,
                contentType: req.file.mimetype,
                title: req.body.title,
                content: req.body.content,
                // user: req.user._id,
            });

            if (newBlog) {
                console.log("Blog Posted Successfully");
                req.flash('success', 'Blog Posted Successfully');
                return res.redirect('back');
            } else {
                console.log("Error in posting blog");
                req.flash('error', 'Error in posting blog');
                return res.redirect('back');
            }
        });
    } catch (err) {
        console.error('Error creating blog post:', err);
        req.flash('error', 'Error creating blog post');
        return res.redirect('back');
    }
};