// FontAwesomeIcon.js
import React from 'react';
import { WebView } from 'react-native-webview';

const FontAwesomeIcon = ({ icon }) => {
  const htmlContent = `<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></head><body><i class="${icon}"></i></body></html>`;

  return <WebView source={{ html: htmlContent }} />;
};

export default FontAwesomeIcon;
