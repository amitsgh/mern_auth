import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  //   timeout: 5000,
});

async function register(data) {
  try {
    const response = await api.post("/auth/register", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status !== 201) throw error;

    const { success, email, message } = response.data;

    if (!success) throw error;

    return {
      success,
      email,
      message,
    };
  } catch (error) {
    console.error(error);

    throw {
      success: error.response?.data?.success,
      message: error.response?.data?.message || error.message,
    };
  }
}

async function login(data) {
  try {
    const response = await api.post("/auth/session", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status !== 200) throw error;

    const { success, message } = response.data;

    if (!success) throw error;

    return {
      success,
      message,
    };
  } catch (error) {
    console.error(error);

    throw {
      success: error.response?.data?.success,
      message: error.response?.data?.message || error.message,
    };
  }
}

async function sendOTP(email) {
  try {
    const data = {
      email,
    };

    const response = await api.post("/auth/send-otp", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status !== 200) throw error;

    const { success, message } = response.data;

    if (!success) throw error;

    return {
      success,
      message,
    };
  } catch (error) {
    console.error(error);

    throw {
      success: error.response?.data?.success,
      message: error.response?.data?.message || error.message,
    };
  }
}

async function verifyOTP(data) {
  try {
    const response = await api.post("/auth/verify-otp", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status !== 200) throw error;

    const { success, message } = response.data;

    if (!success) throw error;

    return {
      success,
      message,
    };
  } catch (error) {
    console.error(error);

    throw {
      success: error.response?.data?.success,
      message: error.response?.data?.message || error.message,
    };
  }
}

export { login, register, sendOTP, verifyOTP };
