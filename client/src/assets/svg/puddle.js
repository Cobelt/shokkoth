import React from 'react';

export default (props) => (
	<svg
		viewBox="0 0 100 100"
		style={{ enableBackground: "new 0 0 100 100" }}
		{ ...props }
	>
		<path d="m 100 50 V 0 H 30 c -57 1 2 15 0 21 c 0 2 -37 49 13 29 c 15 -7 -1 10 -2 16 c 0 10 12 -4 10 3 c -2 7 -3 51 23 14 C 87 60 96 107 100 90 v -40" style={{ '--path': '"m 100 50 V 0 H 30 c -57 1 2 15 0 21 c 0 2 -37 49 13 29 c 15 -7 -1 10 -2 16 c 0 10 12 -4 10 3 c -2 7 -3 51 23 14 C 87 60 96 107 100 90 v -40"' }}/>
	</svg>
);
