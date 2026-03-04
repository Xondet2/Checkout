
"use client";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const initialItems = [
  {
    id: 1,
    name: "Denim T-Shirt",
    ref: "Ref. 007197456",
    color: "Blue",
    qty: 2,
    price: 7500,
    img: "https://images.unsplash.com/photo-1761426857312-7931f596e6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 2,
    name: "Denim Pants",
    ref: "Ref. 011015233",
    color: "Blue",
    qty: 3,
    price: 9000,
    img: "https://images.unsplash.com/photo-1588544622467-6df9eef29c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 3,
    name: "Sony Smartwat...",
    ref: "Ref. 004822981",
    color: "Black",
    qty: 1,
    price: 24500,
    img: "https://images.unsplash.com/photo-1517907264075-2eac7e8d9765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 4,
    name: "Cognac Oxford",
    ref: "Ref. 035772962",
    color: "Brown",
    qty: 1,
    price: 4500,
    img: "https://images.unsplash.com/photo-1653868250450-b83e6263d427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [cardType, setCardType] = useState<"mastercard" | "visa" | "verve" | null>("mastercard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState({ d: "", m: "", y: "" });
  const [cvv, setCvv] = useState("");
  const [panelOpen, setPanelOpen] = useState(true);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#e8e8e8" }}>
      {/* Left Panel */}
      <div className="flex flex-col flex-1 px-16 py-10 overflow-y-auto cart-scroll" style={{ background: "#eaeaea" }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          {/* Q Logo */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-800">
            <span style={{ fontFamily: "serif", fontSize: "22px", fontWeight: 400, color: "#222" }}>Q</span>
          </div>
          <div style={{ width: "1px", height: "40px", background: "#bbb" }} />
          <span style={{ fontSize: "22px", color: "#444", fontWeight: 300, letterSpacing: "0.02em" }}>Your Shopping Cart</span>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-3 flex-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center"
              style={{
                background: "#f0f0f0",
                borderRadius: "8px",
                padding: "12px 20px 12px 16px",
                minHeight: "90px",
              }}
            >
              {/* Product Image */}
              <div
                className="flex items-center justify-center mr-6"
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "#fff",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <ImageWithFallback
                  src={item.img}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Name & Ref */}
              <div style={{ minWidth: "0", flex: "1 1 130px", overflow: "hidden" }}>
                <div style={{ fontSize: "15px", color: "#333", fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ fontSize: "11px", color: "#999", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.ref}</div>
              </div>

              {/* Color */}
              <div style={{ minWidth: "0", flex: "0 1 60px", fontSize: "14px", color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.color}
              </div>

              {/* Qty Controls */}
              <div className="flex flex-col items-center gap-1 mr-4" style={{ flex: "0 0 44px" }}>
                <div style={{ fontSize: "14px", color: "#555", marginBottom: "2px" }}>{item.qty}</div>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#b0b0b0",
                    border: "none",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >+</button>
                <button
                  onClick={() => updateQty(item.id, -1)}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#b0b0b0",
                    border: "none",
                    color: "#fff",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >−</button>
              </div>

              {/* Price */}
              <div style={{ flex: "0 0 auto", fontSize: "15px", color: "#444", fontWeight: 400, whiteSpace: "nowrap", paddingLeft: "8px" }}>
                {(item.price * item.qty).toLocaleString("en-NG", { minimumFractionDigits: 2 })} NGN
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  fontSize: "18px",
                  padding: "4px 8px",
                }}
              >✕</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-8">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
              fontSize: "14px",
            }}
          >
            <span style={{ fontSize: "20px" }}>←</span>
            Back to Shop
          </button>
          <div style={{ fontSize: "15px", color: "#444" }}>
            <span style={{ marginRight: "16px", color: "#777" }}>Subtotal:</span>
            <span style={{ fontWeight: 500, color: "#333" }}>
              {subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2 })} NGN
            </span>
          </div>
        </div>
      </div>

      {/* Trigger Tab — always visible, outside the collapsing panel */}
      <button
        onClick={() => setPanelOpen((o) => !o)}
        title={panelOpen ? "Cerrar panel" : "Abrir panel de pago"}
        style={{
          alignSelf: "flex-start",
          marginTop: "100px",
          background: "#2e2a22",
          border: "none",
          borderRadius: "6px 0 0 6px",
          padding: "14px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 20,
          flexShrink: 0,
        }}
      >
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6b6450" }} />
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#d4a000" }} />
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6b6450" }} />
        <span
          style={{
            color: "#d4a000",
            fontSize: "14px",
            marginTop: "4px",
            display: "inline-block",
            transform: panelOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.35s ease",
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </button>

      {/* Right Panel */}
      <div
        className="flex flex-col relative flex-shrink-0"
        style={{
          width: panelOpen ? "380px" : "0px",
          background: "#2e2a22",
          transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
      >
        {/* Card Details Content */}
        <div className="flex flex-col flex-1 px-10 pt-14 pb-6">
          <h2 style={{ fontSize: "26px", color: "#d4a000", fontWeight: 400, marginBottom: "32px" }}>
            Card Details
          </h2>

          {/* Select Card Type */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "16px" }}>Select Card Type</div>
            <div className="flex items-center gap-8">
              {/* Mastercard */}
              <button
                onClick={() => setCardType("mastercard")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: cardType === "mastercard" ? 1 : 0.4,
                  padding: 0,
                }}
              >
                <div className="flex items-center">
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#e8e8e8", marginRight: "-10px", zIndex: 2 }} />
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#aaaaaa", zIndex: 1 }} />
                </div>
              </button>
              {/* VISA */}
              <button
                onClick={() => setCardType("visa")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: cardType === "visa" ? 1 : 0.4,
                  padding: 0,
                }}
              >
                <span style={{ fontSize: "20px", fontStyle: "italic", fontWeight: 700, color: "#bbb", letterSpacing: "1px" }}>VISA</span>
              </button>
              {/* Verve */}
              <button
                onClick={() => setCardType("verve")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: cardType === "verve" ? 1 : 0.4,
                  padding: 0,
                }}
              >
                <span style={{ fontSize: "18px", fontWeight: 600, color: "#bbb" }}>
                  <span style={{ fontStyle: "italic" }}>V</span>erve
                </span>
              </button>
            </div>
          </div>

          {/* Card Number */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "10px" }}>Card Number</div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
              placeholder=""
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid #6b6450",
                width: "100%",
                color: "#eee",
                fontSize: "15px",
                padding: "4px 0",
                outline: "none",
              }}
            />
          </div>

          {/* Expiry & CVV */}
          <div className="flex items-start gap-10">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "10px" }}>Expiry Date</div>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={expiry.d}
                  onChange={(e) => setExpiry({ ...expiry, d: e.target.value })}
                  maxLength={2}
                  placeholder="__"
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #6b6450",
                    width: "32px",
                    color: "#eee",
                    fontSize: "14px",
                    padding: "4px 0",
                    outline: "none",
                    textAlign: "center",
                  }}
                />
                <span style={{ color: "#6b6450", fontSize: "16px" }}>/</span>
                <input
                  type="text"
                  value={expiry.m}
                  onChange={(e) => setExpiry({ ...expiry, m: e.target.value })}
                  maxLength={2}
                  placeholder="__"
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #6b6450",
                    width: "32px",
                    color: "#eee",
                    fontSize: "14px",
                    padding: "4px 0",
                    outline: "none",
                    textAlign: "center",
                  }}
                />
                <span style={{ color: "#6b6450", fontSize: "16px" }}>/</span>
                <input
                  type="text"
                  value={expiry.y}
                  onChange={(e) => setExpiry({ ...expiry, y: e.target.value })}
                  maxLength={4}
                  placeholder="__"
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #6b6450",
                    width: "40px",
                    color: "#eee",
                    fontSize: "14px",
                    padding: "4px 0",
                    outline: "none",
                    textAlign: "center",
                  }}
                />
              </div>
            </div>
            <div style={{ minWidth: "80px" }}>
              <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "10px" }}>CVV</div>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={4}
                placeholder="____"
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #6b6450",
                  width: "60px",
                  color: "#eee",
                  fontSize: "14px",
                  padding: "4px 0",
                  outline: "none",
                  textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          style={{
            background: "#d4a000",
            border: "none",
            color: "#222",
            fontSize: "17px",
            fontWeight: 600,
            padding: "24px",
            cursor: "pointer",
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
