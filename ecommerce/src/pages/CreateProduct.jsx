import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Button,Spinner, Dropdown, Label, TextInput } from 'flowbite-react';
import { signInSuccess, signInFailure } from '../store/auth';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const CreateProduct = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.user);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, productImage: event.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

 const handleCreatePost = async (e) => {
  e.preventDefault();

  if (!formData.productName || !formData.productPrice || !formData.productDescription || !formData.productQuantity || !formData.productCategory) {
    toast.error('Please fill all the fields');
    return;
  }

  try {
    const res = await fetch('/api/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      toast.error(data.message);
      dispatch(signInFailure(data.message));
    }

    if (res.ok) {
      dispatch(signInSuccess(data));
      toast.success('Product created successfully');
    }
  } catch (error) {
    dispatch(signInFailure(error.message));
    toast.error(error.message);
  }
};
  
  return (
    <div className="min-h-screen mt-20">
      <form className="p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center space-y-8 " onSubmit={handleCreatePost}>
        <div className="mb-4 md:mr-4">
        <div className="mb-2 block">
            <Label htmlFor="productImage" value="Product Image" />
          </div>
          <input
            type="file"
            accept="image/*"
            id="productImage"
            name="productImage"
            className='rounded-full mb-2'
            onInput={handleImageChange}
            required
          />
          <div className="mb-2 block">
            <Label htmlFor="productName" value="Product Name" />
          </div>
          <TextInput id="productName" name="productName" type="text" placeholder="Product Name" required onChange={handleChange} />
        </div>
        <div className="mb-4 md:mr-4">
          <div className="mb-2 block">
            <Label htmlFor="productPrice" value="Product Price" />
          </div>
          <TextInput id="productPrice" name="productPrice" type="number" placeholder="Product Price" required onChange={handleChange} />
        </div>
        <div className="mb-4 md:mr-4">
          <div className="mb-2 block">
            <Label htmlFor="productDescription" value="Product Description" />
          </div>
          <TextInput id="productDescription" name="productDescription" placeholder="Product Description" type="text" required onChange={handleChange} />
        </div>
        <div className="mb-4 md:mr-4">
          <div className="mb-2 block">
            <Label htmlFor="productQuantity" value="Product Quantity" />
          </div>
          <TextInput id="productQuantity" name="productQuantity" type="number" placeholder="Product Quantity" required onChange={handleChange} />
        </div>
        <Dropdown
          label="Product Category"
          onChange={(selectedValue) => setFormData({...formData ,  productCategory: selectedValue })}
        >
          {['mens', 'womens', 'kids'].map((category) => (
            <Dropdown.Item key={category} onClick={() => setFormData({...formData , productCategory: category })}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Dropdown.Item>
          ))}
        </Dropdown>

        <Button type="submit" >{loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Submit'
            )} 
            </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
