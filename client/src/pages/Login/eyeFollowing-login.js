import React from 'react';
import get from 'lodash.get';

export default ({ look, ...otherProps }) => {
  console.log('received look=', look);
  const externalBorder = { className: 'external-border', cx: 50, cy: 50, r: 50 };
  const internalBorder = { fill: '#fafafa', cx: 50, cy: 50, r: 46 };

  let decalage = 20
  if (look !== 'away')
    decalage = Math.min(parseInt(get(look.match(/#(\d+)$/i), '[1]') || decalage, 10), 40)

  const iris = look === 'away' ?
  { fill: '#0A7590', cx: 60, cy: 40, r: 25 } :
  { fill: '#0A7590', cx: 40 + decalage / 2, cy: 65, r: 25 };

  const pupille = look === 'away' ?
  { fill: '#333', cx: 70, cy: 30, r: 7 } :
  { fill: '#333', cx: 30 + decalage, cy: 75, r: 7 };

  return (
  	<svg
  		viewBox="0 0 100 100"
  		style={{ enableBackground: "new 0 0 100 100" }}
  		xmlSpace="preserve"
  		{ ...otherProps }
  	>
      <circle {...externalBorder} />
      <circle {...internalBorder} />
      <circle {...iris} />
      <circle {...pupille} />
      {/*<g>*/}
        {/*<path d="M 54 40 C 70 20 40 -20 46 20 c 0 2 4 2 4 0 C 41 -6 66 20 46 40" />*/}
      {/*</g>*/}
  	</svg>
  );
}
