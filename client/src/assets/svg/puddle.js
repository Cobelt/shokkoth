import React from 'react';

export default (props) => (
	<svg
		viewBox="0 0 100 100"
		style={{ enableBackground: "new 0 0 100 100" }}
		xmlSpace="preserve"
		{ ...props }
	>
		<path style={{ "--path": '"m 100 50 V 0 H 30 c -57 1 2 15 0 21 c 0 2 -37 49 13 29 c 15 -7 -1 10 -2 16 c 0 10 12 -4 10 3 c -2 7 -3 51 23 14 C 87 60 96 107 100 90 l 0 -40"', d: "path(var(--path))" }}>
			<animate attributeName="d" values="
	            m 100 50 v -50 h -70 c -57 1 2 15 0 21 c 0 2 -37 49 13 29 c 15 -7 -1 10 -2 16 c 0 10 12 -4 10 3 c -2 7 -3 51 23 14 c 8 -11 22 24 26 7 v -40;
	            m 100 50 v -50 h -70 c -37 1 0 21 0 21 c -7 0 -59 45 13 29 c 6 -2 -6 9 -6 9 c -9 8 -6 12 14 10 c -6 7 -30 51 23 14 c 0 0 22 24 26 7 v -40
	        " keyTimes="0; 1" calcMode="spline" keySplines="0.42 0 1 1; 0.42 0 1 1" dur="5s" fill="freeze"/>
		</path>
	</svg>
);
