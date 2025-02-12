import React from 'react';
import ProfileSVG from '../SVG/ProfileSVG';
import styles from './UserAvatar.module.css';

const UserAvatar = ({ avatar, ...props }) => {
    return avatar && (
                    <img 
                    src={avatar}
                    alt="profile avatar"
                    className={styles.userAvatar}
                    {...props} />
                )||
                    <ProfileSVG {...props} />
                }


export default UserAvatar;
