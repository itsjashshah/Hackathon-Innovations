import React from 'react';
import { Dropdown, Menu, message, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';



const Header: React.FC = () => {
  // Function to print the page
  const handlePrint = () => {
    window.print(); // This will trigger the browser's print functionality
  };

  // Function to simulate recording a screencast
  const handleRecordScreencast = () => {
    message.info('Starting screen recording simulation...');
    // You could integrate actual screen recording functionality here with third-party libraries if needed.
  };

  // Function to show "About" modal with description
  const handleAbout = () => {
    Modal.info({
      title: 'About Albert - Simplifying Legal Documents',
      content: (
        <div>
          <p>
            Albert is designed to simplify complex legal documents into clear, plain language while maintaining precision. 
            Powered by AI, Albert helps legal professionals and clients alike to better understand intricate legal text 
            and make more informed decisions. Our goal is to transform legal workflows with the power of automation.
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  const menu = (
    <Menu
      items={[
        { key: '1', label: 'Rerun' },
        { key: '2', label: 'Print', onClick: handlePrint }, // Print functionality
        { key: '3', label: 'Record a screencast', onClick: handleRecordScreencast }, // Screencast simulation
        { key: '4', label: 'About', onClick: handleAbout }, // About functionality
      ]}
    />
  );

  return (
    <header
      style={{
        padding: '0 24px',
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#001529' }}>
          Albert - Simplifying Legal Documents
        </h1>
      </div>

      {/* 3-dots dropdown menu */}
      <Dropdown overlay={menu} trigger={['click']}>
        <EllipsisOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Dropdown>
    </header>
  );
};

export default Header;
