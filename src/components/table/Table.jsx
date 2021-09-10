import UserRow from "../userRow/UserRow";
import React from "react";
import style from "./Table.module.scss"

const Table = ({sortHandler, currentUsers, setActiveModal, sortName, direction}) => {
    return (
        <table className={style.table}>
            <thead>
            <tr>
                <th onClick={() => {
                    sortHandler("id");
                }}
                    className={sortName === "id" && direction === -1 ? style.toggle : ''}
                >id
                </th>
                <th onClick={() => {
                    sortHandler("firstName");
                }}
                    className={sortName === "firstName" && direction === -1 ? style.toggle : ''}
                >First name
                </th>
                <th onClick={() => {
                    sortHandler("lastName");
                }}
                    className={sortName === "lastName" && direction === -1 ? style.toggle : ''}
                >Last name
                </th>
                <th onClick={() => {
                    sortHandler("email");
                }}
                    className={sortName === "email" && direction === -1 ? style.toggle : ''}
                >Email
                </th>
                <th onClick={() => {
                    sortHandler("phone");
                }}
                    className={sortName === "phone" && direction === -1 ? style.toggle : ''}
                >Phone
                </th>
                <th onClick={() => {
                    sortHandler("state");
                }}
                    className={sortName === "state" && direction === -1 ? style.toggle : ''}
                >State
                </th>
            </tr>
            </thead>
            <tbody>
            {currentUsers.map(u => <UserRow user={u} key={u.id + u.email}
                                            setActiveModal={setActiveModal}/>)}
            </tbody>
        </table>);
}
export default Table;