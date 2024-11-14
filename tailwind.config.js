module.exports = {
    purge: [],
    theme: {
        extend: {
            keyframes: {
                'slide-right-fade-out': {
                  '0%': { transform: 'translateX(0)', opacity: '1' },
                  '50%': { transform: 'translateX(100px)', opacity: '1' },
                  '100%': { transform: 'translateX(100px)', opacity: '0' },
                },
            clipPath: {
                'polygon-triangle': 'polygon(50% 0%, 0% 100%, 100% 100%)',
                'polygon-circle': 'circle(50% at 50% 50%)',
                // Add more custom shapes as needed
              }
            },
            animation: {
                'slide-right-fade-out': 'slide-right-fade-out 2s ease-in-out forwards',
              },        
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}