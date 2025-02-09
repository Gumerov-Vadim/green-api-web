import React from 'react';
import ProfileSVG from '../SVG/ProfileSVG';

const UserAvatar = ({ avatar, ...props }) => {
    return avatar && (
                    <img src={avatar} alt="profile avatar" {...props} />
                )||
                    <ProfileSVG {...props} />
                }


export default UserAvatar;
