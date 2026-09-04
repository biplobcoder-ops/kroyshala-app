
import React, { useState } from "react";
import { refreshAccessToken } from "../services/authApi2";
import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";

const RefreshTokenPage2 = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const handleRefreshToken = async () => {
    setSuccessMessage("");
    setServerError("");

    try {
      setLoading(true);

      const response = await refreshAccessToken();

      setSuccessMessage(
        response.message || "Access token refreshed successfully."
      );
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Failed to refresh access token. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Refresh Access Token
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Generate a new access token using your refresh token.
          </p>
        </div>

        {serverError && (
          <Alert
            variant="error"
            title="Refresh Token Failed"
            dismissible
            onClose={() => setServerError("")}
          >
            {serverError}
          </Alert>
        )}

        {successMessage && (
          <Alert
            variant="success"
            title="Success"
            dismissible
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Alert>
        )}

        <Button
          type="button"
          variant="primary"
          fullWith
          disabled={loading}
          onClick={handleRefreshToken}
        >
          {loading ? "Refreshing..." : "Refresh Access Token"}
        </Button>
      </div>
    </div>
  );
};

export default RefreshTokenPage2;

