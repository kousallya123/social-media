const Post=require('../model/post')
const Comment=require('../model/comment')

const addPost = async (req, res) => {
    try {
      if (req.file) {
        
      const newPostData = JSON.parse(req.body.newPost);
      console.log(newPostData, 'imagesssssssssssssssssssssssssss');
        const newPost = new Post(newPostData);
        const savedPost = await newPost.save();
        res.json({message:"success",data:savedPost});
      } else {
        res.json('File is required');
       
      }
    } catch (error) {
      res.json(error);
    }
  };



  const getPost = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('userId', ['username', 'email', 'profileImage'])
        .populate('likes', ['username', 'email', 'profileImage']) 
        .sort({ createdAt: -1 })
        .exec();
  console.log(posts);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const likePost=async(req,res)=>{
    console.log(req.body.userId);
    console.log(req.params.id);
    try{
        console.log('like');
        const post=await Post.findById(req.params.id)
        console.log(post);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.json({data:"liked",message:"The post has been liked"})

        }else{
            await post.updateOne({$pull:{likes:req.body.userId}}) 
            res.json({data:"unliked",message:"The post has been unliked"})
        }
    }catch(error){
        res.json(error)
    }
   }

   const addComment=async(req,res)=>{
    const comment=new Comment(req.body)
    try {
        const comments=await comment.save()
        res.json({data:comments,message:"added",succes:true})
    } catch (error) {
        res.json(error)
        
    }
 }
 
 const getComment=async(req,res)=>{
    try {
      const postComment=await Comment.find({postId:req.params.id}).populate("userId")
      res.json(postComment)
        
    } catch (error) {
       res.json(error) 
    }
 }
   
  module.exports={addPost,getPost,likePost,addComment,getComment}