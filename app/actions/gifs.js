import actionTypes from './gif-action-types';

const fetchGiphyAPI = (searchTerm, limit, offset = 0) => browser.runtime.sendMessage({
    searchTerm,
    limit,
    offset,
});

export const searchGifs = searchTerm => (dispatch, getState) => {
    console.log('searching for GIFs');
    dispatch({ type: actionTypes.SEARCH_GIF, payload: searchTerm });
    const limit = getState().gifs.searchLimit;
    const promise = fetchGiphyAPI(searchTerm, limit);
    console.dir(promise);
    promise.then((res) => {
        console.log('Server antwortete', res);
        if (res.status !== 200) {
            dispatch({ type: actionTypes.SEARCH_ERROR });
        } else {
            const { data, meta, pagination } = res.json;
            if (meta.status !== 200) {
                dispatch({ type: actionTypes.SEARCH_ERROR });
            }

            if (pagination.total_count > pagination.count) {
                dispatch({ type: actionTypes.HAS_MORE_PAGES, payload: true });
            }

            dispatch({
                type: actionTypes.RECEIVE_GIF,
                payload: data,
            });
        }
    }).catch((...args) => {
        console.error('Suche fehlgeschlagen', args, typeof args[0]);
        console.dir(args);
        return dispatch({ type: actionTypes.SEARCH_ERROR });
    });
};

export const loadMore = () => (dispatch, getState) => {
    const { lastSearchTerm, morePages, moreRequestInProgress } = getState().gifs;
    if (morePages && !moreRequestInProgress) {
        dispatch({ type: actionTypes.FETCH_MORE_GIF });
        const offset = getState().gifs.searchOffset;
        const limit = getState().gifs.searchLimit;
        const currentGifs = getState().gifs.gifs;
        return fetchGiphyAPI(lastSearchTerm, limit, offset)
            .then((res) => {
                if (res.status !== 200) {
                    dispatch({ type: actionTypes.SEARCH_ERROR });
                } else {
                    const { data, meta, pagination } = res.json;
                    console.log('received', data);
                    if (meta.status !== 200) {
                        dispatch({ type: actionTypes.SEARCH_ERROR });
                    }

                    if (pagination.total_count > pagination.count + currentGifs.length) {
                        dispatch({ type: actionTypes.HAS_MORE_PAGES, payload: true });
                    } else {
                        dispatch({ type: actionTypes.HAS_MORE_PAGES, payload: false });
                    }

                    dispatch({
                        type: actionTypes.RECEIVE_MORE_GIF,
                        payload: data,
                    });
                }
            })
            .catch(() => dispatch({ type: actionTypes.SEARCH_ERROR }));
    }
};

export const toggleFrame = () => ({
    type: actionTypes.TOGGLE_FRAME,
});
