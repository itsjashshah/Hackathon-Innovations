import React, { useState } from 'react';
import { Layout, message, Upload, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios'; // Import AxiosResponse
import Sidebar from './Sidebar'; // Import the Sidebar component
import Header from './Header'; // Import the Header component
import jsPDF from 'jspdf'; // Import jsPDF for downloading PDFs

const { Content, Sider } = Layout;
const { TextArea } = Input;

const App: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [draftText, setDraftText] = useState('');
  const [editorLLM, setEditorLLM] = useState('claude-3.5');
  const [selectedTone, setSelectedTone] = useState('Neutral');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('California');
  const [outputMessage, setOutputMessage] = useState('');
  const [responseData, setResponseData] = useState<any>(null); // State for storing response data

  const handleUpload = (file: File) => {
    setPdfFile(file);
    message.success(`${file.name} uploaded successfully.`);
  };

  const handleRun = async () => {
    if (!pdfFile && !draftText.trim()) {
      message.error('Please upload a PDF file or enter the draft text.');
      return;
    }

    try {
      let response: AxiosResponse;

      if (pdfFile) {
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('editorLLM', editorLLM);
        formData.append('tone', selectedTone);
        formData.append('jurisdiction', selectedJurisdiction);

        response = await axios.post('http://127.0.0.1:5000/generate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post('http://127.0.0.1:5000/generate', {
          text: draftText,
          editorLLM,
          tone: selectedTone,
          jurisdiction: selectedJurisdiction,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      setResponseData(response.data); // Store response data for later use
      setOutputMessage('Your document has been processed successfully.');
    } catch (error) {
      console.error('Error submitting the document:', error);
      message.error('Error submitting the document. Please try again.');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Define page width (taking margins into account)
    const pageWidth = doc.internal.pageSize.getWidth() - 20; // 10 margins on both sides
  
    // Split text into multiple lines if it's too long for one line
    const editorLLMText = doc.splitTextToSize(`Editor LLM: ${responseData?.editorLLM}`, pageWidth);
    const jurisdictionText = doc.splitTextToSize(`Jurisdiction: ${responseData?.jurisdiction}`, pageWidth);
    const toneText = doc.splitTextToSize(`Tone: ${responseData?.tone}`, pageWidth);
    const responseText = doc.splitTextToSize(`Response: ${responseData?.response}`, pageWidth);
  
    // Add text to the document, line by line
    doc.text(editorLLMText, 10, 10);
    doc.text(jurisdictionText, 10, 30);
    doc.text(toneText, 10, 50);
    doc.text(responseText, 10, 70); // Adjust the Y-position accordingly
  
    // Save the PDF
    doc.save('output.pdf');
  };
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={300}
        
        style={{
          backgroundColor: 'rgb(0, 33, 64)', // Apply the background color here
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Sidebar
          editorLLM={editorLLM}
          setEditorLLM={setEditorLLM}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          selectedJurisdiction={selectedJurisdiction}
          setSelectedJurisdiction={setSelectedJurisdiction}
        />
      </Sider>

      {/* Main Layout */}
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Header />

        <Content
          style={{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h2 style={{ marginBottom: '16px', fontSize: '18px', color: '#001529' }}>
            Input the Draft Text or Upload a PDF
          </h2>

          {/* PDF Upload */}
          <Upload
            beforeUpload={(file) => {
              handleUpload(file);
              return false;
            }}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button
              icon={<UploadOutlined />}
              style={{
                marginBottom: '16px',
                backgroundColor: '#001529',
                color: '#fff',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
              }}
            >
              Upload Document
            </Button>
          </Upload>

          {/* Draft Text Input */}
          <TextArea
            rows={6}
            placeholder="Enter the draft text here..."
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '8px',
              borderColor: '#d9d9d9',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#001529')}
            onBlur={(e) => (e.target.style.borderColor = '#d9d9d9')}
          />

          {/* Run Button */}
          <button
            style={{
              marginTop: '24px',
              width: '100%',
              padding: '12px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#555';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
            onClick={handleRun}
          >
            Run
          </button>

          {/* Display Output */}
          {responseData && (
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <h3>Processed Response</h3>
              <p>{responseData?.response}</p>

              <Button
                onClick={handleDownloadPDF}
                style={{
                  marginTop: '16px',
                  backgroundColor: '#001529',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                }}
              >
                Download as PDF
              </Button>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
