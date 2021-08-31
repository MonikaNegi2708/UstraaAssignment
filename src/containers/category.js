import axios from "axios";
import React from "react";
import Products from './products';
import history from './history';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Category extends React.Component {
	state = {
		productList: [],
		isFetchingProducts: true,
		viewAll: false,
		categoryName: this.props.categoryName,
		categoryId: this.props.categoryId,
	}

	componentDidMount() {
		if (this.state.categoryId) {
			this.getProductList(this.state.categoryId)
		}
	}

	getProductList = (categoryId) => {
		let url = `https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${categoryId}`;
		axios.get(url)
			.then((res) => {
				let productList = res.data.products;
				this.setState({
					productList,
					filteredProductList: productList.slice(0, 3),
					isFetchingProducts: false,
					viewAll: false,
				})
			})
			.catch((error) => {
				this.setState({ isFetchingProducts: false }, () => console.log(error))
			});
	}

	changeCategoryHandler = (e) => {
		this.setState({ anchorEl: e.currentTarget })
	}

	onCloseHandler = (categoryName, categoryId) => {
		history.push(`/all-products/${categoryName}`);
		this.getProductList(categoryId);
		this.setState({
			anchorEl: null,
			categoryName
		})
	};

	viewAllHandler = () => {
		let viewAll = this.state.viewAll;
		let productList = this.state.productList;
		let filteredProductList = this.state.filteredProductList;

		if (viewAll) {
			viewAll = false;
			filteredProductList = productList.slice(0, 3);
		}
		else {
			viewAll = true;
			filteredProductList = productList;
		}
		this.setState({
			viewAll,
			filteredProductList,
		})
	}

	onCategoryClickHandler = (categoryId, categoryName) => {
		this.setState({
			categoryId,
			categoryName,
			isFetchingProducts: true,
		}, () => history.push(`/all-products/${categoryName}`), this.getProductList(categoryId))
	}

	render() {
		return <React.Fragment>
			<div className="category-outer-box">
				{this.props.categoryList.map(el => <div
					key={el.category_id}
					id={el.category_name.trim()}
					className="cat-tab"
					onClick={() => this.onCategoryClickHandler(el.category_id, el.category_name)}
				>
					<img src={el.category_image} alt="category Img" />
					<span>{el.category_name}</span>
				</div>)
				}
			</div>
			{this.state.isFetchingProducts ?
				<div>Loading...</div>
				: this.state.productList.length > 0 ?
					<Products
						productList={this.state.filteredProductList}
						categoryName={this.state.categoryName}
						categoryList={this.props.categoryList} />
					: <div>No results found !</div>
			}
			<div className="footer-outer-box">
				<p className="heading">Showing results for : <span>{this.state.categoryName}</span></p>
				<div className="other-option">
					<Button onClick={this.changeCategoryHandler}>Change</Button>
					<Button onClick={this.viewAllHandler}>{this.state.viewAll ? '[-] View Less' : '[+] View More'}</Button>
				</div>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					onClose={this.onCloseHandler}
				>
					{this.props.categoryList.map(val => <a href={"#" + val.category_name.trim()}> <MenuItem
						key={val.category_id}
						onClick={() => this.onCloseHandler(val.category_name, val.category_id)}>{val.category_name}</MenuItem> </a>)}
				</Menu>
			</div>
		</React.Fragment >
	}
}

export default Category;