import axios from "axios";
import { toast } from "react-toastify";
export const sendEmail = async (data) => {
  try {
    const res = await axios.post(
      `https://api.emailjs.com/api/v1.0/email/send`,
      data
    );
    if (res.status === 200) {
      toast("Email Sent successfully", {
        autoClose: 2000,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
