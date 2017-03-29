var bullet_array = [];

$(document).ready(function(){
	$(document).on('click', '.adults-decrease, .adults-increase', function(){
		var parent = $(this).closest('.b-adults-number');
		var input = parent.find('.adults--input');
		if(input.val() != '')
			var val = parseInt(input.val());
		else
			var val = 1
		var new_val;
		if($(this).hasClass('adults-decrease')) {
			if(val > 1) {
				new_val = val - 1;
				input.val(new_val);

				var slice = parseInt(new_val.toString().slice(-1));
				if(slice == 1 && new_val != 11) {
					var text = 'взрослый';
				} else {
					var text = 'взрослых';
				}

				parent.find('.adults--number--text').text(new_val+' '+text)
			} 
		} else if($(this).hasClass('adults-increase')) {
			new_val = val + 1;
			input.val(new_val);


			var slice = parseInt(new_val.toString().slice(-1));

			if(slice == 1 && new_val != 11) {
				var text = 'взрослый';
			} else {
				var text = 'взрослых';
			}

			parent.find('.adults--number--text').text(new_val+' '+text)
		}
	})

	$('.custom--select_style select').each(function(){
		if($(this).attr('data-placeholder')) {
			var placeholder = $(this).attr('data-placeholder');

			$(this).siblings('.custom--select_style--text').text(placeholder)
		} else {
			var text = $(this).find('option:selected').text();

			$(this).siblings('.custom--select_style--text').text(text)
		}
	})

	$(document).on('change focus', '.custom--select_style select', function(){

		if($(this).attr('data-placeholder')) {
			var placeholder = $(this).attr('data-placeholder');

			$(this).siblings('.custom--select_style--text').text(placeholder)
		} else {
			var text = $(this).find('option:selected').text();

			$(this).siblings('.custom--select_style--text').text(text)
		}
	})

	$(document).on('click', '.input--clean_field', function(){
		$(this).siblings('input').val('')
	})

	$(document).on('keyup', '.search--form--text_input.hotels--search', function(){
		detect_search_clear($(this))
	})

	if($('.search--form--text_input.hotels--search').length > 0)
		detect_search_clear($('.search--form--text_input.hotels--search'))

	if($('[data-inputmask]').length>0)
		$('[data-inputmask]').mask("+7 (999) 999-99-99");

	$(document).on('click', '[data-search-hidden-toggle]',function(e){
		var parent = $(this).closest('.search-result__listing__item');
		if(parent.hasClass('active')) {
			parent.removeClass('active');
			$(this).text('Показать').removeClass("active")
			parent.find('.search-result__hidden-content').slideUp(200);
		} else {
			$('.search-result__listing__item').removeClass('active');
			$('.search-result__hidden-content').slideUp(200);
			$('[data-search-hidden-toggle]').text('Показать').removeClass('active')
			parent.addClass('active');
			$(this).text('Скрыть цены').addClass("active")
			parent.find('.search-result__hidden-content').slideDown(200);
		}
		e.preventDefault()
	})

	$(document).on('click', '.dd--share .dd--share--icon', function(){
		$(this).siblings('.dd--share--drop_down').toggle()
	})

	$(document).on('click', function(e){
		if(!$(e.target).hasClass('dd--share--icon') && $(e.target).closest('.dd--share').length < 1) {
			$('.dd--share--drop_down').hide()
		}

		if(!$(e.target).hasClass('b-header__menu-icon') && $('.drop--down--menu').is(':visible') && !$(e.target).hasClass('drop--down--menu') && $(e.target).closest('.drop--down--menu').length < 1) {
			$('.drop--down--menu').slideUp(200);
			$('.b-header__menu-icon').removeClass('active')
		}
	})

	$(document).on('click', '.toggle--siblings--hidden', function(){
		$(this).toggleClass('active').siblings('.hidden').slideToggle(200)
	})

	$(document).on("click", '[data-toggle-link]', function(e){
		var bl = $(this).attr("data-toggle-link");

		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			if($(this).attr('data-inactive-text') != '')
				$(this).text($(this).attr('data-inactive-text'))
		} else {
			$(this).addClass('active');
			if($(this).attr('data-active-text') != '')
				$(this).text($(this).attr('data-active-text'))
		}

		$('[data-toggle-block='+bl+']').slideToggle(200);

		e.preventDefault()
	})

	$(document).on('click', '[data-calltab]', function(){
		if(!$(this).hasClass('active')) {
			var tab = $(this).attr('data-calltab');

			if($(this).closest('[data-tab-parent]').length > 0) {
				$(this).closest('[data-tab-parent]').find('[data-calltab]').removeClass('active')
			} else {
				$(this).siblings('[data-calltab]').removeClass('active')
			}
			$(this).addClass('active');

			if($('[data-tab="'+tab+'"]').length > 0) {
				$('[data-tab="'+tab+'"]').siblings().hide();
				$('[data-tab="'+tab+'"]').show();
			}
		} 		
	})

	$(document).on('click', '.b-header__menu-icon', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.drop--down--menu').slideUp(200);
		} else {
			$(this).addClass('active')
			$('.drop--down--menu').slideDown(200);
		}
	});

	bullet_init();
	bullet_detection();
	bullet_change_number()

	$(window).scroll(function(){
		bullet_detection();

		bullet_change_number();
	});

	$(window).resize(function(){
		bullet_init();
		bullet_change_number()
	})

	$(document).on('click', '.close--popup', function(){
		$(this).closest('.popup').fadeOut(200, function(){
			$('body').removeClass('popup--opened');
		})
	});

	$(document).on('click', '[data-call-popup]', function(e){
		var popup = $(this).attr('data-call-popup');

		$('body').addClass('popup--opened');
		$('.popup').fadeIn(200);
		$('[data-popup]').hide();
		$('[data-popup="'+popup+'"]').show();
		e.preventDefault();
	})

	$(document).on('change', '.change--children--pick', function(){
		var parent = $(this).closest('.form-line');
		parent.before('<div class="children--picked--wrapper form-line">\
			<input type="text" name="children added" class="white__input-text" readonly value="'+$(this).find('option:selected').text()+'" />\
			<span class="remove--children--picked--wrapper"></span>\
			</div>');
	})

	$(document).on('click', '.remove--children--picked--wrapper', function(){
		$(this).closest('.form-line').remove()
	})

	$(document).on('click', '.will--be--hidden--on--click--and--call_form', function(){
		$(this).slideUp(200);
		$(this).siblings('.additional--search--form--on--calling').slideDown(200);
	})

	$(document).on('click', '[data-call-search-form]', function(e){
		// if($(this).attr('data-slide--toggle') == "true")
		if($('.b-header__menu-icon').hasClass('active') 
				&& $('[data-hidden--form]').is(':visible')) 
		{
			$('.b-header__menu-icon').removeClass('active');
			$('.drop--down--menu').slideUp(200)
		} else {
			$('[data-hidden--form]').slideToggle(200);
			$(this).toggleClass('active')
			// else
			// 	$('[data-hidden--form]').slideDown(200);
			if($('[data-hidden--form').siblings('.will--be--hidden--on--click--and--call_form').length > 0)
				$('[data-hidden--form').siblings('.will--be--hidden--on--click--and--call_form').slideToggle(200);
			else
				$('body, html').animate({scrollTop: 0}, 500)

			$('.b-header__menu-icon').removeClass('active');
			$('.drop--down--menu').slideUp(200)
		}
	})
})

