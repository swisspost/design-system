const rating = document.querySelector('post-rating') as HTMLPostRatingElement;

rating.addEventListener('postInput', event => {
  // use event.detail.value for whatever you like
});

rating.addEventListener('postChange', event => {
  // use event.detail.value for whatever you like
});
