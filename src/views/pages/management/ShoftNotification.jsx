import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import MainCard from '~/ui-component/cards/MainCard';
import { useNotificationStore } from '../../../hooks/notification';
import { DeleteOutlined } from '@ant-design/icons';
import dispatchToast from '~/handlers/toast';
const ShoftNotification = () => {
  const { getAllDailyNotification, deleteDailyNotification } = useNotificationStore();
  const [isAll, setIsAll] = useState(false);
  const [data, setData] = useState([]);

  const fetchDailyNoti = async () => {
    try {
      const response = await getAllDailyNotification();
      if (response?.result.isOK) {
        setData(response.data.userNotificationScheduleDto);
      } else {
        dispatchToast('error', 'Lấy');
      }
    } catch (error) {
      console.error('err', error);
    }
  };
  useEffect(() => {
    // dispatchGetListNofitication();
    fetchDailyNoti();
    return () => {
      fetchDailyNoti;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 120,
      align: 'center'
    },
    {
      title: 'Nội dung 1',
      dataIndex: 'content1',
      width: 300,
      align: 'center',
      render: (text) => <div style={{ maxWidth: 300, wordWrap: 'break-word' }}>{text}</div>
    },
    {
      title: 'Nội dung 2',
      dataIndex: 'content2',
      width: 300,
      align: 'center',
      render: (text) => <div style={{ maxWidth: 300, wordWrap: 'break-word' }}>{text}</div>
    },
    {
      title: 'Giờ đặt lịch',
      dataIndex: 'time',
      width: 120,
      align: 'center',
      render: (time) => <span>{time.slice(0, 5)}</span>
    },
    {
      title: 'Tuỳ chọn',
      key: 'options',
      align: 'center',
      width: 120,
      render: (data) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={async () => {
            try {
              const response = await deleteDailyNotification({ id: data.notifyId, time: data.time });
              if (response.result.isOK) {
                dispatchToast('success', 'Xóa thông báo hàng ngày thành công');
                fetchDailyNoti();
              } else {
                dispatchToast('error', 'Xóa thông báo hàng ngày thất bại');
              }
            } catch (error) {
              dispatchToast('error', 'Xóa thông báo hàng ngày thất bại');
            }
          }}
        >
          Xóa
        </Button>
      )
    }
  ];

  return (
    <MainCard>
      <div style={{ background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EBEDEF' }}>
          <div>
            <p style={{ height: '50px', display: 'flex', alignItems: 'center', paddingLeft: '15px', fontSize: 24, fontWeight: '500' }}>
              Danh sách thông báo hàng ngày
            </p>
          </div>
        </div>
        {isAll && (
          <Button
            type="primary"
            style={{ marginTop: 12, marginBottom: 12 }}
            onClick={async () => {
              // try {
              //   const response = await deleteAllNotification();
              //   if (response.result.isOK) {
              //     dispatchToast('success', 'Xóa thông báo hàng ngày thành công');
              //   }
              // } catch (error) {
              //   dispatchToast('error', 'Xóa thông báo hàng ngày thất bại');
              // }
            }}
          >
            Xóa tất cả thông báo hàng ngày
          </Button>
        )}
        <Table
          columns={columns}
          dataSource={data}
          bordered
          scroll={{ y: 600 }}
          rowKey={'id'}
          rowSelection={{
            type: 'checkbox',
            onSelectAll: (selected) => {
              setIsAll(selected);
            }
          }}
          pagination={false}
        />
      </div>
    </MainCard>
  );
};

export default ShoftNotification;
