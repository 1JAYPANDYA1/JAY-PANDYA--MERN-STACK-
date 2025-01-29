import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  incrementProductQuantity,
  decrementProductQuantity,
  checkUser,
} from '../redux/productSlice';
import AdminLayout from "../components/AdminLayout";
import { toast } from 'react-toastify';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(checkUser())
      .then((data) => {
      })
      .catch((error) => {
        console.log('User not authenticated', error);
      });
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(checkUser())
    .then((data) => {
    })
    .catch((error) => {
      console.log('User not authenticated', error);
    });
  if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
          toast.error("Please fill out all fields!");
    return;
  }

    const productData = {
      ...newProduct,
      price: Math.max(1, +newProduct.price),
      quantity: Math.max(1, +newProduct.quantity),
    };

    if (editingProduct) {
      dispatch(updateProduct({ ...productData, id: editingProduct.id }));
      setEditingProduct(null);
    } else {
      dispatch(addProduct(productData));
    }
    setNewProduct({ name: '', price: '', quantity: '' });
  };

  const handleEdit = (product) => {
    dispatch(checkUser())
    .then((data) => {
    })
    .catch((error) => {
      console.log('User not authenticated', error);
    });
    setEditingProduct(product);
    setNewProduct({
      ...product,
      price: Math.max(1, product.price).toString(),
      quantity: Math.max(1, product.quantity).toString(),
    });
  };
const handleDelete=(id)=>{
  dispatch(checkUser())
  .then((data) => {
  })
  .catch((error) => {
    console.log('User not authenticated', error);
  });
  dispatch(deleteProduct({ id:id }))
}
const handleIncrement=(id)=>{
  dispatch(checkUser())
  .then((data) => {
  })
  .catch((error) => {
    console.log('User not authenticated', error);
  });
  dispatch(incrementProductQuantity({ id: id}))
}
const handleDecrement=(id)=>{
  dispatch(checkUser())
  .then((data) => {
  })
  .catch((error) => {
    console.log('User not authenticated', error);
  });
  dispatch(decrementProductQuantity({ id: id }))
}
return (
  <AdminLayout>
    <div className="max-w-4xl mx-auto mt-4 sm:mt-10 p-4 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-4 sm:mb-6">
        Product Management
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none w-full"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          min="1"
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none w-full"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Math.max(1, e.target.value) })}
        />
        <input
          type="number"
          placeholder="Quantity"
          min="1"
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none w-full"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: Math.max(1, e.target.value) })}
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-md transition-all w-full"
        >
          {editingProduct ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-indigo-100 text-indigo-900">
              <th className="border border-gray-300 p-2 sm:p-3">Product</th>
              <th className="border border-gray-300 p-2 sm:p-3">Price</th>
              <th className="border border-gray-300 p-2 sm:p-3">Qty</th>
              <th className="border border-gray-300 p-2 sm:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No Products Available
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="text-center hover:bg-gray-50 transition-all">
                  <td className="border border-gray-300 p-2 sm:p-3 text-sm sm:text-base">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-3 text-sm sm:text-base">
                    ${product.price}
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-3">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => handleDecrement(product.id)}
                        className="bg-emerald-500 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-emerald-600 shadow-md text-sm sm:text-base"
                        disabled={product.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-semibold min-w-[30px] sm:min-w-[40px] text-sm sm:text-base">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className="bg-emerald-500 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-emerald-600 shadow-md text-sm sm:text-base"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 sm:p-3">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-3 sm:px-4 py-1 rounded-lg hover:bg-yellow-600 shadow-md text-sm sm:text-base w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-rose-500 text-white px-3 sm:px-4 py-1 rounded-lg hover:bg-rose-600 shadow-md text-sm sm:text-base w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
);
};

export default ProductManagement;
