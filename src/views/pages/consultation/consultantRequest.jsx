import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Tag } from 'antd';
import MainCard from '../../../ui-component/cards/MainCard';

import useConsultationStore from '../../../hooks/website/consultation';
import { useAuthenticationStore } from '../../../hooks/authentication';
import CustomTooltip from '../../../ui-component/atoms/CustomTooltip';
import { formatDate } from '../../../utils/helpers';

const ConsultantRequestList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1); // Default page = 1

  const { allowToCheck } = useAuthenticationStore();
  const { getConsultationList, updateConsultation } = useConsultationStore();

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch page - 1 vì backend bắt đầu từ 0
      const response = await getConsultationList({ pageNumber: page - 1 });
      setLoading(false);
      if (response) {
        setList(response.consultations);
        setTotal(response.totalRecords);
      } else {
        setList([]);
      }
    } catch (error) {
      setLoading(false);
      setList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleUpdateStatus = async (consultationId, status) => {
    await updateConsultation({ consultationId, status });
    fetchData(); // Refetch after update
  };

  const columns = [
    {
      title: 'STT',
      width: 50,
      key: 'consultationId',
      align: 'center',
      render: (_, __, index) => (page - 1) * 10 + index + 1 // Correct numbering across pages
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      align: 'center'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100,
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
      align: 'center'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 100,
      align: 'center',
      render: (text) => formatDate(text)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status) =>
        status == 0 ? (
          <Tag color="default">Chưa xử lý</Tag>
        ) : status == 1 ? (
          <Tag color="warning">Chưa liên lạc được</Tag>
        ) : (
          <Tag color="success">Đã liên lạc</Tag>
        )
    },
    {
      title: 'Tuỳ chọn',
      align: 'center',
      width: 100,
      render: (record) => (
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {record.status != 0 && (
            <CustomTooltip open={!allowToCheck}>
              <Popconfirm
                title="Xác nhận cập nhật"
                description="Bạn có chắc chắn muốn cập nhật trạng thái?"
                onConfirm={() => handleUpdateStatus(record.consultationId, 0)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button danger disabled={!allowToCheck} type="default" style={{ marginBottom: 8, width: 200 }}>
                  Chưa xử lý
                </Button>
              </Popconfirm>
            </CustomTooltip>
          )}
          {record.status != 1 && (
            <CustomTooltip open={!allowToCheck}>
              <Popconfirm
                title="Xác nhận cập nhật"
                description="Bạn có chắc chắn muốn cập nhật trạng thái?"
                onConfirm={() => handleUpdateStatus(record.consultationId, 1)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button disabled={!allowToCheck} type="default" style={{ marginBottom: 8, width: 200 }}>
                  Chưa liên lạc được
                </Button>
              </Popconfirm>
            </CustomTooltip>
          )}
          {record.status != 2 && (
            <CustomTooltip open={!allowToCheck}>
              <Popconfirm
                title="Xác nhận cập nhật"
                description="Bạn có chắc chắn muốn cập nhật trạng thái?"
                onConfirm={() => handleUpdateStatus(record.consultationId, 2)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button disabled={!allowToCheck} type="primary" style={{ marginBottom: 8, width: 200 }}>
                  Đã liên lạc
                </Button>
              </Popconfirm>
            </CustomTooltip>
          )}
        </div>
      )
    }
  ];

  return (
    <MainCard title="Danh sách yêu cầu tư vấn">
      <div style={{ background: '#fff', height: '100%' }}>
        <Table
          columns={columns}
          dataSource={list}
          pagination={{
            total: total,
            current: page,
            onChange: (newPage) => {
              setPage(newPage); // Table starts at page = 1
            }
          }}
          loading={loading}
          bordered
          size="small"
          rowKey={'id'}
        />
      </div>
    </MainCard>
  );
};

export default ConsultantRequestList;
