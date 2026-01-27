import React from "react";
import { Home, Briefcase, Map } from "lucide-react";
import { useCheckout } from "../hooks/useCheckout";
import CheckoutView from "../view/checkout.view";

const CheckoutContainer = () => {
    const {
        items,
        cartLoading,
        addresses,
        addressLoading,
        user,
        selectedAddressId,
        showModal,
        modalView,
        formData,
        setShowModal,
        setModalView,
        handleAddNewSubmit,
        handleAddressSelect,
        handleInputChange,
        handlePlaceOrder,
        calculateTotal,
        navigate,
        setFormData,
    } = useCheckout();

    const getTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case "home":
                return <Home className="w-4 h-4" />;
            case "office":
                return <Briefcase className="w-4 h-4" />;
            default:
                return <Map className="w-4 h-4" />;
        }
    };

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    return (
        <CheckoutView
            items={items}
            cartLoading={cartLoading}
            addresses={addresses}
            addressLoading={addressLoading}
            user={user}
            selectedAddressId={selectedAddressId}
            showModal={showModal}
            modalView={modalView}
            formData={formData}
            setShowModal={setShowModal}
            setModalView={setModalView}
            handleAddNewSubmit={handleAddNewSubmit}
            handleAddressSelect={handleAddressSelect}
            handleInputChange={handleInputChange}
            handlePlaceOrder={handlePlaceOrder}
            calculateTotal={calculateTotal}
            navigate={navigate}
            setFormData={setFormData}
            getTypeIcon={getTypeIcon}
            selectedAddress={selectedAddress}
        />
    );
};

export default CheckoutContainer;
