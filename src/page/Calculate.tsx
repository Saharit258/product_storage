import React, { useState, useEffect } from 'react'
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore'
import { database } from '../data/firebase';
import Nav from '../components/Nav'

interface Item {
  id: string;
}

function Calculate() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(database, "qw"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Item[];
    setItems(newData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
     <Nav/>
        <div>Calculate</div>
    </>
  )
}

export default Calculate