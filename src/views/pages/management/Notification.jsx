import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Form, TimePicker } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dispatchToast from '~/handlers/toast';

import { useSelector } from 'react-redux';
import { useNotificationStore } from '../../../hooks/notification';
import moment from 'moment';
import MainCard from '~/ui-component/cards/MainCard';

const Notification = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const { dispatchGetListNofitication, dispatchPushNofitication, deleteNotification, postDailyNotidication } = useNotificationStore();
  const dataGetListNotification = useSelector((state) => state.notification.dataGetListNotification);

  useEffect(() => {
    dispatchGetListNofitication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    swal({
      title: 'Bạn chắc chắn muốn xóa?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        deleteNotification({ params: id });
      }
    });
  };
  const handleClickPushNotification = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
    if (selectedRowKeys[0]) {
      dispatchPushNofitication({ notifyId: selectedRowKeys[0] });
      setSelectedRowKeys([]);
      return;
    }
    dispatchToast('error', 'Không tìm thấy thông báo');
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 120
    },
    {
      title: 'Nội dung',
      dataIndex: 'content1',
      width: 300,
      render: (content) => <ContentWithReadMore content={content} />
    },
    // {
    //   title: 'Nội dung',
    //   dataIndex: 'content2',
    //   width: 300,
    //   render: (text) => <div style={{ maxWidth: 300, wordWrap: 'break-word' }}>{text}</div>
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      width: 120,
      render: (text) => formatDate(text)
    },
    {
      title: 'Tuỳ chọn',
      dataIndex: 'id',
      key: 'options',
      width: 120,
      render: (id) => (
        <Button
          type="primary"
          onClick={() => {
            setId(id);
            setOpen(true);
          }}
        >
          Đặt lịch
        </Button>
      )
    },
    {
      title: 'Tuỳ chọn',
      dataIndex: 'options',
      key: 'options',
      width: 120,
      render: (text, record) => (
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      )
    }
  ];
  return (
    <MainCard>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #EBEDEF',
          paddingBottom: 12,
          marginBottom: 12
        }}
      >
        <p style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>Danh sách quản lý thông báo firebase</p>
        <div style={{ display: 'flex', gap: '30px', marginRight: '30px' }}>
          <Link to="/them-thong-bao">
            <Button type="primary" onClick={() => {}}>
              Thêm thông báo
            </Button>
          </Link>

          <Link to="/len-lich-ban-thong-bao">
            <Button type="primary" onClick={() => {}}>
              Danh sách đặt lịch hàng này
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div
          style={{
            marginBottom: 16
          }}
        >
          <Button type="primary" onClick={handleClickPushNotification} disabled={!selectedRowKeys.length > 0} loading={loading} id="122">
            Gửi thông báo
          </Button>
        </div>
        <Table
          rowSelection={{
            type: 'radio',
            onChange: (keys) => {
              setSelectedRowKeys(keys);
            },
            selectedRowKeys: selectedRowKeys
          }}
          columns={columns}
          dataSource={dataGetListNotification}
          scroll={{ y: 500 }}
          size="small"
          rowKey={'id'}
          bordered
        />
      </div>
      <Modal
        open={open}
        title="Đặt lịch hàng ngày"
        okText="Xác nhận"
        cancelText="Đóng"
        // centered
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        footer={null}
        destroyOnClose
        style={{ zIndex: 100, width: 600 }}
        width={800}
      >
        <Form
          name="date"
          layout={'inline'}
          style={{ marginBottom: 12 }}
          onFinish={async (values) => {
            try {
              const hourse = `${values['time-picker']['$H'] < 10 ? `0${values['time-picker']['$H']}` : values['time-picker']['$H']}`;
              const minutes = `${values['time-picker']['$m'] < 10 ? `0${values['time-picker']['$m']}` : values['time-picker']['$m']}`;
              const time = `${hourse}:${minutes}`;
              const response = await postDailyNotidication({ id, time });
              if (response.result.isOK) {
                dispatchToast('success', 'Đặt lịch thông báo thành công');
                setOpen(false);
              }
            } catch (error) {
              dispatchToast('error', 'Đặt lịch thông báo thất bại');
            }
          }}
        >
          <Form.Item name="time-picker" label="Thời gian" rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]} hasFeedback>
            <TimePicker popupStyle={{ zIndex: 10000 }} mode="time" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns.slice(0, 4)}
          bordered
          dataSource={[dataGetListNotification?.find((item) => item.id === id)]}
          pagination={false}
          rowKey={'id'}
        />
      </Modal>
    </MainCard>
  );
};

const ContentWithReadMore = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const maxContentLength = 400;

  const modifiedContent = content.replace(/<img\b[^>]*>/gi, (imgTag) => {
    if (imgTag.includes('style=')) {
      return imgTag.replace(/style=["']([^"']*)["']/i, `style="$1;max-width:700px;max-height:200px;"`);
    } else {
      return imgTag.replace(/<img/gi, `<img style="max-width:700px;max-height:200px;"`);
    }
  });

  return (
    <div style={{ maxWidth: 300, wordWrap: 'break-word' }}>
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? modifiedContent
            : modifiedContent.substring(0, maxContentLength) + (content.length > maxContentLength ? '...' : '')
        }}
      ></div>
      {content.length > maxContentLength && (
        <Button type="link" onClick={toggleExpand}>
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </Button>
      )}
    </div>
  );
};

export default Notification;
