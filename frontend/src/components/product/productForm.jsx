import { Save, Trash2, Package, Tag, DollarSign, Image, FileText, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import Button from '../common/Button';

// Input Field Component
const InputField = ({ label, icon: Icon, error, children, required }) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            {Icon && <Icon size={16} className="text-gray-500" />}
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && (
            <p className="text-sm text-red-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full" />
                {error.message}
            </p>
        )}
    </div>
);

const ProductForm = ({ defaultValues, onSubmit, onDelete, isEdit, loading }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const watchedImage = watch('image');

    const departments = [
        { value: '', label: 'Select Department' },
        { value: 'men', label: 'Men & Accessories' },
        { value: 'women', label: 'Women & World' },
        { value: 'kids', label: 'Kids & Gear' },
        { value: 'clothing', label: 'Clothing & Fashion' },
        { value: 'watches-jewellery', label: 'Watches & Jewellery' },
        { value: 'home', label: 'Home & Garden' },
        { value: 'beauty', label: 'Beauty & Personal Care' },
    ];


    const tags = [
        { value: '', label: 'Select Tag' },
        { value: 'new-arrival', label: ' New Arrival' },
        { value: 'on-sale', label: ' On Sale' },
        { value: 'limited', label: ' Limited' },
        { value: 'best-seller', label: ' Best Seller' },
        { value: 'featured', label: ' Featured' },
        { value: 'premium', label: ' Premium' },
        { value: 'eco-friendly', label: ' Eco-Friendly' },
        { value: 'trending', label: ' Trending' },
        { value: 'exclusive', label: ' Exclusive' },
    ];

    const inputStyles = 'w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:border-yellow-500 focus:bg-white focus:ring-1 focus:ring-yellow-600/20 transition-all outline-none';

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">


                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {watchedImage && (
                        <div className="flex justify-center">
                            <img
                                src={watchedImage}
                                alt="Product preview"
                                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                onError={(e) => e.target.classList.add('hidden')}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">

                            <InputField label="Product Image" icon={Image} error={errors.image} required>
                                <input
                                    {...register('image', {
                                        required: 'Product image URL is required',
                                        pattern: {
                                            // Accepts any valid URL (including Unsplash, Cloudinary, etc.)
                                            value: /^https?:\/\/.+/i,
                                            message: 'Please enter a valid image URL',
                                        },
                                    })}
                                    placeholder="https://example.com/image.jpg"
                                    type="url"
                                    className={inputStyles}
                                />
                            </InputField>


                            <InputField label="Product Title" icon={FileText} error={errors.title} required>
                                <input
                                    {...register('title', {
                                        required: 'Product title is required',
                                        minLength: { value: 3, message: 'Title must be at least 3 characters' },
                                    })}
                                    placeholder="Enter product title"
                                    className={inputStyles}
                                />
                            </InputField>

                            <InputField label="Price" icon={DollarSign} error={errors.price} required>
                                <input
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0.01, message: 'Price must be greater than 0' },
                                        valueAsNumber: true,
                                    })}
                                    placeholder="0.00"
                                    type="number"
                                    step="0.01"
                                    className={inputStyles}
                                />
                            </InputField>

                            <InputField label="Brand" icon={Building} error={errors.brand} required>
                                <input
                                    {...register('brand', {
                                        required: 'Brand is required',
                                        minLength: { value: 2, message: 'Brand must be at least 2 characters' },
                                    })}
                                    placeholder="Enter brand name"
                                    className={inputStyles}
                                />
                            </InputField>
                        </div>

                        <div className="space-y-4">

                            <InputField label="Department" icon={Package} error={errors.department} required>
                                <select {...register('department', { required: 'Please select a department' })} className={inputStyles}>
                                    {departments.map((dept) => (
                                        <option key={dept.value} value={dept.value}>
                                            {dept.label}
                                        </option>
                                    ))}
                                </select>
                            </InputField>


                            <InputField label="Category" icon={Tag} error={errors.category} required>
                                <input
                                    {...register('category', {
                                        required: 'Category is required',
                                        minLength: { value: 2, message: 'Category must be at least 2 characters' },
                                    })}
                                    placeholder="e.g., Smartphones, Laptops, Shoes"
                                    className={inputStyles}
                                />
                            </InputField>



                            <InputField label="Product Tag" icon={Tag} error={errors.tag} required>
                                <select {...register('tag', { required: 'Please select a tag' })} className={inputStyles}>
                                    {tags.map((tag) => (
                                        <option key={tag.value} value={tag.value}>
                                            {tag.label}
                                        </option>
                                    ))}
                                </select>
                            </InputField>
                        </div>
                    </div>

                    <InputField label="Product Description" icon={FileText} error={errors.description} required>
                        <textarea
                            {...register('description', {
                                required: 'Product description is required',
                                minLength: { value: 10, message: 'Description must be at least 10 characters' },
                            })}
                            placeholder="Describe your product..."
                            rows={4}
                            className={`${inputStyles} resize-y`}
                        />
                    </InputField>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                        <Button type="submit" icon={Save} iconColor='text-yellow-600' disabled={loading}>
                            {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Add Product')}
                        </Button>
                        {isEdit && onDelete && (
                            <Button type="button" icon={Trash2} iconColor='text-red-500' onClick={onDelete} variant="danger">
                                Delete Product
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};


export default ProductForm;

























