import React,{useEffect,useState} from 'react';
import Post from './Post';
import {getPosts,likePost} from './actions';
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../Loader';

const PostList = () => {
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [nextPage,setNextPage] = useState('');

    useEffect(() =>{
        const fetchData = async () =>{
            setLoading(true);
            let response = await getPosts();
        if(response) {
            setNextPage(response.next)
            setPosts(response.results);
            setLoading(false)
        }
        }
    fetchData()},[])

    const fetchNextPage = async () => {
        let response = await getPosts(nextPage);
        if(response) {
            setNextPage(response.next)
            setPosts(posts.concat(response.results))
        }
    }
    const postLike = async (postId) => {
        await likePost(postId);
    }

    return (
    <div>

    { loading ? <Loader/> : 
    
    <InfiniteScroll id="post-list" 
    dataLength={posts.length} 
    next={fetchNextPage} 
    hasMore={nextPage?true:false} 
    loader={<Loader/>}>
    
    {posts.map((post)=>{
        return <Post key={post.id} 
        id={post.id} 
        caption={post.body} 
        image={post.image} 
        total_likes={post.total_likes} 
        userId={post.author_detail.id} 
        username={post.author_detail.username} 
        avatar={post.author_detail.avatar} 
        handleLike={()=>postLike(post.id)}
        />
    })}

    </InfiniteScroll>}

    </div>
    )
}

export default PostList;