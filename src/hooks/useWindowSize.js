import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return [width, height];
};

// ref: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
const useWindowSize = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
};
export default useWindowSize;
