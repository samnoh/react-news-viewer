export const capitalize = text => {
    const [firstLetter, ...rest] = text;
    return firstLetter.toUpperCase() + rest.join('');
};

export const countries = ['us', 'nz', 'kr'];

export const categories = [
    'all',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
];
