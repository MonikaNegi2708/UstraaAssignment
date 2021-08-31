import axios from 'axios';
import React from 'react';
import history from './history';
import Category from './category';

class Dashboard extends React.Component {
	state = {
		categoryList: [],
		isFetchingCategories: true,
	}

	componentDidMount() {
		this.getCategoryList();
	}

	getCategoryList = () => {
		let url = "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob";
		axios.get(url)
			.then((res) => {
				let categoryList = res.data.category_list;
				this.setState({
					isFetchingCategories: false,
					categoryList,
					categoryId: categoryList[0].category_id
				}, () => history.push('/all-products/' + categoryList[0].category_name))
			})
			.catch((error) => {
				this.setState({ isFetchingCategories: false }, () => console.log(error))
			});
	};

	render() {
		return <div>
			{this.state.isFetchingCategories ?
				<h1>Loading ....</h1>
				: this.state.categoryList.length > 0 ?
					<Category
						categoryList={this.state.categoryList}
						categoryId={this.state.categoryId}
						categoryName={this.state.categoryList[0].category_name} />
					: <h1>No results found !</h1>
			}
		</div>
	}
}

export default Dashboard;