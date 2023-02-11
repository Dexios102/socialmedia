import React, { useState } from 'react';
import UserLogo from '../../assets/user.png';
import { Link } from 'react-router-dom';
import { BsFillChatFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";

const Post = (props) => {
    const [liked, setLiked] = useState(false); //like post from List and all
    const [totalLikes, setTotalLikes] = useState(props.total_likes);
    const [deleted, setDeleted] = useState(false) // delete post from Profile page

    const likePost = () => {
        props.handleLike();
        setLiked(!liked);
        // if liked already remove one the like
        if (liked) {
            setTotalLikes(totalLikes - 1)
        } else {
            setTotalLikes(totalLikes + 1);
        }
    }

    const deletePost = () => {
        // handleDelete = props that is called in post profile component that will handle the delete api  
        props.handleDelete();
        setDeleted(true) // fades out the deleted post 
    }

    return (
        <div className={deleted ? "post__card deleted" : "post__card"}>
            <div className="post__header">
                <img src={props.avatar ? props.avatar : UserLogo} alt="" id="avatar" style={{ height: "2em", width: "2em", borderRadius: "50%" }} />
                <Link to={"/user/" + props.userId} className="text-dark ms-1">{props.username}</Link>
            </div>

            <div className="post__body">
                <p>{props.caption}</p>
            </div>
            <div className="post__image">
                {props.image && <img className="img-fluid" id="post__mainimage" src={props.image} alt="" style={{ width: "100%", height: "25em" }} />}

            </div>

            <div className="post__action">
                <span onClick={likePost}>
                    <i
                        className={liked ? "fas fa-heart text-primary" : "far fa-heart text-primary"} id="post_heart" />  {totalLikes}
                </span>

                <Link to={"/post/" + props.id} className="ms-4">
                    <a className='btn btn-success' id="action__button">Comment</a>
                </Link>

            </div>
        </div>
    )
}

export default Post;