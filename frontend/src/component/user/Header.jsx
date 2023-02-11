import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserLogo from '../../assets/user.png'
import { followUser, updateUser } from './actions'
import { useFormik } from 'formik';
import FormData from 'form-data';

const ProfileHeader = (props) => {
    /* let isProfilePage = useLocation().pathname; */
    const [image, setImage] = useState(''); 
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    /* const [followStatus, setFollowStatus] = useState(props.followState); */
    const handleImageUpload = (e) => {
        if (e.target.files.length) {
            let img = e.target.files[0];
            setImage(img);
        }
    }

    // initial data = values fetch from api 
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: props.username ? props.username : "",
            email: props.email ? props.email : "",
            bio: props.bio ? props.bio : "",
        },
        onSubmit: async (values) => {
            let form = new FormData();
            form.append("username", values.username)
            form.append("email", values.email)
            form.append("bio", values.bio)
            if (image) {
                form.append("avatar", image)
            }
            setLoading(true);
            let data = await updateUser(form);
            if (data) {
                // setUser(data);
                setUpdated(true);
                setLoading(false);
            }
        }
    })


    return (
        <div className="d-flex justify-content-start align-items-center">
            {/* update form modal */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="Menu" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <input className="form-control"
                                    name="username" placeholder="Username"
                                    onChange={formik.handleChange} id="login__input" value={formik.values.username} />

                                <input type="email" className="form-control my-2"
                                    name="email" placeholder="Email"
                                    onChange={formik.handleChange} id="login__input" value={formik.values.email} />

                                <input type="text"
                                    className="form-control my-2" name="bio" placeholder="Bio"
                                    onChange={formik.handleChange} id="login__input" value={formik.values.bio} />

                                <input type="file" accept="img/*" id="login__input" name="avatar" placeholder="Avatar"
                                    onChange={handleImageUpload} />

                                <button type="submit" id="editprofile_button" className="btn__primary mt-2 d-block">
                                    {loading ? "Updating" : "UPDATE"}
                                </button>
                                {updated && "Updated Successfully"}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProfileHeader;