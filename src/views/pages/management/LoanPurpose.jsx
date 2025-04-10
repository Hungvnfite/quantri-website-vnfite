import React from 'react';

const Notification = () => {
  return (
    <div className="p-5" style={{ height: 670, overflow: 'auto' }}>
      <div style={{ background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EBEDEF' }}>
          <div>
            <p style={{ height: '50px', display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>Đang cập nhật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
