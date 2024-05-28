document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    let currentPage = 1;
    let pageSize = 5;

    const inputField = document.getElementById('pageSizeInput');
    const postContainer = document.getElementById('postContainer');
    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'FETCH POSTS';
    document.body.appendChild(fetchButton);

    fetchButton.addEventListener('click', function () {
        const size = parseInt(inputField.value, 10);
        if (isNaN(size) || size <= 0) {
            Notiflix.Notify.failure('Please enter a valid number of items per page.');
            return;
        }
        pageSize = size;
        fetchPosts(currentPage, pageSize);
    });

    function fetchPosts(page, limit) {
        fetch(`${baseUrl}?_page=${page}&_limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(post => displayPost(post));
                    currentPage++;
                    fetchButton.textContent = 'FETCH MORE POSTS';
                } else {
                    Notiflix.Notify.info('No more data to load.');
                    fetchButton.disabled = true;
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                Notiflix.Notify.failure('Failed to fetch data.');
            });
    }

    function displayPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'card';
        const shortTitle = post.title.slice(0, 30);
        postElement.innerHTML = `<h2>${shortTitle}</h2>
                                 <p><b>Post Id:</b> ${post.id}</p>
                                 <p><b>Author Id:</b> ${post.userId}</p>
                                 <p>${post.body}</p>`;
        postContainer.appendChild(postElement);
    }
});