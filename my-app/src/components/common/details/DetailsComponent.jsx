// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../Spinner';
import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';

import { selectItemById, selectUserFromCatalog } from '../../../slices/itemsSlice';
import { api } from '../../../services/dataService';
import { useEffect, useState } from 'react';

export default function Details() {
    const { id } = useParams();
    const item = useSelector(state => selectItemById(state, id));
    const user = useSelector(state => selectUserFromCatalog(state));
    console.log(user);
    console.log(item);


    // if (item.item) {
    //     const isOwner = item.item.owner === item.user?._id;
    //     if (isOwner) {
    //         return (
    //             <Owner item={item} />
    //         );
    //     }
    //     return (
    //         <NotOwner item={item} setNewState={setNewState}/>
    //     );
    // }

    return (
        <Spinner />
    );
}