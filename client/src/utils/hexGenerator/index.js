import { DOFUS_IMG_URI, RENDERER_LOOK } from '../../constants/URIs';

export function hexToAscii(source) {
	const hex  = source.toString();
	let decoded = '';
	for (let n = 0; n < hex.length; n += 2) {
    decoded += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return decoded;
}

export function asciiToHexa(source) {
	const array = [];
	for (let n = 0, l = source.length; n < l; n++) {
    const hex = Number(source.charCodeAt(n)).toString(16);
    array.push(hex);
  }
  return array.join('');
}

export function getLookHex({ head, body, hat, cloak, color1, color2, color3, color4, color5, height, defaultColors = '' }) {
  const mainIds = [body, head, hat, cloak].filter(e => !!e).join(',');
  const colors = [color1, color2, color3, color4, color5].filter(e => !!e).map((color, index) => `${index}=${color}`).join(',') || defaultColors;

  const ascii = `{${head && !body ? 2 : 1}|${mainIds}|${colors}|${height || (head && !body ? 100 : 100)}}`;
  return asciiToHexa(ascii);
}

export function generateImageLink({ rotation = 2, mode = 'full', ...params }) {
  return `${DOFUS_IMG_URI}/${RENDERER_LOOK}/${getLookHex(params)}/${mode}/${rotation}/250_250-10_100.png`;
}
