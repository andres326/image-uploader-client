import React from 'react';
import { Clipboard } from './Clipboard';

export const ImageUploaded = ({ image }) => {
  const [copied, setCopied] = React.useState(false);
  const linkImage = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${image}`;

  const onClickButton = () => {
    navigator.clipboard.writeText(linkImage);
    setCopied(true);
  };

  return (
    <div className='flex flex-col justify-between items-center bg-white h-[400px] w-[400px] text-black p-4 rounded-md'>
      <h1 className='text-2xl'>Uploaded succesfully!</h1>
      <img
        src={linkImage}
        className='object-cover rounded border h-48 w-full'
      />
      <div className='flex flex-row justify-between bg-gray-200 w-full rounded-md'>
        <input
          type='text'
          className='text-sm overflow-hidden w-full p-2'
          value={linkImage}
          disabled={true}
        />
        <button
          onClick={onClickButton}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Copy
        </button>
      </div>
      {copied && <Clipboard />}
    </div>
  );
};
