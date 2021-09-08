import React from 'react';

const UserInfo = ({user}) => {
    return (<div>
            {user && <div>
                <div>Profile info:</div>
                <div> Selected profile: {`${user.firstName} ${user.lastName}`}</div>
                <div> Description: {user.description}</div>
                <div> Address: {user.adress.streetAddress}</div>
                <div> City: {user.adress.city}</div>
                <div> State: {user.adress.state}</div>
                <div> Index: {user.adress.zip}</div>
            </div>}
        </div>
    );
};

export default UserInfo;