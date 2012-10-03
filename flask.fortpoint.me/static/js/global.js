(function($){ 
    $(document).ready(function() {
		// Cufon
		Cufon.replace('#navigation > ul > li > a, h1.post-title, h1.title', { hover: true, fontFamily: 'gotham' });
		
		
		// Comments
		if ($('#commentform').length > 0){
			$('#commentform').validate();
		}
		
		//show teasers on mouseover
		$('.list-page .teasers li:has(.teaser):not(.disabled)').find('a.name').live('mouseover', function(){
			$(this).parent().find('.teaser').stop(true,true).delay(200).fadeIn(150);
		});
		
		$('.list-page .teasers li:has(.teaser):not(.disabled)').find('a.name').live('mouseout', function(){
			$(this).parent().find('.teaser').stop(true,true).fadeOut(150);
		});
		
		
		// Search Page Filters
		$('#search-navigation a').click(function(event) {
			event.preventDefault();
		});
		$('#search-navigation a#search-all').click(function() {
			$('#search-navigation .active').removeClass('active');
			$(this).addClass('active');
			$('#normal-results, #team-results, #company-results').stop(true,true).slideDown(300);
			return false;
		});
		$('#search-navigation a#search-companies').click(function() {
			$('#search-navigation .active').removeClass('active');
			$(this).addClass('active');
			$('#company-results').stop(true,true).slideDown(300);
			$('#normal-results, #team-results').stop(true,true).slideUp(300);
			return false;
		});
		$('#search-navigation a#search-team').click(function() {
			$('#search-navigation .active').removeClass('active');
			$(this).addClass('active');
			$('#team-results').stop(true,true).slideDown(300);
			$('#normal-results, #company-results').stop(true,true).slideUp(300);
			return false;
		});
		
		
		
		
		
	
	/**************  COMPANY PAGE FILTERING **************/
	
	// fix company list height
	$('#companies').css('height', $('#companies').height() + 'px');
	
	// bind filter nav items to filter data
	var $filterSector = $('#sectors-nav li a');
	
	var $companies = $('#companies .col');
	var $data	   = $companies.clone();
	
	// attempt to call Quicksand on every form change
	$filterSector.click(function(e) {
	
	   if( $(this).attr('id') == 'exits-link' ) {
    	   return true;
	   }
	
		if($(this).is('.active')) {
			//return false; //do nothing is already active
		} else {
			var $sector = $(this).attr('sector');
			
			$('#sectors-nav li a.active').removeClass('active');
			$(this).addClass('active');
			
			var $filteredData;
			
			for($i=0; $i <= $companies.length; $i++) {
				if ($sector == 'all') {
					$filteredData = $data.eq($i).find('li');
					$('#partnersort .partner.off').stop(true,true).fadeIn(600).removeClass('off');
				} else {
					$filteredData = $data.eq($i).find('li[sector="' + $sector + '"]');
					$('#partnersort .partner.off[sector=' + $sector + ']:not(#all)').stop(true,true).fadeIn(600).removeClass('off');
					$('#partnersort .partner[sector!=' + $sector + ']:not(#all)').stop(true,true).fadeOut(600).addClass('off');
				}
				
				// finally, call quicksand for each collumn.
				$companies.eq($i).quicksand($filteredData, {
					duration: 600,
					attribute: 'id'
					//easing: 'easeInOutQuad'
				});
			};
			$('#partnersort #all').trigger('click');
			e.preventDefault();
		}
	});
	
	
	$('#sectors-nav li a.active', $('body.page-template-page-exits-php')).removeClass('active');
	$('#exits-link', $('body.page-template-page-exits-php')).addClass('active');
	
	
	
	// add events for filtering by partner
	
	$('#partnersort .partner:not(.active)').click(function() {
		$('#partnersort .partner.active').removeClass('active');
		$(this).addClass('active');
		
		var $p_id = $(this).attr('id');
		if($p_id == 'all') {
			$('#partnersort .partner.disabled').removeClass('disabled');
			
			//show all companies
			$('#companies li.disabled').removeClass('disabled');
			
		} else {
			$('#partnersort .partner').addClass('disabled');
			$(this).removeClass('disabled');
			
			//show slected companies
			$('#companies li').addClass('disabled');
			$('#companies li.' + $p_id).removeClass('disabled');
		}
	});
	$('#partnersort #all').trigger('click');
	
	$('#partnersort .partner:not(.active)').not('#all').hover(function() {
		var $p_id = $(this).attr('id');
		$('#companies li.' + $p_id).addClass('hint');
	}, function() {
		var $p_id = $(this).attr('id');
		$('#companies li.' + $p_id).removeClass('hint');
	});

	/**************  STORY PAGE FEATURE LINKS **************/
	
	if ($('ul.atlas-story-list').length) {
		$('li .active-area', 'ul.atlas-story-list').click(function() {
			window.location = $('a', $(this)).eq(0).attr('href');
		});

	}

	/**************  TEAM MEMBER DETAIL - WRAPPER RESIZING **************/
/*
	
	if ($('#bio-block').length) {
		var timer;
		// Define positioning
		function adjustWrapper() {
			if(($('body').height() - 100) > $('#wrapper').height()) {
				$('#wrapper').css('height', ($('body').height() - 100));
			}
			else {
				$('#wrapper').css('height', 'auto');
			}
		}
		// Run at page load
		adjustWrapper();
		// Run at page resize
		$(window).resize(function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				adjustWrapper();
			}, 400)
		});
	}	
*/

    });
})(jQuery);
