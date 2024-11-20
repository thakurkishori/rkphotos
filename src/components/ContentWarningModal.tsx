// src/components/ContentWarningModal.tsx
import React from "react";

interface ContentWarningModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const ContentWarningModal: React.FC<ContentWarningModalProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 max-w-md w-full p-6 rounded-lg border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Content Warning</h2>
        <p className="text-gray-300 mb-4">
          This album contains artistic nude photography. By proceeding, you
          confirm that: - You are at least 18 years old - You understand the
          nature of the content - Viewing such content is legal in your
          jurisdiction and the artistic nature depecting different entities are
          not in bad taste but for exploration of the artistic world.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
          >
            Go Back
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            I Understand & Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
