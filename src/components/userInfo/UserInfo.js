import React from 'react';
import style from "./UserInfo.module.scss"

const UserInfo = ({user, activeModal, setActiveModal}) => {
    return (<div>
            {user && <div
                className={activeModal ? style.modal + " " + style.active : style.modal}
                onClick={() => setActiveModal(false)}
            >
                <div className={activeModal ? style.modal__content + " " + style.active : style.modal__content}
                     onClick={(e) => e.stopPropagation()}>
                    <div className={style.modal__title}>Profile info:</div>
                    <div><b>Selected profile:</b> <i>{`${user.firstName} ${user.lastName}`}</i></div>
                    <div><b>Description:</b> <i>{user.description}</i></div>
                    <div><b>Address:</b> <i>{user.adress.streetAddress}</i></div>
                    <div><b> City:</b> <i>{user.adress.city}</i></div>
                    <div><b> State:</b> <i>{user.adress.state}</i></div>
                    <div><b>Index:</b> <i>{user.adress.zip}</i></div>
                </div>
            </div>}
        </div>
    );
};

export default UserInfo;