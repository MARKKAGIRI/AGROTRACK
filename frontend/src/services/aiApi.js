import axios from "axios";
import { API_URL } from "@env";


export const sendMessageToAI = async (userId, question, image, token, sessionId) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId)
    formData.append("sessionId", sessionId)

    // incase question is empty (users sends only an image)
    formData.append("question", question || "Analyze this image");

    if(image) {
      formData.append("image", {
        uri: image,
        name: "upload.jpg",
        type: "image/jpeg",
      });
    }
    
    const response = await axios.post(
      `${API_URL}/chat`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return {
      success: true,
      text: response.data.answer,
    };

  } catch (error) {
    console.error("AI Connection Error:", error);

    
    let errorMessage = "I'm having trouble connecting to the farm server.";
    
    if (error.response) {
      if (error.response.status === 503) {
        errorMessage = "The AI service is currently warming up. Please try again in a moment.";
      } else if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection.";
    }

    return {
      success: false,
      text: errorMessage,
    };
  }
};