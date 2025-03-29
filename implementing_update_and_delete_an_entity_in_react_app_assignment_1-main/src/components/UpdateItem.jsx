import { useState, useEffect } from 'react';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ item, onItemUpdated, onItemDeleted }) => {
    // 1. Create a state for the form
    const [formData, setFormData] = useState({
        name: '',
        status: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    // Update form data when a new item is selected
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                status: item.status
            });
            setMessage('');
        }
    }, [item]);

    // 3. Create a function to handle the form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 2. Create a function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        // Make PUT request to update the item
        fetch(`${API_URI}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to update door');
                return response.json();
            })
            .then(updatedItem => {
                setMessage('Door updated successfully!');
                if (onItemUpdated) onItemUpdated(updatedItem);
            })
            .catch(error => {
                setMessage(`Error: ${error.message}`);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    // Handle delete functionality
    const handleDelete = () => {
        if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;
        
        setIsSubmitting(true);
        setMessage('');

        fetch(`${API_URI}/${item.id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete door');
                return response.json();
            })
            .then(() => {
                setMessage('Door deleted successfully!');
                if (onItemDeleted) onItemDeleted();
            })
            .catch(error => {
                setMessage(`Error: ${error.message}`);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    if (!item) return null;

    return (
        <div className="update-item">
            <h2>Edit Door</h2>
            
            {message && <div className="message">{message}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Door Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="locked">Locked</option>
                    </select>
                </div>
                
                <div className="button-group">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="update-btn"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Door'}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={handleDelete} 
                        disabled={isSubmitting}
                        className="delete-btn"
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete Door'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;