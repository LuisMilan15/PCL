import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropper = ({ onDrop, children }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pcl': ['.pcl'],
      'application/vnd.hp-pcl': ['.pcl']
    }
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default FileDropper;