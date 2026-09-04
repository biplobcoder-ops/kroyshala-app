import React from "react";
import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";

// ==========================================
// Order Timeline Component
// ==========================================

const OrderTimeline = ({ currentStatus }) => {
  // Status steps
  const steps = [
    {
      id: "pending",
      label: "Pending",
      icon: <FiClock />,
    },
    {
      id: "confirmed",
      label: "Confirmed",
      icon: <FiCheckCircle />,
    },
    {
      id: "processing",
      label: "Processing",
      icon: <FiPackage />,
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: <FiTruck />,
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: <FiCheckCircle />,
    },
  ];

  // If cancelled, show cancelled state
  if (currentStatus === "cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4">
        <FiXCircle className="h-8 w-8 text-red-500" />
        <div>
          <p className="font-semibold text-red-700">Order Cancelled</p>
          <p className="text-sm text-red-600">
            This order has been cancelled
          </p>
        </div>
      </div>
    );
  }

  // Find current step index
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStatus
  );

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.id} className="flex items-start gap-4">
            {/* Icon + Line */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  transition-colors

                  ${
                    isCompleted
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }

                  ${
                    isCurrent
                      ? "ring-4 ring-blue-100"
                      : ""
                  }
                `}
              >
                {step.icon}
              </div>

              {/* Vertical Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-12
                    w-0.5

                    ${
                      index < currentIndex
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }
                  `}
                />
              )}
            </div>

            {/* Label */}
            <div className="pt-2">
              <p
                className={`
                  font-semibold

                  ${
                    isCompleted
                      ? "text-slate-900"
                      : "text-slate-400"
                  }
                `}
              >
                {step.label}
              </p>

              {isCurrent && (
                <p className="text-sm text-blue-600">
                  Current Status
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;