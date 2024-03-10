import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ setImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px solid #8B4513', backgroundColor: '#8B4513', cursor: 'pointer', width: '100px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
      <input {...getInputProps()} />
      <p style={{ color: 'white' }}>Upload</p>
    </div>
  );
};

export default FileUpload;
