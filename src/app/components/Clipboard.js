import React from 'react';

export const Clipboard = () => {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md'
      role='alert'
    >
      <div>
        <p className='text-sm'>Copied to clipboard</p>
      </div>
    </div>
  );
};
