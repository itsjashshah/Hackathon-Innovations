import React from 'react';
import { Select, Typography, Divider } from 'antd';

const { Text } = Typography;

const LLMOptions = [
  { value: 'claude-3.5', label: 'claude-3.5' },
];

const ToneOptions = [
  { value: 'Formal', label: 'Formal' },
  { value: 'Neutral', label: 'Neutral' },
  { value: 'Friendly', label: 'Friendly' },
];

const JurisdictionOptions = [
  { value: 'California', label: 'California' },
  { value: 'Quebec', label: 'Quebec' },
];

interface SidebarProps {
  editorLLM: string;
  setEditorLLM: (value: string) => void;
  selectedTone: string;
  setSelectedTone: (value: string) => void;
  selectedJurisdiction: string;
  setSelectedJurisdiction: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  editorLLM,
  setEditorLLM,
  selectedTone,
  setSelectedTone,
  selectedJurisdiction,
  setSelectedJurisdiction,
}) => {
  return (
    <div style={{
      display: 'flex',         // Added flex for layout control
      flexDirection: 'column', // Ensure column layout
      padding: '20px 16px',
      backgroundColor: '#002140',
      color: '#fff',
      height: '100vh', // Ensures the sidebar occupies full height
      width: '300px',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      overflowY: 'auto', // Adds scrolling when content overflows
    }}>
    
      {/* Title */}
      <Text style={{ fontSize: '20px', color: '#f0f2f5', fontWeight: 'bold', display: 'block', marginBottom: '40px' }}>
        Configuration Panel
      </Text>

      {/* Editor LLM Select */}
      <div style={{ marginBottom: '40px' }}>
        <Text style={{ color: '#a0d911', fontSize: '16px', marginBottom: '12px', display: 'block' }}>Editor LLM</Text>
        <Select
          value={editorLLM}
          style={{ width: '100%', borderRadius: '8px' }}
          onChange={setEditorLLM}
          options={LLMOptions}
        />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected: {editorLLM}</Text>
      </div>

      <Divider style={{ borderColor: '#f0f2f5', marginBottom: '40px' }} />

      {/* Tone Select */}
      <div style={{ marginBottom: '40px' }}>
        <Text style={{ color: '#a0d911', fontSize: '16px', marginBottom: '12px', display: 'block' }}>Tone</Text>
        <Select
          value={selectedTone}
          style={{ width: '100%', borderRadius: '8px' }}
          onChange={setSelectedTone}
          options={ToneOptions}
        />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected Tone: {selectedTone}</Text>
      </div>

      {/* <Divider style={{ borderColor: '#f0f2f5', marginBottom: '40px' }} /> */}

      {/* Jurisdiction Select
      <div style={{ marginBottom: '40px' }}>
        <Text style={{ color: '#a0d911', fontSize: '16px', marginBottom: '12px', display: 'block' }}>Jurisdiction</Text>
        <Select
          value={selectedJurisdiction}
          style={{ width: '100%', borderRadius: '8px' }}
          onChange={setSelectedJurisdiction}
          options={JurisdictionOptions}
        />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected Jurisdiction: {selectedJurisdiction}</Text>
      </div> */}
    </div>
  );
};

export default Sidebar;
