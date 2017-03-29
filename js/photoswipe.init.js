var openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    var items = [];
    // build items array
    $('.b-resort--gallery--item').each(function(){
    	var item=[];
    	item.src = $(this).attr('data-src');
    	item.w = $(this).attr('data-w');
    	item.h = $(this).attr('data-h');

    	items.push(item)
    })
    
    // define options (if needed)
    var options = {
			 // history & focus options are disabled on CodePen        
      	history: false,
      	focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0
        
    };
    
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

// openPhotoSwipe();

document.getElementsByClassName('b-resort--gallery--fullscreen')[0].onclick = openPhotoSwipe;