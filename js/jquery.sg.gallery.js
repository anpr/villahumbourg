/*!
 * jquery.sg.gallery library
 * https://github.com/sgconsulting/jquery.sg.gallery
 *
 * Copyright 2011, S.G. Consulting srl
 * Licensed under the Mozilla Public License Version 1.1
 * https://github.com/sgconsulting/jquery.sg.gallery/blob/master/MPL-1.1-LICENSE.txt
 *
 */
var sg_gallery={version: '1.0.0'};

(function($){$.support.transition=(function(){var thisBody=document.body||document.documentElement,thisStyle=thisBody.style,support=thisStyle.WebkitTransition!==undefined||thisStyle.OTransition!==undefined||thisStyle.transition!==undefined;return support;})();$.fn.gallery=function(callerSettings){var settings={prevBtn:'#sg-prev',nextBtn:'#sg-next',startIdx:0,opacity:0.5,opacityDelay:0.5,moveDelay:0.7,startX:0,fullScreen:false};settings=$.extend(settings,callerSettings||{});var containerHeight=function(wrappedEl,settings,imgs){if(settings.fullScreen===true){var win_h=$(window).height();var win_w=$(window).width();var ratio=win_w/win_h;var available_h=win_h-parseInt($(wrappedEl).position().top);var available_w=win_w-parseInt($(wrappedEl).position().left);if(available_h<available_w){$(wrappedEl).css('height',available_h);}else{$(wrappedEl).css('height',available_w*ratio);}}else{$(wrappedEl).css('height',$(imgs[0]).height());}};var reposition=function(imgs,settings){var pos={x:0,y:0};imgs.each(function(index){$(this).css('left',settings.startX+pos.x+'px');pos.x+=$(this).width();});};var current=settings.startIdx;var source=$('script[src*="jquery.sg.gallery"]:first');var baseurl="";if(source.length!==0){var sourceUrl=source.attr('src');baseurl=sourceUrl.substring(0,sourceUrl.indexOf("jquery.sg.gallery"));}
var container=this;$(this).addClass('sg-gallery');var imgs=$(this).children("img");var nImgs=imgs.length;containerHeight(this,settings,imgs);var transitionStr='opacity '+settings.opacityDelay+'s ease-in-out, left '+settings.moveDelay+'s ease-in-out';var imgCss={'-o-transition':transitionStr,'-webkit-transition':transitionStr,'-moz-transition':transitionStr,transition:transitionStr,zoom:1};var pos={x:0,y:0};imgs.each(function(index){imgCss['left']=settings.startX+pos.x+'px';$(this).addClass('sg-gallery-img');$(this).css(imgCss);pos.x+=$(this).width();if(index!==settings.startIdx){$(this).css('opacity',settings.opacity);$(this).css('-ms-filter',"progid:DXImageTransform.Microsoft.Alpha(Opacity="+settings.opacity*100+")");$(this).css('filter','alpha(opacity = '+settings.opacity*100+')');}
$(this).bind('full-trasparency',function(){$(this).css('opacity',1);$(this).css('-ms-filter',"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)");$(this).css('filter','alpha(opacity = 100)');});$(this).bind('opacity',function(){if($(this).css('opacity')!==settings.opacity){$(this).css('opacity',settings.opacity);$(this).css('-ms-filter','progid:DXImageTransform.Microsoft.Alpha(Opacity='+settings.opacity*100+')');$(this).css('filter','alpha(opacity = '+settings.opacity*100+')');}});$(this).bind('current-img',function(){current=index;var clickedImg=this;var pxLeft=settings.startX+$(clickedImg).position().left;var toMove=$(container).children("img");toMove.each(function(){if($.support.transition){$(this).css('left',$(this).position().left-pxLeft);}else{$(this).animate({'left':$(this).position().left-pxLeft});}
$(this).trigger('opacity');});var trigger=function(){$(clickedImg).trigger('full-trasparency');};setTimeout(trigger,settings.moveDelay*1000);});});$(settings.prevBtn).css({'height':$(container).css('height'),'background':'url('+baseurl+'images/sg-blank.png) left 45% no-repeat'});$(settings.nextBtn).css({'height':$(container).css('height'),'background':'url('+baseurl+'images/sg-blank.png) right 45% no-repeat'});$(settings.prevBtn).hover(function(){if(current>0){$(this).css('background','url('+baseurl+'images/sg-btn-prev.png) left 45% no-repeat');}},function(){$(this).css('background','url('+baseurl+'images/sg-blank.png) left 45% no-repeat');});$(settings.nextBtn).hover(function(){if(current<nImgs-1){$(this).css('background','url('+baseurl+'images/sg-btn-next.png) right 45% no-repeat');}},function(){$(this).css('background','url('+baseurl+'images/sg-blank.png) right 45% no-repeat');});$(settings.prevBtn).click(function(){if(current>0){current-=1;$(imgs[current]).trigger('current-img');}});$(settings.nextBtn).click(function(){if(current<nImgs-1){current+=1;$(imgs[current]).trigger('current-img');}});$(window).resize(function(){containerHeight(container,settings,imgs);reposition(imgs,settings);});};})(jQuery);