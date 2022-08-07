import "./App.css";

import { Switch, HashRouter } from "react-router-dom";

// pages
import UsersList from "./pages/UsersList";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUsers";
import CreateContent from "./pages/CreateContent";
import UpdateContent from "./pages/UpdateContent";
import SingleProduct from "./pages/SingleProduct";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ProductsList from "./pages/ProductsList";
import EditSingleProduct from "./pages/EditSingleProduct";
import CreateProduct from "./pages/CreateProduct";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import CategoriesList from "./pages/category/CategoriesList";
import EditCategory from "./pages/EditCategory";
import DiscountsList from "./pages/DiscountsList";
import CreateDiscount from "./pages/CreateDiscount";
import EditDiscount from "./pages/EditDiscount";
import PromosList from "./pages/PromosList";
import CreatePromo from "./pages/CreatePromo";
import EditPromo from "./pages/EditPromo";
import TransactionsList from "./pages/TransactionsList";
import RolesList from "./pages/RolesList";
import CreateRole from "./pages/CreateRole";
import EditRole from "./pages/EditRole";
import PermissionsList from "./pages/PermissionsList";
import ActivityLogsList from "./pages/ActivityLogsList";
import TagsList from "./pages/TagsList";
import CreateTag from "./pages/CreateTag";
import EditTag from "./pages/EditTag";

import BlogsList from "./pages/BlogsList";
import EditSingleBlog from "./pages/EditSingleBlog";
import SingleBlog from "./pages/SingleBlog";
import CreateBlog from "./pages/CreateBlog";
import VacanciesList from "./pages/VacanciesList";
import EditVacancy from "./pages/EditVacancy";
import CreateVacancy from "./pages/CreateVacancy";
import ApplicationsList from "./pages/ApplicationsList";
import PartnersList from "./pages/PartnersList";
import AddPartner from "./pages/AddPartner";
import FqasList from "./pages/FqasList";
import AddFqas from "./pages/AddFqas";
import EditFqas from "./pages/EditFqas";
import CreateSlider from "./pages/sliders/CreateSlider.jsx";
import Sliderlist from "./pages/sliders/Sliderlist";
import PageHeader from "./pages/pageheader/PageHeader";
import EditPageHeader from "./pages/pageheader/EditPageHeader";
import Partitions from "./pages/Partitions/Partitions";
import EditPartitions from "./pages/Partitions/EditPartitions";
import AddCategory from "./pages/category/AddCategory";
import CityList from "./pages/city/citylist";
import CreateCity from "./pages/city/createcity";
import Districtlist from "./pages/city/Districtlist";
import AddDistrict from "./pages/city/AddDistrict";
import CreateCategory from "./pages/category/CreateCategory";
import OrdersList from "./pages/orders/orderslist";
import Order from "./pages/orders/order";

require("dotenv").config();

