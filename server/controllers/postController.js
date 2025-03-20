const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
    async createPost(req, res){
        
        try{
            const {title, content, userId, } = req.body;
            const newPost = new Post({
                title,
                content,
                user:userId
            });

            const post = await newPost.save();
            
            const updateUser = await User.findByIdAndUpdate(
                userId,
                {$push: {posts: post._id}},
                {new: true}
            );
            return res.status(201).json({message: "Post created successfully", post, updateUser});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async getAllPosts(req, res){
        try{
            const {page, limit, orderBy = "createdAt", sortBy = -1} = req.query;
            const offset = (page - 1) * limit;

            const posts = await Post.find().limit(limit).skip(offset).sort({[orderBy]: parseInt(sortBy)}).populate("user", "name email");

            return res.status(200).json({message: "Post fetched successfully!", posts});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async updatePost(req, res) {
        try {
            const { postId } = req.params;
            const { title, content } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { title, content },
                { new: true }
            );
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            return res.status(200).json({ message: "Post updated successfully", updatedPost });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            const { postId } = req.params;
            const deletedPost = await Post.findByIdAndDelete(postId);
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            await User.findByIdAndUpdate(deletedPost.user, { $pull: { posts: postId } });
            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PostController();