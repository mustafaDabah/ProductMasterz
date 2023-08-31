// VARIANTS
export const fadeInRightVariants = {
    hidden: { x: -1000  , opacity: 0},
    visible: { x: 0 , opacity: 1 },
};
export const fadeInLeftVariants = {
    hidden: { x: 1000  , opacity: 0},
    visible: { x: 0 , opacity: 1 },
};
export const fadeInUpVariants = {
    hidden: { y: 1000  },
    visible: { y: 0  },
};

export const fadeUpWithLittleY = {
    hidden: { y: 100 },
    visible: { y: 0 },
};

export const hightVariants = {
    hidden: { height: 0 },
    visible: { height: '100%' },
};
 
export const fadeInRightWithScale = {
    hidden: { x: -1000, opacity: 0, scale: 0 },
    visible: { x: 0, opacity: 1, scale: 1 },
};

export const fadeInLeftWithScale = {
    hidden: { x: 1000, opacity: 0, scale: 0 },
    visible: { x: 0, opacity: 1, scale: 1 },
};

// TRANSITION
export const normalTransition = {
    delay: 0.2,
    duration: 0.7,
    ease: 'easeIn'
};

export const roadMapTransition = { duration: 0.7, ease: 'linear' }

