module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
	  extend: {
		 fontFamily: {
			Roboto: ['Roboto', 'Montserrat', 'sans-serif'],
			Montserrat: ['Montserrat', 'sans-serif'],
		 },
		 boxShadow: {
			custom:
			  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
			custom2: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
		 },
	  },
	},
	plugins: [
	  require('tailwind-scrollbar-hide')
	],
 };
 