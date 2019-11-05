/******************************
 *GLOBAL VARIABLES
 ******************************/
//These are used in several of the functions below
//To remember the proper states
var windowWidth;
var AZToggle = 'show';
var slideNumber = 0;
var slideshowAutomate = true;

//REDESIGN
var currentYear = (new Date).getFullYear();$(document).ready(function() {$("#year").text((new Date).getFullYear());});

$(document).ready(function(){
    $("#top-mobile-menu").click(function(){
        $(".secondary-mobile-menu").slideToggle();
    });
});

$(document).ready(function(){
    $("#small-top-mobile-menu").click(function(){
        $(".secondary-mobile-menu").slideToggle();
    });
});

$(document).ready(function(){
    $(".nav-name").click(function(){
        $(".mobile-dropdown-menu").slideToggle();
    });
});

$(document).ready(function(){
    $(".mobile-menu").click(function(){
        $("#in-this-section").slideToggle();
    });
});

$(document).ready(function(){
    $("#tactical-mobile-menu").click(function(){
        $(".tac-nav").slideToggle();
    });
});

/******************************
 *BINDINGS AND INITIALIZATIONS
 ******************************/
//Once everything loads, set the functions up
$(document).ready(function()
                  {
                    $('#js-disabled').hide();
                    $('.js-enabled').show();
                    //Start Automatic Slideshow
                    automaticSlideshow();
                    //Resize the slideshow to fit the window
                    heroSlideshowSize();
                    
                    //FUNCTION BINDINGS
                    
                    //Bind clicking the additional stories to the slideshow function
                    $('.additional-story').bind('click', function() {
                        clearTimeout(slideshowTimer);
                        if (slideshowAutomate) {
                          slideshowAutomate = true;
                        }
                        
                        slideNumber = $(this).attr('data-slide-number')
                        heroSlideshowChange();
                    })
                    //Bind A-Z Dropdown
                    $('#a-z-dropdown').bind('click', AZDropdown);
                    //Bind mobile Dropdown
                    $('.mobile-menu').bind('click', mobileDropdown);
                    
                    //Bind mobile main nav
                    $('.mobile-main-nav > div > div > ul > li > a').bind('click', function(event) {
                      event.preventDefault();
                      mobileMainNav($(this));
                    })
                  })

//FIRE SCRIPTS ON WINDOW RESIZE
$(window).resize(function() {
    heroSlideshowSize();
    
    //hide mobile dropdown if window is resized too large for it
    if ($(window).width() > 767){
      $('.mobile-dropdown-menu').css('display', 'none');
    }
})

/******************************
 *FUNCTIONS
 *****************************/

//Resizes the slideshow so that it is responsive
function heroSlideshowSize() {
    windowWidth = $(window).width();
    //This line sets the slide position so that we stay on the proper slide
    var slidePosition = windowWidth * slideNumber;
    $('.hero-slideshow-wrapper').css('left', -slidePosition);
    //This line adjusts the wrapper and story width so all slides fit horizontally
    $('.hero-slideshow-wrapper').width(windowWidth * 4); 
    $('.hero-story').width(windowWidth);
}

//Move the slideshow to the appropriate slide
function heroSlideshowChange() {
    var slideDistance = windowWidth * slideNumber;
    $('.hero-slideshow-wrapper').animate({
        left: -slideDistance
    });
    $('.selected-story').removeClass('selected-story');
    var story = "story-" + slideNumber;
    $('#' + story).addClass('selected-story');
    automaticSlideshow();
}


//Start Automatic Slideshow
function automaticSlideshow(){
 if (slideshowAutomate) {
     slideshowTimer = setTimeout(function() {
                       if (slideNumber <= 2) {
                         slideNumber++;
                         heroSlideshowChange();
                       }
     else if(slideNumber === 3) {
                        slideNumber = 0;
                        heroSlideshowChange();
                      }
   }, 11000)
 }
}

//A-Z Dropdown function
function AZDropdown() {
    if (AZToggle == 'show') {
        $('.a-z-list').animate({
        'bottom': '-600px'
        
        })
        AZToggle = 'hide';
    }
    else {
        $('.a-z-list').animate({
        'bottom': '29px'
        })
        AZToggle = 'show';
    }
    
}

//Mobile Dropdown Menu
function mobileDropdown() {
  $('.mobile-dropdown-menu').slideToggle();
  if( $('.mobile-menu img').attr('src') == 'files/images/redesign/hamburger.png' ) {
    $('.mobile-menu img').attr('src', 'files/images/redesign/hamburger-active.png');
  }
  else {
    $('.mobile-menu img').attr('src', 'files/images/redesign/hamburger.png');
  }
}

//Mobile Main Nav
function mobileMainNav(menu) {
  menu.parent().children('ul').slideToggle();
}

//Search dropdown
$(function(){
  var $searchlink = $('#searchtoggl span');
  var $searchbar  = $('#searchbar');
  $('#searchtoggl').on('click', function(e){
    e.preventDefault();
    
    if($(this).attr('id') == 'searchtoggl') {
      if(!$searchbar.is(":visible")) { 
        // if invisible we switch the icon to appear collapsable
        $searchlink.removeClass('glyphicon glyphicon-search').addClass('glyphicon glyphicon-zoom-out');
      } else {
        // if visible we switch the icon to appear as a toggle
        $searchlink.removeClass('glyphicon glyphicon-zoom-out').addClass('glyphicon glyphicon-search');
      }
      $searchbar.slideToggle(300, function(){
        // callback after search bar animation
      });
    }
  });
});



    
    