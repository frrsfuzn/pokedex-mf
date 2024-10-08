import React, { useRef } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { getBase64 } from '../utils/fileUtils';

function ProfilePicture({ url, onSuccessEdit }) {
  const inputRef = useRef(null);
  const onClickEdit = () => {
    inputRef.current.click();
  }

  const handleFileInput = (e) => {
    getBase64(e.target.files[0], onSuccessEdit);
  }

  return (
    <div className='rounded-full aspect-square overflow-hidden w-28 relative'>
      <img className="absolute w-full" src={url} />
      <button onClick={onClickEdit} className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center hover:opacity-60 bg-slate-50 opacity-0 transition-opacity'><FaPencilAlt /></button>
      <input ref={inputRef} type='file' className='hidden' accept="image/*" onChange={handleFileInput} />
    </div>
  )
}

export default ProfilePicture