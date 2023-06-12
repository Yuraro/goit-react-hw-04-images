import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35668157-dc7e121b764e10d5e5d6ef031';

async function getPictures(searchQuery, page) {
    const options = {
    params: {
        key: '35673160-782aa51f7b86396c5bf485a2a',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 12,
    },
};
	try {
		const response = await axios.get(BASE_URL, options);
		return response;
	} catch (error) {
		
	}
    return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
);
};

export default getPictures;