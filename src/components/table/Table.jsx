import UserRow from "../userRow/UserRow";
import React from "react";
import style from "./Table.module.scss"

const Table = ({sortHandler, currentUsers, setActiveModal, sortName, direction}) => {
    const columnsNames = {
        'id': 'id',
        'firstName': 'First name',
        'lastName': 'Last name',
        'email': 'Email',
        'phone': 'Phone',
        'state': 'State'
    };
    return (
        <table className={style.table}>
            <thead>
            <tr>
                {Object.entries(columnsNames).map(([key, value]) =>
                    <th key={key} onClick={() => {
                        sortHandler(key);
                    }} className={sortName === key && direction === -1 ? style.toggle : ''}
                    >{value}
                    </th>
                )}
            </tr>
            </thead>
            <tbody>
            {currentUsers.map(u => <UserRow user={u} key={u.id + u.email}
                                            setActiveModal={setActiveModal}/>)}
            </tbody>
        </table>);
}
export default Table;
