import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../data/firebase';
import Nav from '../components/Nav';

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
}

function Calculate() {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(database, "items"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Item[];
    setItems(newData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity.toString());
    setPrice(item.price.toString());
    setDate(new Date(item.date).toISOString().substring(0, 16));
    toggleModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(database, "items", editingItem.id), {
          name,
          quantity: Number(quantity),
          price: Number(price),
          date: new Date(date).toISOString(),
        });
      } else {
        await addDoc(collection(database, "items"), {
          name,
          quantity: Number(quantity),
          price: Number(price),
          date: new Date(date).toISOString()
        });
      }
      fetchPost();
      toggleModal();
      setEditingItem(null);
      setName('');
      setQuantity('');
      setPrice('');
      setDate('');
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(database, "items", id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const filteredItems = items.filter(item => {
    const itemDate = new Date(item.date);
    const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateRange = (!startDate || itemDate >= new Date(startDate)) &&
                             (!endDate || itemDate <= new Date(endDate));
    return matchesSearchQuery && matchesDateRange;
  });

  return (
    <>
      <Nav/>
      <div className='p-5 flex justify-end m-4'>
        <div className='flex items-center mb-4 space-x-4'>
          <div>
            <button 
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={toggleModal}
            >
              เพิ่มรายการ
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-end m-4 space-y-4 md:space-y-0 md:space-x-4'>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="ค้นหา..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">{editingItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ชื่อ
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  จำนวน
                </label>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ราคา
                </label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  วันที่และเวลา
                </label>
                <input 
                  type="datetime-local"
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingItem ? "บันทึกการแก้ไข" : "เพิ่มรายการ"}
                </button>
                <button 
                  type="button" 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    toggleModal();
                    setEditingItem(null);
                  }}
                >
                  ปิด
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='p-5 m-4'>
        <h2 className='text-xl mb-4'>รายการสั่งซื้อสินค้า</h2>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                ชื่อ
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                จำนวน
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                ราคา
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                วันที่
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                การกระทำ
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {item.name}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {item.quantity}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {item.price}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {new Date(item.date).toLocaleString()}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-2'>
                  <button 
                    onClick={() => handleEdit(item)} 
                    className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline'
                  >
                    แก้ไข
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline'
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Calculate;
