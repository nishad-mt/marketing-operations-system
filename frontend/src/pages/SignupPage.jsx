import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import axios from "axios";


export default function SignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    role: "",
  });

  const roles = [

    {
      value: "social_media",
      label: "Social Media",
    },

    {
      value: "performance_marketer",
      label: "Performance Marketer",
    },

    {
      value: "content_head",
      label: "Content Head",
    },

    {
      value: "script_writer",
      label: "Script Writer",
    },

    {
      value: "copy_writer",
      label: "Copy Writer",
    },

    {
      value: "creator",
      label: "Creator",
    },

    {
      value: "editor",
      label: "Editor",
    },
  ];


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };


  const handleGoogleSignup = async (
    credentialResponse
  ) => {

    try {

      const res = await axios.post(

        "http://127.0.0.1:8000/api/auth/google/",

        {

          token: credentialResponse.credential,

          role: formData.role,

          mobile_number:
            formData.mobile_number,
        }
      );

      console.log(res.data);

      alert(
        "Signup successful. Waiting for manager approval."
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join the Catalyst Marketing Team
          </p>

        </div>


        <div className="space-y-5">

          <div>

             <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

              placeholder="Enter your full name"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>

            <input

              type="tel"

              name="mobile_number"

              value={formData.mobile_number}

              onChange={handleChange}

              placeholder="Enter your mobile number"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

          </div>


          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>

            <select

              name="role"

              value={formData.role}

              onChange={handleChange}

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white"
            >

              <option value="">
                Choose your role
              </option>

              {roles.map((role) => (

                <option
                  key={role.value}
                  value={role.value}
                >
                  {role.label}
                </option>

              ))}

            </select>

          </div>


          <div className="flex justify-center pt-2">

            <GoogleLogin

              onSuccess={handleGoogleSignup}

              onError={() =>
                console.log("Google Signup Failed")
              }
            />

          </div>

        </div>


        <div className="mt-6 text-center text-sm text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}