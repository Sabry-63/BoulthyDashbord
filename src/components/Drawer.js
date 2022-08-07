import { Drawer, Menu } from 'antd';
import {
    SettingOutlined,
    FileWordOutlined,
    AppstoreAddOutlined,
    ApartmentOutlined,
    PercentageOutlined,
    DollarOutlined,
    UserSwitchOutlined,
    UsergroupAddOutlined,
    BarsOutlined,
    TagOutlined,
    PicLeftOutlined,
    AuditOutlined,
    SolutionOutlined,
    TeamOutlined,
    QuestionOutlined,
    SlidersOutlined,
    CarryOutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export default function Drawer2({ visible, setvisible }) {
    let location = useLocation();

    const { SubMenu } = Menu;

    const handleClickOnMenu = (e) => {
        console.log('click ', e.key);
        setvisible(!visible);
    };

    return (
        <Drawer
            closeIcon={<i className="fas fa-times"></i>}
            title="Website Navbar"
            onClose={() => setvisible(!visible)}
            visible={visible}
            bodyStyle={{ padding: 0 }}
            placement={'left'}
        >
            <Menu
                onClick={(e) => handleClickOnMenu(e)}
                defaultSelectedKeys={'/Users'}
                defaultOpenKeys={['1']}
                selectedKeys={location.pathname}
                mode="inline"
                theme="dark"
            >
                <SubMenu key="1" icon={<SettingOutlined />} title="Users">
                    <Menu.Item key="/Users">
                        <Link to="/Users">Users List</Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateUser">
                        <Link to="/CreateUser">Create User</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="2"
                    icon={<FileWordOutlined />}
                    title="Static Content"
                >
                    <Menu.Item key="/AddContent">
                        <Link to="/AddContent">Create Content </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="3"
                    icon={<AppstoreAddOutlined />}
                    title="Products"
                >
                    <Menu.Item key="/Products">
                        <Link to="/Products">Products List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateProduct">
                        <Link to="/CreateProduct">Create Product </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="4"
                    icon={<ApartmentOutlined />}
                    title="Categories"
                >
                    <Menu.Item key="/Categories">
                        <Link to="/Categories"> Categories List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateCategory">
                        <Link to="/CreateCategory">Create Category </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="5"
                    icon={<PercentageOutlined />}
                    title="Discounts"
                >
                    <Menu.Item key="/DiscountsList">
                        <Link to="/DiscountsList"> Discounts List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateDiscount">
                        <Link to="/CreateDiscount">Create Discount </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="6" icon={<PercentageOutlined />} title="Promos">
                    <Menu.Item key="/PromosList">
                        <Link to="/PromosList"> Promos List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreatePromo">
                        <Link to="/CreatePromo">Create Promo </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="7" icon={<DollarOutlined />} title="Transactions">
                    <Menu.Item key="/TransactionsList">
                        <Link to="/TransactionsList">Transactions List </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="/CreatePromo">
            <Link to="/CreatePromo">Create Promo </Link>
          </Menu.Item> */}
                </SubMenu>

                <SubMenu key="8" icon={<UserSwitchOutlined />} title="Roles">
                    <Menu.Item key="/RolesList">
                        <Link to="/RolesList">Roles List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateRole">
                        <Link to="/CreateRole">Create Role </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="/CreatePromo">
            <Link to="/CreatePromo">Create Promo </Link>
          </Menu.Item> */}
                </SubMenu>

                <SubMenu
                    key="9"
                    icon={<UsergroupAddOutlined />}
                    title="Permissions"
                >
                    <Menu.Item key="/PermissionsList">
                        <Link to="/PermissionsList">Permissions List </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="10" icon={<BarsOutlined />} title="Activity Logs">
                    <Menu.Item key="/ActivityLogsList">
                        <Link to="/ActivityLogsList">Activity Logs List </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="11" icon={<TagOutlined />} title="Tags">
                    <Menu.Item key="/TagsList">
                        <Link to="/TagsList">Tags List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateTag">
                        <Link to="/CreateTag">Create Tag </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="12" icon={<PicLeftOutlined />} title="Blogs">
                    <Menu.Item key="/Blogs">
                        <Link to="/Blogs">Blogs List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateBlog">
                        <Link to="/CreateBlog">Create Blog </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="13" icon={<AuditOutlined />} title="Vacancies">
                    <Menu.Item key="/Vacancies">
                        <Link to="/Vacancies">Vacancies List </Link>
                    </Menu.Item>
                    <Menu.Item key="/CreateVacancy">
                        <Link to="/CreateVacancy">Create Vacancy </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="14"
                    icon={<SolutionOutlined />}
                    title="Job Applications"
                >
                    <Menu.Item key="/JobApplications">
                        <Link to="/JobApplications">
                            Job Applications List{' '}
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="15" icon={<TeamOutlined />} title="Partners">
                    <Menu.Item key="/Partners">
                        <Link to="/Partners">Partners List </Link>
                    </Menu.Item>
                    <Menu.Item key="/AddPartner">
                        <Link to="/AddPartner">Add Partner</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="16" icon={<QuestionOutlined />} title="FQ/As">
                    <Menu.Item key="/Fqas">
                        <Link to="/Fqas">FQ/As List </Link>
                    </Menu.Item>
                    <Menu.Item key="/AddFqas">
                        <Link to="/AddFqas">Add Fqas</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="17" icon={<SlidersOutlined />} title="Sliders">
                    <Menu.Item key="/sliderlist">
                        <Link to="/sliderlist">Slider List</Link>
                    </Menu.Item>

                    <Menu.Item key="/createslider">
                        <Link to="/createslider">Create Slider</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="18"
                    icon={<CarryOutOutlined />}
                    title="Page Header"
                >
                    <Menu.Item key="/pageheader">
                        <Link to="/pageheader">Page Header</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="19"
                    icon={<CarryOutOutlined />}
                    title="Partitions"
                >
                    <Menu.Item key="/partitions">
                        <Link to="/partitions">Partitions</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="20" icon={<CarryOutOutlined />} title="City">
                    <Menu.Item key="/citylist">
                        <Link to="/citylist">City List</Link>
                    </Menu.Item>

                    <Menu.Item key="/createcity">
                        <Link to="/createcity">Create City</Link>
                    </Menu.Item>

                    <Menu.Item key="/districtlist">
                        <Link to="/districtlist">District List</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="21" icon={<CarryOutOutlined />} title="Orders">
                    <Menu.Item key="/orderslist">
                        <Link to="/orderslist">Orders List</Link>
                    </Menu.Item>
                </SubMenu>

                {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="9">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu> */}
            </Menu>
        </Drawer>
    );
}
