import React from 'react';
import { Button } from '@material-ui/core';
class Products extends React.Component {

	render() {
		return <React.Fragment>
			<div className="product-list-outer-box">
				{this.props.productList.map((el, index) => <div key={index} className="product-outer-box">
					<img src={el.image_urls.x520} alt={el.alt_text} />
					<div className="content">
						<p className="product-heading">{el.name}</p><span>{el.rating ? <React.Fragment>{el.rating} &#9733;</React.Fragment> : "--"}</span>
						<p className="product-quantity">{`${el.weight} ${el.weight_unit}`}</p>
						<p className="product-price">₹ {el.final_price_new} <del>₹ {el.final_price}</del></p>
						{el.is_in_stock ?
							<Button className="active">
								ADD TO CART
							</Button>
							: <Button className="disabled">
								OUT OF STOCK
							</Button>
						}
					</div>
				</div>
				)}
			</div>
		</React.Fragment>
	}
}

export default Products;