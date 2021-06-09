import React from 'react';
import './Status.scss';

type STATUS_PROPS =
	| { status: 'success'; orderID: string; name: string }
	| { status: 'cancelled' }
	| { status: 'error' };

export default (status: STATUS_PROPS) => {
	return <div id="status">{status}</div>;
};