function App() {
  return (
    <Provider store={store}>
      <HashRouter basename="/">
        <div className="App">

          <Navbar />
          <Switch>
            <PublicRoute  component={Login} path="/" exact />

            <PrivateRoute component={UsersList} path="/Users" exact />
            <PrivateRoute component={EditUser} path="/EditUser/:id" exact />
            <PrivateRoute component={CreateUser} path="/CreateUser" exact />

            {/* <PrivateRoute component={CreateContent} path="/AddContent" exact /> */}
            <PrivateRoute component={UpdateContent} path="/AddContent" exact />

            <PrivateRoute component={EditUser} path="/EditUser/:id" exact />
            <PrivateRoute component={ProductsList} path="/Products" exact />

            <PrivateRoute
              component={SingleProduct}
              path="/SingleProductView/:id"
              exact
            />
            <PrivateRoute
              component={EditSingleProduct}
              path="/EditSingleProduct/:id"
              exact
            />
            <PrivateRoute component={CreateUser} path="/CreateUser" exact />
            <PrivateRoute
              component={CreateProduct}
              path="/CreateProduct"
              exact
            />

            <PrivateRoute component={CategoriesList} path="/Categories" exact />

            <PrivateRoute
              component={EditCategory}
              path="/EditCategory/:id"
              exact
            />

            <PrivateRoute
              component={AddCategory}
              path="/addcategory/:id"
              exact
            />

            <PrivateRoute
              component={DiscountsList}
              path="/DiscountsList"
              exact
            />

            <PrivateRoute
              component={CreateDiscount}
              path="/CreateDiscount"
              exact
            />

            <PrivateRoute
              component={EditDiscount}
              path="/EditDiscount/:id"
              exact
            />

            <PrivateRoute component={PromosList} path="/PromosList" exact />

            <PrivateRoute component={CreatePromo} path="/CreatePromo" exact />

            <PrivateRoute component={EditPromo} path="/EditPromo/:id" exact />
            <PrivateRoute
              component={TransactionsList}
              path="/TransactionsList"
              exact
            />

            <PrivateRoute component={RolesList} path="/RolesList" exact />
            <PrivateRoute component={CreateRole} path="/CreateRole" exact />
            <PrivateRoute component={EditRole} path="/EditRole/:id" exact />
            <PrivateRoute
              component={PermissionsList}
              path="/PermissionsList"
              exact
            />

            <PrivateRoute
              component={ActivityLogsList}
              path="/ActivityLogsList"
              exact
            />

            <PrivateRoute component={TagsList} path="/TagsList" exact />
            <PrivateRoute component={CreateTag} path="/CreateTag" exact />
            <PrivateRoute component={EditTag} path="/EditTag/:id" exact />

            <PrivateRoute component={BlogsList} path="/Blogs" exact />

            <PrivateRoute
              component={SingleBlog}
              path="/SingleBlogView/:id"
              exact
            />
            <PrivateRoute
              component={EditSingleBlog}
              path="/EditSingleBlog/:id"
              exact
            />

            <PrivateRoute component={CreateBlog} path="/CreateBlog" exact />

            <PrivateRoute component={VacanciesList} path="/Vacancies" exact />
            <PrivateRoute
              component={CreateVacancy}
              path="/CreateVacancy"
              exact
            />

            <PrivateRoute
              component={EditVacancy}
              path="/EditVacancy/:id"
              exact
            />

            <PrivateRoute
              component={ApplicationsList}
              path="/JobApplications"
              exact
            />

            <PrivateRoute component={PartnersList} path="/Partners" exact />

            <PrivateRoute component={AddPartner} path="/AddPartner" exact />

            <PrivateRoute component={FqasList} path="/Fqas" exact />
            <PrivateRoute component={AddFqas} path="/AddFqas" exact />
            <PrivateRoute component={EditFqas} path="/EditFqas/:id" exact />

            <PrivateRoute component={Sliderlist} path="/sliderlist" exact />
            <PrivateRoute component={CreateSlider} path="/createslider" exact />
            <PrivateRoute component={PageHeader} path="/pageheader" exact />
            <PrivateRoute
              component={EditPageHeader}
              path="/EditPageHeader/:id"
              exact
            />

            <PrivateRoute component={Partitions} path="/partitions" exact />
            <PrivateRoute
              component={EditPartitions}
              path="/EditPartitions/:id"
              exact
            />
            <PrivateRoute component={CityList} path="/citylist" exact />
            <PrivateRoute component={CreateCity} path="/createcity" exact />
            <PrivateRoute component={Districtlist} path="/districtlist" exact />

            <PrivateRoute
              component={AddDistrict}
              path="/adddistrict/:id"
              exact
            />

            <PrivateRoute
              component={CreateCategory}
              path="/CreateCategory"
              exact
            />
            <PrivateRoute component={OrdersList} path="/orderslist" exact />
            <PrivateRoute component={Order} path="/order/:id" exact />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
