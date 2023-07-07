import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormFiled, Loader } from "../components";

function CreatPost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGanaratingImg] = useState(false);
  const [loding, setLoding] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefult();
    if(form.prompt && form.photo){
      setLoding(true)
      try {
        const response  = fetch('http://localhost:8080/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(form)

        })
        await response.json()
        navigate('/')
      } catch (error) {
        alert(error)
      }finally{
        setLoding(false)
      }
    }else{
      alert('please enter a prompt and ganarate an image')
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGanaratingImg(true);
        const repnose = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await repnose.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert("you're out of credits!");
        console.log(error);
      } finally {
        setGanaratingImg(false);
      }
    } else {
      alert("please enter prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaganitive and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form className="mt-16 mx-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormFiled
            labelName="your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormFiled
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
 focus:ring-blue-900 focus:border-blue-900 w-64 p-3 h-64 justify-center items-center"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5 ">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium text-sm rounded-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "generating..." : "genarate"}
          </button>
        </div>
        <div className="mt-10 ">
          <p className="mt-2 text-[#666e7] text-[14px]">
            once you created the image you want, you can share it with others in
            the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm 
  w-full sm:w-auto px-5 py-2.5  text-center"
          >
            {loding ? "Sharing..." : "share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatPost;
