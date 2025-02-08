import React from 'react';
import ProfileSVG from '../SVG/ProfileSVG';

const UserAvatar = ({ avatar }) => {
    return (
        <div className="user-avatar">
            <div className="user-avatar-image">
                {avatar && (
                    <img src={avatar} alt="profile avatar" />
                )||
                    <ProfileSVG />               
                }
            </div>
        </div>

    )
}

export default UserAvatar;
