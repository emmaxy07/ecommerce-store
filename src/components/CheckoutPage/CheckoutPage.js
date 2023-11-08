import "./CheckoutPage.css"; 
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";


function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    totalPrice,
  } = useSelector((store) => store.shoppingCart);

  const config = {
    public_key: "FLWPUBK_TEST-4b66e5c6aa3baebab7fa18453d86993d-X",
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: "USD",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <div className="container">
        <input
          type="number"
          placeholder="Amount"
          value={totalPrice.toFixed(2)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
        >
          Pay
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;