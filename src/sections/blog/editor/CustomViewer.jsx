import React, { useRef, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer as ToastuiViewer } from '@toast-ui/react-editor';
import { toolbar } from './md-toolbar';


const CustomViewer = ({ content }) => {
  const viewerRef = useRef();

  useEffect(() => {
    const instance = viewerRef.current.getInstance();
    instance.setMarkdown(content);
  }, [content]);

  return (
    <div style={{ position: 'relative' }}>

      <ToastuiViewer 
        ref={viewerRef} 
        initialValue={content}
        toolbarItems={toolbar}
        />
        
    </div>
  );
};

export default CustomViewer;
