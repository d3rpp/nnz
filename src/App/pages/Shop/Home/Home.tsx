import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { isMobile } from 'mobile-device-detect';
import React, { useState } from 'react';
import { ShopState } from '../util/ShopUtils';
import './Home.scss';

export default () => {
	const [shopState, setShopState] = useState<ShopState>(new ShopState({}));

	return (
		<div id="shop">
			<div
				className={isMobile ? 'header mobile' : 'header'}
				role="header"
			>
				<div
					className={
						isMobile ? 'header-wrapper mobile' : 'header-wrapper'
					}
				>
					<h1>Shop</h1>
				</div>
			</div>

			<section className={isMobile ? 'main mobile' : 'main'}>
				<div className="selection">
					<div className="chocolate">
						<div className="image"></div>
						<div className="input">
							<button>
								<Add />
							</button>
							<input
								type="number"
								value={
									shopState.getMixQuantity('chocolate').valid
										? shopState.getMixQuantity('chocolate')
												.quantity
										: 0
								}
							/>
							<button>
								<Remove />
							</button>
						</div>
					</div>
					<div className="sweet">
						<div className="image"></div>
						<div className="input">
							<button>
								<Add />
							</button>
							<input
								type="text"
								
								value={
									shopState.getMixQuantity('sweet').valid
										? shopState.getMixQuantity('sweet')
												.quantity
										: 0
								}
							/>
							<button>
								<Remove />
							</button>
						</div>
					</div>
					<div className="savoury">
						<div className="image"></div>
						<div className="input">
							<button>
								<Add />
							</button>
							<input
								type="number"
								value={
									shopState.getMixQuantity('savoury').valid
										? shopState.getMixQuantity('savoury')
												.quantity
										: 0
								}
							/>
							<button>
								<Remove />
							</button>
						</div>
					</div>
				</div>
				<div className="checkout"></div>
			</section>
		</div>
	);
};
