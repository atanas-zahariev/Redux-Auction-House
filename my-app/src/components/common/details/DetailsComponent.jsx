// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../Spinner';
import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';

import { selectItemById } from '../../../slices/itemsSlice';
import { api } from '../../../services/dataService';
import { useEffect, useState } from 'react';

export default function Details() {
    const { id } = useParams();
    let item = useSelector(state => selectItemById(state, id));

    // console.log(item);

    const {getSpecificDataWithId} = api();
    
    const [item1,setItem] = useState({});

    const getItem = async () => {
        try {
            const result = await getSpecificDataWithId(id);
            setItem(item => ({...item,...result}));
        } catch (error) {
            // getError(error);
        }
    };

    useEffect(() => {
        // cleanError();
        getItem();
        // eslint-disable-next-line
    }, []);

     console.log(item1);
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