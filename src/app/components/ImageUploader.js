'use client';
import React from 'react';
import axios from 'axios';
import { Loading } from './Loading';
import { ImageUploaded } from './ImageUploaded';
import Image from 'next/image';

export const ImageUploader = () => {
  const [dragActive, setDragActive] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadImage(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUploadImage(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleUploadImage = (resource) => {
    if (resource) {
      const formData = new FormData();
      formData.append('image', resource);
      setLoading(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/images`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setLoading(false);
          setImage(res.data?.filePath);
        });
    }
  };

  return loading ? (
    <Loading />
  ) : image ? (
    <ImageUploaded image={image} />
  ) : (
    <div
      className={`flex flex-col justify-center items-center bg-white h-[500px] w-[400px] text-black p-4 rounded-md ${
        dragActive && 'bg-slate-100'
      }`}
    >
      <h1 className='text-2xl py-3'>Upload your image</h1>
      <span className='text-xs text-black/70'>File should be JPG or PNG</span>
      <form
        className='w-full flex flex-col items-center '
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type='file'
          name='file'
          accept='image/jpg, image/jpeg, image/png'
          className='invisible'
          onChange={handleChange}
        />
        <div className='flex flex-col items-center justify-evenly h-52 w-full border-2 border-dashed rounded-lg text-black/40 mb-3'>
          <img
            src='/default-image.png'
            alt='DefaultImage'
            className='text-black/40 h-[80px] w-[100px]'
          />
          <span>Drag and drop your image here</span>
        </div>

        <span className='mb-3'> or </span>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3'
          onClick={onButtonClick}
        >
          Choose a file
        </button>
      </form>
    </div>
  );
};
