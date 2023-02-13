import React, { useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './post/Sidebar';
import CreatePost from './post/Create';
import PostList from './post/List';
import { UserContext } from '../context/UserContext'

const Home = () => {
    const { user } = useContext(UserContext);
    let avatar = user.data.user.avatar;

    return (
        <section clasasName="home">
            <Navbar />
            <div className="main">
                <div className="col-md-18">
                    <CreatePost avatar={avatar} />
                    <PostList />
                </div>
            </div>
        </section>
    )
}

export default Home;