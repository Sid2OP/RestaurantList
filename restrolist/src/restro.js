import React, { useState } from 'react';
import './restro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const Restro = () => {
  const initialRestaurants = [
    {
      id: 1,
      name: 'Restaurant A',
      address: '123 Main St',
      pincode: '12345',
      mobile: '1234567890',
      email: 'restauranta@example.com',
      website: 'www.restauranta.com',
    },
    {
      id: 2,
      name: 'Restaurant B',
      address: '456 Elm St',
      pincode: '54321',
      mobile: '9876543210',
      email: 'restaurantb@example.com',
      website: 'www.restaurantb.com',
    },
  ];

  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    mobile: '',
    email: '',
    website: '',
  });
  const [emptyFieldWarning, setEmptyFieldWarning] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const getNextId = () => {
    return restaurants.length > 0 ? restaurants[restaurants.length - 1].id + 1 : 1;
  };

  const handleAdd = (data) => {
    const newRestaurant = { id: getNextId(), ...data };
    setRestaurants([...restaurants, newRestaurant]);
    setShowAddForm(false);
    setFormData({
      name: '',
      address: '',
      pincode: '',
      mobile: '',
      email: '',
      website: '',
    })
  };

  const handleEdit = (data) => {
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === selectedRestaurant.id ? { ...restaurant, ...data } : restaurant
    );
    setRestaurants(updatedRestaurants);
    setShowEditForm(false);
  };

  const handleDelete = (restaurant) => {
    const updatedRestaurants = restaurants.filter((r) => r.id !== restaurant.id);
    setRestaurants(updatedRestaurants);
  };

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowEditForm(true);
    setFormData(restaurant);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.address ||
      !formData.pincode ||
      !formData.mobile ||
      !formData.email ||
      !formData.website
    ) {
      setEmptyFieldWarning('Please fill in all the fields');
    } else if (formData.pincode.length !== 6) {
      setPincodeError('Pincode should be 6 digits');
    } else if (formData.mobile.length !== 10) {
      setMobileError('Mobile number should be 10 digits');
    } else {
      setEmptyFieldWarning('');
      setPincodeError('');
      setMobileError('');
      handleAdd(formData);
    }
  };

  return (
    <div>
      <h1>Restaurant Listing App</h1>
      <button className='new' onClick={() => setShowAddForm(true)}>Add Restaurant  <FontAwesomeIcon icon={faPlus} /> </button>

      {/* Add Restaurant Form */}
      {showAddForm && (
        <div>
          <div className="popup-overlay"></div>
          <div className="popup">
            <h2>Add New Restaurant</h2>
            <form onSubmit={handleAddFormSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <input
                type="number"
               
                placeholder="Pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
              {pincodeError && <p style={{ color: 'red' }}>{pincodeError}</p>}
              <input
                type="number"
                placeholder="Mobile Number"
                maxLength={10}

                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
              {emptyFieldWarning && <p style={{ color: 'red' }}>{emptyFieldWarning}</p>}
              <div>
                <button type="submit">Add Restaurant</button>
                <button onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Restaurant Form */}
      {showEditForm && (
        <div>
          <div className="popup-overlay"></div>
          <div className="popup">
            <span className="close" onClick={() => setShowEditForm(false)}>
              &times;
            </span>
            <h2>Edit Restaurant Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(formData);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
              <div>
                <button type="submit">Update Restaurant</button>
                <button onClick={() => setShowEditForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restaurant Table */}
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr key={restaurant.id}>
              <td>{index + 1}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.address}</td>
              <td>{restaurant.pincode}</td>
              <td>{restaurant.mobile}</td>
              <td>{restaurant.email}</td>
              <td>{restaurant.website}</td>
              <td>
                <button  onClick={() => handleEditClick(restaurant)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDelete(restaurant)}> <FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Restro;
