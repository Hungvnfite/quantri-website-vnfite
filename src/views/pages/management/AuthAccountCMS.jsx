import React from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Space, Table, Radio, Button, Form, Row, Col, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import pages from '../../../menu-items/pages';
import { useState, useEffect } from 'react';
import { useUsersStore } from '../../../hooks/users';
import dispatchToast from '../../../handlers/toast';
// import { set } from 'immutable';

const AuthAccountCMS = ({ update = false }) => {
  const locationState = useLocation().state || {};
  const { info } = locationState;
  // console.log(info, 'info');
  const [data, setData] = useState([]);
  const { addAccountCMS, updateRole, getDetailRoleById } = useUsersStore();
  const navigete = useNavigate();
  const [globalRole, setGlobalRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);
  const [infoUser, setInfoUser] = useState({
    userName: '',
    password: ''
  });
  const [moduleRoles, setModuleRoles] = useState([]);

  const options = [
    {
      label: 'Admin',
      value: 'admin'
    },
    {
      label: 'Maker',
      value: 'maker'
    },
    {
      label: 'Checker',
      value: 'checker'
    },
    {
      label: 'Viewer',
      value: 'viewer'
    },
    {
      label: 'Ẩn',
      value: 'none'
    }
  ];

  // const onExpand = (expanded, record) => {
  //   console.log('EXPAND ', expanded, record);
  //   if (expanded) {
  //     // Thêm key vào danh sách nếu mở rộng
  //     setExpandedRowKeys((prev) => [...prev, record.key]);
  //   } else {
  //     // Loại bỏ key khỏi danh sách nếu thu gọn
  //     setExpandedRowKeys((prev) => prev.filter((key) => key !== record.key));
  //   }
  // };

  // const convert = (node) => {
  //   const result = {
  //     key: node.id,
  //     title: node.title,
  //     value: 'admin'
  //   };
  //   if (node.url) {
  //     result.url = node.url; // Nếu có URL, thêm vào
  //   }
  //   if (node.children) {
  //     result.children = node.children.map(convert); // Đệ quy cho children
  //   }
  //   return result;
  // };
  const getDetailModuleById = async (id) => {
    setLoadingRole(true);
    const response = await getDetailRoleById(id);
    if (response?.result?.isOK) {
      // console.log(response?.data?.moduleRoles);
      setModuleRoles(response?.data?.moduleRoles);
      setLoadingRole(false);
    } else {
      setLoadingRole(false);
      console.log('error');
      dispatchToast('error', response?.result?.responseMessage || 'Lấy dữ liệu thất bại');
    }
  };

  useEffect(() => {
    if (update) {
      getDetailModuleById(info?.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newData = pages.children.map(convert);
    setData(newData);
  }, [moduleRoles]);

  const findParent = (record, data, parentKey = null) => {
    for (const item of data) {
      if (item.key === record.key) {
        return parentKey; // Trả về parentKey nếu tìm thấy node
      }
      if (item.children) {
        const parent = findParent(record, item.children, item.key); // Đệ quy với children
        if (parent) {
          return parent; // Nếu tìm thấy parent trong children, trả về
        }
      }
    }
    return null; // Không tìm thấy parent
  };

  // Dùng khi cần phân quyền module nhỏ hơn
  const onOptionChange = (e, record) => {
    //  find parents
    const value = e.target.value;

    //Khi chọn giá trị cho một module, đặt giá trị module tổng = null
    setGlobalRole(null);

    const parentKey = findParent(record, data);

    // Hàm đệ quy cập nhật tất cả children
    const updateChildren = (node, newValue) => {
      if (node.children) {
        node.children = node.children.map((child) => ({
          ...child,
          value: newValue,
          children: updateChildren(child, newValue) // Đệ quy cập nhật con
        }));
      }
      return node.children;
    };

    // Hàm đệ quy cập nhật node
    const updateNode = (node) => {
      if (node.key === record.key) {
        // Cập nhật bản ghi hiện tại
        return {
          ...node,
          value: value,
          children: updateChildren(node, value) // Cập nhật tất cả con của nó
        };
      }

      if (node.key === parentKey) {
        // Nếu là parent, kiểm tra và set giá trị

        const allSameValue = node.children
          .filter((child) => child.title != record.title)
          .every((child) => {
            return child.value === value;
          });
        //   const hasDifferentValues = node.children.some((child) => child.value !== value);

        return {
          ...node,
          value: allSameValue ? value : '', // Set parent là rỗng nếu có giá trị con khác nhau
          children: node.children.map(updateNode) // Đệ quy cập nhật children
        };
      }

      // Nếu không phải bản ghi hiện tại hay parent, tiếp tục đệ quy
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }

      return node;
    };

    setData((prevData) => {
      const updatedData = prevData.map(updateNode);
      // Kiểm tra tất cả modules con trong updatedData
      const allSameGlobalValue = updatedData.every((item) => item.value === value);

      // Nếu tất cả các module con có cùng giá trị, set globalRole
      if (allSameGlobalValue) {
        setGlobalRole(value);
      } else {
        setGlobalRole(null); // Nếu không, reset về null
      }
      return updatedData;
    });
  };

  const columns = [
    {
      title: 'Module',
      dataIndex: 'title',
      key: 'title',
      width: '40%'
    },
    {
      title: 'Action',
      dataIndex: '',
      align: 'end',
      width: '60%',
      key: 'id',
      render: (row) => {
        return (
          <div>
            <Radio.Group options={options} value={row.value} onChange={(e) => onOptionChange(e, row)} />
          </div>
        );
      }
    }
  ];

  const handleSaveClick = async () => {
    // console.log('save', data);
    setLoading(true);
    // console.log(infoUser);
    if (!update) {
      // call api create
      const response = await addAccountCMS({
        username: infoUser.userName,
        password: infoUser.password,
        modules: data.map((item) => ({
          moduleName: item.key,
          role: item.value?.toUpperCase() ?? 'NONE'
        }))
      });

      if (response?.result?.isOK) {
        dispatchToast('success', 'Thêm tài khoản thành công');
        navigete('/danh-sach-tai-khoan-CMS');
      } else {
        console.log('error');
        dispatchToast('error', response?.result?.responseMessage || 'Thêm tài khoản thất bại');
      }
    } else {
      // call api update
      // console.log('data', {
      //   userCmsId: info?.userId,
      //   moduleRoles: data.map((item) => ({
      //   moduleName: item.key,
      //   role: item.value?.toUpperCase() ?? 'NONE'
      // }))
      // );
      // console.log('moduleRoles', moduleRoles);
      const response = await updateRole({
        userCmsId: info?.userId,
        moduleRoles: data.map((item) => ({
          moduleName: item.key,
          role: item.value?.toUpperCase() ?? 'NONE'
        }))
      });

      if (response?.result?.isOK) {
        dispatchToast('success', 'Cập nhật tài khoản thành công');
        navigete('/danh-sach-tai-khoan-CMS');
      } else {
        dispatchToast('error', response?.result?.responseMessage || 'Cập nhật tài khoản thất bại');
      }
    }
    setLoading(false);
  };

  //Hàm xử lý khi thay đổi vai trò toàn cục
  const handleGlobalRoleChange = (e) => {
    const selectedRole = e.target.value;
    setGlobalRole(selectedRole);
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        value: selectedRole, // Cập nhật giá trị cho tất cả modules
        children: updateChildrenRoles(item.children, selectedRole) // Đệ quy cập nhật children
      }))
    );
  };

  // Hàm đệ quy cập nhật vai trò cho children
  const updateChildrenRoles = (children, role) => {
    if (!children) return null;
    return children.map((child) => ({
      ...child,
      value: role,
      children: updateChildrenRoles(child.children, role) // Đệ quy cho con
    }));
  };

  useEffect(() => {
    if (data.length > 0) {
      const firstValue = data[0].value;
      const isAllSameValue = data.every((item) => item.value === firstValue);
      setGlobalRole(isAllSameValue ? firstValue : null);
    }
  }, [data]);

  const convert = (node) => {
    const moduleRole = moduleRoles.find((role) => role.moduleName === node.id);
    const result = {
      key: node.id,
      title: node.title,
      value: moduleRole ? moduleRole.role.toLowerCase() : 'none'
    };
    if (node.url) {
      result.url = node.url;
    }
    // if (node.children) {
    //   result.children = node.children.map(convert);
    // }
    return result;
  };

  const onValuesChange = (changedValues, allValues) => {
    // console.log(changedValues, allValues);
    setInfoUser(allValues);
    // console.log(infoUser);
  };

  return (
    <MainCard canGoBack={true} title={update ? 'Phân quyền cho tài khoản ' + info?.userName : 'Thêm tài khoản CMS'}>
      {!update && (
        <Form onValuesChange={onValuesChange}>
          <Row gap={20}>
            <Col span={12} style={{ padding: '5px' }}>
              <Form.Item name="userName" label="Tên đăng nhập" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} style={{ padding: '5px' }}>
              <Form.Item
                name="password"
                label="Nhập mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này' },
                  {
                    pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in hoa và ký tự đặc biệt!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
      <Space
        align="end"
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {/* CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} /> */}
        <Radio.Group options={options} value={globalRole} onChange={handleGlobalRoleChange} optionType="button" buttonStyle="solid" />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loadingRole}
        pagination={{
          pageSize: 20
        }}
        // expandable={{
        //   expandedRowKeys: expandedRowKeys, // Áp dụng trạng thái mở rộng
        //   onExpand: onExpand // Xử lý sự kiện mở rộng
        // }}
      />
      <Space
        align="end"
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button type="primary" onClick={handleSaveClick} loading={loading}>
          {update ? 'Lưu' : 'Thêm tài khoản CMS'}
        </Button>
      </Space>
    </MainCard>
  );
};

export default AuthAccountCMS;
