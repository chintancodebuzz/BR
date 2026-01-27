import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Home, Briefcase, Map } from "lucide-react";
import { createAddress, fetchAddresses, modifyAddress, removeAddress, setMainAddress } from "../../../slices/authSlice";
import ManageAddressView from "../view/manageaddress.view";

const ManageAddressContainer = () => {
    const dispatch = useDispatch();
    const { addresses, addressLoading: storeLoading, addressSuccess, addressMessage } = useSelector((state) => state.auth);

    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [formData, setFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        zipCode: "",
        type: "Home"
    });

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (addressSuccess && addressMessage) {
            setIsAdding(false);
            setEditingId(null);
            resetForm();
        }
    }, [addressSuccess, addressMessage]);

    const resetForm = () => {
        setFormData({
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "India",
            zipCode: "",
            type: "Home"
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            dispatch(modifyAddress({ id: editingId, data: formData }));
        } else {
            dispatch(createAddress(formData));
        }
    };

    const handleEdit = (address) => {
        setEditingId(address.id);
        setFormData({
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            zipCode: address.zipCode,
            type: address.type
        });
        setIsAdding(true);
    };

    const handleDelete = (id) => {
        setAddressToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (addressToDelete) {
            dispatch(removeAddress(addressToDelete));
            setDeleteModalOpen(false);
            setAddressToDelete(null);
        }
    };

    const handleSetDefault = (id) => {
        dispatch(setMainAddress(id));
    };

    const getTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'home': return <Home className="w-4 h-4" />;
            case 'office': return <Briefcase className="w-4 h-4" />;
            default: return <Map className="w-4 h-4" />;
        }
    };

    return (
        <ManageAddressView
            addresses={addresses}
            addressLoading={storeLoading}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            editingId={editingId}
            setEditingId={setEditingId}
            deleteModalOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            confirmDelete={confirmDelete}
            handleSetDefault={handleSetDefault}
            getTypeIcon={getTypeIcon}
            resetForm={resetForm}
        />
    );
};

export default ManageAddressContainer;
