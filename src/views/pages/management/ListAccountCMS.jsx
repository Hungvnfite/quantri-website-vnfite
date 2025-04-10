import MainCard from '../../../ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Popover, Popconfirm } from 'antd'; // Import các thành phần từ Ant Design
import { AiOutlineUserAdd } from 'react-icons/ai'; // Import các icon từ react-icons
import { CopyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUsersStore } from '../../../hooks/users';
import { DeleteOutlined, SecurityScanOutlined } from '@ant-design/icons'; // Import DeleteOutlined và EyeOutlined từ @ant-design/icons
// import dispatchToast from '~/handlers/toast';
// import styled from 'styled-components';
import { useAuthenticationStore } from '../../../hooks/authentication';
import CustomTooltip from '../../../ui-component/atoms/CustomTooltip';
import dispatchToast from '../../../handlers/toast';

const ListAccountCMS = () => {
  const [dataUser, setDataUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [resetPassword, setResetPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { allowToCreate, allowToAuth } = useAuthenticationStore();
  const { getAccountCMS, resetPasswordAccountCMS, deleteAccountCMS } = useUsersStore();

  const navigate = useNavigate();

  const columns = [
    {
      title: 'STT',
      width: 50,
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tên đăng nhập',
      width: 200,
      dataIndex: 'userName',
      key: 'userName',
      align: 'center'
    },
    ...(allowToCreate
      ? [
          {
            title: 'Reset mật khẩu',
            width: 75,
            key: 'reset',
            align: 'center',
            render: (record) => (
              <CustomTooltip open={!allowToCreate}>
                <Popconfirm
                  title="Xác nhận đặt lại khẩu"
                  description="Bạn có chắc chắn muốn đặt lại mật khẩu?"
                  onConfirm={() => {
                    handleResetPassword(record.userId);
                  }}
                  okText="Xác nhận"
                  cancelText="Hủy"
                >
                  <Button disabled={!allowToCreate}>Đặt lại</Button>
                </Popconfirm>
              </CustomTooltip>
            )
          }
        ]
      : []),
    ...(allowToCreate
      ? [
          {
            title: 'Tùy chọn',
            width: 100,
            key: 'option',
            align: 'center',
            render: (record) => (
              <>
                <CustomTooltip open={!allowToCreate}>
                  {allowToAuth && (
                    <CustomTooltip open={!allowToAuth}>
                      <Button style={{ marginLeft: '10px' }} onClick={() => navigate('/phan-quyen-nhan-vien', { state: { info: record } })}>
                        <SecurityScanOutlined />
                      </Button>
                    </CustomTooltip>
                  )}

                  <Popconfirm
                    title="Xác nhận xóa"
                    description="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => {
                      handleDeleteAccountCMS(record.userId);
                    }}
                    okText="Xác nhận"
                    cancelText="Hủy"
                  >
                    <Button style={{ marginLeft: '10px' }} danger>
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                </CustomTooltip>
              </>
            )
          }
        ]
      : [])
  ];

  useEffect(() => {
    fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUser = async () => {
    setLoading(true);
    try {
      const response = await getAccountCMS({ pageSize: 10, pageNumber: pageNumber - 1 });
      setDataUser(response?.data?.listUserCMS);
      setTotalRecord(response?.data?.totalRecord);
    } catch (error) {
      console.error('err', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = async (page) => {
    setLoading(true);
    try {
      const response = await getAccountCMS({ pageNumber: page - 1, pageSize: 10 });
      setPageNumber(page);
      setDataUser(response?.data?.listUserCMS);
      setTotalRecord(response?.data?.totalRecord);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (id) => {
    try {
      const response = await resetPasswordAccountCMS(id);
      if (response?.result?.isOK) {
        setResetPassword(response?.data?.newPassword);
        setOpenModal(true);
      } else {
        dispatchToast('error', response?.result?.responseMessage || 'Đặt lại mật khẩu thất bại');
      }
    } catch (error) {
      console.error('err', error);
    }
  };

  const handleDeleteAccountCMS = async (id) => {
    try {
      const response = await deleteAccountCMS(id);
      fetchDataUser();
      if (response?.result?.isOK) {
        dispatchToast('success', 'Xóa tài khoản CMS thành công');
      } else {
        dispatchToast('error', response?.result?.responseMessage || 'Xóa tài khoản CMS thất bại');
      }
    } catch (error) {
      console.error('err', error);
      dispatchToast('error', response?.result?.responseMessage || 'Lỗi hệ thống');
    }
  };

  return (
    <MainCard title="Danh sách quản trị">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/them-tai-khoan-CMS">
          <CustomTooltip open={!allowToCreate}>
            <Button disabled={!allowToCreate} type="primary" icon={<AiOutlineUserAdd />} onClick={() => {}}>
              Thêm tài khoản CMS mới
            </Button>
          </CustomTooltip>
        </Link>
      </div>
      <Modal title="Mật khẩu mới của người dùng" open={openModal} footer onCancel={() => setOpenModal(false)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 'bold' }}>{resetPassword}</h2>
          <Popover content="Đã sao chép mật khẩu" trigger="click" getPopupContainer={(trigger) => trigger.parentNode} placement="bottom">
            <Button
              key="copy"
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(resetPassword);
              }}
            />
          </Popover>
        </div>
      </Modal>

      <Table
        columns={columns}
        dataSource={dataUser}
        scroll={{ y: 600 }}
        loading={loading}
        pagination={{
          total: totalRecord,
          pageSize: 10,
          current: pageNumber,
          showSizeChanger: false,
          size: 'default',
          // onChange: (page) => {
          //     setPageNumber(page);
          //     fetchDataUser({ params: { pageNumber: page, pageSize: 10 } });
          // }
          onChange: (page) => {
            handleChangePage(page);
          }
        }}
        size="small"
        rowKey={'userId'}
        bordered
      />
    </MainCard>
  );
};

export default ListAccountCMS;
