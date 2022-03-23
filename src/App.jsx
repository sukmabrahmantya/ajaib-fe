/* eslint-disable react-hooks/exhaustive-deps */
import { 
  Layout, 
  Breadcrumb, 
  Input, 
  Button,
  Typography,
  Row,
  Col,
  Select,
  Divider,
  Table,
  Pagination,
	Tooltip,
	Modal,
	Space
} from 'antd';
import {
	CheckOutlined,
	CloseOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { getUsers, getRowsUsers } from './store/users'
import { useDispatch, useSelector } from 'react-redux';
import { useIsMount } from './useIsMount'

const App = () => {
  const dispatch = useDispatch()
	const isMount = useIsMount()
  const { loading, rows, total } = useSelector(state => state.users)
	const [keywordValue, setKeywordValue] = useState('');
	const [showModal, setShowModal] = useState(true)
  const [filters, setFilters] = useState({
    page: 1,
    gender: 'all',
    keyword: '',
    limit: 10,
		sort: ''
  })

	const listOfTask = [
		{ task: ' Third Party API Randomuser ', status: true },
		{ task: ' Search By Keyword (Username, Name or Email) ', status: true },
		{ task: ' Filter By Gender ', status: true },
		{ task: ' Pagination ', status: true },
		{ task: ' Reset Filter ', status: true },
		{ task: ' Deploy on AWS ', status: true, link: 'http://ajaib.s3-website-ap-southeast-1.amazonaws.com' },
		{ task: ' Deploy on Netlify ', status: true, link: 'https://ajaib.netlify.app' },
		// { task: ' Integration / Unit Testing ', status: false },
		// { task: ' Sort Functionality ', status: false },
	]

  useEffect(() => {
    if (isMount) {
        dispatch(getUsers(filters))
      } else {
      console.log('Subsequent Render');
    }
  }, []);

  useEffect(() => {
    dispatch(getRowsUsers(filters))
  }, [filters])        

	const onSearch = (value) => {
		setFilters({
			...filters,
			keyword: value
		})
	};
        
  const changeGender = (type) => {
    setFilters({
			...filters,
			gender: type
		})
  };

	const resetFilter = () => {
		setFilters({
			...filters,
			gender: 'all',
			keyword: ''
		})
		setKeywordValue('')
	};

  const columns = [
    {
      title: 'Username',
      width: 100,
      fixed: 'left',
      render: ({ login }) => `${login.username}`,
    },
    {
      title: 'Name',
      width: 100,
      render: ({ name }) => `${name.title} ${name.first} ${name.last}`,
    },
    {
      title: 'Email',
      width: 150,
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      width: 100,
      dataIndex: 'gender',
    },
    {
      title: 'Registered Date',
      width: 100,
      render: ({ registered }) => `${new Date(registered.date).toLocaleString()}`,
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Example Page</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title level={3}>Dashboard With Search and Filter</Typography.Title>
        <Row gutter={[8,8]}>
          <Col span={5}>
						<Tooltip placement="bottomLeft" title="You can search using username, name or email.">
            	<Input.Search placeholder="Search..." value={keywordValue} onChange={(e) => setKeywordValue(e.target.value)} loading={loading} enterButton onSearch={onSearch}  />
						</Tooltip>
          </Col>
          <Col span={4}>
            <Select defaultValue="all" value={filters.gender} style={{ width: '100%' }} onChange={changeGender}>
              <Select.Option value="all">All Gender</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="male">Male</Select.Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button onClick={resetFilter}>Reset Filter</Button>
          </Col>
        </Row>
        <Divider />
        <Table
					loading={loading}
          columns={columns}
          dataSource={rows}
          rowKey={row => row.login.uuid}
          scroll={{ x: 1500, y: 600 }}
          pagination={false}
        />
        <Row justify="space-between" align="middle" style={{ margin: '20px 0' }}>
          <Pagination 
            total={total}
						showTotal={total => `Total ${total} items`}
						sortDirections={[false, 'ascend','descend']}
            pageSize={filters.limit}
            current={filters.page}
            showSizeChanger={true}
            onChange={(page, pageSize) => {
              setFilters({
                ...filters,
                page: filters.limit === pageSize ? page : 1,
                limit: pageSize || 10
              })
            }}
          />
        </Row>
				<Modal
					centered 
					title="Personal Project | Brahmantya Prajanji" 
					closable={false}
					visible={showModal} 
					cancelButtonProps={{ style: { display: 'none' } }}
					onOk={() => setShowModal(false)}
				>
					<Space direction='vertical'>
						{listOfTask.map(el => (
							<Typography.Text key={el.task}> 
								{el.status === true ? <CheckOutlined style={{color: '#52c41a'}} /> : <CloseOutlined style={{color:"#eb2f96"}} />}
								{el.task} 
								{el.link ? <Typography.Link href={el.link} target="_blank"> link </Typography.Link> : null }
							</Typography.Text>
						))}
					</Space>
				</Modal>
      </Layout.Content>
    </Layout>
  );
}

export default App;
