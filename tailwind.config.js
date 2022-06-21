module.exports = {
    purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        fontSize:{
            'xs': '10px',
            'sm': '12px',
            'tiny': '14px',
            'base': '16px',
            'lg': '18px',
            'xl': '20px',
            '2xl': '22px',
            '3xl': '24px',
            '4xl': '26px',
            '5xl': '28px',
            '6xl': '30px',
            '7xl': '32px',
            '8xl': '34px',
            '9xl': '36px',
            '10xl': '38px',
            '11xl': '40px',
            '12xl': '42px',
            '13xl': '44px',
            '14xl': '46px',
            '15xl': '48px',
            '16xl': '50px',
            '17xl': '52px'
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
