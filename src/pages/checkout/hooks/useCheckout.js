import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses, createAddress } from "../../../slices/authSlice";
import * as orderApi from "../../../services/orderApi";
import { fetchCart } from "../../../slices/cartSlice";

export const useCheckout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, loading: cartLoading } = useSelector((state) => state.cart);
    const { addresses, addressLoading: storeAddressLoading } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalView, setModalView] = useState("list"); // 'list' | 'create'
    const [formData, setFormData] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        zipCode: "",
        type: "Home",
    });
    useEffect(() => {
        if (user) {
            dispatch(fetchAddresses());
        } else {
            navigate("/login");
        }
    }, [dispatch, user, navigate]);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const defaultAddr = addresses.find((a) => a.isDefault);
            if (defaultAddr) setSelectedAddressId(defaultAddr.id);
            else setSelectedAddressId(addresses[0].id);
        }
    }, [addresses, selectedAddressId]);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showModal]);

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = item?.selling_price || item?.price || item?.salePrice || 0;
            const quantity = item?.qty || 1;
            return total + price * quantity;
        }, 0);
    };

    const handleAddNewSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(createAddress(formData));
        if (createAddress.fulfilled.match(result)) {
            setModalView("list");
            setFormData({
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "India",
                zipCode: "",
                type: "Home",
            });
        }
    };

    const handleAddressSelect = (id) => {
        setSelectedAddressId(id);
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) return;

        try {
            const orderData = {
                addressId: selectedAddressId,
            };

            const response = await orderApi.placeOrder(orderData);
            if (response.data) {
                navigate("/profile/orders");
                dispatch(fetchCart());
            }
        } catch (error) {
            throw error;
        }
    };

    return {
        // State
        items,
        cartLoading,
        addresses,
        addressLoading: storeAddressLoading,
        user,
        selectedAddressId,
        showModal,
        modalView,
        formData,

        // Actions
        setShowModal,
        setModalView,
        setSelectedAddressId,
        setFormData,
        handleAddNewSubmit,
        handleAddressSelect,
        handleInputChange,
        handlePlaceOrder,
        calculateTotal,
        navigate
    };
};
