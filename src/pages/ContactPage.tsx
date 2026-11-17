import React, { useState, useEffect, useId } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Copy,
  Plus,
  Minus,
  Trash2,
  Calendar,
  Send,
  Building2,
  Truck,
  ShieldAlert,
} from 'lucide-react';
import {
  BUSINESS_CONFIG,
  NIGERIAN_STATES,
  STATE_WAYBILL_RATES,
  VALID_PICKUP_TIMES,
  SHOE_SIZES,
} from '../config/business';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { formatNaira } from '../utils/currency';
import {
  DeliveryMethod,
  Product,
  ProductColor,
  ProductType,
  QualityGrade,
} from '../types';

export const ContactPage: React.FC = () => {
  const formId = useId();
  const { items: cartItems, updateQuantity, removeFromCart, subtotal: cartSubtotal } = useCart();
  const { preselectedProduct, setPreselectedProduct } = useNavigation();

  // Mode: Cart order (if items in cart) or single direct catalog item
  const [orderMode, setOrderMode] = useState<'cart' | 'direct'>(() => {
    if (preselectedProduct) return 'direct';
    return cartItems.length > 0 ? 'cart' : 'direct';
  });

  // Customer info
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>('Standard');

  // Direct single product selection
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('Bag');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(PRODUCTS[0].colors[0]);
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>(38);
  const [directQuantity, setDirectQuantity] = useState<number>(1);

  // If a preselected product was passed via Order Now button from Shop or Home
  useEffect(() => {
    if (preselectedProduct) {
      setOrderMode('direct');
      setSelectedProduct(preselectedProduct.product);
      setSelectedProductType(preselectedProduct.product.productType);
      setSelectedColor(preselectedProduct.color);
      if (preselectedProduct.product.sizes && preselectedProduct.product.sizes.length > 0) {
        setSelectedShoeSize(preselectedProduct.product.sizes[0]);
      }
      setPreselectedProduct(null); // Clear after applying
    }
  }, [preselectedProduct, setPreselectedProduct]);

  // Delivery Method state
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('waybill');

  // Option 1: Waybill Delivery Fields
  const [destinationState, setDestinationState] = useState<string>('Lagos');
  const [destinationTown, setDestinationTown] = useState('');
  const [deliveryAddressOrPark, setDeliveryAddressOrPark] = useState('');
  const [nearestBusStop, setNearestBusStop] = useState('');

  // Option 2: Pickup Fields
  const todayStr = new Date().toISOString().split('T')[0];
  const [pickupDate, setPickupDate] = useState<string>(todayStr);
  const [pickupTime, setPickupTime] = useState<string>(VALID_PICKUP_TIMES[0]);

  // Validation & Payment visibility
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Products filtered by selected category
  const productsForType = PRODUCTS.filter((p) => p.productType === selectedProductType);

  const handleProductTypeChange = (type: ProductType) => {
    setSelectedProductType(type);
    const matching = PRODUCTS.filter((p) => p.productType === type);
    if (matching.length > 0) {
      setSelectedProduct(matching[0]);
      setSelectedColor(matching[0].colors[0]);
      if (matching[0].sizes && matching[0].sizes.length > 0) {
        setSelectedShoeSize(matching[0].sizes[0]);
      }
    }
  };

  const handleProductChange = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setSelectedColor(prod.colors[0]);
      if (prod.sizes && prod.sizes.length > 0) {
        setSelectedShoeSize(prod.sizes[0]);
      }
    }
  };

  // Waybill fee calculation (based on destinationState)
  const waybillFee =
    deliveryMethod === 'pickup'
      ? 0
      : (STATE_WAYBILL_RATES[destinationState] ?? BUSINESS_CONFIG.defaultWaybillFee);

  // Subtotal calculation
  const isCart = orderMode === 'cart' && cartItems.length > 0;
  const itemsSubtotal = isCart
    ? cartSubtotal
    : selectedProduct.price * directQuantity;

  // Final Total
  const finalTotal = itemsSubtotal + waybillFee;

  // Validation
  const validateOrder = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (phoneNumber.trim().length < 8) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    if (orderMode === 'cart' && cartItems.length === 0) {
      errors.items = 'Your cart is empty. Please select a product to order.';
    }

    if (orderMode === 'direct') {
      if (selectedProduct.productType === 'Shoe' && !selectedShoeSize) {
        errors.shoeSize = 'Shoe size is required for footwear orders';
      }
      if (directQuantity < 1) {
        errors.quantity = 'Quantity must be at least 1';
      }
    }

    if (deliveryMethod === 'waybill') {
      if (!destinationState) {
        errors.destinationState = 'Please select your destination state';
      }
      if (!destinationTown.trim()) {
        errors.destinationTown = 'Please provide destination town / city';
      }
      if (!deliveryAddressOrPark.trim()) {
        errors.deliveryAddressOrPark = 'Please provide full address or waybill park';
      }
      if (!nearestBusStop.trim()) {
        errors.nearestBusStop = 'Please provide nearest bus stop or landmark';
      }
    } else {
      if (!pickupDate) {
        errors.pickupDate = 'Please select your pickup date';
      }
      if (!pickupTime) {
        errors.pickupTime = 'Please select a pickup time between 6:30 AM and 5:00 PM';
      }
    }

    setValidationErrors(errors);
    const valid = Object.keys(errors).length === 0;
    setIsFormValidated(valid);
    return valid;
  };

  // Copy account number
  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_CONFIG.payment.accountNumber);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2500);
    } catch {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2500);
    }
  };

  // Send Order on WhatsApp
  const handleSendOrderWhatsApp = () => {
    const isValid = validateOrder();
    if (!isValid) {
      const errEl = document.querySelector('.form-error');
      errEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Build the clean message matching Section 12 exactly
    const lines: string[] = [];
    lines.push('BEAUTY BEA COLLECTION — NEW ORDER');
    lines.push('');
    lines.push('CUSTOMER DETAILS');
    lines.push(`Full Name: ${fullName.trim()}`);
    lines.push(`Phone Number: ${phoneNumber.trim()}`);
    lines.push('');
    lines.push('ORDER DETAILS');

    if (isCart) {
      cartItems.forEach((item, idx) => {
        lines.push(`Product #${idx + 1}: ${item.product.name}`);
        lines.push(`Category: ${item.product.category}`);
        lines.push(`Colour: ${item.selectedColor.name}`);
        if (item.selectedSize) {
          lines.push(`Shoe Size: ${item.selectedSize}`);
        }
        lines.push(`Quantity: ${item.quantity}`);
        lines.push(`Quality/Grade: ${qualityGrade}`);
        lines.push(`Unit Price: ${formatNaira(item.product.price)}`);
        lines.push(`Item Subtotal: ${formatNaira(item.product.price * item.quantity)}`);
        lines.push('---');
      });
    } else {
      lines.push(`Product: ${selectedProduct.name}`);
      lines.push(`Category: ${selectedProduct.category}`);
      lines.push(`Colour: ${selectedColor.name}`);
      if (selectedProduct.productType === 'Shoe') {
        lines.push(`Shoe Size: ${selectedShoeSize}`);
      }
      lines.push(`Quantity: ${directQuantity}`);
      lines.push(`Quality/Grade: ${qualityGrade}`);
      lines.push(`Unit Price: ${formatNaira(selectedProduct.price)}`);
      lines.push(`Item Subtotal: ${formatNaira(selectedProduct.price * directQuantity)}`);
    }

    lines.push('');
    lines.push('DELIVERY METHOD');
    if (deliveryMethod === 'waybill') {
      lines.push('Method: Waybill Delivery');
      lines.push(`Destination State: ${destinationState}`);
      lines.push(`Destination Town: ${destinationTown.trim()}`);
      lines.push(`Full Address / Waybill Park: ${deliveryAddressOrPark.trim()}`);
      lines.push(`Nearest Bus Stop: ${nearestBusStop.trim()}`);
      lines.push(`Waybill Fee: ${formatNaira(waybillFee)}`);
    } else {
      lines.push('Method: Office Pickup');
      lines.push(`Pickup Date: ${pickupDate}`);
      lines.push(`Pickup Time: ${pickupTime}`);
      lines.push(`Office Address: ${BUSINESS_CONFIG.officeAddress}`);
      lines.push('Waybill Fee: ₦0');
    }

    lines.push('');
    lines.push('ORDER SUMMARY');
    lines.push(`Subtotal: ${formatNaira(itemsSubtotal)}`);
    lines.push(`Waybill Fee: ${formatNaira(waybillFee)}`);
    lines.push(`FINAL TOTAL: ${formatNaira(finalTotal)}`);

    if (additionalNotes.trim()) {
      lines.push('');
      lines.push(`Additional Notes: ${additionalNotes.trim()}`);
    }

    lines.push('');
    lines.push('PAYMENT INSTRUCTIONS');
    lines.push(`Bank: ${BUSINESS_CONFIG.payment.bank}`);
    lines.push(`Account Name: ${BUSINESS_CONFIG.payment.accountName}`);
    lines.push(`Account Number: ${BUSINESS_CONFIG.payment.accountNumber}`);
    lines.push('');
    lines.push('Thank you for shopping with Beauty Bea Collection.');

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/2349069710687?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-24">
      {/* 1. CONTACT HEADER & TOP SHOWCASE BANNER (Matching Panel 4 of Reference Image) */}
      <section className="bg-gradient-to-r from-[#F8DDE8] via-[#FFF1F6] to-[#F8DDE8] border-b border-[#F0DCE5] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29151F]">
                Contact Us
              </h1>
              <p className="text-sm sm:text-base text-[#786873]">
                We'd love to hear from you
              </p>
            </div>

            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white shadow-sm max-w-sm">
                <img
                  src="/product-bag-01.png"
                  alt="Beauty Bea Handbag"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
                <img
                  src="/product-perfume-03.png"
                  alt="Amber Perfume"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORDER FORM & CONTACT CARDS (Matching Reference Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Order Form (8 Columns) */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-1 pb-4 border-b border-[#F0DCE5]">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#29151F]">
                Order Form
              </h2>
              <p className="text-xs sm:text-sm text-[#786873]">
                Select your items, choose your delivery option, and place your order conveniently via WhatsApp.
              </p>
            </div>

            {/* A. Customer Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#29151F]">
                Your Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${formId}-name`}
                    className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                  >
                    Full Name <span className="text-[#A80050]">*</span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (validationErrors.fullName) setValidationErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-2xl border bg-[#FFF1F6]/40 text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050] ${
                      validationErrors.fullName ? 'border-red-500 form-error' : 'border-[#F0DCE5]'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                  >
                    Phone Number <span className="text-[#A80050]">*</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (validationErrors.phoneNumber) setValidationErrors((prev) => ({ ...prev, phoneNumber: '' }));
                    }}
                    placeholder="e.g. 08012345678"
                    className={`w-full px-4 py-3 rounded-2xl border bg-[#FFF1F6]/40 text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050] ${
                      validationErrors.phoneNumber ? 'border-red-500 form-error' : 'border-[#F0DCE5]'
                    }`}
                  />
                  {validationErrors.phoneNumber && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* B. Order Source (Cart vs Direct) */}
            <div className="space-y-4 pt-4 border-t border-[#F0DCE5]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-serif text-lg font-bold text-[#29151F]">
                  Product Selection
                </h3>
                {cartItems.length > 0 && (
                  <div className="inline-flex p-1 bg-[#FFF1F6] border border-[#F0DCE5] rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setOrderMode('cart')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        orderMode === 'cart'
                          ? 'bg-white text-[#A80050] shadow-xs'
                          : 'text-[#786873]'
                      }`}
                    >
                      From Cart ({cartItems.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderMode('direct')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        orderMode === 'direct'
                          ? 'bg-white text-[#A80050] shadow-xs'
                          : 'text-[#786873]'
                      }`}
                    >
                      Single Item Select
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Items List in Order Form */}
              {isCart ? (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 bg-[#FFF1F6]/50 border border-[#F0DCE5] rounded-2xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-[#F0DCE5]"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#29151F]">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#786873]">
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span>{item.selectedColor.name}</span>
                            </span>
                            {item.selectedSize && <span>· Size {item.selectedSize}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#F0DCE5] rounded-lg bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 px-1.5 text-[#786873]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 px-1.5 text-[#786873]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#A80050] tabular-nums">
                          {formatNaira(item.product.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#786873] hover:text-[#A80050] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Direct Product Selection Dropdowns & Swatches */
                <div className="space-y-4 p-5 bg-[#FFF1F6]/50 border border-[#F0DCE5] rounded-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Type Dropdown */}
                    <div>
                      <label
                        htmlFor={`${formId}-type`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        Product Type <span className="text-[#A80050]">*</span>
                      </label>
                      <select
                        id={`${formId}-type`}
                        value={selectedProductType}
                        onChange={(e) => handleProductTypeChange(e.target.value as ProductType)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
                      >
                        <option value="Bag">Bags</option>
                        <option value="Shoe">Shoes</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Perfume">Perfumes</option>
                      </select>
                    </div>

                    {/* Product Name Dropdown */}
                    <div>
                      <label
                        htmlFor={`${formId}-product`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        Product Name <span className="text-[#A80050]">*</span>
                      </label>
                      <select
                        id={`${formId}-product`}
                        value={selectedProduct.id}
                        onChange={(e) => handleProductChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
                      >
                        {productsForType.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {formatNaira(p.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Visual Colour Swatches */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider">
                      Colour: <span className="text-[#A80050]">{selectedColor.name}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {selectedProduct.colors.map((color) => {
                        const isSelected = selectedColor.name === color.name;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center cursor-pointer ${
                              isSelected
                                ? 'ring-2 ring-offset-2 ring-[#A80050] scale-110 shadow-sm'
                                : 'hover:scale-105 border border-black/10'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${
                                  ['White', 'Clear', 'Gold', 'Silver', 'Nude', 'Pink'].includes(color.name)
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shoe Size Field (Conditional: only shown for Shoes!) */}
                  {selectedProduct.productType === 'Shoe' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <label className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider">
                        Shoe Size: <span className="text-[#A80050]">{selectedShoeSize}</span>
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {SHOE_SIZES.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedShoeSize(sz)}
                            className={`py-2 text-xs font-mono font-bold rounded-xl border transition-colors cursor-pointer ${
                              selectedShoeSize === sz
                                ? 'bg-[#A80050] text-white border-[#A80050]'
                                : 'bg-white text-[#29151F] border-[#F0DCE5] hover:border-[#A80050]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity & Grade */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5">
                        Quantity
                      </label>
                      <div className="flex items-center border border-[#F0DCE5] rounded-xl bg-white overflow-hidden max-w-[140px]">
                        <button
                          type="button"
                          onClick={() => setDirectQuantity((q) => Math.max(1, q - 1))}
                          className="p-2 px-3 text-[#786873]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-xs font-bold font-mono">
                          {directQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setDirectQuantity((q) => q + 1)}
                          className="p-2 px-3 text-[#786873]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-grade`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        Quality / Grade
                      </label>
                      <select
                        id={`${formId}-grade`}
                        value={qualityGrade}
                        onChange={(e) => setQualityGrade(e.target.value as QualityGrade)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
                      >
                        <option value="Standard">Standard Boutique Grade</option>
                        <option value="Premium">Premium Signature Grade</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* C. Delivery Method (Section 9) */}
            <div className="space-y-4 pt-4 border-t border-[#F0DCE5]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#29151F]">
                  Delivery Method <span className="text-[#A80050]">*</span>
                </h3>
                <p className="text-xs text-[#786873]">
                  Choose doorstep waybill delivery or schedule an in-person office pickup.
                </p>
              </div>

              {/* Delivery Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('waybill')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    deliveryMethod === 'waybill'
                      ? 'border-[#A80050] bg-[#FFF1F6] ring-1 ring-[#A80050]'
                      : 'border-[#F0DCE5] bg-white hover:border-[#A80050]/50'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      deliveryMethod === 'waybill' ? 'bg-[#A80050] text-white' : 'bg-[#FFF1F6] text-[#786873]'
                    }`}
                  >
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#29151F]">Waybill Delivery</h4>
                    <p className="text-xs text-[#786873] mt-0.5">
                      Fast interstate or local doorstep park transit.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#A80050] bg-[#FFF1F6] ring-1 ring-[#A80050]'
                      : 'border-[#F0DCE5] bg-white hover:border-[#A80050]/50'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      deliveryMethod === 'pickup' ? 'bg-[#A80050] text-white' : 'bg-[#FFF1F6] text-[#786873]'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#29151F]">I Will Pick Up</h4>
                    <p className="text-xs text-[#786873] mt-0.5">
                      Free pickup at our boutique office (₦0 fee).
                    </p>
                  </div>
                </button>
              </div>

              {/* Option 1: Waybill Delivery Form */}
              {deliveryMethod === 'waybill' ? (
                <div className="p-5 bg-[#FFF1F6]/50 border border-[#F0DCE5] rounded-2xl space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Destination State Dropdown with Live Fee Rate */}
                    <div>
                      <label
                        htmlFor={`${formId}-state`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        State / Town <span className="text-[#A80050]">*</span>
                      </label>
                      <select
                        id={`${formId}-state`}
                        value={destinationState}
                        onChange={(e) => setDestinationState(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st} — {formatNaira(STATE_WAYBILL_RATES[st] ?? 2000)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-town`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        Destination Town / City <span className="text-[#A80050]">*</span>
                      </label>
                      <input
                        id={`${formId}-town`}
                        type="text"
                        value={destinationTown}
                        onChange={(e) => {
                          setDestinationTown(e.target.value);
                          if (validationErrors.destinationTown) setValidationErrors((prev) => ({ ...prev, destinationTown: '' }));
                        }}
                        placeholder="e.g. Ikeja, Lekki, or Onitsha"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050] ${
                          validationErrors.destinationTown ? 'border-red-500 form-error' : 'border-[#F0DCE5]'
                        }`}
                      />
                      {validationErrors.destinationTown && (
                        <p className="text-xs text-red-600 mt-1">{validationErrors.destinationTown}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-addr`}
                      className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                    >
                      Full Address / Waybill Park <span className="text-[#A80050]">*</span>
                    </label>
                    <input
                      id={`${formId}-addr`}
                      type="text"
                      value={deliveryAddressOrPark}
                      onChange={(e) => {
                        setDeliveryAddressOrPark(e.target.value);
                        if (validationErrors.deliveryAddressOrPark) setValidationErrors((prev) => ({ ...prev, deliveryAddressOrPark: '' }));
                      }}
                      placeholder="e.g. 24 Admiralty Way, or Peace Mass Transit Park"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050] ${
                        validationErrors.deliveryAddressOrPark ? 'border-red-500 form-error' : 'border-[#F0DCE5]'
                      }`}
                    />
                    {validationErrors.deliveryAddressOrPark && (
                      <p className="text-xs text-red-600 mt-1">{validationErrors.deliveryAddressOrPark}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-busStop`}
                      className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                    >
                      Nearest Bus Stop <span className="text-[#A80050]">*</span>
                    </label>
                    <input
                      id={`${formId}-busStop`}
                      type="text"
                      value={nearestBusStop}
                      onChange={(e) => {
                        setNearestBusStop(e.target.value);
                        if (validationErrors.nearestBusStop) setValidationErrors((prev) => ({ ...prev, nearestBusStop: '' }));
                      }}
                      placeholder="e.g. First Gate / Jubilee Bridge"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050] ${
                        validationErrors.nearestBusStop ? 'border-red-500 form-error' : 'border-[#F0DCE5]'
                      }`}
                    />
                    {validationErrors.nearestBusStop && (
                      <p className="text-xs text-red-600 mt-1">{validationErrors.nearestBusStop}</p>
                    )}
                  </div>

                  {/* Waybill Fee Banner */}
                  <div className="p-3 bg-white rounded-xl border border-[#F0DCE5] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#786873]">
                      Calculated Waybill Rate ({destinationState}):
                    </span>
                    <span className="font-mono text-sm font-bold text-[#A80050]">
                      {formatNaira(waybillFee)}
                    </span>
                  </div>
                </div>
              ) : (
                /* Option 2: Office Pickup Form */
                <div className="p-5 bg-[#FFF1F6]/50 border border-[#F0DCE5] rounded-2xl space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A80050]">
                      When do you intend to come?
                    </h4>
                    <p className="text-xs text-[#786873]">
                      Pickup appointments are available during business hours (6:30 AM – 5:00 PM, Africa/Lagos time).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${formId}-pickupDate`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        Pickup Date <span className="text-[#A80050]">*</span>
                      </label>
                      <input
                        id={`${formId}-pickupDate`}
                        type="date"
                        min={todayStr}
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-pickupTime`}
                        className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider mb-1.5"
                      >
                        Pickup Time <span className="text-[#A80050]">*</span>
                      </label>
                      <select
                        id={`${formId}-pickupTime`}
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-white text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
                      >
                        {VALID_PICKUP_TIMES.map((t) => (
                          <option key={t} value={t}>
                            {t} (Africa/Lagos)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Office Address Notice */}
                  <div className="p-3.5 bg-white rounded-xl border border-[#F0DCE5] space-y-1 text-xs text-[#786873]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#A80050] shrink-0 mt-0.5" />
                      <span>
                        Office Address: <strong className="text-[#29151F]">{BUSINESS_CONFIG.officeAddress}</strong>
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#A80050] shrink-0 mt-0.5" />
                      <span>
                        Opening Hours: <strong className="text-[#29151F]">6:30 AM – 5:00 PM</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* D. Additional Notes */}
            <div className="space-y-1.5 pt-4 border-t border-[#F0DCE5]">
              <label
                htmlFor={`${formId}-notes`}
                className="block text-xs font-semibold text-[#29151F] uppercase tracking-wider"
              >
                Your Message / Additional Notes
              </label>
              <textarea
                id={`${formId}-notes`}
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Preferred transport park, gift box packaging, or special delivery instructions..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0DCE5] bg-[#FFF1F6]/40 text-sm text-[#29151F] focus:outline-none focus:ring-2 focus:ring-[#A80050]"
              />
            </div>
          </div>

          {/* Right Column: Order Summary & Payment & WhatsApp Trigger (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Order Summary Card (Matching Reference Layout) */}
            <div className="bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl p-6 shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#29151F] pb-3 border-b border-[#F0DCE5]">
                Order Summary
              </h3>

              {/* Items Preview */}
              {isCart ? (
                <div className="space-y-3 max-h-56 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain bg-[#FFF1F6] rounded-xl p-1 border border-[#F0DCE5]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#29151F] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[#786873]">
                          {item.selectedColor.name} · Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#29151F]">
                        {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-[#FFF1F6]/50 rounded-2xl border border-[#F0DCE5]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-14 h-14 object-contain bg-white rounded-xl p-1 border border-[#F0DCE5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#29151F] truncate">
                      {selectedProduct.name}
                    </h4>
                    <span className="text-[11px] text-[#786873]">
                      {selectedColor.name} · Qty: {directQuantity}
                    </span>
                    <p className="font-mono text-xs font-bold text-[#A80050] mt-0.5">
                      {formatNaira(selectedProduct.price * directQuantity)}
                    </p>
                  </div>
                </div>
              )}

              {/* Fee Calculations */}
              <div className="space-y-2 pt-3 border-t border-[#F0DCE5] text-xs">
                <div className="flex items-center justify-between text-[#786873]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-bold text-[#29151F]">
                    {formatNaira(itemsSubtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#786873]">
                  <span>Waybill Fee:</span>
                  <span className="font-mono font-bold text-[#29151F]">
                    {waybillFee === 0 ? '₦0 (Pickup)' : formatNaira(waybillFee)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#F0DCE5] flex items-center justify-between text-base font-bold text-[#29151F]">
                  <span>Total:</span>
                  <span className="font-mono text-lg text-[#A80050]">
                    {formatNaira(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Verify Form & Reveal Payment Button */}
              <button
                type="button"
                onClick={validateOrder}
                className="w-full py-3 bg-white hover:bg-[#FFF1F6] text-[#A80050] border-2 border-[#A80050] text-xs font-bold tracking-wider uppercase rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Verify Order & Unlock Account</span>
              </button>

              {/* Payment Details Section (Section 11) — ONLY REVEALED AFTER VALIDATION */}
              {isFormValidated && (
                <div className="p-4 bg-[#29151F] text-white rounded-2xl space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F8DDE8]">
                      Payment Destination
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                      Verified
                    </span>
                  </div>

                  {BUSINESS_CONFIG.payment.isPlaceholder && (
                    <div className="p-2.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        Notice for Store Owner: Update your PalmPay account number in business settings before accepting customer transfers.
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[#A89CA4]">
                      <span>Bank:</span>
                      <strong className="text-white">{BUSINESS_CONFIG.payment.bank}</strong>
                    </div>
                    <div className="flex justify-between text-[#A89CA4]">
                      <span>Account Name:</span>
                      <strong className="text-white">{BUSINESS_CONFIG.payment.accountName}</strong>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-[#A89CA4]">Account Number</span>
                        <span className="text-sm font-bold text-[#F8DDE8]">
                          {BUSINESS_CONFIG.payment.accountNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-2.5 py-1.5 bg-white/15 hover:bg-[#A80050] text-white text-[11px] font-sans font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {copiedAccount ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Main "Send Order on WhatsApp" Button (Matching Reference Image) */}
              <button
                type="button"
                onClick={handleSendOrderWhatsApp}
                className="w-full py-4 bg-[#A80050] hover:bg-[#8B0042] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Send Order on WhatsApp</span>
              </button>
              <p className="text-[11px] text-[#786873] text-center">
                Review and send your prepared order message directly to our WhatsApp support.
              </p>
            </div>

            {/* Direct Contact Cards (Matching Reference Image Panel 4) */}
            <div className="space-y-3">
              {/* Call Us */}
              <div className="p-4 bg-white/90 border border-[#F0DCE5] rounded-2xl flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#786873]">Call Us</span>
                  <p className="text-xs sm:text-sm font-bold text-[#29151F]">
                    <a href={`tel:${BUSINESS_CONFIG.whatsappNumber}`} className="hover:text-[#A80050]">
                      {BUSINESS_CONFIG.whatsappNumber}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="p-4 bg-white/90 border border-[#F0DCE5] rounded-2xl flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#786873]">Email Us</span>
                  <p className="text-xs sm:text-sm font-bold text-[#29151F] truncate">
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-[#A80050]">
                      {BUSINESS_CONFIG.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-white/90 border border-[#F0DCE5] rounded-2xl flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#786873]">Our Location</span>
                  <p className="text-xs sm:text-sm font-bold text-[#29151F]">
                    {BUSINESS_CONFIG.town}, Nigeria
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-4 bg-white/90 border border-[#F0DCE5] rounded-2xl flex items-center gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#786873]">Opening Hours</span>
                  <p className="text-xs sm:text-sm font-bold text-[#29151F]">
                    {BUSINESS_CONFIG.hours.display}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
