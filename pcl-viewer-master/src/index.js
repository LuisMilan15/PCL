import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';
import tempDir from 'temp-dir';
import prettyMs from 'pretty-ms';
import convertPCL from './core/convert';
import FileDropper from './core/file-dropper';

const App = () => {
  const [converting, setConverting] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrop = async (acceptedFiles) => {
    setConverting(true);
    try {
      const newFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          const converted = await convertPCL(file);
          return converted;
        })
      );
      setFiles([...files, ...newFiles]);
      toast.success(`${acceptedFiles.length} arquivo(s) convertido(s) com sucesso!`);
    } catch (error) {
      toast.error('Erro ao converter arquivo(s)');
      console.error(error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="p2">
      <h1 className="h2 mb3">PCL Viewer</h1>
      <FileDropper onDrop={handleDrop}>
        <div className={classNames('p3 border rounded center', { 'bg-light-gray': converting })}>
          {converting ? (
            <p>Convertendo arquivos...</p>
          ) : (
            <p>Arraste arquivos PCL aqui ou clique para selecionar</p>
          )}
        </div>
      </FileDropper>
      {files.length > 0 && (
        <div className="mt3">
          <h2 className="h3">Arquivos convertidos:</h2>
          <ul className="list-reset">
            {files.map((file, index) => (
              <li key={index} className="mt2">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);