import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleChange}>
        <input
          type="text"
          name="name"
          value={formData.Name}
          onChange={handleChange}
          style={{ display: "block", margin: "10px 0" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.Email}
          onChange={handleChange}
          style={{ display: "block", margin: "10px 0" }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.Message}
          onChange={handleChange}
          style={{ display: "block", margin: "10px 0" }}
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
