"use client";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  showSubmit?: boolean;
}

export default function Modal({
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  showSubmit = true,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-4/5 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <div className="flex flex-col gap-4">{children}</div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            {cancelLabel}
          </button>
          {showSubmit && onSubmit && (
            <button
              onClick={onSubmit}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              {submitLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