function bullet_detection() {
	var bl = $('.listing--bullet');
	if(bl.length < 1 && $('[data-listing-block]').length < 1)
		return;
	var wp = $(window).scrollTop();
	var wh = $(window).height();
	var listing_pos_top = $('[data-listing-block]').offset().top
	var listing_pos_bottom = $('[data-listing-block]').offset().top + $('[data-listing-block]').outerHeight(); 

	if(listing_pos_top > wp || listing_pos_bottom < (wp+120)) {
		bl.fadeOut(200)
	} else {
		bl.fadeIn(200)
	}
}

function detect_search_clear(bl) {
	if(bl.val().length > 0)
		bl.siblings('.input--clean_field').show();
	else
		bl.siblings('.input--clean_field').hide();
}

Number.prototype.between = function (min, max) {
    return this > min && this < max;
};

function bullet_init() {
	if($('[data-bullet-item-number]').length < 1)
		return;

	bullet_array = [];
	$('[data-bullet-item-number]').each(function(){
		var id = $(this).attr('data-bullet-item-number');
		var pos = $(this).offset().top;
		var pos_b = $(this).outerHeight() + $(this).offset().top;

		bullet_array.push([id, pos, pos_b]);
	})
}

function bullet_change_number() {
	var bl = $('.listing--bullet');
	if(bl.length < 1)
		return;

	var bl_pos = bl.offset().top + bl.outerHeight()/2;

	bullet_array.forEach(function(key, val){
		if(bl_pos.between(key[1], key[2])) {
			bl.find('.bullet--current').text(key[0])
		}
	});
}