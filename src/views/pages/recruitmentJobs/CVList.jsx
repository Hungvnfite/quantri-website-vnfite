import React, { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import useRecruitmentJobStore from '../../../hooks/website/recruimentJob';
import { Table, Button } from 'antd';
import { useLocation } from 'react-router';
const CVList = () => {
  const { getAllCVs, updateAppliedJobStatus } = useRecruitmentJobStore();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const id = location.state;
  const [list, setList] = useState([]);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 200,
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
    // {
    //   title: 'Chi nhánh ứng tuyển',
    //   dataIndex: 'location',
    //   key: 'location',
    //   width: 50,
    //   align: 'center'
    // },
    {
      title: 'Giới thiệu',
      dataIndex: 'introduction',
      key: 'introduction',
      width: 100,
      align: 'center'
    },
    {
      title: 'CV',
      dataIndex: 'cv',
      key: 'cv',
      width: 100,
      align: 'center',
      render: (cv, record) => {
        return (
          <a
            href={cv}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              updateAppliedJobStatus({ applyJobId: record.applyJobId, status: 1 });
              setList((pre) => {
                return pre.map((item) => {
                  if (item.applyJobId === record.applyJobId) {
                    return { ...item, status: 1 };
                  }
                  return item;
                });
              });
            }}
          >
            <Button style={record.status == 0 ? { color: '#1890ff' } : { color: '#ccc' }} type="link">
              Xem
            </Button>
          </a>
        );
      }
    }
  ];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getAllCVs({
        hiringJobId: id,
        pageSize: 10,
        pageNumber: 0
      });
      if (response) {
        setList(response.applyJobs);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(list);
  return (
    <MainCard title="Danh sách ứng tuyển">
      <Table
        columns={columns}
        dataSource={list}
        loading={loading}
        // pagination={{
        //   current: pageNumber,
        //   pageSize: 10,
        //   total: totalRecord + 1,
        //   showSizeChanger: false,
        //   onChange: (page) => {
        //     setPageNumber(page);
        //     fetchData(page - 1);
        //   },
        //   size: 'default'
        // }}
        // onChange={(pagination) => {
        //   setPageNumber(pagination.current);
        // }}
        bordered
        size="small"
        rowKey={'id'}
      />
    </MainCard>
  );
};

export default CVList;
