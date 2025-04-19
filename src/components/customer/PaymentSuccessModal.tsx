"use client";

import Modal from "../shared/Modal";

interface PaymentSuccessModalProps {
  totalPrice: number;
  onClose: () => void;
}

export default function PaymentSuccessModal({
  totalPrice,
  onClose,
}: PaymentSuccessModalProps) {
  return (
    <Modal title="Payment Successful!" onClose={onClose}>
      <div className="text-center">
        <p className="text-lg font-semibold">Total Price</p>
        <p className="text-2xl text-green-600 font-bold mt-2">
          ฿{totalPrice.toFixed(2)}
        </p>
      </div>
    </Modal>
  );
}
